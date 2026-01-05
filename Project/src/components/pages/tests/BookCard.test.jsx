import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Provider } from 'react-redux'
import BookCard from '../bookCard'

const createMockStore = (cartItems = []) => ({
  getState: () => ({ cart: { items: cartItems } }),
  subscribe: () => { },
  dispatch: () => { }
})

describe('BookCard', () => {
  const mockBook = {
    id: '1',
    title: 'Test Book',
    author: 'Test Author',
    price: 100,
    coverImage: 'test-image.jpg',
    genre: 'Fantasy',
    rating: 4.5
  }
  const mockOnCardClick = vi.fn()
  const mockOnAddToCart = vi.fn()
  const renderBookCard = (cartItems = []) => {
    return render(
      <Provider store={createMockStore(cartItems)}>
        <BookCard
          book={mockBook}
          onCardClick={mockOnCardClick}
          onAddToCart={mockOnAddToCart}
        />
      </Provider>
    )
  }

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('отображает информацию о книге', () => {
    renderBookCard()

    expect(screen.getByText('Test Book')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
    expect(screen.getByText('100 BYN')).toBeInTheDocument()
    expect(screen.getByText('Fantasy')).toBeInTheDocument()
    expect(screen.getByAltText('Test Book')).toHaveAttribute('src', 'test-image.jpg')
  })

  it('кнопка "В корзину" когда книги нет в корзине', () => {
    renderBookCard()

    expect(screen.getByText('В корзину')).toBeInTheDocument()
    expect(screen.getByText('В корзину')).not.toBeDisabled()
  })

  it('кнопка "В корзине" когда книга в корзине', () => {
    renderBookCard([{ id: '1' }])

    const button = screen.getByText('В корзине')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('вызывает onCardClick при клике на карточку', () => {
    renderBookCard()

    fireEvent.click(screen.getByAltText('Test Book'))
    expect(mockOnCardClick).toHaveBeenCalledWith('1')
  })

  it('вызывает onAddToCart при клике на кнопку', () => {
    renderBookCard()

    fireEvent.click(screen.getByText('В корзину'))
    expect(mockOnAddToCart).toHaveBeenCalledWith('1')
  })

  it('не вызывает onAddToCart если книга уже в корзине', () => {
    renderBookCard([{ id: '1' }])
    const button = screen.getByText('В корзине')
    expect(button).toBeDisabled()
    fireEvent.click(button)
    expect(mockOnAddToCart).not.toHaveBeenCalled()
  })
})
