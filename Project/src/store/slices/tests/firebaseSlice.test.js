import { describe, it, expect } from 'vitest';
import collectionsReducer, {
  clearCurrentBook,
  setCachedBooks
} from '../firebaseSlice';

import { fetchBooks, fetchPromoSlides, fetchBookById } from '../firebaseThunks';

const initialState = {
  books: { data: [], loading: false, error: null, currentBook: null },
  promoSlides: { data: [], loading: false, error: null },
};

describe('collectionsSlice reducer', () => {
  it('должен возвращать начальное состояние по умолчанию', () => {
    expect(collectionsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('обрабатывает clearCurrentBook', () => {
    const stateWithBook = {
      ...initialState,
      books: { ...initialState.books, currentBook: { id: 1 } }
    };
    const newState = collectionsReducer(stateWithBook, clearCurrentBook());
    expect(newState.books.currentBook).toBeNull();
  });

  it('работает setCachedBooks при новых данных', () => {
    const newBooks = [{ id: 1 }, { id: 2 }];
    const state = {
      ...initialState,
      books: { ...initialState.books, data: [{ id: 1 }, { id: 2 }] }
    };

    const newState = collectionsReducer(state, setCachedBooks(newBooks));
    expect(newState.books.data).toEqual(newBooks);
  });

  it('обновляет состояние при fetchBooks.fulfilled', () => {
    const payload = [{ id: 1, title: 'Book 1' }];
    const action = {
      type: fetchBooks.fulfilled.type,
      payload
    };
    const newState = collectionsReducer(initialState, action);
    expect(newState.books.data).toEqual(payload);
    expect(newState.books.loading).toBe(false);
  });

  it('обрабатывает fetchBooks.pending', () => {
    const action = {
      type: fetchBooks.pending.type,
    };
    const stateBefore = { ...initialState, books: { ...initialState.books, loading: false } };
    const newState = collectionsReducer(stateBefore, action);
    expect(newState.books.loading).toBe(true);
  });

  it('обрабатывает fetchBooks.rejected', () => {
    const errorMessage = 'error';
    const action = {
      type: fetchBooks.rejected.type,
      payload: errorMessage,
      meta: {},
    };
    const stateBefore = {
      ...initialState,
      books: { data: [], loading: true, error: null, currentBook: null },
    };
    const newState = collectionsReducer(stateBefore, action);
    expect(newState.books.loading).toBe(false);
    expect(newState.books.error).toBe(errorMessage);
  });
  it('обрабатывает fetchPromoSlides.fulfilled', () => {
    const payload = [{ id: 1, name: 'Slide 1' }];
    const action = {
      type: fetchPromoSlides.fulfilled.type,
      payload
    };
    const newState = collectionsReducer(initialState, action);
    expect(newState.promoSlides.data).toEqual(payload);
    expect(newState.promoSlides.loading).toBe(false);
  });
  it('обрабатывает fetchPromoSlides.pending', () => {
    const action = {
      type: fetchPromoSlides.pending.type,
    };
    const stateBefore = {
      ...initialState,
      promoSlides: { ...initialState.promoSlides, loading: false },
    };
    const newState = collectionsReducer(stateBefore, action);
    expect(newState.promoSlides.loading).toBe(true);
  });

  it('обрабатывает fetchPromoSlides.rejected', () => {
    const errorMessage = 'error promo';
    const action = {
      type: fetchPromoSlides.rejected.type,
      payload: errorMessage,
    };
    const stateBefore = {
      ...initialState,
      promoSlides: { data: [], loading: true, error: null },
    };
    const newState = collectionsReducer(stateBefore, action);
    expect(newState.promoSlides.loading).toBe(false);
    expect(newState.promoSlides.error).toBe(errorMessage);
  });
  it('обрабатывает fetchBookById.pending', () => {
    const action = {
      type: fetchBookById.pending.type,
    };
    const stateBefore = {
      ...initialState,
      books: { ...initialState.books, loading: false, error: null },
    };
    const newState = collectionsReducer(stateBefore, action);
    expect(newState.books.loading).toBe(true);
  });

  it('обрабатывает fetchBookById.fulfilled', () => {
    const bookData = { id: 42, title: 'The Answer' };
    const action = {
      type: fetchBookById.fulfilled.type,
      payload: bookData,
    };
    const stateBefore = {
      ...initialState,
      books: { ...initialState.books, loading: true, currentBook: null },
    };
    const newState = collectionsReducer(stateBefore, action);
    expect(newState.books.loading).toBe(false);
    expect(newState.books.currentBook).toEqual(bookData);
  });

  it('обрабатывает fetchBookById.rejected', () => {
    const errorMessage = 'Failed to fetch book';
    const action = {
      type: fetchBookById.rejected.type,
      payload: errorMessage,
    };
    const stateBefore = {
      ...initialState,
      books: { ...initialState.books, loading: true, error: null, currentBook: { id: 1 } },
    };
    const newState = collectionsReducer(stateBefore, action);
    expect(newState.books.loading).toBe(false);
    expect(newState.books.error).toBe(errorMessage);

  });
});