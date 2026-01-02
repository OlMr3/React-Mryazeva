/*import React, {useEffect} from 'react';
import {
  Container,
  Typography,
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks,} from '../../store/slices/firebaseThunks';
import BookCard from './BookCard'; // Убедитесь в правильном пути
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';

const Catalog = () => {
  const navigate = useNavigate();
  

const { books, booksLoading, booksError, handleBookClick, handleAddToCart } = useBooksLogicLoad();
  if (booksLoading) {
    return <div>Загрузка...</div>;
  }

  if (booksError) {
    return <div>Ошибка загрузки товаров: {booksError}</div>;
  }

  return (
     <Container maxWidth="lg" sx={{ py: 8 }}>
      <BooksContainer
        books={books}
        onBookClick={handleBookClick}
        onAddToCart={handleAddToCart}
      />
    </Container>
  );
};

export default Catalog;*/

/*import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Pagination,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setGenre } from '../../store/slices/filterSlice';
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';

const Catalog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { books, booksLoading, booksError, handleBookClick, handleAddToCart } = useBooksLogicLoad();
    
    const booksPerPage = 10;
   
const GENRE_MAPPING = {
    fantasy: {
        russian: ['Фэнтези'],
        display: 'Фэнтези'
    },
    classic: {
        russian: ['Классика'],
        display: 'Классическая литература'
    },
    detective: {
        russian: ['Детектив', 'Триллер'],
        display: 'Детективы и триллеры'
    },
    children: {
        russian: ['Сказка'],
        display: 'Детская литература'
    }
};

const currentGenre = useSelector(state => state.filter.genre);
const hasActiveFilter = Boolean(currentGenre); 
  const getPageFromUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
        return Math.max(1, pageFromUrl); // Минимум 1
    };
const [page, setPage] = useState(getPageFromUrl());
   
    // Обновляем страницу при изменении URL
    useEffect(() => {
        setPage(getPageFromUrl());
    }, [location.search]);
 
// Обработка URL остается без изменений
useEffect(() => {
    const parts = location.pathname.split('/');
    const genreFromUrl = parts[2];
    
    if (GENRE_MAPPING[genreFromUrl]) {
        dispatch(setGenre(genreFromUrl));
    } else {
        dispatch(clearFilters());
    }
}, [location.pathname, dispatch]);

 const handleClearFilter = () => {
        dispatch(clearFilters());
        navigate('/catalog');
        setPage(1);
         updateUrlParams(1); // Переходим на чистый URL без жанра
    };

// Функция отображения без изменений
const getGenreDisplayName = (genreKey) => 
    GENRE_MAPPING[genreKey]?.display || genreKey;

// Обновленная фильтрация
const filteredBooks = useMemo(() => {
    if (!currentGenre) return books;
    
    const russianGenres = GENRE_MAPPING[currentGenre]?.russian;
    
    return books.filter(book => 
        russianGenres && russianGenres.includes(book.genre)
    );
}, [books, currentGenre]);
 const updateUrlParams = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        
        if (newPage > 1) {
            searchParams.set('page', newPage);
        } else {
            searchParams.delete('page');
        }
        
        const newSearch = searchParams.toString();
        navigate(`${location.pathname}${newSearch ? '?' + newSearch : ''}`, { replace: true });
    };


// Пагинация
    const displayBooks = useMemo(() => {
        if (!hasActiveFilter) {
            return books; // Без фильтра - все книги
        }
        
        // С фильтром - применяем пагинацию
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        return filteredBooks.slice(startIndex, endIndex);
    }, [books, filteredBooks, hasActiveFilter, page, booksPerPage]);

    // Общее количество страниц (только при фильтре)
    const totalPages = hasActiveFilter 
        ? Math.ceil(filteredBooks.length / booksPerPage)
        : 1;

    const handlePageChange = (event, value) => {
        setPage(value);
        updateUrlParams(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
     useEffect(() => {
        if (hasActiveFilter && page > totalPages) {
            const validPage = Math.max(1, totalPages);
            setPage(validPage);
            updateUrlParams(validPage);
        }
    }, [hasActiveFilter, page, totalPages]);


    if (booksLoading) {
        return <div>Загрузка...</div>;
    }

    if (booksError) {
        return <div>Ошибка загрузки товаров: {booksError}</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            {currentGenre && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">
                        Фильтр: {getGenreDisplayName(currentGenre)}
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClearFilter} 
                        sx={{ mt: 1 }}
                    >
                        Сбросить фильтр
                    </Button>
                </Box>
            )}

            <BooksContainer
                books={displayBooks}
                onBookClick={handleBookClick}
                onAddToCart={handleAddToCart}
            />

              
           {hasActiveFilter && filteredBooks.length > booksPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="secondary"
                        size="large"
                    />
                </Box>
            )}

            {filteredBooks.length === 0 && books.length > 0 && hasActiveFilter && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6">
                        Книги в жанре "{getGenreDisplayName(currentGenre)}" не найдены
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Catalog;*/


