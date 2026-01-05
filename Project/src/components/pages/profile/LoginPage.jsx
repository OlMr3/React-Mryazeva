import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import LoginForm from './LoginForm';

const LoginPage = () => {
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
          Вход в аккаунт
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginPage;
