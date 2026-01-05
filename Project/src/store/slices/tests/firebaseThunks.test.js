import { describe, test, expect, vi } from 'vitest';
import { fetchBooks, fetchPromoSlides, fetchBookById } from '../firebaseThunks';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(),
  getDocs: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
}));

describe('Firebase Thunks', () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('fetchBooks - успешно получает список книг', async () => {
    collection.mockReturnValue('booksCollection');
    getDocs.mockResolvedValue({
      docs: [
        { id: 'book1', data: () => ({ title: 'Книга 1' }) },
        { id: 'book2', data: () => ({ title: 'Книга 2' }) },
      ],
    });

    const dispatch = vi.fn();
    const thunkApi = { rejectWithValue: vi.fn() };
    const result = await fetchBooks()(dispatch, () => { }, thunkApi);
    expect(collection).toHaveBeenCalledWith(expect.anything(), 'books');
    expect(getDocs).toHaveBeenCalledWith('booksCollection');
    expect(result.payload).toEqual([
      { id: 'book1', title: 'Книга 1' },
      { id: 'book2', title: 'Книга 2' },
    ]);
  });
  test('fetchPromoSlides - успешно получает слайды', async () => {
    collection.mockReturnValue('promoSlidesCollection');
    getDocs.mockResolvedValue({
      docs: [
        { id: 'slide1', data: () => ({ image: 'img1.jpg' }) },
        { id: 'slide2', data: () => ({ image: 'img2.jpg' }) },
      ],
    });
    const dispatch = vi.fn();
    const thunkApi = { rejectWithValue: vi.fn() };
    const result = await fetchPromoSlides()(dispatch, () => { }, thunkApi);
    expect(collection).toHaveBeenCalledWith(expect.anything(), 'PromoSlides');
    expect(getDocs).toHaveBeenCalledWith('promoSlidesCollection');
    expect(result.payload).toEqual([
      { id: 'slide1', image: 'img1.jpg' },
      { id: 'slide2', image: 'img2.jpg' },
    ]);
  });
  test('fetchBookById - книга найдена', async () => {
    const bookId = 'book123';
    doc.mockReturnValue('docRef');
    const mockDocSnap = {
      exists: () => true,
      id: 'book123',
      data: () => ({ title: 'Название книги' }),
    };
    getDoc.mockResolvedValue(mockDocSnap);
    const dispatch = vi.fn();
    const thunkApi = { rejectWithValue: vi.fn() };
    const result = await fetchBookById(bookId)(dispatch, () => { }, thunkApi);
    expect(doc).toHaveBeenCalledWith(expect.anything(), 'books', bookId);
    expect(getDoc).toHaveBeenCalledWith('docRef');
    expect(result.payload).toEqual({ id: 'book123', title: 'Название книги' });
  });
  test('fetchBookById - книга не найдена', async () => {
    const bookId = 'unknown_id';
    doc.mockReturnValue('docRef');
    getDoc.mockResolvedValue({ exists: () => false });
    const dispatch = vi.fn();
    const result = await fetchBookById(bookId)(dispatch, () => { }, {});
    expect(result.type).toBe('books/fetchBookById/rejected');
    expect(result.payload).toBe('Книга не найдена');
  });
});