/*import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Pagination,
    CircularProgress
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setGenre } from '../../store/slices/filterSlice';
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';

const Catalog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { books, booksLoading, booksError, handleBookClick, handleAddToCart } = useBooksLogicLoad();
    
    
    const booksPerPage = 10;
   
    const GENRE_MAPPING = {
        fantasy: {
            russian: ['Фэнтези'],
            display: 'Фэнтези'
        },
        classic: {
            russian: ['Классика'],
            display: 'Классическая литература'
        },
        detective: {
            russian: ['Детектив', 'Триллер'],
            display: 'Детективы и триллеры'
        },
        children: {
            russian: ['Сказка'],
            display: 'Детская литература'
        }
    };

    const currentGenre = useSelector(state => state.filter.genre);
    const hasActiveFilter = Boolean(currentGenre); 

    const getPageFromUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
        return Math.max(1, pageFromUrl);
    };

    const [page, setPage] = useState(getPageFromUrl());
   
    // Обновляем страницу при изменении URL
    useEffect(() => {
        setPage(getPageFromUrl());
    }, [location.search]);
 
    // Обработка URL
    useEffect(() => {
        const parts = location.pathname.split('/');
        const genreFromUrl = parts[2];
        
        if (GENRE_MAPPING[genreFromUrl]) {
            dispatch(setGenre(genreFromUrl));
        } else {
            dispatch(clearFilters());
        }
    }, [location.pathname, dispatch]);

    const handleClearFilter = () => {
        dispatch(clearFilters());
        navigate('/catalog');
        setPage(1);
        updateUrlParams(1);
    };

    const getGenreDisplayName = (genreKey) => 
        GENRE_MAPPING[genreKey]?.display || genreKey;

    // Фильтрация книг
    const filteredBooks = useMemo(() => {
        if (!currentGenre) return books;
        
        const russianGenres = GENRE_MAPPING[currentGenre]?.russian;
        
        return books.filter(book => 
            russianGenres && russianGenres.includes(book.genre)
        );
    }, [books, currentGenre]);

    const updateUrlParams = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        
        if (newPage > 1) {
            searchParams.set('page', newPage);
        } else {
            searchParams.delete('page');
        }
        
        const newSearch = searchParams.toString();
        navigate(`${location.pathname}${newSearch ? '?' + newSearch : ''}`, { replace: true });
    };

    const displayBooks = useMemo(() => {
        if (!hasActiveFilter) {
            return books;
        }
        
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        return filteredBooks.slice(startIndex, endIndex);
    }, [books, filteredBooks, hasActiveFilter, page, booksPerPage]);

    // Общее количество страниц
    const totalPages = hasActiveFilter 
        ? Math.ceil(filteredBooks.length / booksPerPage)
        : 1;

    const handlePageChange = (value) => {
        setPage(value);
        updateUrlParams(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Ключевое исправление: валидация страницы только после загрузки книг
    useEffect(() => {
        if (!booksLoading && hasActiveFilter && page > totalPages && totalPages > 0) {
            const validPage = Math.max(1, totalPages);
            setPage(validPage);
            updateUrlParams(validPage);
        }
    }, [booksLoading, hasActiveFilter, page, totalPages]);

    if (booksLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (booksError) {
        return <div>Ошибка загрузки товаров: {booksError}</div>;
    }
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            {currentGenre && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">
                        Фильтр: {getGenreDisplayName(currentGenre)}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Найдено книг: {filteredBooks.length}
                        {hasActiveFilter && ` (Страница ${page} из ${totalPages})`}
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClearFilter} 
                        sx={{ mt: 1 }}
                    >
                        Сбросить фильтр
                    </Button>
                </Box>
            )}

            <BooksContainer
                books={displayBooks}
                onBookClick={handleBookClick}
                onAddToCart={handleAddToCart}
            />

            {hasActiveFilter && filteredBooks.length > booksPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="secondary"
                        size="large"
                    />
                </Box>
            )}

            {filteredBooks.length === 0 && books.length > 0 && hasActiveFilter && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6">
                        Книги в жанре "{getGenreDisplayName(currentGenre)}" не найдены
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Catalog;*/







