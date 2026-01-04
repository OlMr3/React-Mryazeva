import React, { useMemo, useRef, memo } from 'react';
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
import { BooksContainerStyles } from './styles/BooksContainer.styles';

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
    [books]
  );

  if (promoLoading || booksLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }} >
        <Box
          sx={BooksContainerStyles.container}>
          {[...Array(8)].map((_, index) => (
            <Box key={index}
              sx={BooksContainerStyles.skeleton} />))}
        </Box>
      </Box>)
  }

  if (promoError) {
    return <div>Ошибка загрузки слайдов: {promoError}</div>;
  }

  if (booksError) {
    return <div>Ошибка загрузки товаров: {booksError}</div>;
  }

  const handleBtnShowClick = () => {
    navigate('/catalog/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
