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

