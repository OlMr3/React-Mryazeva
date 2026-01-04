import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, test, expect, vi, beforeEach } from 'vitest';

const mockUpdateURL = vi.fn()
vi.mock('../../../hooks/useFilterSync', () => ({
  useFilterSync: () => ({
    updateURL: mockUpdateURL,
  }),
}));

const mockUseMediaQuery = vi.fn();
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: () => mockUseMediaQuery()
  };
});

import NavigationMenu from '../NavigationMenu';
import filterReducer from '../../../store/slices/filterSlice';
import { setGenre } from '../../../store/slices/filterSlice';

const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch
  };
});

const mockStore = configureStore({
  reducer: {
    filter: filterReducer
  }
});

const renderWithProviders = (isMobile = false) => {
  mockUseMediaQuery.mockReturnValue(isMobile);

  return render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <NavigationMenu />
      </BrowserRouter>
    </Provider>
  );
};

describe('NavigationMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch.mockClear();
  });

  test('рендерит все основные ссылки', () => {
    renderWithProviders();

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Художественная литература')).toBeInTheDocument();
    expect(screen.getByText('Книги для детей')).toBeInTheDocument();
  });

  describe('Десктопное поведение', () => {
    test('открывает мега-меню при ховере', () => {
      renderWithProviders(false);

      const fictionItem = screen.getByText('Художественная литература');
      fireEvent.mouseEnter(fictionItem);

      expect(screen.getByText('Классическая литература')).toBeInTheDocument();
      expect(screen.getByText('Фэнтези')).toBeInTheDocument();
      expect(screen.getByText('Детективы и триллеры')).toBeInTheDocument();
    });

    test('закрывает мега-меню при уходе мыши', () => {
      renderWithProviders(false);

      const fictionItem = screen.getByText('Художественная литература');
      fireEvent.mouseEnter(fictionItem);
      fireEvent.mouseLeave(fictionItem);

      expect(screen.queryByText('Классическая литература')).not.toBeInTheDocument();
    });
  });

  describe('Мобильное поведение', () => {
    test('открывает выпадающее меню при клике', () => {
      renderWithProviders(true);
      const menuButton = screen.getByLabelText('открыть меню');
      fireEvent.click(menuButton);
      const fictionItem = screen.getByText('Художественная литература');
      fireEvent.click(fictionItem);
      expect(screen.getAllByRole('menuitem')).toHaveLength(5);
    });

    test('закрывает меню при выборе пункта', () => {
      renderWithProviders(true);
      const menuButton = screen.getByLabelText('открыть меню');
      fireEvent.click(menuButton);
      const menuItem = screen.getByText('Классическая литература');
      fireEvent.click(menuItem);
      expect(screen.queryByText('Классическая литература')).not.toBeInTheDocument();
    });
  });

 /* describe('Redux взаимодействие', () => {
    test('диспатчит setGenre при выборе жанра', () => {
      renderWithProviders(false);
      const fictionItem = screen.getByText('Художественная литература');
      fireEvent.mouseEnter(fictionItem);
      const fantasyLink = screen.getByText('Фэнтези');
      fireEvent.change(fantasyLink);
      expect(mockDispatch).toHaveBeenCalledWith(setGenre('fantasy'));
    });
    test('При выборе жанра вызывается updateURL с новыми фильтрами', async () => {
      renderWithProviders(false);

      const fictionItem = screen.getByText('Художественная литература');
      fireEvent.mouseEnter(fictionItem);

      expect(screen.getByText('Классическая литература')).toBeInTheDocument();

      const classicGenreLink = screen.getByText('Классическая литература');
      fireEvent.click(classicGenreLink);
      expect(mockUpdateURL).toHaveBeenCalledWith({
        genre: 'classic',
        page: 1,
      });
    });
  });*/
});