/*import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Pagination,
    CircularProgress
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setGenre } from '../../store/slices/filterSlice';
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';

const Catalog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { books, booksLoading, booksError, handleBookClick, handleAddToCart } = useBooksLogicLoad();
    
    const booksPerPage = 10;
    
    // Получаем все параметры фильтрации
    const { searchQuery, genre, sortBy, sortOrder } = useSelector(state => state.filter);
    const currentGenre = genre;
    const hasActiveFilter = Boolean(currentGenre); 

    const GENRE_MAPPING = {
        fantasy: {
            russian: ['Фэнтези'],
            display: 'Фэнтези',
            searchTerms: ['фэнтези', 'fantasy']
        },
        classic: {
            russian: ['Классика'],
            display: 'Классическая литература',
            searchTerms: ['классика', 'классическая', 'classic']
        },
        detective: {
            russian: ['Детектив', 'Триллер'],
            display: 'Детективы и триллеры',
            searchTerms: ['детектив', 'триллер', 'криминал', 'detective', 'thriller', 'crime']
        },
        children: {
            russian: ['Сказка'],
            display: 'Детская литература',
            searchTerms: ['сказка', 'детская', 'детский', 'children', 'kids', 'child']
        }
    };

    // Функция для поиска жанра по поисковому запросу
    const findGenreBySearchTerm = (query) => {
        const normalizedQuery = query.toLowerCase().trim();
        
        for (const [genreKey, genreData] of Object.entries(GENRE_MAPPING)) {
            if (genreData.searchTerms.some(term => normalizedQuery.includes(term))) {
                return genreKey;
            }
        }
        return null;
    };

    const getPageFromUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
        return Math.max(1, pageFromUrl);
    };

    const [page, setPage] = useState(getPageFromUrl());
   
    // Обновляем страницу при изменении URL
    useEffect(() => {
        setPage(getPageFromUrl());
    }, [location.search]);
 
    // Обработка URL
    useEffect(() => {
        const parts = location.pathname.split('/');
        const genreFromUrl = parts[2];
        
        if (GENRE_MAPPING[genreFromUrl]) {
            dispatch(setGenre(genreFromUrl));
        } else {
            dispatch(clearFilters());
        }
    }, [location.pathname, dispatch]);

    const handleClearFilter = () => {
        dispatch(clearFilters());
        navigate('/catalog');
        setPage(1);
        updateUrlParams(1);
    };

    const getGenreDisplayName = (genreKey) => 
        GENRE_MAPPING[genreKey]?.display || genreKey;

    // ОБНОВЛЕННАЯ ФИЛЬТРАЦИЯ И СОРТИРОВКА
    const filteredBooks = useMemo(() => {
        let result = [...books];
        
        // Определяем, есть ли в поисковом запросе указание на жанр
        const genreFromSearch = searchQuery ? findGenreBySearchTerm(searchQuery) : null;
        const effectiveGenre = currentGenre || genreFromSearch;

        // Фильтрация по поисковому запросу (если есть)
      if (searchQuery) {
  const query = searchQuery.toLowerCase().trim(); // Добавил trim() для удаления лишних пробелов
  result = result.filter(book => {
    // Проверяем, что книга существует
    if (!book) return false;

    // Стандартный поиск по названию и автору
    const inTitle = (book.title || '').toLowerCase().includes(query);
    const inAuthor = (book.author || '').toLowerCase().includes(query);
    
    // Поиск по жанру теперь должен быть "умным"
    let inGenre = false;
    const bookGenre = (book.genre || '').toLowerCase();
    
    // Проходим по всем жанрам в GENRE_MAPPING
    for (const genreKey in GENRE_MAPPING) {
      const genre = GENRE_MAPPING[genreKey];
      // Если жанр книги совпадает с русским названием из mapping...
      if (genre.russian.map(g => g.toLowerCase()).includes(bookGenre)) {
        // ...то проверяем, есть ли поисковый запрос в searchTerms этого жанра
        if (genre.searchTerms.some(term => term.toLowerCase().includes(query))) {
          inGenre = true;
          break; 
        }
      }
    }

    // Возвращаем результат, если запрос найден в любом из полей
    return inTitle || inAuthor || inGenre;
  });
}
        
        // Фильтрация по жанру (если есть явный жанр или найден в поиске)
        if (effectiveGenre) {
            const russianGenres = GENRE_MAPPING[effectiveGenre]?.russian;
            if (russianGenres) {
                result = result.filter(book => russianGenres.includes(book.genre));
            }
        }
        
        return result;
    }, [books, searchQuery, currentGenre, sortBy, sortOrder]);

    const updateUrlParams = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        
        if (newPage > 1) {
            searchParams.set('page', newPage);
        } else {
            searchParams.delete('page');
        }
        
        const newSearch = searchParams.toString();
        navigate(`${location.pathname}${newSearch ? '?' + newSearch : ''}`, { replace: true });
    };
    
    const displayBooks = useMemo(() => {
        if (!hasActiveFilter && !searchQuery) {
            return books;
        }
        
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        return filteredBooks.slice(startIndex, endIndex);
    }, [books, filteredBooks, hasActiveFilter, searchQuery, page, booksPerPage]);

    // Общее количество страниц
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const handlePageChange = (value) => {
        setPage(value);
        updateUrlParams(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Валидация страницы
    useEffect(() => {
        if (!booksLoading && page > totalPages && totalPages > 0) {
            const validPage = Math.max(1, totalPages);
            setPage(validPage);
            updateUrlParams(validPage);
        }
    }, [booksLoading, page, totalPages]);

    if (booksLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (booksError) {
        return <div>Ошибка загрузки товаров: {booksError}</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
           
            {(currentGenre || searchQuery) && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">
                        Активные фильтры:
                    </Typography>
                    {currentGenre && (
                        <Typography variant="body1">
                            • Жанр: {getGenreDisplayName(currentGenre)}
                        </Typography>
                    )}
                    {searchQuery && (
                        <Typography variant="body1">
                            • Поиск: "{searchQuery}"
                        </Typography>
                    )}
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                        Найдено книг: {filteredBooks.length}
                        {(currentGenre || searchQuery) && ` (Страница ${page} из ${totalPages})`}
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClearFilter} 
                        sx={{ mt: 1 }}
                    >
                        Сбросить все фильтры
                    </Button>
                </Box>
            )}

            <BooksContainer
                books={displayBooks}
                onBookClick={handleBookClick}
                onAddToCart={handleAddToCart}
            />

            {(currentGenre || searchQuery) && filteredBooks.length > booksPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="secondary"
                        size="large"
                    />
                </Box>
            )}

            {filteredBooks.length === 0 && books.length > 0 && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6">
                        {searchQuery 
                            ? `Книги по запросу "${searchQuery}" не найдены`
                            : `Книги в выбранном жанре не найдены`
                        }
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Catalog;*/





