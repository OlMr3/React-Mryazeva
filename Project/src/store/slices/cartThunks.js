// store/thunks/cartThunks.js
/*import { getDoc, setDoc, } from 'firebase/firestore';
import { 
  setCartLoading, 
  setCart, 
  setCartError 
} from '../slices/cartSlice';
import { getUserCartRef } from '../slices/cartFirebase'

// Thunk для загрузки корзины пользователя
export const fetchUserCart = (userId) => async (dispatch) => {
  if (!userId) return;

  dispatch(setCartLoading(true));
  dispatch(setCartError(null));

  try {
    const cartRef = getUserCartRef(userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      dispatch(setCart(cartSnap.data().items || []));
    } else {
      dispatch(setCart([]));
    }
  } catch (error) {
    dispatch(setCartError(error.message));
    console.error("Ошибка при загрузке корзины:", error);
  } finally {
    dispatch(setCartLoading(false));
  }
};

// Улучшенный thunk для сохранения корзины
export const saveCartToFirestore = (userId) => async (_, getState) => {
  if (!userId) return;

  try {
    const state = getState();
    const currentCartItems = state.cart.items;
    
    const cartRef = getUserCartRef(userId);
    await setDoc(cartRef, { items: currentCartItems }, { merge: true });
  } catch (error) {
    console.error("Ошибка при сохранении корзины:", error);
  }
};

// Thunk для добавления товара с автоматическим сохранением
export const addItemToCart = (userId, item) => async (dispatch, getState) => {
  // Используем существующий reducer из slice
  const { addItem } = await import('../slices/cartSlice');
  dispatch(addItem(item));
  
  if (userId) {
    const state = getState();
    dispatch(saveCartToFirestore(userId));
  }
};

// Thunk для очистки корзины
export const clearFirestoreCart = (userId) => async (dispatch) => {
  if (!userId) return;

  try {
    const { clearCart } = await import('../slices/cartSlice');
    dispatch(clearCart());
    
    const cartRef = getUserCartRef(userId);
    await setDoc(cartRef, { items: [] });
  } catch (error) {
    console.error("Ошибка при очистке корзины:", error);
  }
};*/
// store/thunks/cartThunks.js
import { getDoc, setDoc } from 'firebase/firestore';
import { 
  setCartLoading, 
  setCart, 
  setCartError 
} from '../slices/cartSlice';
import { getUserCartRef } from './cartFirebase'; // Теперь из отдельного файла

// Thunk для загрузки корзины пользователя
export const fetchUserCart = (userId) => async (dispatch) => {
  if (!userId) return;

  dispatch(setCartLoading(true));
  dispatch(setCartError(null));

  try {
    const cartRef = getUserCartRef(userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      dispatch(setCart(cartSnap.data().items || []));
    } else {
      dispatch(setCart([]));
    }
  } catch (error) {
    dispatch(setCartError(error.message));
    console.error("Ошибка при загрузке корзины:", error);
  } finally {
    dispatch(setCartLoading(false));
  }
};

// Thunk для сохранения корзины
export const saveCartToFirestore = (userId) => async (_, getState) => {
  if (!userId) return;

  try {
    const state = getState();
    const currentCartItems = state.cart.items;
    
    const cartRef = getUserCartRef(userId);
    await setDoc(cartRef, { items: currentCartItems }, { merge: true });
  } catch (error) {
    console.error("Ошибка при сохранении корзины:", error);
  }
};

// Thunk для обновления количества с сохранением
export const updateItemQuantityWithSave = (userId, id, quantity) => async (dispatch, getState) => {
  const { updateItemQuantity } = await import('../slices/cartSlice');
  dispatch(updateItemQuantity({ id, quantity }));
  
  if (userId) {
    await dispatch(saveCartToFirestore(userId));
  }
};

// Thunk для добавления товара с автоматическим сохранением
export const addItemToCart = (userId, item) => async (dispatch, getState) => {
  const { addItem } = await import('../slices/cartSlice');
  dispatch(addItem(item));
  
  if (userId) {
    await dispatch(saveCartToFirestore(userId));
  }
};

// Thunk для очистки корзины
export const clearFirestoreCart = (userId) => async (dispatch) => {
  if (!userId) return;

  try {
    const { clearCart } = await import('../slices/cartSlice');
    dispatch(clearCart());
    
    const cartRef = getUserCartRef(userId);
    await setDoc(cartRef, { items: [] });
  } catch (error) {
    console.error("Ошибка при очистке корзины:", error);
  }
};


