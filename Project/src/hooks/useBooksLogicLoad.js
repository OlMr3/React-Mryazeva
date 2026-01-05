import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchBooks } from '../store/slices/firebaseThunks';
import { saveCartToFirestore, addItemToCart } from '../store/slices/cartThunks';
import { useEffect, useCallback, useRef, useMemo,} from 'react';
import { selectUserData, selectIsInitialized } from '../store/slices/authSlice';

export const useBooksLogicLoad = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cacheProcessedRef = useRef(false);

  const { books, loading: booksLoading, error: booksError } = useSelector(
    (state) => ({
      books: state.collections.books?.data || [],
      loading: state.collections.books?.loading || false,
      error: state.collections.books?.error || null,
    }),
    shallowEqual
  );
  
  const user = useSelector(selectUserData);
  const authInitialized = useSelector(selectIsInitialized);

  const getCachedBooks = useCallback(() => {
    const cached = sessionStorage.getItem('cachedBooks');
    return cached ? JSON.parse(cached) : null;
  }, []);

  const setCachedBooks = useCallback((books) => {
    sessionStorage.setItem('cachedBooks', JSON.stringify(books));
  }, []);

  useEffect(() => {
    if (!authInitialized) {
      return;
    }

    if (cacheProcessedRef.current || booksLoading) {
      return;
    }

    const cachedBooks = getCachedBooks();
    
    if (cachedBooks && cachedBooks.length > 0) {
      dispatch({ 
        type: 'collections/setCachedBooks', 
        payload: cachedBooks 
      });
    } else if (books.length === 0) {
      dispatch(fetchBooks());
    }
    
    cacheProcessedRef.current = true;
  }, [dispatch, books.length, authInitialized, booksLoading, getCachedBooks]);
  const prevBooksRef = useRef(books);
  useEffect(() => {
  if (Array.isArray(books) && books.length > 0 && books !== prevBooksRef.current) {
    setCachedBooks(books);
    prevBooksRef.current = books;
  }
}, [books, setCachedBooks]);

  const handleBookClick = useCallback((bookId) => {
    navigate(`/book/${bookId}`);
  }, [navigate]);

  const handleAddToCart = useCallback(async (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
    const item = {
       id: book.id, 
       title: book.title, 
       author: book.author, 
       price: book.price, 
       image: book.coverImage, 
       quantity: 1 };
      dispatch(addItemToCart(user?.uid, item));
      
      if (user?.uid) {
        dispatch(saveCartToFirestore(user.uid));
      }
    }
  }, [dispatch, books, user?.uid]);

  const isLoading = books.length === 0 && (!authInitialized || booksLoading);

  return useMemo(() => ({
    books,
    booksLoading: isLoading,
    booksError,
    handleBookClick,
    handleAddToCart
  }), [books, isLoading, booksError, handleBookClick, handleAddToCart]);
};










