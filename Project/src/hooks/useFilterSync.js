// hooks/useFilterSync.js
/*import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useRef } from 'react';
import { setGenre, setSearchQuery, setPage, } from '../store/slices/filterSlice';

export const useFilterSync = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const filters = useSelector(state => state.filter);
    
    // Используем ref для отслеживания первоначальной загрузки
    const isInitialLoad = useRef(true);
    const isPopState = useRef(false);

    // Обработка изменений URL -> обновление Redux
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        console.log('location.pathname:', location.pathname)
        const pathParts = location.pathname.split('/');
         console.log('pathParts:', pathParts);
        const genreFromUrl = pathParts[2] || '';
        const searchFromUrl = searchParams.get('search') || '';
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
       

        // Обновляем Redux только если значения из URL отличаются от текущих
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
        
        navigate(url, { replace: false }); // Важно: replace: false для сохранения истории
    }, [navigate, filters]);

    return { filters, updateURL };
};*/

// hooks/useFilterSync.js

// hooks/useFilterSync.js


/*import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useRef } from 'react';
import { setGenre, setSearchQuery, setPage, } from '../store/slices/filterSlice';

export const useFilterSync = () => {
const dispatch = useDispatch();
const location = useLocation();
const navigate = useNavigate();
const filters = useSelector(state => state.filter);

// Используем ref для отслеживания первоначальной загрузки
const isInitialLoad = useRef(true);
const isPopState = useRef(false);

// Обработка изменений URL -> обновление Redux
useEffect(() => {
    console.log('location изменился:', location.pathname, location.search);
    const searchParams = new URLSearchParams(location.search);
    const pathParts = location.pathname.split('/');
    
    const genreFromUrl = pathParts[2] || '';
    const searchFromUrl = searchParams.get('search') || '';
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
   

    // Обновляем Redux только если значения из URL отличаются от текущих
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
    console.log('Навигация к:', url, 'replace: false');
    navigate(url, { replace: false }); // Важно: replace: false для сохранения истории
}, [navigate, filters]);

return { filters, updateURL };
};*/

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useRef } from 'react';
import { setGenre, setSearchQuery, setPage } from '../store/slices/filterSlice';

export const useFilterSync = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const filters = useSelector(state => state.filter);

  // Используем ref для отслеживания первоначальной загрузки
  const isInitialLoad = useRef(true);
  const isPopState = useRef(false);

  useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const pathParts = location.pathname.split('/');
  const genreFromUrl = pathParts[2] || '';
  const searchFromUrl = searchParams.get('search') || '';
  const pageFromUrl = parseInt(searchParams.get('page')) || 1;

  // Обновляем фильтры, если отличаются
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
  // В этом варианте не сбрасываем фильтры, даже если URL пустой
  // Если нужно сбрасывать при полном отсутствии URL, можно добавить логику ниже
}, [location.pathname, location.s]);

  // Функция обновления URL
  const updateURL = useCallback((newFilters = filters) => {
    console.log('--- updateURL вызван ---');
    console.log('Текущие фильтры:', newFilters);
    const searchParams = new URLSearchParams();

    if (newFilters.searchQuery) {
      console.log(`Добавляем search: ${newFilters.searchQuery}`);
      searchParams.set('search', newFilters.searchQuery);
    }
    if (newFilters.page > 1) {
      console.log(`Добавляем page: ${newFilters.page}`);
      searchParams.set('page', newFilters.page);
    }

    const queryString = searchParams.toString();
    const genrePath = newFilters.genre ? `/${newFilters.genre}` : '';
    const url = `/catalog${genrePath}${queryString ? `?${queryString}` : ''}`;
    console.log('Навигация к:', url, 'replace: false');

    navigate(url, { replace: false }); // Важно: replace: false для сохранения истории
  }, [navigate, filters]);

  return { filters, updateURL };
};