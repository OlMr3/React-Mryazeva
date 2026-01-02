// src/pages/HomePage/HomePage.jsx
/*рабочий вариант
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, fetchPromoSlides } from '../../store/slices/firebaseThunks';
import {
  Container, Typography,
  Box,
  Button
} from '@mui/material';
import Carousel from './Carousel';
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';


const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: slides, loading: promoLoading, error: promoError } = useSelector((state) => state.collections.promoSlides);
  const { books, booksLoading, booksError, handleBookClick, handleAddToCart } = useBooksLogicLoad();

  useEffect(() => {
    dispatch(fetchPromoSlides());
  }, [dispatch]);

  if (promoLoading || booksLoading) {
    return <div>Загрузка...</div>;
  }

  if (promoError) {
    return <div>Ошибка загрузки слайдов: {promoError}</div>;
  }

  if (booksError) {
    return <div>Ошибка загрузки товаров: {booksError}</div>;
  }
  const popularBooks = books.filter(book => book.isPopular === true);

  const handleBtnShowClick = () => {
    navigate(`/catalog/`)
  }
  return (
    <>
      <Carousel slides={slides} />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{
            mb: 6,
            fontWeight: 700,
            color: 'secondary.main',
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Популярные товары
        </Typography>

        <BooksContainer
          books={popularBooks}
          onBookClick={handleBookClick}
          onAddToCart={handleAddToCart}
        />

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{ borderRadius: 5, px: 4, borderColor: "secondary.main", color: "secondary.main" }}
            onClick={handleBtnShowClick}
          >
            Показать все товары
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;*/


import React, {useMemo, useRef, memo} from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPromoSlides } from '../../store/slices/firebaseThunks';
import {
  Container,
  Typography,
  Box,
  Button
} from '@mui/material';
import Carousel from './Carousel';
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';
import { homePageStyles } from './styles/HomePage.styles'; 

const HomePage = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: slides, loading: promoLoading, error: promoError } = useSelector((state) => state.collections.promoSlides);
  const { books, booksLoading, booksError, handleBookClick, handleAddToCart } = useBooksLogicLoad();
const hasFetchedPromoRef = useRef(false);
  
  useEffect(() => {
  if (hasFetchedPromoRef.current || slides?.length > 0) return;
  
  hasFetchedPromoRef.current = true;
  dispatch(fetchPromoSlides());
}, [dispatch, slides?.length]);

  const popularBooks = useMemo(() => 
  books.filter(book => book.isPopular === true), 
  [books] // ← Пересчитывается только при изменении books
);

  if (promoLoading || booksLoading) {
    return <div>Загрузка...</div>;
  }

  if (promoError) {
    return <div>Ошибка загрузки слайдов: {promoError}</div>;
  }

  if (booksError) {
    return <div>Ошибка загрузки товаров: {booksError}</div>;
  }
  
  const handleBtnShowClick = () => {
    navigate('/catalog/');
  };

  return (
    <>
      <Carousel slides={slides} />
      <Container maxWidth="lg" sx={homePageStyles.container}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={homePageStyles.title}
        >
          Популярные товары
        </Typography>

        <BooksContainer
          books={popularBooks}
           isLoading={booksLoading}
          onBookClick={handleBookClick}
          onAddToCart={handleAddToCart}
        />

        <Box sx={homePageStyles.buttonContainer}>
          <Button
            variant="outlined"
            size="large"
            sx={homePageStyles.showAllButton}
            onClick={handleBtnShowClick}
          >
            Показать все товары
          </Button>
        </Box>
      </Container>
    </>
  );
});

export default HomePage;



  /* const handleBookClick = (bookId) => {
     navigate(`/book/${bookId}`);
   };
 
   const handleAddToCart = (bookId) => {
     console.log(`Добавлена книга с ID: ${bookId}`);
     // Здесь будет логика добавления в корзину
   };*/