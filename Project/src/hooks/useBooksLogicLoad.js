// hooks/useBooksLogic.js
/*import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/slices/firebaseThunks';
import { addToCart } from '../store/slices/cartSlice';
import { useEffect } from 'react';

export const useBooksLogicLoad = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: books, loading: booksLoading, error: booksError } = useSelector(
    (state) => state.collections.books
  );
  const cartItems = useSelector((state) => state.cart?.items || []);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleAddToCart = (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      dispatch(addToCart({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.coverImage,
        quantity: 1
      }));
    }
  }

  return {
    books,
    booksLoading,
    booksError,
    handleBookClick,
    handleAddToCart
  };
};*/
/*РАБОЧИЙ ВАРИАНТ
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/slices/firebaseThunks';
import { addItem } from '../store/slices/cartSlice'; 
import { saveCartToFirestore } from '../store/slices/cartThunks';
import { useEffect } from 'react';
import { selectUserData } from '../store/slices/authSlice';

export const useBooksLogicLoad = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: books, loading: booksLoading, error: booksError } = useSelector(
    (state) => state.collections.books
  );
  const cartItems = useSelector((state) => state.cart?.items || []);
  const user = useSelector(selectUserData);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleAddToCart = async (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      
      dispatch(addItem({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.coverImage,
        quantity: 1
      }));
      
      if (user?.uid) {
        dispatch(saveCartToFirestore(user.uid));
      }
    }
  }

  return {
    books,
    booksLoading,
    booksError,
    handleBookClick,
    handleAddToCart
  };
}; КОНЕЦ РАБОЧЕГО*/

/*import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/slices/firebaseThunks';
import { addItem } from '../store/slices/cartSlice'; 
import { saveCartToFirestore } from '../store/slices/cartThunks';
import { useEffect, useCallback, useRef, useMemo } from 'react'; // ← Добавил useCallback
import { selectUserData } from '../store/slices/authSlice';

export const useBooksLogicLoad = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: books, loading: booksLoading, error: booksError } = useSelector(
    (state) => state.collections.books
  );
   const hasFetchedRef = useRef(false);
   
  const cartItems = useSelector((state) => state.cart?.items || []);
  const user = useSelector(selectUserData);

 
  useEffect(() => {
    // Если уже загружали данные - пропускаем
    if (hasFetchedRef.current || books?.length > 0) {
      console.log('⏭️ USEEFFECT: Пропускаем запрос - данные уже есть');
      return;
    }

    console.log('🔄 USEEFFECT: Загружаем книги...');
    hasFetchedRef.current = true;
    
    dispatch(fetchBooks());
  }, [dispatch, books?.length]); 

console.log('📖 HOOK: useBooksLogicLoad render, books count:', books?.length);
  // Оптимизированная функция
  const handleBookClick = useCallback((bookId) => {
    navigate(`/book/${bookId}`);
  }, [navigate]); // ← Зависимость только от navigate

  // Оптимизированная функция
  const handleAddToCart = useCallback(async (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      dispatch(addItem({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.coverImage,
        quantity: 1
      }));
      
      if (user?.uid) {
        dispatch(saveCartToFirestore(user.uid));
      }
    }
  }, [ dispatch, user?.uid]); // ← Все зависимости указаны

  return useMemo(() => ({
    books,
    booksLoading,
    booksError,
    handleBookClick,
    handleAddToCart
  }), [books?.length, booksLoading, booksError, handleBookClick, handleAddToCart]);
};*/


import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchBooks } from '../store/slices/firebaseThunks';
import { addItem } from '../store/slices/cartSlice';
import { saveCartToFirestore } from '../store/slices/cartThunks';
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
  
  //const cartItems = useSelector((state) => state.cart?.items || []);
  const user = useSelector(selectUserData);
  const authInitialized = useSelector(selectIsInitialized);

  const getCachedBooks = useCallback(() => {
    const cached = sessionStorage.getItem('cachedBooks');
    return cached ? JSON.parse(cached) : null;
  }, []);

  const setCachedBooks = useCallback((books) => {
    sessionStorage.setItem('cachedBooks', JSON.stringify(books));
  }, []);

  // ✅ ОСНОВНАЯ ЛОГИКА: восстановление из кэша или загрузка с сервера
  useEffect(() => {
    if (!authInitialized) {
      return;
    }

    // Если уже обработали кэш или идет загрузка - пропускаем
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

  // ✅ СОХРАНЕНИЕ В КЭШ только при реальном изменении данных
  const prevBooksRef = useRef(books);
 /* useEffect(() => {
    // Сохраняем только если книги действительно изменились
    if (books.length > 0 && books !== prevBooksRef.current) {
      setCachedBooks(books);
      prevBooksRef.current = books;
    }
  }, [books, setCachedBooks]);*/
  useEffect(() => {
  // Проверяем, что books — массив и не пустой
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
      dispatch(addItem({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.coverImage,
        quantity: 1
      }));
      
      if (user?.uid) {
        dispatch(saveCartToFirestore(user.uid));
      }
    }
  }, [dispatch, books, user?.uid]);

  // ✅ ПРАВИЛЬНЫЙ isLoading: только если нет книг И идет загрузка
  const isLoading = books.length === 0 && (!authInitialized || booksLoading);

  return useMemo(() => ({
    books,
    booksLoading: isLoading,
    booksError,
    handleBookClick,
    handleAddToCart
  }), [books, isLoading, booksError, handleBookClick, handleAddToCart]);
};











 /*useEffect(() => {
     console.log('🔄 USEEFFECT: useBooksLogicLoad mounted');
    dispatch(fetchBooks());
  }, [dispatch]);*/