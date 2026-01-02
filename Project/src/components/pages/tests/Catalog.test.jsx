import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('../../../hooks/useBooksLogicLoad', () => ({
  useBooksLogicLoad: vi.fn()
}));
vi.mock('../../../hooks/useBookFilters', () => ({
  useBookFilters: vi.fn(),
  GENRE_MAPPING: {
    fiction: { display: 'Художественная литература' },
    children: { display: 'Книги для детей' }
  }
}));
vi.mock('../../../hooks/useFilterSync', () => ({
  useFilterSync: vi.fn()
}));


import { useBooksLogicLoad } from '../../../hooks/useBooksLogicLoad';
import { useBookFilters, GENRE_MAPPING } from '../../../hooks/useBookFilters';
import { useFilterSync } from '../../../hooks/useFilterSync';

import Catalog from '../Catalog';

describe('Catalog компонента', () => {
  const mockBooks = [
    { id: 1, title: 'Book 1', author: 'Author 1', price: 29.99, image: 'book1.jpg', genre: 'fiction', description: 'Desc 1' },
    { id: 2, title: 'Book 2', author: 'Author 2', price: 19.99, image: 'book2.jpg', genre: 'fiction', description: 'Desc 2' },
    { id: 3, title: 'Book 3', author: 'Author 3', price: 24.99, image: 'book3.jpg', genre: 'children', description: 'Desc 3' }
  ];

  const mockLogicLoad = {
    books: mockBooks,
    handleBookClick: vi.fn(),
    handleAddToCart: vi.fn(),
    booksLoading: false,
    booksError: null
  };

  const mockUseFilterSync = {
    filters: { genre: 'fiction', searchQuery: 'test', page: 1 },
    updateURL: vi.fn()
  };

  const createStore = (filterState = {}) => configureStore({
    reducer: {
      filter: (state = filterState) => state,
      collections: (state = { books: { data: mockBooks, loading: false, error: null } }) => state,
      cart: (state = { items: [] }) => state,
      user: (state = {}) => state,
      auth: (state = { userData: null, isAuth: false, isLoading: false }) => state
    }
  });

  const renderCatalog = (filterState = {}) => {
 
    useBooksLogicLoad.mockReturnValue({ ...mockLogicLoad });
    useBookFilters.mockReturnValue(mockBooks);
 
    const filters = filterState.filters || { genre: null, searchQuery: null, page: 1 };
    useFilterSync.mockReturnValue({ filters, updateURL: vi.fn() });

    return render(
      <Provider store={createStore(filterState)}>
        <BrowserRouter>
          <Catalog />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('отображает активные фильтры и кнопку сброса', () => {
    renderCatalog({ filters: { genre: 'fiction', searchQuery: 'test', page: 1 } });
    expect(screen.getByText(/Активные фильтры:/)).toBeInTheDocument();
    expect(screen.getByText(/Жанр: Художественная литература/i)).toBeInTheDocument();
    expect(screen.getByText(/Поиск: "test"/)).toBeInTheDocument();
    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
  });

  test('при отсутствии фильтров не отображается блок активных фильтров', () => {
   
    useFilterSync.mockReturnValue({
      filters: { genre: null, searchQuery: null, page: 1 },
      updateURL: vi.fn()
    });
    
    renderCatalog({ filters: { genre: null, searchQuery: null, page: 1 } });
    expect(screen.queryByText(/Активные фильтры:/)).not.toBeInTheDocument();
  });

  test('отображает книги', () => {
    renderCatalog(); 
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('Book 3')).toBeInTheDocument();
  });

  test('при наличии активных фильтров и более 1 страницы показывает пагинацию', () => {
    
    const largeBooks = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Book ${i + 1}`,
      author: `Author ${i + 1}`,
      price: 10 + i,
      image: '',
      genre: 'fiction',
      description: ''
    }));
    useBooksLogicLoad.mockReturnValue({ ...mockLogicLoad, books: largeBooks });
    useBookFilters.mockReturnValue(largeBooks);
    useFilterSync.mockReturnValue({ filters: { genre: 'fiction', searchQuery: '', page: 1 }, updateURL: vi.fn() });

    render(
      <Provider store={createStore({ genre: 'fiction', searchQuery: '', page: 1 })}>
        <BrowserRouter>
          <Catalog />
        </BrowserRouter>
      </Provider>
    );

    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
