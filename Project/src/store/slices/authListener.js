// store/slices/authListener.js
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
// Импортируем нужные действия из слайса
import { setUser, setInitialized, clearUser } from './authSlice';
// Импортируем thunk для загрузки корзины
import { fetchUserCart } from './cartThunks';

export const setupAuthListener = (dispatch) => {
  return onAuthStateChanged(auth, (user) => {
    console.log('Auth State Changed:', user);
    
    if (user) {
      // Пользователь вошел
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        // ... другие данные
      };
      dispatch(setUser(userData)); // Устанавливаем пользователя и isAuth=true
      // Ключевое добавление: загружаем корзину пользователя
      dispatch(fetchUserCart(user.uid));
      
    } else {
      // Пользователь вышел - используем действие clearUser
      dispatch(clearUser()); // Это ОЧЕНЬ важно! Сбросит и userData, и isAuth.
    }
    
    // Устанавливаем флаг инициализации после первого события
    dispatch(setInitialized(true));
  });
};