/*import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Pagination,
    CircularProgress
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setGenre } from '../../store/slices/filterSlice';
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';
import { useBookFilters, GENRE_MAPPING } from '../../hooks/useBookFilters'; // Импортируем наш хук

const Catalog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { books, booksLoading, booksError, handleBookClick, handleAddToCart } = useBooksLogicLoad();
    
    const booksPerPage = 10;
    
    // Получаем все параметры фильтрации
    const filters = useSelector(state => state.filter);
    const { searchQuery, genre: currentGenre } = filters;
    const hasActiveFilter = Boolean(currentGenre); 

    // Используем наш хук для фильтрации
    const filteredBooks = useBookFilters(books, filters);

    const getPageFromUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
        return Math.max(1, pageFromUrl);
    };

    const [page, setPage] = useState(getPageFromUrl());
   
    // Обновляем страницу при изменении URL
        useEffect(() => {
        const currentPage = getPageFromUrl();
        if (currentPage !== page) {
            setPage(currentPage);
        }
    }, [location.search]); 
 
    // Обработка URL
    useEffect(() => {
        const parts = location.pathname.split('/');
        const genreFromUrl = parts[2];
        
        if (GENRE_MAPPING[genreFromUrl]) {
            dispatch(setGenre(genreFromUrl));
        } else {
            dispatch(clearFilters());
        }
    }, [location.pathname, dispatch]);

    const handleClearFilter = () => {
        dispatch(clearFilters());
        navigate('/catalog');
        //setPage(1);
        //updateUrlParams(1);
    };

    const getGenreDisplayName = (genreKey) => 
        GENRE_MAPPING[genreKey]?.display || genreKey;

    const updateUrlParams = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        
        if (newPage > 1) {
            searchParams.set('page', newPage);
        } else {
            searchParams.delete('page');
        }
        
        const newSearch = searchParams.toString();
        navigate(`${location.pathname}${newSearch ? '?' + newSearch : ''}`, );
    };

    const displayBooks = useMemo(() => {
        if (!hasActiveFilter && !searchQuery) {
            return books;
        }
        
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        return filteredBooks.slice(startIndex, endIndex);
    }, [books, filteredBooks, hasActiveFilter, searchQuery, page, booksPerPage]);

    // Общее количество страниц
    /*const totalPages = Math.ceil(filteredBooks.length / booksPerPage);*/
    /*const totalPages = hasActiveFilter 
        ? Math.ceil(filteredBooks.length / booksPerPage)
        : 1;

  

   const handlePageChange = (event, value) => {
    //setPage(value);
    updateUrlParams(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

    // Валидация страницы
 /*  useEffect(() => {
        if (!booksLoading && page > totalPages && totalPages > 0) {
            const validPage = Math.max(1, totalPages);
            //setPage(validPage);
            updateUrlParams(validPage);
        }
    }, [booksLoading, page, totalPages]);*/

    /*useEffect(() => {
        if (!booksLoading && totalPages > 0) {
            const currentPageFromUrl = getPageFromUrl();
            const validPage = Math.min(Math.max(1, currentPageFromUrl), totalPages);
            
            if (validPage !== currentPageFromUrl) {
                updateUrlParams(validPage);
            } else if (validPage !== page) {
                setPage(validPage);
            }
        }
    }, [booksLoading, totalPages, location.search]); 

    /*useEffect(() => {
        if (!booksLoading && hasActiveFilter && page > totalPages && totalPages > 0) {
            const validPage = Math.max(1, totalPages);
            setPage(validPage);
            updateUrlParams(validPage);
        }
    }, [booksLoading, hasActiveFilter, page, totalPages]); */

    // Остальной код компонента без изменений...
   /* if (booksLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (booksError) {
        return <div>Ошибка загрузки товаров: {booksError}</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
   
            {(currentGenre || searchQuery) && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">
                        Активные фильтры:
                    </Typography>
                    {currentGenre && (
                        <Typography variant="body1">
                            • Жанр: {getGenreDisplayName(currentGenre)}
                        </Typography>
                    )}
                    {searchQuery && (
                        <Typography variant="body1">
                            • Поиск: "{searchQuery}"
                        </Typography>
                    )}
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                        Найдено книг: {filteredBooks.length}
                        {(currentGenre || searchQuery) && ` (Страница ${page} из ${totalPages})`}
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClearFilter} 
                        sx={{ mt: 1 }}
                    >
                        Сбросить все фильтры
                    </Button>
                </Box>
            )}

            <BooksContainer
                books={displayBooks}
                onBookClick={handleBookClick}
                onAddToCart={handleAddToCart}
            />

            {(currentGenre || searchQuery) && filteredBooks.length > booksPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="secondary"
                        size="large"
                    />
                </Box>
            )}

            {filteredBooks.length === 0 && books.length > 0 && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6">
                        {searchQuery 
                            ? `Книги по запросу "${searchQuery}" не найдены`
                            : `Книги в выбранном жанре не найдены`
                        }
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Catalog;*/


