import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Массив товаров { id, name, price, quantity, image, ... }
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCart: (state, action) => {
      state.items = action.payload || [];
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCartError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Экспортируем экшены для использования в компонентах
export const { 
  setCartLoading, 
  setCart, 
  addItem, 
  removeItem, 
  updateItemQuantity, 
  clearCart, 
  setCartError 
} = cartSlice.actions;

// Селекторы
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = createSelector(
  [selectCartItems],
  items => {
    const total = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    return Number(total.toFixed(2)); // Округляем здесь
  }
);
export const selectCartQuantity = createSelector(
  [selectCartItems],
  items => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartIsLoading = (state) => state.cart.isLoading;
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer;
