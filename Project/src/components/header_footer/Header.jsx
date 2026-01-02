/*import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  TextField,
  Badge,
  IconButton,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from "@mui/material/styles";
import Logo from "../../images/Logo.png";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#fdf9f9",
  color: "grey",
  boxShadow: "none",
  borderBottom: "1px solid #e0e0e0"
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: "0.5rem 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.divider}`, 
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "1rem"
  }
}));

const LogoLink = styled(Link)({
  display: "flex",
  marginRight: "2rem",
  "&:hover": {
    opacity: 0.8
  }
});

const SearchTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: "600px",
  margin: "0 2rem",
  [theme.breakpoints.down("md")]: {
    margin: "0 1rem"
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: theme.palette.common.white
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: theme.palette.common.white
  },
  "& .MuiInputBase-input": {
    color: theme.palette.common.white
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[400]
  }
}));

const NavigationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
  marginTop: "1rem",
  width: "100%",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "0.5rem",
    alignItems: "center",
    display: "none"
  }
}));

const NavItem = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "0.5rem 1rem",
  cursor: "pointer"
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[700],
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "1rem",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.secondary.main
  }
}));

const DropdownTrigger = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.grey[700],
  fontWeight: 500,
  fontSize: "1rem",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.secondary.main
  }
}));

const MegaMenu = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  width: "90%",
  maxWidth: "1200px",
  backgroundColor: "#fff",
  border: "1px solid #e0e0e0",
  borderRadius: "0 0 8px 8px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  padding: "2rem",
  zIndex: 1000,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "2rem"
}));

const MegaMenuColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
});

const MegaMenuTitle = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[700],
  fontWeight: 600,
  fontSize: "1.1rem",
  textDecoration: "none",
  marginBottom: "1rem",
  display: "block",
  "&:hover": {
    color: theme.palette.secondary.dark
  }
}));

/*const MegaMenuItem = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[700],
  textDecoration: "none",
  fontSize: "0.95rem",
  padding: "0.25rem 0",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    color: theme.palette.primary.main,
    paddingLeft: "0.5rem"
  }
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
    position: "absolute",
    right: "1rem",
    top: "1rem"
  }
}));*/

/*export default function Header() {
  const totalQuantity = useSelector((state) => state.cart?.totalQuantity ?? 0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [fictionAnchor, setFictionAnchor] = useState(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      const searchTerm = event.target.value;
      console.log("Search for:", searchTerm);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      event.target.value = "";
    }
  };

  const handleFictionHover = (event) => {
    if (!isMobile) {
      setFictionAnchor(event.currentTarget);
      setIsMegaMenuOpen(true);
    }
  };

  const handleFictionLeave = () => {
    if (!isMobile) {
      setIsMegaMenuOpen(false);
      setFictionAnchor(null);
    }
  };

  const handleFictionClick = (event) => {
    if (isMobile) {
      setFictionAnchor(event.currentTarget);
    }
  };

  const handleMobileMenuClose = () => {
    setFictionAnchor(null);
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <LogoLink to="/">
          <img src={Logo} alt="Логотип книжного магазина" style={{ height: "50px" }} />
        </LogoLink>

        <SearchTextField
          label="Введите название книги"
          type="search"
          variant="standard"
          onKeyPress={handleSearchSubmit}
          color="secondary"
        />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="Корзина"
            onClick={() => navigate("/cart")}
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
            onClick={() => navigate("/profile")}
            size="large"
          >
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </StyledToolbar>

      <NavigationContainer>
        <NavItem>
          <NavLink to="/new">Новинки</NavLink>
        </NavItem>

        <NavItem
          onMouseEnter={handleFictionHover}
          onMouseLeave={handleFictionLeave}
          onClick={handleFictionClick}
        >
          <DropdownTrigger>
            Художественная литература
            <KeyboardArrowDownIcon sx={{ fontSize: "1rem", ml: 0.5 }} />
          </DropdownTrigger>

          {isMegaMenuOpen && !isMobile && (
            <MegaMenu
              onMouseEnter={handleFictionHover}
              onMouseLeave={handleFictionLeave}
            >
              <MegaMenuColumn>
                <MegaMenuTitle to="/fiction/classic">Классическая литература</MegaMenuTitle>
              </MegaMenuColumn>
              <MegaMenuColumn>
                <MegaMenuTitle to="/fiction/fantasy">Фэнтези</MegaMenuTitle>
              </MegaMenuColumn>

              <MegaMenuColumn>
                <MegaMenuTitle to="/fiction/detective">Детективы и триллеры</MegaMenuTitle>
              </MegaMenuColumn>
            </MegaMenu>
          )}
        </NavItem>
        <NavItem>
          <NavLink to="/children">Книги для детей</NavLink>
        </NavItem>
      </NavigationContainer>

      
      <Menu
        anchorEl={fictionAnchor}
        open={Boolean(fictionAnchor) && isMobile}
        onClose={handleMobileMenuClose}
        MenuListProps={{
          "aria-labelledby": "mobile-fiction-menu"
        }}
      >
        <MenuItem onClick={handleMobileMenuClose} component={Link} to="/fiction/classic">
          Классическая литература
        </MenuItem>
       
        <MenuItem onClick={handleMobileMenuClose} component={Link} to="/fiction/fantasy">
          Фэнтези
        </MenuItem>
        <MenuItem onClick={handleMobileMenuClose} component={Link} to="/fiction/detective">
          Детективы и триллеры
        </MenuItem>
      </Menu>
    </StyledAppBar>
  );
}
*/
// Header.js
/*import React from "react";
import {Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  TextField,
  Badge,
  IconButton,
  Box
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from "@mui/material/styles";
import Logo from "../../images/Logo.png";


const StyledAppBar = styled(AppBar)({
  backgroundColor: "#fdf9f9",
  color: "grey",
  boxShadow: "none",
  borderBottom: "1px solid #e0e0e0"
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: "0.5rem 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.divider}`, 
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "1rem"
  }
}));

const LogoLink = styled(Link)({
  display: "flex",
  marginRight: "2rem",
  "&:hover": {
    opacity: 0.8
  }
});

const SearchTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: "600px",
  margin: "0 2rem",
  [theme.breakpoints.down("md")]: {
    margin: "0 1rem"
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: theme.palette.common.white
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: theme.palette.common.white
  },
  "& .MuiInputBase-input": {
    color: theme.palette.common.white
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[400]
  }
}));

export default function Header() {
  const totalQuantity = useSelector((state) => state.cart?.totalQuantity ?? 0);
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      const searchTerm = event.target.value;
      console.log("Search for:", searchTerm);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      event.target.value = "";
    }
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <LogoLink to="/">
          <img src={Logo} alt="Логотип книжного магазина" style={{ height: "50px" }} />
        </LogoLink>

        <SearchTextField
          label="Введите название книги"
          type="search"
          variant="standard"
          onKeyPress={handleSearchSubmit}
          color="secondary"
        />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="Корзина"
            onClick={() => navigate("/cart")}
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
            onClick={() => navigate("/profile")}
            size="large"
          >
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
}*/