/*работающая пагинация но не поиск

import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Pagination,
    CircularProgress
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setGenre } from '../../store/slices/filterSlice';
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';
import { useBookFilters, GENRE_MAPPING } from '../../hooks/useBookFilters';

const Catalog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { books, booksLoading, booksError, handleBookClick, handleAddToCart } = useBooksLogicLoad();
    
    const booksPerPage = 10;
    
    const filters = useSelector(state => state.filter);
    const { searchQuery, genre: currentGenre } = filters;
    const hasActiveFilter = Boolean(currentGenre); 

    const filteredBooks = useBookFilters(books, filters);

    const getPageFromUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
        return Math.max(1, pageFromUrl);
    };

    const [page, setPage] = useState(getPageFromUrl());
   
    // Синхронизация страницы с URL
    useEffect(() => {
        const currentPage = getPageFromUrl();
        if (currentPage !== page) {
            setPage(currentPage);
        }
    }, [location.search]); 
 
    // Обработка жанра из URL
    useEffect(() => {
        const parts = location.pathname.split('/');
        const genreFromUrl = parts[2];
        
        if (GENRE_MAPPING[genreFromUrl]) {
            dispatch(setGenre(genreFromUrl));
        } else {
            dispatch(clearFilters());
        }
    }, [location.pathname, dispatch]);

    const handleClearFilter = () => {
        dispatch(clearFilters());
        navigate('/catalog');
    };

    const getGenreDisplayName = (genreKey) => 
        GENRE_MAPPING[genreKey]?.display || genreKey;

    const updateUrlParams = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        
        if (newPage > 1) {
            searchParams.set('page', newPage);
        } else {
            searchParams.delete('page');
        }
        
        const newSearch = searchParams.toString();
        navigate(`${location.pathname}${newSearch ? '?' + newSearch : ''}`);
    };

    const displayBooks = useMemo(() => {
        if (!hasActiveFilter && !searchQuery) {
            return books;
        }
        
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        return filteredBooks.slice(startIndex, endIndex);
    }, [books, filteredBooks, hasActiveFilter, searchQuery, page, booksPerPage]);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const handlePageChange = (event, value) => {
        updateUrlParams(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // КОРРЕКТНАЯ валидация страницы при загрузке/изменении фильтров
    useEffect(() => {
        if (!booksLoading && totalPages > 0) {
            const currentPageFromUrl = getPageFromUrl();
            const validPage = Math.min(Math.max(1, currentPageFromUrl), totalPages);
            
            if (validPage !== currentPageFromUrl) {
                updateUrlParams(validPage);
            } else if (validPage !== page) {
                setPage(validPage);
            }
        }
    }, [booksLoading, totalPages, location.search]);

    if (booksLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (booksError) {
        return <div>Ошибка загрузки товаров: {booksError}</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            {(currentGenre || searchQuery) && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">
                        Активные фильтры:
                    </Typography>
                    {currentGenre && (
                        <Typography variant="body1">
                            • Жанр: {getGenreDisplayName(currentGenre)}
                        </Typography>
                    )}
                    {searchQuery && (
                        <Typography variant="body1">
                            • Поиск: "{searchQuery}"
                        </Typography>
                    )}
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                        Найдено книг: {filteredBooks.length}
                        {(currentGenre || searchQuery) && ` (Страница ${page} из ${totalPages})`}
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClearFilter} 
                        sx={{ mt: 1 }}
                    >
                        Сбросить все фильтры
                    </Button>
                </Box>
            )}

            <BooksContainer
                books={displayBooks}
                onBookClick={handleBookClick}
                onAddToCart={handleAddToCart}
            />

            {(currentGenre || searchQuery) && filteredBooks.length > booksPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="secondary"
                        size="large"
                    />
                </Box>
            )}

            {filteredBooks.length === 0 && books.length > 0 && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6">
                        {searchQuery 
                            ? `Книги по запросу "${searchQuery}" не найдены`
                            : `Книги в выбранном жанре не найдены`
                        }
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Catalog;*/

