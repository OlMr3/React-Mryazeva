import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIsInitialized } from './store/slices/authSlice';
import Header from './components/header_footer/Header';
import HomePage from './components/pages/HomePage';
import BookPage from './components/pages/BookPage';
import Catalog from './components/pages/Catalog';
import NavigationMenu from './components/pages/NavigationMenu';
import ProfilePage from './components/pages/profile/ProfilePage';
import LoginPage from './components/pages/profile/LoginPage';
import RegisterPage from './components/pages/profile/RegisterPage';
import CartPage from './components/pages/CartPage';

const App = () => {
  const isInitialized = useSelector(selectIsInitialized);
  if (!isInitialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Загрузка...
      </div>
    ); 
  }

  return (
    <Container>
      <Header />
      <NavigationMenu/>
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
