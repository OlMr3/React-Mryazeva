export const carouselStyles = {
  // Основной контейнер карусели
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden'
  },
  
  // Контейнер для слайдов
  slidesContainer: {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
  },
  
  // Отдельный слайд (изображение)
  slide: {
    width: '100%',
    flexShrink: 0,
    height: { xs: '200px', md: '400px' },
    objectFit: 'contain',
    backgroundColor: "#fdf9f9"
  },
  
  // Кнопки навигации
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: 'white',
    '&:hover': { 
      backgroundColor: 'rgba(0,0,0,0.6)' 
    }
  },
  
  prevButton: {
    left: 16
  },
  
  nextButton: {
    right: 16
  },
  
  // Индикаторы (точки)
  indicatorsContainer: {
    position: 'absolute', 
    bottom: 16, 
    left: '50%', 
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 1
  },
  
  indicator: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    cursor: 'pointer'
  },
  
  activeIndicator: {
    backgroundColor: 'secondary.main'
  },
  
  inactiveIndicator: {
    backgroundColor: 'grey.400'
  }
};