/*РАБОЧИЙ ВАРИАНТ
import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Pagination,
    CircularProgress,
    Button
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setGenre, setSearchQuery } from '../../store/slices/filterSlice';
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';
import { useBookFilters, GENRE_MAPPING } from '../../hooks/useBookFilters';

const Catalog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { books, booksLoading, booksError, handleBookClick, handleAddToCart } = useBooksLogicLoad();
    
    const booksPerPage = 10;
    
    const filters = useSelector(state => state.filter);
    const { searchQuery, genre: currentGenre } = filters;
    const hasActiveFilter = Boolean(currentGenre || searchQuery);

    const filteredBooks = useBookFilters(books, filters);

    const getPageFromUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
        return Math.max(1, pageFromUrl);
    };

    const [page, setPage] = useState(getPageFromUrl());
   
    // Обработка параметров из URL при загрузке и изменении URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        
        // Поисковый запрос из URL
        const searchQueryFromUrl = searchParams.get('search') || '';
        if (searchQueryFromUrl !== searchQuery) {
            dispatch(setSearchQuery(searchQueryFromUrl));
        }
        
        // Страница из URL
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
        if (pageFromUrl !== page) {
            setPage(pageFromUrl);
        }
        
        // Жанр из пути URL
        const parts = location.pathname.split('/');
        const genreFromUrl = parts[2];
        
        if (GENRE_MAPPING[genreFromUrl]) {
            dispatch(setGenre(genreFromUrl));
        } else if (!searchQueryFromUrl && genreFromUrl !== 'catalog') {
            dispatch(clearFilters());
        }
    }, [location.pathname, location.search, dispatch]);

    const handleClearFilter = () => {
        dispatch(clearFilters());
        navigate('/catalog');
    };

    const getGenreDisplayName = (genreKey) => 
        GENRE_MAPPING[genreKey]?.display || genreKey;

    const updateUrlParams = (newPage, newSearchQuery = null) => {
        const searchParams = new URLSearchParams(location.search);
        
        if (newSearchQuery !== null) {
            if (newSearchQuery) {
                searchParams.set('search', newSearchQuery);
            } else {
                searchParams.delete('search');
            }
        }
        
        if (newPage > 1) {
            searchParams.set('page', newPage);
        } else {
            searchParams.delete('page');
        }
        
        const newSearch = searchParams.toString();
        navigate(`${location.pathname}${newSearch ? '?' + newSearch : ''}`);
    };

    const displayBooks = useMemo(() => {
        if (!hasActiveFilter) {
            return books;
        }
        
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        return filteredBooks.slice(startIndex, endIndex);
    }, [books, filteredBooks, hasActiveFilter, page, booksPerPage]);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const handlePageChange = (event, value) => {
        updateUrlParams(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Валидация страницы
    useEffect(() => {
        if (!booksLoading && totalPages > 0) {
            const currentPageFromUrl = getPageFromUrl();
            const validPage = Math.min(Math.max(1, currentPageFromUrl), totalPages);
            
            if (validPage !== currentPageFromUrl) {
                updateUrlParams(validPage);
            } else if (validPage !== page) {
                setPage(validPage);
            }
        }
    }, [booksLoading, totalPages, location.search]);

    if (booksLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (booksError) {
        return <div>Ошибка загрузки товаров: {booksError}</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          
            {(currentGenre || searchQuery) && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">
                        Активные фильтры:
                    </Typography>
                    {currentGenre && (
                        <Typography variant="body1">
                            • Жанр: {getGenreDisplayName(currentGenre)}
                        </Typography>
                    )}
                    {searchQuery && (
                        <Typography variant="body1">
                            • Поиск: "{searchQuery}"
                        </Typography>
                    )}
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                        Найдено книг: {filteredBooks.length}
                        {(currentGenre || searchQuery) && ` (Страница ${page} из ${totalPages})`}
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClearFilter} 
                        sx={{ mt: 1 }}
                    >
                        Сбросить все фильтры
                    </Button>
                </Box>
            )}

            <BooksContainer
                books={displayBooks}
                onBookClick={handleBookClick}
                onAddToCart={handleAddToCart}
            />

            {hasActiveFilter && filteredBooks.length > booksPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="secondary"
                        size="large"
                    />
                </Box>
            )}

            {filteredBooks.length === 0 && books.length > 0 && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6">
                        {searchQuery 
                            ? `Книги по запросу "${searchQuery}" не найдены`
                            : `Книги в выбранном жанре не найдены`
                        }
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Catalog; КОНЕЦ РАБОЧЕГО ВАРИАНТА*/



