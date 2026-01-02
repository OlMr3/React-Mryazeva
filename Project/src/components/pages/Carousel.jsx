import React, { useState, useEffect, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { carouselStyles } from './styles/carouselStyles';

const Carousel = ({ slides }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    
    const goToNext = useCallback(() => {
        setActiveIndex((current) => (current + 1) % slides.length);
    }, [slides.length]);
    
    const goToPrev = useCallback(() => {
        setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
    }, [slides.length]);
    
    const goToSlide = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    const manualNavigation = useCallback((navigationFunction) => {
        setIsAutoPlay(false); 
        navigationFunction();
        setTimeout(() => setIsAutoPlay(true), 3000);
    }, []);

    useEffect(() => {
        if (!isAutoPlay) return; 
        const intervalId = setInterval(goToNext, 3000);
        return () => clearInterval(intervalId);
    }, [goToNext, isAutoPlay]);

    return (
         <Box sx={carouselStyles.container}>
            <Box sx={{ 
                ...carouselStyles.slidesContainer,
                transform: `translateX(-${activeIndex * 100}%)`
            }}>
                {slides.map((slide, index) => (
                    <Box
                        key={index}
                        component="img"
                        src={slide.image}
                        alt={slide.alt}
                        sx={carouselStyles.slide}
                    />
                ))}
            </Box>

            <IconButton
                onClick={() => manualNavigation(goToPrev)}
                sx={{
                    ...carouselStyles.navButton,
                    ...carouselStyles.prevButton
                }}
            >
                <KeyboardArrowLeft />
            </IconButton>

            <IconButton
                onClick={() => manualNavigation(goToNext)}
                sx={{
                    ...carouselStyles.navButton,
                    ...carouselStyles.nextButton
                }}
            >
                <KeyboardArrowRight />
            </IconButton>
            <Box sx={carouselStyles.indicatorsContainer}>
                {slides.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => manualNavigation(() => goToSlide(index))}
                        sx={{
                            ...carouselStyles.indicator,
                            ...(index === activeIndex 
                                ? carouselStyles.activeIndicator 
                                : carouselStyles.inactiveIndicator)
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Carousel;

/* <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <Box sx={{ 
                display: 'flex',
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(-${activeIndex * 100}%)`
            }}>
                {slides.map((slide, index) => (
                    <Box
                        key={index}
                        component="img"
                        src={slide.image}
                        alt={slide.alt}
                        sx={{
                            width: '100%',
                            flexShrink: 0,
                            height: { xs: '200px', md: '400px' },
                            objectFit: 'contain',
                            backgroundColor: "#fdf9f9"
                        }}
                    />
                ))}
            </Box>

            <IconButton
                onClick={() => manualNavigation(goToPrev)}
                sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.4)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
                }}
            >
                <KeyboardArrowLeft />
            </IconButton>

            <IconButton
                onClick={() => manualNavigation(goToNext)}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.4)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
                }}
            >
                <KeyboardArrowRight />
            </IconButton>

            <Box sx={{ 
                position: 'absolute', 
                bottom: 16, 
                left: '50%', 
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1
            }}>
                {slides.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => manualNavigation(() => goToSlide(index))}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: index === activeIndex ? 'secondary.main' : 'grey.400',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </Box>
        </Box>*/