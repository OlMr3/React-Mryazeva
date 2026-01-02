import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  CircularProgress
} from '@mui/material';
// Импортируем наш thunk
import { registerUser } from '../../../store/slices/authThunks'; // Убедитесь, что путь правильный!

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Используем правильные селекторы из вашего слайса
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Простая валидация на клиенте
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    // Формируем объект для отправки, соответствующий сигнатуре thunk
    // Ваш thunk ожидает { email, password, displayName }
    const userData = {
      email: formData.email,
      password: formData.password,
      displayName: formData.username // 'username' из формы -> 'displayName' для Firebase
    };

    // Диспатчим thunk и ждем результат
    const resultAction = await dispatch(registerUser(userData));
    
    // Если регистрация успешна (fulfilled)
    if (registerUser.fulfilled.match(resultAction)) {
      // Перенаправляем пользователя, например, на главную страницу
      navigate('/');
    }
    // Если регистрация провалилась (rejected), ошибка автоматически попадет в state.auth.error
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* Отображение ошибки из Redux state */}
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Имя пользователя"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading} // Используем isLoading
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading} // Используем isLoading
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading} // Используем isLoading
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Подтвердите пароль"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading} // Используем isLoading
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading} // Используем isLoading
          >
            {isLoading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
          </Button>
          <Box textAlign="center">
            <Link component={RouterLink} to="/login" variant="body2">
              {"Уже есть аккаунт? Войти"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;