/*САМЫЙ РАБОЧИЙ

import React, { useEffect, useState, useMemo } from 'react';
import {
    Container,
    Typography,
    Box,
    Pagination,
    CircularProgress,
    Button
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setGenre, setSearchQuery } from '../../store/slices/filterSlice';
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';
import { useBookFilters, GENRE_MAPPING } from '../../hooks/useBookFilters';

const Catalog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { books, booksLoading, booksError, handleBookClick, handleAddToCart } = useBooksLogicLoad();
    
    const booksPerPage = 10;
    
    const filters = useSelector(state => state.filter);
    const { searchQuery, genre: currentGenre } = filters;
    const hasActiveFilter = Boolean(currentGenre || searchQuery);

    const filteredBooks = useBookFilters(books, filters);

    const getPageFromUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
        return Math.max(1, pageFromUrl);
    };

    const [page, setPage] = useState(getPageFromUrl());
   
    // 🔄 ОДИН эффект для синхронизации URL → State
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        
        // Поисковый запрос из URL
        const searchQueryFromUrl = searchParams.get('search') || '';
        if (searchQueryFromUrl !== searchQuery) {
            dispatch(setSearchQuery(searchQueryFromUrl));
        }
        
        // Страница из URL
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
        if (pageFromUrl !== page) {
            setPage(pageFromUrl);
        }
        
        // Жанр из пути URL
        const parts = location.pathname.split('/');
        const genreFromUrl = parts[2];
        
        if (GENRE_MAPPING[genreFromUrl]) {
            if (genreFromUrl !== currentGenre) {
                dispatch(setGenre(genreFromUrl));
            }
        } else if (parts[1] === 'catalog' && !searchQueryFromUrl && genreFromUrl !== 'catalog') {
            // Если путь /catalog без жанра и без поиска - сбрасываем фильтры
            dispatch(clearFilters());
        }
    }, [location.pathname, location.search, dispatch]);

    const handleClearFilter = () => {
        dispatch(clearFilters());
        navigate('/catalog');
    };

    const getGenreDisplayName = (genreKey) => 
        GENRE_MAPPING[genreKey]?.display || genreKey;

    const updateUrlParams = (newPage, newSearchQuery = null) => {
        const searchParams = new URLSearchParams();
        
        // Поиск (из параметра или текущего состояния)
        const searchToUse = newSearchQuery !== null ? newSearchQuery : searchQuery;
        if (searchToUse) {
            searchParams.set('search', searchToUse);
        }
        
        // Страница
        if (newPage > 1) {
            searchParams.set('page', newPage);
        }
        
        // Путь (жанр)
        const genrePath = currentGenre ? `/catalog/${currentGenre}` : '/catalog';
        const newSearch = searchParams.toString();
        navigate(`${genrePath}${newSearch ? '?' + newSearch : ''}`);
    };

    const displayBooks = useMemo(() => {
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        return filteredBooks.slice(startIndex, endIndex);
    }, [filteredBooks, page, booksPerPage]);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
        updateUrlParams(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 🔄 Валидация страницы (исправленная версия)
    useEffect(() => {
        if (!booksLoading && totalPages > 0) {
            const currentPageFromUrl = getPageFromUrl();
            const validPage = Math.min(Math.max(1, currentPageFromUrl), totalPages);
            
            if (validPage !== page) {
                setPage(validPage);
                // Обновляем URL только если страница изменилась
                if (validPage !== currentPageFromUrl) {
                    updateUrlParams(validPage);
                }
            }
        }
    }, [booksLoading, totalPages, location.search]); // Убрал page из зависимостей

    if (booksLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (booksError) {
        return <div>Ошибка загрузки товаров: {booksError}</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            {(currentGenre || searchQuery) && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">Активные фильтры:</Typography>
                    {currentGenre && (
                        <Typography variant="body1">
                            • Жанр: {getGenreDisplayName(currentGenre)}
                        </Typography>
                    )}
                    {searchQuery && (
                        <Typography variant="body1">• Поиск: "{searchQuery}"</Typography>
                    )}
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                        Найдено книг: {filteredBooks.length}
                        {(currentGenre || searchQuery) && ` (Страница ${page} из ${totalPages})`}
                    </Typography>
                    <Button variant="outlined" size="small" onClick={handleClearFilter} sx={{ mt: 1 }}>
                        Сбросить все фильтры
                    </Button>
                </Box>
            )}

            <BooksContainer
                books={displayBooks}
                onBookClick={handleBookClick}
                onAddToCart={handleAddToCart}
            />

            {hasActiveFilter && filteredBooks.length > booksPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="secondary"
                        size="large"
                    />
                </Box>
            )}

            {filteredBooks.length === 0 && books.length > 0 && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6">
                        {searchQuery 
                            ? `Книги по запросу "${searchQuery}" не найдены`
                            : `Книги в выбранном жанре не найдены`
                        }
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Catalog; КОНЕЦ*/

