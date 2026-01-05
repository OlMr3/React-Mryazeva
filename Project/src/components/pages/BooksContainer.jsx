import React, { memo } from 'react';
import { Box } from '@mui/material';
import BookCard from './bookCard';
import { BooksContainerStyles } from './styles/BooksContainer.styles';

const BooksContainer = memo(({ books, onBookClick, onAddToCart, isLoading }) => {

    if (isLoading) {
        return (
            <Box sx={BooksContainerStyles.container}>

                {[...Array(8)].map((_, index) => (
                    <Box key={index} sx={BooksContainerStyles.skeleton}>
                    </Box>
                ))}
            </Box>
        );
    }

    return (
        <Box sx={BooksContainerStyles.container}>
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                    onCardClick={onBookClick}
                    onAddToCart={onAddToCart}
                />
            ))}
        </Box>
    );
});

export default BooksContainer;






