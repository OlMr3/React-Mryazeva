export const bookCardStyles = {
  // Контейнер карточки
  cardContainer: {
    width: {
      xs: '100%',
      sm: 'calc(50% - 16px)',
      md: 'calc(33.333% - 16px)',
      lg: 'calc(25% - 16px)'
    },
    minWidth: '250px',
    maxWidth: '280px',
  },

  // Карточка
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 6
    }
  },

  // Контейнер изображения
  imageContainer: {
    position: 'relative',
    height: 300
  },

  // Изображение книги
  cardMedia: {
    objectFit: 'contain',
    p: 1,
    width: '100%',
    height: '100%'
  },

  // Чип жанра
  genreChip: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'secondary.main',
    color: 'white',
    fontWeight: 600
  },

  // Контент карточки
  cardContent: {
    flexGrow: 1
  },

  // Автор
  author: {
    mb: 1,
    noWrap: true
  },

  // Контейнер рейтинга
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    mb: 2
  },

  // Текст рейтинга
  ratingText: {
    ml: 1
  },

  // Контейнер цены и кнопки
  priceButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  // Цена
  price: {
    color: 'secondary.main'
  },

  // Кнопка корзины
  cartButton: {
    borderRadius: 5,
    backgroundColor: 'secondary.main',
    color: 'white',
    borderColor: 'secondary.main',
    '&:hover': {
      backgroundColor: 'secondary.dark'
    }
  },

  // Кнопка "В корзине"
  inCartButton: {
    backgroundColor: 'transparent',
    color: 'secondary.main',
    borderColor: 'secondary.main',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
};
