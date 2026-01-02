import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Alert,
  Link,
  CircularProgress
} from '@mui/material';
import { loginUser } from '../../../store/slices/authThunks'; // Импортируем экшен

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Получаем состояние загрузки и ошибки из хранилища
  const { loading, error } = useSelector((state) => state.auth);

  // Локальное состояние для полей формы
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Диспатчим экшен входа и ждем его завершения
    const resultAction = await dispatch(loginUser(formData));
    // Если экшен выполнился успешно, перенаправляем на главную
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {/* Поле для вывода общей ошибки */}
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleChange}
        disabled={loading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Пароль"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Войти'}
      </Button>
      <Box textAlign="center">
        <Link component={RouterLink} to="/register" variant="body2">
          {"Нет аккаунта? Зарегистрироваться"}
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
