/*import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Rating
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  
  const { data: books, loading, error } = useSelector((state) => state.collections.books);
  
  if (loading) {
    return <div>Загрузка...</div>;
  }
  
  if (error) {
    return <div>Ошибка: {error}</div>;
  }
  
  const book = Array.isArray(books) ? books.find(book => book.id === bookId) : null;

    if (!book) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Книга не найдена
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Извините, запрашиваемая книга не существует или была удалена.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')} 
            startIcon={<ArrowBackIcon />}
          >
            На главную
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Назад
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={book.coverImage}
            alt={book.title}
            sx={{
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              {book.title}
            </Typography>
            
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Автор: {book.author}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={book.rating || 4.5} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({book.reviewsCount || 0} отзывов)
              </Typography>
            </Box>

            <Chip 
              label={book.genre || 'Художественная литература'} 
              color="primary" 
              sx={{ mb: 2 }}
            />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
              {book.description}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" color="primary" sx={{ mr: 2 }}>
                {book.price} руб.
              </Typography>
              <Chip 
                label="В наличии" 
                color="success" 
                variant="outlined" 
              />
            </Box>

            <Button variant="contained" size="large" sx={{ mr: 2 }}>
              Добавить в корзину
            </Button>
            <Button variant="outlined" size="large">
              В избранное
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookPage;
*/

/*рабочий вариант
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Добавляем useDispatch
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
import { fetchBookById } from '../../store/slices/firebaseThunks'; // Импортируем новый thunk
import { bookPageStyles } from './styles/BookPage.styles';

const BookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Получаем dispatch
  
  // Изменяем селектор: теперь берем данные из нового поля currentBook
  const { currentBook, loading, error } = useSelector((state) => state.collections.books);
  
  // Добавляем эффект для загрузки книги при монтировании компонента
  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookById(bookId));
    }
  }, [dispatch, bookId]);
  
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
            onClick={() => navigate('/')}
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
            onClick={() => navigate('/')}
            startIcon={<ArrowBackIcon />}
            sx={bookPageStyles.actionButton}
          >
            На главную
          </Button>
        </Paper>
      </Container>
    );
  }

  return (

     <Container maxWidth="lg" sx={bookPageStyles.container}>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
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
              >
                Добавить в корзину
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                color="secondary"
                sx={bookPageStyles.actionButton}
              >
                В избранное
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default BookPage; конец рабочего варианта*/

// BookPage.js
import React, {memo} from 'react';
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
import {useBooksLogicLoad} from '../../hooks/useBooksLogicLoad';
import { bookPageStyles } from './styles/BookPage.styles';

const BookPage = memo(() => {
  const { bookId } = useParams();
  
  // Используем кастомный хук
  const { currentBook, loading, error, handleBack, handleHome } = useBookLogic(bookId);
  const { handleAddToCart } = useBooksLogicLoad();
  // Состояния загрузки и ошибок
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
                 onClick={() => {handleAddToCart(bookId);
  }}
              >
                Добавить в корзину
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                color="secondary"
                sx={bookPageStyles.actionButton}
              >
                В избранное
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
});

export default BookPage;



 
 /* if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ошибка загрузки
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            startIcon={<ArrowBackIcon />}
          >
            На главную
          </Button>
        </Paper>
      </Container>
    );
  }
  
  if (!currentBook) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Книга не найдена
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Извините, запрашиваемая книга не существует или была удалена.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            startIcon={<ArrowBackIcon />}
          >
            На главную
          </Button>
        </Paper>
      </Container>
    );
  }*/

      /* <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Назад
      </Button>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        
        <Box sx={{ width: { xs: '100%', md: '40%' }, flexShrink: 0 }}>
          <Box
            component="img"
            src={currentBook.coverImage}
            alt={currentBook.title}
            sx={{
              width: '100%',
             maxHeight: 500,
              objectFit: 'contain',
              borderRadius: 2,
              boxShadow: 3
            }}
          />
        </Box>
        
       
        <Box sx={{ flex: 1 }}>
        
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {currentBook.title}
            </Typography>
            
            <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
              Автор: {currentBook.author}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={currentBook.rating || 4.5} precision={0.1} readOnly size="medium" />
              <Typography variant="body1" sx={{ ml: 1 }}>
                ({currentBook.reviewsCount || 0} отзывов)
              </Typography>
            </Box>

            <Chip 
              label={currentBook.genre || 'Художественная литература'} 
              color="primary" 
              sx={{ mb: 2 }}
            />
          </Box>

       
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Описание
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
              {currentBook.description}
            </Typography>
          </Box>


          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" color="primary" sx={{ mr: 2, fontWeight: 'bold' }}>
                {currentBook.price} руб.
              </Typography>
              <Chip 
                label="В наличии" 
                color="success" 
                variant="outlined" 
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large" 
                sx={{ 
                  py: 1.5, 
                  px: 3, 
                  minWidth: 200
                }}
              >
                Добавить в корзину
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  py: 1.5, 
                  px: 3,
                  minWidth: 200
                }}
              >
                В избранное
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>*/