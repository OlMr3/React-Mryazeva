import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { setUser, setInitialized, clearUser } from './authSlice';
import { fetchUserCart, mergeGuestCartWithServer } from './cartThunks';


export const setupAuthListener = (dispatch) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      dispatch(setUser(userData));
      dispatch(fetchUserCart(user.uid));
      dispatch(mergeGuestCartWithServer(user.uid));
    } else {
      dispatch(clearUser());
    }
    dispatch(setInitialized(true));
  });
};
