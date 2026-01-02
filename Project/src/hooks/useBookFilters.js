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
    if (genreLower === query) {
        return true;
    }
    const bookCategory = Object.keys(GENRE_MAPPING).find(category => 
        GENRE_MAPPING[category].russian.map(g => g.toLowerCase()).includes(genreLower)
    );
    
    if (bookCategory && GENRE_MAPPING[bookCategory].searchTerms.some(term => query.includes(term))) {
        const isQueryExactGenre = Object.values(GENRE_MAPPING)
            .flatMap(g => g.russian.map(r => r.toLowerCase()))
            .includes(query);
        
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
        if (!books || !Array.isArray(books)) {
            return [];
        }
        
        let result = [...books];
        const genreFromSearch = searchQuery ? findGenreBySearchTerm(searchQuery) : null;
        const effectiveGenre = currentGenre || genreFromSearch;
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
        
        if (effectiveGenre) {
            const russianGenres = GENRE_MAPPING[effectiveGenre]?.russian;
            if (russianGenres) {
                result = result.filter(book => russianGenres.includes(book.genre));
            }
        }

        return result;
    }, [books, searchQuery, currentGenre,]);
};


