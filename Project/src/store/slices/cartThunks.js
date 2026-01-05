import { getDoc, setDoc } from 'firebase/firestore';
import {
  setCartLoading,
  setCart,
  setCartError,
  updateItemQuantity,
  addItem,
  clearCart,
  removeItem 
} from '../slices/cartSlice';
import { getUserCartRef } from './cartFirebase';
import { loadGuestCart, saveGuestCart, clearGuestCart } from './guestCartStorage';
import { setInitialized } from './authSlice';

const mergeCartItems = (serverItems, guestItems) => {

  const map = new Map();
  serverItems.forEach((it) => map.set(it.id, { ...it }));
  guestItems.forEach((it) => {
    if (map.has(it.id)) {
      map.get(it.id).quantity = (map.get(it.id).quantity || 0) + (it.quantity || 0);
    } else {

      map.set(it.id, { ...it });
    }
  });
  return Array.from(map.values());
};

export const mergeGuestCartWithServer = (userId) => async (dispatch) => {
  if (!userId) return;
  const guestCart = loadGuestCart();
  const guestItems = guestCart.items || [];
  if (!guestItems.length) return;
  try {
    const cartRef = getUserCartRef(userId);
    const cartSnap = await getDoc(cartRef);
    const serverItems = cartSnap.exists() ? cartSnap.data().items || [] : [];
    const merged = mergeCartItems(serverItems, guestItems);
    await setDoc(cartRef, { items: merged }, { merge: true });
    dispatch(setCart(merged));
    clearGuestCart();
  } catch (error) {
    console.error("Ошибка при слиянии гостевой корзины с серверной:", error);
  }
};

export const loginCartMerge = (userId) => async (dispatch) => {
  try {
    if (!userId)
      return;
    await dispatch(fetchUserCart(userId));
    await dispatch(mergeGuestCartWithServer(userId));
  }
  catch (err) {
    console.error("Ошибка при входе и слиянии корзин:", err);
  }
};

export const hydrateGuestCartForInit = () => (dispatch, getState) => {
  const isAuth = getState().auth?.isAuth;
  if (!isAuth) {
    const guest = loadGuestCart();
    if (guest?.items?.length) {
      dispatch(setCart(guest.items));
    }
  }
  dispatch(setInitialized(true));
};

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

export const updateItemQuantityWithSave = (userId, id, quantity) => async (dispatch, getState) => {
  dispatch(updateItemQuantity({ id, quantity }));
  if (userId) {
    await dispatch(saveCartToFirestore(userId));
  } else {
    const state = getState();
    saveGuestCart(state.cart);
  }

};

export const addItemToCart = (userId, item) => async (dispatch, getState) => {
  dispatch(addItem(item));

  if (userId) {
    await dispatch(saveCartToFirestore(userId));
  } else {
    const state = getState(); saveGuestCart(state.cart);
  }
};

export const clearFirestoreCart = (userId) => async (dispatch) => {
  try {
    if (userId) {
      dispatch(clearCart());
      const cartRef = getUserCartRef(userId);
      await setDoc(cartRef, { items: [] });
    } else {
      clearGuestCart();
      dispatch(setCart([]));
    }
  } catch (error) {
    console.error("Ошибка при очистке корзины:", error);
  }
};

export const removeItemWithSave = (userId, itemId) => async (dispatch, getState) => {
  try {
    dispatch(removeItem(itemId));
    if (userId) {
      await dispatch(saveCartToFirestore(userId));
    } else {
      const state = getState();
      saveGuestCart(state.cart);
    }
  } catch (e) { 
    console.error('Ошибка в removeItemWithSave:', e); 
  }
};