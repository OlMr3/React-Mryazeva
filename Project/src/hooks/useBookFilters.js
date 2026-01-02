/*import { useMemo } from 'react';
export const GENRE_MAPPING = {
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
export const findGenreBySearchTerm = (query) => {
    const normalizedQuery = query.toLowerCase().trim();
    
    for (const [genreKey, genreData] of Object.entries(GENRE_MAPPING)) {
        if (genreData.searchTerms.some(term => normalizedQuery.includes(term))) {
            return genreKey;
        }
    }
    return null;
};

// Вспомогательная функция для проверки совпадения жанра
const isGenreMatch = (bookGenre, query) => {
    const genreLower = bookGenre?.toLowerCase() || '';
    return Object.values(GENRE_MAPPING).some(genreData => 
        genreData.russian.map(g => g.toLowerCase()).includes(genreLower) &&
        genreData.searchTerms.some(term => query.includes(term))
    );
};

// Основной хук для фильтрации книг
export const useBookFilters = (books, filters) => {
    const { searchQuery, genre: currentGenre,} = filters;

    return useMemo(() => {
        // Проверка на валидность books
        if (!books || !Array.isArray(books)) {
            return [];
        }
        
        let result = [...books];
        
        // Определяем, есть ли в поисковом запросе указание на жанр
        const genreFromSearch = searchQuery ? findGenreBySearchTerm(searchQuery) : null;
        const effectiveGenre = currentGenre || genreFromSearch;

        // Фильтрация по поисковому запросу
        if (searchQuery) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(book => {
                if (!book) return false;
                
                return (
                    book.title?.toLowerCase().includes(query) ||
                    book.author?.toLowerCase().includes(query) ||
                    isGenreMatch(book.genre, query)
                );
            });
        }
        
        // Фильтрация по жанру
        if (effectiveGenre) {
            const russianGenres = GENRE_MAPPING[effectiveGenre]?.russian;
            if (russianGenres) {
                result = result.filter(book => russianGenres.includes(book.genre));
            }
        }

      

        return result;
    }, [books, searchQuery, currentGenre,]);
};*/

import { useMemo } from 'react';

export const GENRE_MAPPING = {
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
export const findGenreBySearchTerm = (query) => {
    const normalizedQuery = query.toLowerCase().trim();
    
    for (const [genreKey, genreData] of Object.entries(GENRE_MAPPING)) {
        if (genreData.searchTerms.some(term => normalizedQuery.includes(term))) {
            return genreKey;
        }
    }
    return null;
};
const doesGenreMatchSearch = (bookGenre, query) => {
    const genreLower = bookGenre?.toLowerCase() || '';
    
    // 1. Проверяем точное совпадение (без частичных)
    if (genreLower === query) {
        return true;
    }
    
    // 2. Проверяем поиск по категории
    const bookCategory = Object.keys(GENRE_MAPPING).find(category => 
        GENRE_MAPPING[category].russian.map(g => g.toLowerCase()).includes(genreLower)
    );
    
    if (bookCategory && GENRE_MAPPING[bookCategory].searchTerms.some(term => query.includes(term))) {
        // Но исключаем случаи, когда запрос является точным названием другого жанра
        const isQueryExactGenre = Object.values(GENRE_MAPPING)
            .flatMap(g => g.russian.map(r => r.toLowerCase()))
            .includes(query);
        
        // Если запрос является точным названием жанра, но не совпадает с текущим книжным жанром - не показываем
        if (isQueryExactGenre && genreLower !== query) {
            return false;
        }
        return true;
    }
    
    return false;
};

export const useBookFilters = (books, filters) => {
    const { searchQuery, genre: currentGenre,} = filters;

    return useMemo(() => {
        // Проверка на валидность books
        if (!books || !Array.isArray(books)) {
            return [];
        }
        
        let result = [...books];
        
        // Определяем, есть ли в поисковом запросе указание на жанр
        const genreFromSearch = searchQuery ? findGenreBySearchTerm(searchQuery) : null;
        const effectiveGenre = currentGenre || genreFromSearch;

        // Фильтрация по поисковому запросу
        if (searchQuery) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(book => {
                if (!book) return false;
                
                return (
                    book.title?.toLowerCase().includes(query) ||
                    book.author?.toLowerCase().includes(query) ||
                    doesGenreMatchSearch(book.genre, query)
                );
            });
        }
        
        // Фильтрация по жанру
        if (effectiveGenre) {
            const russianGenres = GENRE_MAPPING[effectiveGenre]?.russian;
            if (russianGenres) {
                result = result.filter(book => russianGenres.includes(book.genre));
            }
        }

        return result;
    }, [books, searchQuery, currentGenre,]);
};


