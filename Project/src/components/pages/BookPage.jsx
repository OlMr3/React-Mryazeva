import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Button,
  Box,
  Typography,
  Paper,
  Chip,
  Rating
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useBookLogic } from '../../hooks/useBookLogic';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';
import { bookPageStyles } from './styles/BookPage.styles';

const BookPage = memo(() => {
  const { bookId } = useParams();
  const { currentBook, loading, error, handleBack, handleHome } = useBookLogic(bookId);
  const { handleAddToCart } = useBooksLogicLoad();
  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={bookPageStyles.errorContainer}>
        <Paper elevation={3} sx={bookPageStyles.errorPaper}>
          <Typography variant="h4" gutterBottom sx={bookPageStyles.errorTitle}>
            Ошибка загрузки
          </Typography>
          <Typography variant="body1" sx={bookPageStyles.errorText}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={handleHome}
            startIcon={<ArrowBackIcon />}
            sx={bookPageStyles.actionButton}
          >
            На главную
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!currentBook) {
    return (
      <Container maxWidth="md" sx={bookPageStyles.errorContainer}>
        <Paper elevation={3} sx={bookPageStyles.errorPaper}>
          <Typography variant="h4" gutterBottom sx={bookPageStyles.errorTitle}>
            Книга не найдена
          </Typography>
          <Typography variant="body1" sx={bookPageStyles.errorText}>
            Извините, запрашиваемая книга не существует или была удалена.
          </Typography>
          <Button
            variant="contained"
            onClick={handleHome}
            startIcon={<ArrowBackIcon />}
            sx={bookPageStyles.actionButton}
          >
            На главную
          </Button>
        </Paper>
      </Container>
    );
  }
  console.log('render BookPage');

  return (
    <Container maxWidth="lg" sx={bookPageStyles.container}>
      <Button
        variant="outlined"
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        color="secondary"
        sx={bookPageStyles.backButton}
      >
        Назад
      </Button>

      <Box sx={bookPageStyles.mainContent}>
        <Box sx={bookPageStyles.imageContainer}>
          <Box
            component="img"
            src={currentBook.coverImage}
            alt={currentBook.title}
            sx={bookPageStyles.coverImage}
          />
        </Box>

        <Box sx={bookPageStyles.infoContainer}>
          <Box sx={bookPageStyles.titleSection}>
            <Typography variant="h4" component="h1" sx={bookPageStyles.title}>
              {currentBook.title}
            </Typography>

            <Typography variant="h6" sx={bookPageStyles.author}>
              Автор: {currentBook.author}
            </Typography>

            <Box sx={bookPageStyles.ratingBox}>
              <Rating value={currentBook.rating || 4.5} precision={0.1} readOnly size="medium" />
              <Typography variant="body1" sx={{ ml: 1 }}>
                ({currentBook.reviewsCount || 0} отзывов)
              </Typography>
            </Box>

            <Chip
              label={currentBook.genre || 'Художественная литература'}
              color="secondary"
              sx={{ mb: 2 }}
            />
          </Box>

          <Box sx={bookPageStyles.descriptionSection}>
            <Typography variant="h6" sx={bookPageStyles.descriptionTitle}>
              Описание
            </Typography>
            <Typography variant="body1" sx={bookPageStyles.descriptionText}>
              {currentBook.description}
            </Typography>
          </Box>

          <Box sx={bookPageStyles.priceSection}>
            <Box sx={bookPageStyles.priceBox}>
              <Typography variant="h4" sx={bookPageStyles.price}>
                {currentBook.price} BYN.
              </Typography>
              <Chip
                label="В наличии"
                color="success"
                variant="outlined"
              />
            </Box>

            <Box sx={bookPageStyles.actionButtons}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                sx={bookPageStyles.actionButton}
                onClick={() => {
                  handleAddToCart(bookId);
                }}
              >
                Добавить в корзину
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
});

export default BookPage;



