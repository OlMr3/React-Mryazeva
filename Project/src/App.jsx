/*import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/header_footer/Header';
const theme = createTheme();

const App = () => (
     <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
);

export default App;

import React from 'react';
import Header from './components/header_footer/Header';

const App = () => (
  <>
    <Header />
  </>
);

export default App;*/

// App.js
/*import React from 'react';
import { ThemeProvider } from '@mui/material/styles'; // 1. Импортируйте провайдер
import { Container } from '@mui/material'; // 2. Импортируйте стандартный Container
import theme from './themes/theme'; // 3. Импортируйте вашу тему
import Header from './components/header_footer/Header';
import HomePage from './components/pages/HomePage';

const App = () => (
  // 4. Оберните всё приложение в ThemeProvider и передайте ему тему
  <ThemeProvider theme={theme}>
   
    <Container> 
      <Header />
      <HomePage/>
    </Container>
  </ThemeProvider>
);

export default App;*/

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
  // Используем селектор для доступа к флагу инициализации
  const isInitialized = useSelector(selectIsInitialized);

  // Если приложение еще не инициализировалось, показываем заглушку
  if (!isInitialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Загрузка...
      </div>
    ); // Можно заменить на крутой MUI-лоадер (<CircularProgress />)
  }

  // Как только инициализация завершена, рендерим приложение
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

/*const App = () => (
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
    </Routes>
  </Container>
);*/