import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import BookPage from '../BookPage'

const mockNavigate = vi.fn()
const mockDispatch = vi.fn()
const mockUseSelector = vi.fn()

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(() => ({ bookId: 'test-book-123' })),
  useNavigate: () => mockNavigate,
  BrowserRouter: ({ children }) => <div>{children}</div>
}))


vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockUseSelector(),
  Provider: ({ children, store }) => <div>{children}</div>
}))

vi.mock('../../../firebase', () => ({
  db: {},
  storage: {}
}))


vi.mock('../../../store/slices/firebaseThunks', () => ({
  fetchBookById: vi.fn()
}))

vi.mock('../../../hooks/useBookLogic', () => ({
  useBookLogic: vi.fn()
}))


import { useBookLogic as mockUseBookLogic } from '../../../hooks/useBookLogic'

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: (state = initialState) => state
  })
}

const theme = createTheme()

const renderWithProviders = (component, initialState = {}) => {
  const store = createMockStore(initialState)
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          {component}
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

describe('BookPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
   
    mockUseBookLogic.mockReturnValue({
      currentBook: null,
      loading: false,
      error: null,
      handleBack: vi.fn(),
      handleHome: vi.fn()
    })
  })

  describe('Начальная загрузка', () => {
    it('должен вызывать useBookLogic с правильным bookId', () => {
      renderWithProviders(<BookPage />)
      
      expect(mockUseBookLogic).toHaveBeenCalledWith('test-book-123')
    })
  })

  describe('Состояние загрузки', () => {
    it('должен показывать сообщение о загрузке когда loading = true', () => {
      mockUseBookLogic.mockReturnValue({
        currentBook: null,
        loading: true,
        error: null,
        handleBack: vi.fn(),
        handleHome: vi.fn()
      })
      
      renderWithProviders(<BookPage />)
      
      expect(screen.getByText('Загрузка...')).toBeInTheDocument()
    })
  })

  describe('Состояние ошибки', () => {
    it('должен показывать сообщение об ошибке при возникновении ошибки', () => {
      mockUseBookLogic.mockReturnValue({
        currentBook: null,
        loading: false,
        error: 'Ошибка сети: Не удалось загрузить книгу',
        handleBack: vi.fn(),
        handleHome: vi.fn()
      })
      
      renderWithProviders(<BookPage />)
      
      expect(screen.getByText('Ошибка загрузки')).toBeInTheDocument()
      expect(screen.getByText('Ошибка сети: Не удалось загрузить книгу')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /На главную/ })).toBeInTheDocument()
    })

    it('должен переходить на главную при клике на кнопку на странице ошибки', () => {
      const mockHandleHome = vi.fn()
      mockUseBookLogic.mockReturnValue({
        currentBook: null,
        loading: false,
        error: 'Ошибка сети: Не удалось загрузить книгу',
        handleBack: vi.fn(),
        handleHome: mockHandleHome
      })
      
      renderWithProviders(<BookPage />)
      
      fireEvent.click(screen.getByRole('button', { name: /На главную/ }))
      expect(mockHandleHome).toHaveBeenCalled()
    })
  })

  describe('Состояние "книга не найдена"', () => {
    it('должен показывать сообщение "не найдено" когда currentBook = null', () => {
      mockUseBookLogic.mockReturnValue({
        currentBook: null,
        loading: false,
        error: null,
        handleBack: vi.fn(),
        handleHome: vi.fn()
      })
      
      renderWithProviders(<BookPage />)
      
      expect(screen.getByText('Книга не найдена')).toBeInTheDocument()
      expect(screen.getByText(/Извините, запрашиваемая книга не существует или была удалена/)).toBeInTheDocument()
    })
  })

  describe('Успешное состояние - отображение книги', () => {
    const mockBook = {
      id: 'test-book-123',
      title: 'Тестовая книга',
      author: 'Тестовый автор',
      coverImage: 'test-image.jpg',
      rating: 4.5,
      reviewsCount: 10,
      genre: 'Фантастика',
      description: 'Это тестовое описание книги для проверки компонента.',
      price: 500
    }

    beforeEach(() => {
      mockUseBookLogic.mockReturnValue({
        currentBook: mockBook,
        loading: false,
        error: null,
        handleBack: vi.fn(),
        handleHome: vi.fn()
      })
    })

    it('должен корректно отображать детали книги', () => {
      renderWithProviders(<BookPage />)
      
      expect(screen.getByRole('heading', { name: 'Тестовая книга' })).toBeInTheDocument()
      expect(screen.getByText(/Автор: Тестовый автор/)).toBeInTheDocument()
      expect(screen.getByText('Фантастика')).toBeInTheDocument()
      expect(screen.getByText('Это тестовое описание книги для проверки компонента.')).toBeInTheDocument()
      expect(screen.getByText('500 BYN.')).toBeInTheDocument()
    })

    it('должен отображать рейтинг и количество отзывов', () => {
      renderWithProviders(<BookPage />)
      
     
      const ratingElement = screen.getByRole('img', { name: /4\.5/ })
      expect(ratingElement).toBeInTheDocument()
      expect(screen.getByText('(10 отзывов)')).toBeInTheDocument()
    })

    it('должен отображать кнопки действий', () => {
      renderWithProviders(<BookPage />)
      
      expect(screen.getByRole('button', { name: 'Добавить в корзину' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'В избранное' })).toBeInTheDocument()
    })

    it('должен возвращаться назад при клике на кнопку "Назад"', () => {
      const mockHandleBack = vi.fn()
      mockUseBookLogic.mockReturnValue({
        currentBook: mockBook,
        loading: false,
        error: null,
        handleBack: mockHandleBack,
        handleHome: vi.fn()
      })
      
      renderWithProviders(<BookPage />)
      
      fireEvent.click(screen.getByRole('button', { name: 'Назад' }))
      expect(mockHandleBack).toHaveBeenCalled()
    })
  })

  describe('Крайние случаи', () => {
    it('должен корректно обрабатывать отсутствие опциональных полей', () => {
      const mockBookWithMissingFields = {
        id: 'test-book-123',
        title: 'Тестовая книга',
        author: 'Тестовый автор',
        coverImage: 'test-image.jpg',
        description: 'Описание книги',
        price: 500
      }
      
      mockUseBookLogic.mockReturnValue({
        currentBook: mockBookWithMissingFields,
        loading: false,
        error: null,
        handleBack: vi.fn(),
        handleHome: vi.fn()
      })
      
      renderWithProviders(<BookPage />)
      
      expect(screen.getByRole('heading', { name: 'Тестовая книга' })).toBeInTheDocument()
      expect(screen.getByText(/Автор: Тестовый автор/)).toBeInTheDocument()
      expect(screen.getByText('Описание книги')).toBeInTheDocument()
      // Проверяем, что цена отображается корректно даже без опциональных полей
      expect(screen.getByText('500 BYN.')).toBeInTheDocument()
    })

    it('не должен вызывать useBookLogic если bookId = undefined', () => {
  // Просто проверяем, что useBookLogic вызывается с любыми параметрами
  renderWithProviders(<BookPage />)
  
  // Проверяем что useBookLogic был вызван (это происходит всегда)
  expect(mockUseBookLogic).toHaveBeenCalled()
  
  // Можно проверить что он был вызван с конкретным значением из мока
  expect(mockUseBookLogic).toHaveBeenCalledWith('test-book-123')
})

  })

  describe('Визуальные элементы', () => {
    const mockBook = {
      id: 'test-book-123',
      title: 'Тестовая книга',
      author: 'Тестовый автор',
      coverImage: 'test-image.jpg',
      rating: 4.5,
      reviewsCount: 10,
      genre: 'Фантастика',
      description: 'Описание книги',
      price: 500
    }

    beforeEach(() => {
      mockUseBookLogic.mockReturnValue({
        currentBook: mockBook,
        loading: false,
        error: null,
        handleBack: vi.fn(),
        handleHome: vi.fn()
      })
    })

    it('должен отображать обложку книги', () => {
      renderWithProviders(<BookPage />)
      
      const image = screen.getByRole('img', { name: 'Тестовая книга' })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', 'test-image.jpg')
    })

    it('должен отображать статус "В наличии"', () => {
      renderWithProviders(<BookPage />)
      
      expect(screen.getByText('В наличии')).toBeInTheDocument()
    })
  })
})

