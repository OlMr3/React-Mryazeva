import { configureStore } from '@reduxjs/toolkit';
import collectionsReducer from './slices/firebaseSlice';
import filterReducer from './slices/filterSlice'
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    filter: filterReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});