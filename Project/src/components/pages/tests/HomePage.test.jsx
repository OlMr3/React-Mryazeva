import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import HomePage from '../HomePage';
import collectionsReducer from '../../../store/slices/firebaseSlice';

// Правильное мокирование
const mockUseBooksLogicLoad = vi.fn();
const mockHandleBookClick = vi.fn();
const mockHandleAddToCart = vi.fn();
const mockDispatch = vi.fn();

// Мокаем useDispatch перед всеми тестами
vi.mock('react-redux', async () => {
const actual = await vi.importActual('react-redux');
return {
...actual,
useDispatch: () => mockDispatch
};
});

vi.mock('../../../hooks/useBooksLogicLoad', () => ({
useBooksLogicLoad: () => mockUseBooksLogicLoad()
}));

vi.mock('../Carousel', () => ({
__esModule: true,
default: ({ slides }) => (
<div data-testid="carousel">
Carousel with {slides?.length || 0} slides
{slides?.map((slide, index) => (
<img key={index} alt={slide.alt} src={slide.image} />
))}
</div>
)
}));

vi.mock('../BooksContainer', () => ({
__esModule: true,
default: ({ books, onBookClick, onAddToCart }) => (
<div data-testid="books-container">
{books?.map(book => (
<div key={book.id} data-testid={`book-${book.id}`}>
{book.title}
<button onClick={() => onBookClick(book)}>View</button>
<button onClick={() => onAddToCart(book)}>Add to Cart</button>
</div>
))}
</div>
)
}));

import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockStore = (initialState) => configureStore({
reducer: {
collections: collectionsReducer
},
preloadedState: initialState
});

describe('HomePage', () => {
const initialState = {
collections: {
promoSlides: {
data: [
{ image: 'slide1.jpg', alt: 'Slide 1' },
{ image: 'slide2.jpg', alt: 'Slide 2' },
{ image: 'slide3.jpg', alt: 'Slide 3' }
],
loading: false,
error: null
}
}
};

const renderWithProviders = (store) => {
return render(
<Provider store={store}>
<BrowserRouter>
<HomePage />
</BrowserRouter>
</Provider>
);
};

beforeEach(() => {
vi.clearAllMocks();
mockUseBooksLogicLoad.mockReturnValue({
books: [
{ id: '1', title: 'Book 1', isPopular: true },
{ id: '2', title: 'Book 2', isPopular: false },
{ id: '3', title: 'Book 3', isPopular: true }
],
booksLoading: false,
booksError: null,
handleBookClick: mockHandleBookClick,
handleAddToCart: mockHandleAddToCart
});
});

describe('Рендеринг', () => {
test('отображает основные элементы', async () => {
const store = mockStore(initialState);
renderWithProviders(store);

  await waitFor(() => {
    expect(screen.getByText('Популярные товары')).toBeInTheDocument();
  });

  expect(screen.getByTestId('carousel')).toBeInTheDocument();
  expect(screen.getByTestId('books-container')).toBeInTheDocument();
  expect(screen.getByText('Показать все товары')).toBeInTheDocument();
});

test('фильтрует популярные книги', async () => {
  const store = mockStore(initialState);
  renderWithProviders(store);

  await waitFor(() => {
    expect(screen.getByTestId('books-container')).toBeInTheDocument();
  });

  expect(screen.getByTestId('book-1')).toBeInTheDocument();
  expect(screen.getByTestId('book-3')).toBeInTheDocument();
  expect(screen.queryByTestId('book-2')).not.toBeInTheDocument();
});

test('передает слайды в карусель', async () => {
  const store = mockStore(initialState);
  renderWithProviders(store);

  await waitFor(() => {
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
  });

  expect(screen.getByAltText('Slide 1')).toBeInTheDocument();
  expect(screen.getByAltText('Slide 2')).toBeInTheDocument();
  expect(screen.getByAltText('Slide 3')).toBeInTheDocument();
});
});

describe('Состояния загрузки', () => {
test('показывает загрузку при промо-загрузке', () => {
const store = mockStore({
collections: {
promoSlides: {
data: [],
loading: true,
error: null
}
}
});
renderWithProviders(store);

  expect(screen.getByText('Загрузка...')).toBeInTheDocument();
});

test('показывает загрузку при загрузке книг', () => {
  mockUseBooksLogicLoad.mockReturnValue({
    books: [],
    booksLoading: true,
    booksError: null,
    handleBookClick: mockHandleBookClick,
    handleAddToCart: mockHandleAddToCart
  });

  const store = mockStore(initialState);
  renderWithProviders(store);

  expect(screen.getByText('Загрузка...')).toBeInTheDocument();
});
});

describe('Обработка ошибок', () => {
test('показывает ошибку промо-слайдов', async () => {
const store = mockStore({
collections: {
promoSlides: {
data: [],
loading: false,
error: 'Network error'
}
}
});
renderWithProviders(store);

  await waitFor(() => {
    expect(screen.getByText(/Ошибка загрузки слайдов:/)).toBeInTheDocument();
  });
});

test('показывает ошибку книг', async () => {
  mockUseBooksLogicLoad.mockReturnValue({
    books: [],
    booksLoading: false,
    booksError: 'Firebase error',
    handleBookClick: mockHandleBookClick,
    handleAddToCart: mockHandleAddToCart
  });

  const store = mockStore(initialState);
  renderWithProviders(store);

  await waitFor(() => {
    expect(screen.getByText(/Ошибка загрузки товаров:/)).toBeInTheDocument();
  });
});
});

describe('Навигация', () => {
test('кнопка "Показать все товары" перенаправляет в каталог', async () => {
  const navigateMock = vi.fn();
  useNavigate.mockReturnValue(navigateMock);
const store = mockStore(initialState);
renderWithProviders(store);

  await waitFor(() => {
    expect(screen.getByText('Показать все товары')).toBeInTheDocument();
  });

  const button = screen.getByText('Показать все товары');
  fireEvent.click(button);
  expect(navigateMock).toHaveBeenCalledWith('/catalog/');
 
});
});

describe('Эффекты', () => {
test('диспатчит fetchPromoSlides при монтировании', async () => {
const store = mockStore(initialState);
renderWithProviders(store);

 waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled()
    })
  // Дополнительная проверка что компонент отрендерился
  expect(screen.getByTestId('carousel')).toBeInTheDocument();
});
});
});

 