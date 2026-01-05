import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { loadGuestCart } from './store/slices/guestCartStorage';
import { hydrateGuestCartForInit, loginCartMerge } from './store/slices/cartThunks';
import { selectIsInitialized, selectIsAuth, selectUserData } from './store/slices/authSlice';
import Header from './components/header_footer/Header';
import HomePage from './components/pages/HomePage';
import BookPage from './components/pages/BookPage';
import Catalog from './components/pages/Catalog';
import NavigationMenu from './components/pages/NavigationMenu';
import ProfilePage from './components/pages/profile/ProfilePage';
import LoginPage from './components/pages/profile/LoginPage';
import RegisterPage from './components/pages/profile/RegisterPage';
import CartPage from './components/pages/CartPage';
import { Alert, Button, Box } from '@mui/material';
import { BooksContainerStyles } from './components/pages/styles/BooksContainer.styles';

const App = () => {
  const isInitialized = useSelector(selectIsInitialized);
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const onBeforeUnload = (e) => {
      const cart = loadGuestCart();
      const hasItems = Array.isArray(cart?.items) && cart.items.length > 0;
      if (!isAuth && hasItems) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [isAuth,]);

  useEffect(() => {
    if (!isInitialized) {
      if (isAuth && user?.uid) {
        dispatch(loginCartMerge(user.uid));
      } else {
        dispatch(hydrateGuestCartForInit());
      }
    }
  }, [isInitialized, isAuth, user?.uid, dispatch]);

  const renderGuestBanner = () => {
    const guestCart = loadGuestCart();
    const hasGuestItems = Array.isArray(guestCart?.items) && guestCart.items.length > 0;
    if (!isAuth && hasGuestItems) {
      return (<Alert
        severity="warning"
        sx={{ mt: 2, mb: 2 }}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => navigate('/login')}>
            Войти
          </Button>} >
        У вас есть товары в гостевой корзине. Чтобы сохранить корзину, войдите в аккаунт.
      </Alert>);
    }
    return null;
  };

  if (!isInitialized) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }} >
        <Box
          sx={BooksContainerStyles.container}>
          {[...Array(8)].map((_, index) => (
            <Box key={index}
              sx={BooksContainerStyles.skeleton} />))}
        </Box>
      </Box>
    );
  }

  return (
    <Container>
      <Header />
      <NavigationMenu />
      {renderGuestBanner()}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:bookId" element={<BookPage />} />
        <Route path="/catalog/*" element={<Catalog />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Container>
  );
};

export default App;
