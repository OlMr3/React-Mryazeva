import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useRef } from 'react';
import { setGenre, setSearchQuery, setPage, } from '../store/slices/filterSlice';

export const useFilterSync = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const filters = useSelector(state => state.filter);
    

    const isInitialLoad = useRef(true);
  
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pathParts = location.pathname.split('/');
        const genreFromUrl = pathParts[2] || '';
        const searchFromUrl = searchParams.get('search') || '';
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
       
        if (genreFromUrl !== filters.genre) {
            dispatch(setGenre(genreFromUrl));
        }
        if (searchFromUrl !== filters.searchQuery) {
            dispatch(setSearchQuery(searchFromUrl));
        }
        if (pageFromUrl !== filters.page) {
            dispatch(setPage(pageFromUrl));
        }

        isInitialLoad.current = false;
    }, [location.pathname, location.search]);

    // Функция обновления URL
    const updateURL = useCallback((newFilters = filters) => {
        const searchParams = new URLSearchParams();
        
        if (newFilters.searchQuery) {
            searchParams.set('search', newFilters.searchQuery);
        }
        if (newFilters.page > 1) {
            searchParams.set('page', newFilters.page);
        }
        
        const queryString = searchParams.toString();
        const genrePath = newFilters.genre ? `/${newFilters.genre}` : '';
        const url = `/catalog${genrePath}${queryString ? `?${queryString}` : ''}`;
        
        navigate(url, { replace: false }); 
    }, [navigate, filters]);

    return { filters, updateURL };
};
