export const bookCardStyles = {
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

  imageContainer: {
    position: 'relative',
    height: 300
  },

  cardMedia: {
    objectFit: 'contain',
    p: 1,
    width: '100%',
    height: '100%'
  },

  genreChip: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'secondary.main',
    color: 'white',
    fontWeight: 600
  },

  cardContent: {
    flexGrow: 1
  },

  author: {
    mb: 1,
    noWrap: true
  },

  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    mb: 2
  },

  ratingText: {
    ml: 1
  },

  priceButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  price: {
    color: 'secondary.main'
  },

  cartButton: {
    borderRadius: 5,
    backgroundColor: 'secondary.main',
    color: 'white',
    borderColor: 'secondary.main',
    '&:hover': {
      backgroundColor: 'secondary.dark'
    }
  },

  inCartButton: {
    backgroundColor: 'transparent',
    color: 'secondary.main',
    borderColor: 'secondary.main',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
};
