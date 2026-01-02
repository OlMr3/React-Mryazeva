import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookById } from '../store/slices/firebaseThunks';

export const useBookLogic = (bookId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentBook, loading, error } = useSelector((state) => state.collections.books);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookById(bookId));
    }
  }, [dispatch, bookId]);

  const handleBack = useCallback(() => navigate(-1), [navigate]);
  const handleHome = useCallback(() => navigate('/'), [navigate]);

  return {
    currentBook,
    loading,
    error,
    handleBack,
    handleHome
  };
};

