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
