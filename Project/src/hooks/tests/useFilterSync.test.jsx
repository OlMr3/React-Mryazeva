import { describe, test, vi, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store'; 
import { useFilterSync } from '../useFilterSync';

import { useLocation, useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
     useLocation: vi.fn(),
  };
});

describe('useFilterSync with Vitest', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useLocation.mockReturnValue({
      pathname: '/catalog/fiction',
      search: '?search=crime&page=2',
    });
    useNavigate.mockReturnValue(mockNavigate);
  });

  function wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  test('синхронизирует URL с redux при первоначальной загрузке', () => {
    const { result } = renderHook(() => useFilterSync(), { wrapper });
    const state = store.getState().filter;
    expect(state.genre).toBe('fiction');
    expect(state.searchQuery).toBe('crime');
    expect(state.page).toBe(2);
  });

  test('обновляет URL при изменении фильтров', () => {
    const { result } = renderHook(() => useFilterSync(), { wrapper });
    const newFilters = {
      genre: 'fantasy',
      searchQuery: 'magic',
      page: 3,
    };

    act(() => {
      result.current.updateURL(newFilters);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/catalog/fantasy?search=magic&page=3', { replace: false });
  });
  test('обновляет Redux при смене URL после первоначальной загрузки', () => {
  const { rerender } = renderHook(() => useFilterSync(), { wrapper });

  useLocation.mockReturnValue({
    pathname: '/catalog/fiction',
    search: '?search=drama&page=4',
  });
  
  rerender();

  const state = store.getState().filter;
  expect(state.searchQuery).toBe('drama');
  expect(state.page).toBe(4);
  expect(state.genre).toBe('fiction');
});
test('не обновляет Redux, если параметры в URL отсутствуют', () => {
  useLocation.mockReturnValue({
    pathname: '/catalog/fiction',
    search: '',
  });
  const { result } = renderHook(() => useFilterSync(), { wrapper });
  const state = store.getState().filter;
  expect(state.searchQuery).toBe('');
  expect(state.page).toBe(1);
});
test('не вызывает navigate, если фильтры не меняются', () => {
  const { result } = renderHook(() => useFilterSync(), { wrapper });
  act(() => {
    result.current.updateURL();  
  });
  expect(mockNavigate).not.toHaveBeenCalled();
});
});