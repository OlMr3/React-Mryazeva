import React, { useMemo, memo } from 'react';
import { Container, Typography, Box, Pagination, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearFilters, setPage } from '../../store/slices/filterSlice';
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';
import { useBookFilters, GENRE_MAPPING } from '../../hooks/useBookFilters';
import { useFilterSync } from '../../hooks/useFilterSync';
import { useNavigate } from 'react-router-dom';
import { CatalogStyles } from './styles/Catalog.styles';

const Catalog = memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { filters, updateURL } = useFilterSync();
    const { books, handleBookClick, handleAddToCart, booksLoading } = useBooksLogicLoad();
    const booksPerPage = 10;
    const filteredBooks = useBookFilters(books, filters);
    const hasActiveFilters = filters.genre || filters.searchQuery;
    const currentPage = hasActiveFilters ? (filters.page || 1) : 1;
    const totalPages = hasActiveFilters ? Math.ceil(filteredBooks.length / booksPerPage) : 1;

    const displayBooks = useMemo(() => {
        if (!hasActiveFilters) {
            return filteredBooks;
        } else {
            const startIndex = (currentPage - 1) * booksPerPage;
            return filteredBooks.slice(startIndex, startIndex + booksPerPage);
        }
    }, [filteredBooks, currentPage, booksPerPage, hasActiveFilters]);

    const handlePageChange = (event, newPage) => {
        if (hasActiveFilters) {
            dispatch(setPage(newPage));
            updateURL({ ...filters, page: newPage });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('handlePageChange вызван');
        }
    };

    const handleClearFilter = () => {
        dispatch(clearFilters());
        navigate('/catalog');
    };

    return (
        <Container maxWidth="lg" sx={CatalogStyles.container}>
           
            {hasActiveFilters && (
                <Box sx={CatalogStyles.filterBox}>
                    <Typography variant="h6">Активные фильтры:</Typography>
                    {filters.genre && (
                        <Typography variant="body1">
                            • Жанр: {GENRE_MAPPING[filters.genre]?.display || filters.genre}
                        </Typography>
                    )}
                    {filters.searchQuery && (
                        <Typography variant="body1">• Поиск: "{filters.searchQuery}"</Typography>
                    )}
                    <Button variant="outlined" onClick={handleClearFilter}>
                        Сбросить фильтры
                    </Button>
                </Box>
            )}

            <BooksContainer
                books={displayBooks}
                isLoading={booksLoading}
                onBookClick={handleBookClick}
                onAddToCart={handleAddToCart}
            />

         
            {hasActiveFilters && totalPages > 1 && (
                <Box sx={CatalogStyles.paginationBox}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="secondary"
                    />
                </Box>
            )}
        </Container>
    );
});

export default Catalog;





