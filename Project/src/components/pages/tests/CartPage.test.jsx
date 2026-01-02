import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CartPage from '../CartPage';
import cartReducer from '../../../store/slices/cartSlice';
import authReducer from '../../../store/slices/authSlice';

// Мокаем thunks перед импортом CartPage
vi.mock('../../../store/slices/cartThunks', () => ({
  saveCartToFirestore: vi.fn(() => ({ type: 'MOCK_SAVE_CART' })),
  updateItemQuantityWithSave: vi.fn((userId, id, quantity) => ({ 
    type: 'MOCK_UPDATE_QUANTITY', 
    payload: { userId, id, quantity } 
  }))
}));

// Теперь импортируем мокированные функции
const { saveCartToFirestore, updateItemQuantityWithSave } = await import('../../../store/slices/cartThunks');

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
    },
    preloadedState: initialState,
  });
};

const mockCartItems = [
  {
    id: '1',
    name: 'Test Product 1',
    price: 100,
    quantity: 2,
    image: 'test1.jpg',
  },
  {
    id: '2',
    name: 'Test Product 2',
    price: 200,
    quantity: 1,
    image: 'test2.jpg',
  },
];

describe('CartPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Отображение корзины', () => {
    it('показывает сообщение о пустой корзине когда нет товаров', () => {
      const store = createMockStore({
        cart: { items: [], total: 0 },
        auth: { userData: null, isAuth: false },
      });

      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );

      expect(screen.getByText('Корзина')).toBeInTheDocument();
      expect(screen.getByText('Ваша корзина пуста')).toBeInTheDocument();
    });

    it('отображает товары когда корзина не пуста', () => {
      const store = createMockStore({
        cart: {
          items: mockCartItems,
          total: 400,
        },
        auth: { userData: null, isAuth: false },
      });

      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );

      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
      expect(screen.getByText('100 BYN. × 2')).toBeInTheDocument();
      expect(screen.getByText('200 BYN. × 1')).toBeInTheDocument();
      expect(screen.getByText('Всего: 400 BYN.')).toBeInTheDocument();
    });

    it('правильно рассчитывает итоговую сумму для каждого товара', () => {
      const store = createMockStore({
        cart: {
          items: mockCartItems,
          total: 400,
        },
        auth: { userData: null, isAuth: false },
      });

      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );

      const itemTotals = screen.getAllByText(/Итого:/);
      expect(itemTotals).toHaveLength(2);
      expect(itemTotals[0]).toHaveTextContent('200 BYN.');
      expect(itemTotals[1]).toHaveTextContent('200 BYN.');
    });
  });

  describe('Функциональность корзины', () => {
    it('вызывает removeItem при удалении товара', async () => {
      const store = createMockStore({
        cart: {
          items: [mockCartItems[0]],
          total: 200,
        },
        auth: { userData: { uid: 'test-user' }, isAuth: true },
      });

      const mockDispatch = vi.fn();
      store.dispatch = mockDispatch;

      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );

      const deleteButtons = screen.getAllByTestId('DeleteIcon');
      fireEvent.click(deleteButtons[0].closest('button'));

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
          type: 'cart/removeItem'
        }));
      });
    });

    it('вызывает updateItemQuantityWithSave при изменении количества', async () => {
      const store = createMockStore({
        cart: {
          items: [mockCartItems[0]],
          total: 200,
        },
        auth: { userData: { uid: 'test-user' }, isAuth: true },
      });

      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );

      const addButtons = screen.getAllByTestId('AddIcon');
      fireEvent.click(addButtons[0].closest('button'));

      await waitFor(() => {
        expect(updateItemQuantityWithSave).toHaveBeenCalledWith('test-user', '1', 3);
      });
    });

    it('не позволяет уменьшить количество ниже 1', async () => {
      const store = createMockStore({
        cart: {
          items: [{ ...mockCartItems[0], quantity: 1 }],
          total: 100,
        },
        auth: { userData: { uid: 'test-user' }, isAuth: true },
      });

      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );

      const removeIcons = screen.getAllByTestId('RemoveIcon');
      const removeButton = removeIcons[0].closest('button');
      
      expect(removeButton).toBeDisabled();
      
      fireEvent.click(removeButton);
      
      expect(updateItemQuantityWithSave).not.toHaveBeenCalled();
    });
  });

  describe('Оформление заказа', () => {
    it('показывает alert при клике на "Оформить заказ"', () => {
      window.alert = vi.fn();
      
      const store = createMockStore({
        cart: {
          items: [mockCartItems[0]],
          total: 200,
        },
        auth: { userData: null, isAuth: false },
      });

      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );

      const checkoutButton = screen.getByText('Оформить заказ');
      fireEvent.click(checkoutButton);

      expect(window.alert).toHaveBeenCalledWith('Функция оформления заказа в разработке');
    });
  });

  describe('Очистка корзины', () => {
    it('вызывает clearCart при клике на "Очистить корзину"', async () => {
      const store = createMockStore({
        cart: {
          items: mockCartItems,
          total: 400,
        },
        auth: { userData: { uid: 'test-user' }, isAuth: true },
      });

      const mockDispatch = vi.fn();
      store.dispatch = mockDispatch;

      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );

      const clearButton = screen.getByText('Очистить корзину');
      fireEvent.click(clearButton);

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
          type: 'cart/clearCart'
        }));
      });
    });
  });

  describe('Интеграция с Firebase', () => {
    it('вызывает updateItemQuantityWithSave для авторизованного пользователя', async () => {
      const store = createMockStore({
        cart: {
          items: [mockCartItems[0]],
          total: 200,
        },
        auth: {
          userData: { uid: 'test-user-id' },
          isAuth: true,
        },
      });

      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );

      const addIcons = screen.getAllByTestId('AddIcon');
      fireEvent.click(addIcons[0].closest('button'));

      await waitFor(() => {
        expect(updateItemQuantityWithSave).toHaveBeenCalledWith('test-user-id', '1', 3);
      });
    });

    it('вызывает updateItemQuantityWithSave для неавторизованного пользователя', async () => {
      const store = createMockStore({
        cart: {
          items: [mockCartItems[0]],
          total: 200,
        },
        auth: {
          userData: null,
          isAuth: false,
        },
      });

      render(
        <Provider store={store}>
          <CartPage />
        </Provider>
      );

      const addIcons = screen.getAllByTestId('AddIcon');
      fireEvent.click(addIcons[0].closest('button'));

      await waitFor(() => {
        expect(updateItemQuantityWithSave).toHaveBeenCalledWith(undefined, '1', 3);
      });

      expect(saveCartToFirestore).not.toHaveBeenCalled();
    });
  });
});


