import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useRef } from 'react';
import { setGenre, setSearchQuery, setPage } from '../store/slices/filterSlice';

export const useFilterSync = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const filters = useSelector(state => state.filter);
    const isSyncingFromURL = useRef(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pathParts = location.pathname.split('/');
        const genreFromUrl = pathParts[2] || '';
        const searchFromUrl = searchParams.get('search') || '';
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;

        isSyncingFromURL.current = true;
        dispatch(setGenre(genreFromUrl));
        dispatch(setSearchQuery(searchFromUrl));
        dispatch(setPage(pageFromUrl));
    }, [location.pathname, location.search, location.key, dispatch]);
    useEffect(() => {
        if (isSyncingFromURL.current) {
            isSyncingFromURL.current = false;
        }
    });

    const updateURL = useCallback((newFilters = filters) => {
        if (isSyncingFromURL.current) {
            return;
        }

        const searchParams = new URLSearchParams();

        if (newFilters.searchQuery) {
            searchParams.set('search', newFilters.searchQuery);
        }
        if (newFilters.page && newFilters.page > 1) {
            searchParams.set('page', newFilters.page);
        }

        const queryString = searchParams.toString();
        const genrePath = newFilters.genre ? `/${newFilters.genre}` : '';
        const url = `/catalog${genrePath}${queryString ? `?${queryString}` : ''}`;

        navigate(url, { replace: false });
    }, [navigate, filters]);

    return { filters, updateURL };
}; 