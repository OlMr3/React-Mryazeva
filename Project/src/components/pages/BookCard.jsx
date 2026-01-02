/*import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  Typography,
  Box
} from '@mui/material';

const BookCard = ({ book, onCardClick, onAddToCart }) => {
  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(book.id);
    }
  };

  return (
    <Box sx={{
      width: {
        xs: '100%',
        sm: 'calc(50% - 16px)',
        md: 'calc(33.333% - 16px)',
        lg: 'calc(25% - 16px)'
      },
      minWidth: '250px',
      maxWidth: '280px',
    }}>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6
          }
        }}
        onClick={() => onCardClick(book.id)}
      >
        <Box sx={{ position: 'relative', height: 300 }}>
          <CardMedia
            component="img"
            height="300"
            image={book.coverImage}
            alt={book.title}
            sx={{ 
              objectFit: 'contain', 
              p: 1,
              width: '100%',
              height: '100%'
            }}
          />
          <Chip 
            label={book.genre} 
            size="small" 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              left: 16,
              backgroundColor: 'secondary.main',
              color: 'white',
              fontWeight: 600
            }} 
          />
        </Box>
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h3" noWrap>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} noWrap>
            {book.author}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={book.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {book.rating}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="secondary.main">
              {book.price.toLocaleString('ru-BY')} BYN
            </Typography>
            <Button 
              variant="contained" 
              size="small"
              onClick={handleAddToCartClick}
              sx={{ borderRadius: 5, backgroundColor: 'secondary.main' }}
            >
              В корзину
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookCard;*/

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  Typography,
  Box
} from '@mui/material';
import { useSelector } from 'react-redux';
import { bookCardStyles } from './styles/bookCardStyles';

const BookCard = ({ book, onCardClick, onAddToCart }) => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const isInCart = cartItems.some(item => item.id === book.id);

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (onAddToCart && !isInCart) {
      onAddToCart(book.id);
    }
  };

  return (
   /* <Box sx={{
      width: {
        xs: '100%',
        sm: 'calc(50% - 16px)',
        md: 'calc(33.333% - 16px)',
        lg: 'calc(25% - 16px)'
      },
      minWidth: '250px',
      maxWidth: '280px',
    }}>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6
          }
        }}
        onClick={() => onCardClick(book.id)}
      >
        <Box sx={{ position: 'relative', height: 300 }}>
          <CardMedia
            component="img"
            height="300"
            image={book.coverImage}
            alt={book.title}
            sx={{ 
              objectFit: 'contain', 
              p: 1,
              width: '100%',
              height: '100%'
            }}
          />
          <Chip 
            label={book.genre} 
            size="small" 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              left: 16,
              backgroundColor: 'secondary.main',
              color: 'white',
              fontWeight: 600
            }} 
          />
        </Box>
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h3" noWrap>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} noWrap>
            {book.author}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={book.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {book.rating}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="secondary.main">
              {book.price.toLocaleString('ru-BY')} BYN
            </Typography>
            <Button 
              variant={isInCart ? "outlined" : "contained"}
              size="small"
              onClick={handleAddToCartClick}
              disabled={isInCart}
              sx={{ 
                borderRadius: 5, 
                backgroundColor: isInCart ? 'transparent' : 'secondary.main',
                color: isInCart ? 'secondary.main' : 'white',
                borderColor: 'secondary.main',
                '&:hover': {
                  backgroundColor: isInCart ? 'transparent' : 'secondary.dark'
                }
              }}
            >
              {isInCart ? 'В корзине' : 'В корзину'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>*/
     <Box sx={bookCardStyles.cardContainer}>
      <Card 
        sx={bookCardStyles.card}
        onClick={() => onCardClick(book.id)}
      >
        <Box sx={bookCardStyles.imageContainer}>
          <CardMedia
            component="img"
            height="300"
            image={book.coverImage}
            alt={book.title}
            sx={bookCardStyles.cardMedia}
          />
          <Chip 
            label={book.genre} 
            size="small" 
            sx={bookCardStyles.genreChip}
          />
        </Box>
        
        <CardContent sx={bookCardStyles.cardContent}>
          <Typography gutterBottom variant="h6" component="h3" noWrap>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={bookCardStyles.author}>
            {book.author}
          </Typography>
          
          <Box sx={bookCardStyles.ratingContainer}>
            <Rating value={book.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={bookCardStyles.ratingText}>
              {book.rating}
            </Typography>
          </Box>
          
          <Box sx={bookCardStyles.priceButtonContainer}>
            <Typography variant="h6" sx={bookCardStyles.price}>
              {book.price.toLocaleString('ru-BY')} BYN
            </Typography>
            <Button 
              variant={isInCart ? "outlined" : "contained"}
              size="small"
              onClick={handleAddToCartClick}
              disabled={isInCart}
              sx={isInCart ? bookCardStyles.inCartButton : bookCardStyles.cartButton}
            >
              {isInCart ? 'В корзине' : 'В корзину'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookCard;


