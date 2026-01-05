export const bookPageStyles = {
  container: {
    maxWidth: 'lg',
    py: 4
  },
  errorContainer: {
    maxWidth: 'md',
    py: 4
  },
  backButton: {
    mb: 3
  },
  mainContent: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 4
  },
  imageContainer: {
    width: { xs: '100%', md: '40%' },
    flexShrink: 0
  },
  coverImage: {
    width: '100%',
    maxHeight: 500,
    objectFit: 'contain',
    borderRadius: 2,
    boxShadow: 3
  },
  infoContainer: {
    flex: 1
  },
  titleSection: {
    mb: 3
  },
  title: {
    fontWeight: 'bold',
    mb: 2
  },
  author: {
    color: 'text.secondary',
    mb: 2
  },
  ratingBox: {
    display: 'flex',
    alignItems: 'center',
    mb: 2
  },
  descriptionSection: {
    mb: 3
  },
  descriptionTitle: {
    fontWeight: 'bold',
    mb: 2
  },
  descriptionText: {
    lineHeight: 1.6,
    mb: 1
  },
  priceSection: {
    mb: 3
  },
  priceBox: {
    display: 'flex',
    alignItems: 'center',
    mb: 3
  },
  price: {
    color: 'secondary.main',
    mr: 2,
    fontWeight: 'bold',
    fontSize: '2rem'
  },
  actionButtons: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap'
  },
  actionButton: {
    py: 1.5,
    px: 3,
    minWidth: 200,

  },
  errorPaper: {
    p: 4,
    textAlign: 'center'
  },
  errorTitle: {
    mb: 2
  },
  errorText: {
    mb: 3
  }
};
