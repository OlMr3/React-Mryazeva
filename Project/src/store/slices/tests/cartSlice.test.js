import { describe, it, expect } from 'vitest';
import cartReducer, {
  setCart,
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
  setCartError,
  selectCartItems,
  selectCartTotal,
  selectCartQuantity,
} from '../cartSlice';

describe('cartSlice', () => {
  const initialState = {
    items: [],
    isLoading: false,
    error: null,
  };

  it('должен возвращать правильное начальное состояние', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('setCart устанавливает список товаров', () => {
    const payload = [{ id: 1, price: 10, quantity: 2 }];
    const newState = cartReducer(initialState, setCart(payload));
    expect(newState.items).toEqual(payload);
  });

  it('addItem добавляет новый товар с количеством 1', () => {
    const product = { id: 1, price: 10 };
    const resultState = cartReducer(initialState, addItem(product));
    expect(resultState.items).toEqual([{ ...product, quantity: 1 }]);
  });

  it('addItem увеличивает quantity, если товар уже есть', () => {
    const prevState = {
      ...initialState,
      items: [{ id: 1, price: 10, quantity: 2 }],
    };
    const product = { id: 1, price: 10 };
    const resultState = cartReducer(prevState, addItem(product));
    expect(resultState.items[0].quantity).toBe(3);
  });

  it('removeItem удаляет товар по id', () => {
    const prevState = {
      ...initialState,
      items: [{ id: 1, price: 10, quantity: 2 }],
    };
    const resultState = cartReducer(prevState, removeItem(1));
    expect(resultState.items).toEqual([]);
  });

  it('updateItemQuantity обновляет количество товара', () => {
    const prevState = {
      ...initialState,
      items: [{ id: 1, price: 10, quantity: 2 }],
    };
    const resultState = cartReducer(prevState, updateItemQuantity({ id: 1, quantity: 5 }));
    expect(resultState.items[0].quantity).toBe(5);
  });

  it('clearCart очищает корзину', () => {
    const prevState = {
      ...initialState,
      items: [{ id: 1, price: 10, quantity: 2 }],
    };
    const resultState = cartReducer(prevState, clearCart());
    expect(resultState.items).toEqual([]);
  });

  it('setCartError устанавливает ошибку', () => {
    const errorMsg = 'Error occurred';
    const resultState = cartReducer(initialState, setCartError(errorMsg));
    expect(resultState.error).toBe(errorMsg);
  });

  describe('селекторы', () => {
    const state = {
      cart: {
        items: [
          { id: 1, price: 10, quantity: 2 },
          { id: 2, price: 5.5, quantity: 3 },
        ],
        isLoading: false,
        error: null,
      },
    };

    it('selectCartItems возвращает items', () => {
      expect(selectCartItems(state)).toEqual(state.cart.items);
    });

    it('selectCartTotal вычисляет правильную сумму', () => {
      expect(selectCartTotal(state)).toBe(10 * 2 + 5.5 * 3); 
    });

    it('selectCartQuantity возвращает сумму quantities', () => {
      expect(selectCartQuantity(state)).toBe(2 + 3); 
    });
  });
});