// Header.js
/*import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth, selectUserData,} from '../../store/slices/authSlice'; // <-- Добавьте это
import {logoutUser} from '../../store/slices/authThunks'
import { selectCartItems } from '../../store/slices/cartSlice'
import { Badge, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from "../../images/Logo.png";
import { setSearchQuery } from '../../store/slices/filterSlice'
import {
  StyledAppBar,
  StyledToolbar,
  LogoLink,
  SearchTextField,
  IconsContainer
} from "./Header.styles";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectUserData);

  console.log('render header');
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      const searchTerm = event.target.value.trim();
      console.log("Search for:", searchTerm);
      
      // Диспатчим поисковый запрос в Redux
      dispatch(setSearchQuery(searchTerm));
      
      // Ключевое изменение: добавляем поисковый параметр в URL
      navigate(`/catalog?search=${encodeURIComponent(searchTerm)}&page=1`);
      event.target.value = "";
    }
  }; 

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <LogoLink to="/">
          <img src={Logo} alt="Логотип книжного магазина" style={{ height: "50px" }} />
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
            onClick={() => navigate("/cart")}
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
            onClick={() => isAuth ? navigate("/profile") : navigate("/login")}
            size="large"
          >
            <AccountCircleIcon />
          </IconButton>

       
          {isAuth && userData?.displayName && (
            <Typography 
              variant="body1" 
              sx={{ 
                marginLeft: '10px',
                color: 'secondary.main' // Используем secondary цвет
              }}
            >
              Привет, {userData.displayName}!
            </Typography>
          )}

        
          {isAuth && (
  <IconButton
    aria-label="Выйти"
    onClick={() => dispatch(logoutUser())}
    size="large"
    color="secondary" // Добавляем secondary цвет
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
}*/


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

// Мемоизированный компонент
const Header = memo(function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   console.log('=== Header rendering ===', Date.now());
  const isAuth = useSelector(selectIsAuth);
    console.log('isAuth:', isAuth, 'reference:', selectIsAuth);
  const userData = useSelector(selectUserData);
   const totalQuantity = useSelector(selectCartQuantity);
    console.log('totalQuantity:', totalQuantity);
  // Мемоизированные обработчики
  const handleSearchSubmit = useCallback((event) => {
    if (event.key === "Enter") {
      const searchTerm = event.target.value.trim();
      console.log("Search for:", searchTerm);
      
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

          {/* Отображаем имя пользователя если он авторизован */}
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

          {/* Кнопка выхода для авторизованных пользователей */}
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
