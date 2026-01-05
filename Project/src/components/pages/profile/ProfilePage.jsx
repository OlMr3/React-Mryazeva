import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData, selectIsAuth } from '../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  Divider,
  Chip
} from '@mui/material';
import {
  Email as EmailIcon,
  Person as PersonIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';

export default function ProfilePage() {
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectUserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  if (!isAuth) {
    return null;
  }
  if (!userData) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  const { email, firstName, lastName, avatarUrl } = userData;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Профиль пользователя
        </Typography>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
            src={avatarUrl}
            sx={{
              width: 120,
              height: 120,
              fontSize: '3rem'
            }}
          >
            {!avatarUrl && <AccountCircleIcon fontSize="inherit" />}
          </Avatar>
        </Box>
        <Box sx={{ mt: 3 }}>
          {/* Email */}
          <Box display="flex" alignItems="center" mb={2}>
            <EmailIcon color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="body2" color="textSecondary">
                Email
              </Typography>
              <Typography variant="h6">
                {email || 'Не указан'}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center">
              <PersonIcon color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Имя
                </Typography>
                <Typography variant="h6">
                  {firstName || 'Не указано'}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center">
              <PersonIcon color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Фамилия
                </Typography>
                <Typography variant="h6">
                  {lastName || 'Не указана'}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="center">
              <Chip
                label="Активный пользователь"
                color="success"
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
