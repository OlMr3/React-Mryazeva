import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth, selectUserData } from '../../store/slices/authSlice';
import { logoutUser } from '../../store/slices/authThunks';
import { selectCartQuantity } from '../../store/slices/cartSlice';
import { Badge, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from "../../images/Logo.png";
import { setSearchQuery } from '../../store/slices/filterSlice';
import {
  StyledAppBar,
  StyledToolbar,
  LogoLink,
  SearchTextField,
  IconsContainer,
  logoStyle,
} from "./Header.styles";

const Header = memo(function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectUserData);
  const totalQuantity = useSelector(selectCartQuantity);
  const handleSearchSubmit = useCallback((event) => {
    if (event.key === "Enter") {
      const searchTerm = event.target.value.trim();

      dispatch(setSearchQuery(searchTerm));
      navigate(`/catalog?search=${encodeURIComponent(searchTerm)}&page=1`);
      event.target.value = "";
    }
  }, [dispatch, navigate]);

  const handleCartClick = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  const handleProfileClick = useCallback(() => {
    navigate(isAuth ? "/profile" : "/login");
  }, [navigate, isAuth]);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <LogoLink to="/">
          <img src={Logo} alt="Логотип книжного магазина" style={logoStyle} />
        </LogoLink>

        <SearchTextField
          label="Введите название книги"
          type="search"
          variant="standard"
          onKeyPress={handleSearchSubmit}
          color="secondary"
        />

        <IconsContainer>
          <IconButton
            aria-label="Корзина"
            onClick={handleCartClick}
            size="large"
          >
            <Badge
              badgeContent={totalQuantity}
              color="secondary"
              overlap="circular"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton
            aria-label="Профиль пользователя"
            onClick={handleProfileClick}
            size="large"
          >
            <AccountCircleIcon />
          </IconButton>

          {isAuth && userData?.displayName && (
            <Typography
              variant="body1"
              sx={{
                marginLeft: '10px',
                color: 'secondary.main'
              }}
            >
              Привет, {userData.displayName}!
            </Typography>
          )}

          {isAuth && (
            <IconButton
              aria-label="Выйти"
              onClick={handleLogout}
              size="large"
              color="secondary"
              sx={{ marginLeft: '10px' }}
            >
              <LogoutIcon />
              <Typography variant="body2" sx={{ marginLeft: '5px' }}>
                Выйти
              </Typography>
            </IconButton>
          )}
        </IconsContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
});

export default Header;
