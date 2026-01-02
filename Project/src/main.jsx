/*import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)*/

/*import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Импорты из ваших файлов
import App from './App'
import { store } from './store/store' // или '@/store' если настроен алиас
import  theme  from './themes/theme' // или '@/themes/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css' 

// Импорты из ваших файлов
import App from './App'
import { store } from './store/store' // или '@/store' если настроен алиас
import  theme  from './themes/theme' // или '@/themes/theme'
import { setupAuthListener } from './store/slices/authListener'; // ИМПОРТИРУЕМ ФУНКЦИЮ ЛИСТЕНЕРА

// ВЫЗЫВАЕМ ЛИСТЕНЕР ПРЯМО ЗДЕСЬ, ПЕРЕДАЕМ ЕМУ store.dispatch
// Сохраняем функцию для отписки, если она вдруг понадобится в будущем
const unsubscribeFromAuth = setupAuthListener(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