/*import React, { useMemo, memo } from 'react';
import { Container, Typography, Box, Pagination, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearFilters, setPage } from '../../store/slices/filterSlice';
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';
import { useBookFilters, GENRE_MAPPING } from '../../hooks/useBookFilters';
import { useFilterSync } from '../../hooks/useFilterSync';
import { useNavigate } from 'react-router-dom';

const Catalog = memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { filters, updateURL } = useFilterSync();
    const { books, handleBookClick, handleAddToCart,  booksLoading } = useBooksLogicLoad();

    const booksPerPage = 10;
    const filteredBooks = useBookFilters(books, filters);
    
    // Проверяем, есть ли активные фильтры
    const hasActiveFilters = filters.genre || filters.searchQuery;
    
    // Пагинация только при активных фильтрах
    const currentPage = hasActiveFilters ? (filters.page || 1) : 1;
    const totalPages = hasActiveFilters ? Math.ceil(filteredBooks.length / booksPerPage) : 1;
    
    const displayBooks = useMemo(() => {
        if (!hasActiveFilters) {
            // Без фильтров - показываем все книги
            return filteredBooks;
        } else {
            // С фильтрами - применяем пагинацию
            const startIndex = (currentPage - 1) * booksPerPage;
            return filteredBooks.slice(startIndex, startIndex + booksPerPage);
        }
    }, [filteredBooks, currentPage, booksPerPage, hasActiveFilters]);

    const handlePageChange = (event, newPage) => {
        if (hasActiveFilters) {
            dispatch(setPage(newPage));
            updateURL({ ...filters, page: newPage });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleClearFilter = () => {
        dispatch(clearFilters());
        navigate('/catalog');
    };

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          
            {hasActiveFilters && (
                <Box sx={{ mb: 3 }}>
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
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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

export default Catalog; было это*/

/*import React, { useMemo, memo } from 'react';
import { Container, Typography, Box, Pagination, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearFilters, setPage } from '../../store/slices/filterSlice';
import BooksContainer from './BooksContainer';
import { useBooksLogicLoad } from '../../hooks/useBooksLogicLoad';
import { useBookFilters, GENRE_MAPPING } from '../../hooks/useBookFilters';
import { useFilterSync } from '../../hooks/useFilterSync';
import { useNavigate } from 'react-router-dom';

const Catalog = memo(() => {
const dispatch = useDispatch();
const navigate = useNavigate();
const { filters, updateURL } = useFilterSync();
const { books, handleBookClick, handleAddToCart, booksLoading } = useBooksLogicLoad();

const booksPerPage = 10;
const filteredBooks = useBookFilters(books, filters);

// Проверяем, есть ли активные фильтры
const hasActiveFilters = filters.genre || filters.searchQuery;

// Пагинация только при активных фильтрах
const currentPage = hasActiveFilters ? (filters.page || 1) : 1;
const totalPages = hasActiveFilters ? Math.ceil(filteredBooks.length / booksPerPage) : 1;

const displayBooks = useMemo(() => {
    if (!hasActiveFilters) {
        // Без фильтров - показываем все книги
        return filteredBooks;
    } else {
        // С фильтрами - применяем пагинацию
        const startIndex = (currentPage - 1) * booksPerPage;
        return filteredBooks.slice(startIndex, startIndex + booksPerPage);
    }
}, [filteredBooks, currentPage, booksPerPage, hasActiveFilters]);

const handlePageChange = (event, newPage) => {
    if (hasActiveFilters) {
        dispatch(setPage(newPage));
        updateURL({ ...filters, page: newPage });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const handleClearFilter = () => {
    dispatch(clearFilters());
    navigate('/catalog');
};

return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      
        {hasActiveFilters && (
            <Box sx={{ mb: 3 }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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

export default Catalog;*/
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

    // Проверяем, есть ли активные фильтры
    const hasActiveFilters = filters.genre || filters.searchQuery;

    // Пагинация только при активных фильтрах
    const currentPage = hasActiveFilters ? (filters.page || 1) : 1;
    const totalPages = hasActiveFilters ? Math.ceil(filteredBooks.length / booksPerPage) : 1;

    const displayBooks = useMemo(() => {
        if (!hasActiveFilters) {
            // Без фильтров - показываем все книги
            return filteredBooks;
        } else {
            // С фильтрами - применяем пагинацию
            const startIndex = (currentPage - 1) * booksPerPage;
            return filteredBooks.slice(startIndex, startIndex + booksPerPage);
        }
    }, [filteredBooks, currentPage, booksPerPage, hasActiveFilters]);

    const handlePageChange = (event, newPage) => {
        if (hasActiveFilters) {
            dispatch(setPage(newPage));
            updateURL({ ...filters, page: newPage });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleClearFilter = () => {
        dispatch(clearFilters());
        navigate('/catalog');
    };

    return (
        <Container maxWidth="lg" sx={CatalogStyles.container}>
            {/* Фильтры и пагинация */}
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

            {/* Пагинация показывается только при активных фильтрах и более чем 1 странице */}
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





