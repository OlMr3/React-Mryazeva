import React, { memo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
Menu,
MenuItem,
useMediaQuery,
useTheme,
IconButton,
Box,
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import {
NavigationContainer,
NavItem,
NavLink,
DropdownTrigger,
MegaMenu,
MegaMenuColumn,
MegaMenuTitle,
BoxMobile,
} from "./styles/NavigationMenu.styles";
import { useDispatch } from 'react-redux';
import { setGenre, setPage } from '../../store/slices/filterSlice';
import { useFilterSync } from '../../hooks/useFilterSync';

// Мемоизированный компонент
const NavigationMenu = memo(function NavigationMenu() {
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("md"));
const dispatch = useDispatch();

const { filters, updateURL } = useFilterSync();

const [fictionAnchor, setFictionAnchor] = useState(null);
const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

const handleGenreSelect = useCallback((genre) => {
const newFilters = {
...filters,
genre: genre,
page: 1
};

dispatch(setGenre(genre));
dispatch(setPage(1));
updateURL(newFilters);

if (isMobile) {
  setMobileMenuOpen(false);
}
}, [filters, dispatch, updateURL, isMobile]);

const handleFictionHover = useCallback((event) => {
if (!isMobile) {
setFictionAnchor(event.currentTarget);
setIsMegaMenuOpen(true);
}
}, [isMobile]);

const handleFictionLeave = useCallback(() => {
if (!isMobile) {
setIsMegaMenuOpen(false);
setFictionAnchor(null);
}
}, [isMobile]);

const handleFictionClick = useCallback((event) => {
if (isMobile) {
setFictionAnchor(event.currentTarget);
}
}, [isMobile]);

const handleMobileMenuClose = useCallback(() => {
setFictionAnchor(null);
 setMobileMenuOpen(false);
}, []);

return (
<>
      {isMobile && (
        <IconButton
          aria-label="открыть меню"
          onClick={handleMobileMenuToggle}
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1000,  }}
        >
          <MenuIcon />
        </IconButton>
      )}
<NavigationContainer>
<NavItem>
<NavLink to="/catalog/">Каталог</NavLink>
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
            <MegaMenuTitle 
              to="/catalog/classic" 
              onClick={() => handleGenreSelect('classic')}
            > 
              Классическая литература
            </MegaMenuTitle>
          </MegaMenuColumn>
          <MegaMenuColumn>
            <MegaMenuTitle 
              to="/catalog/fantasy"
              onClick={() => handleGenreSelect('fantasy')}
            >
              Фэнтези
            </MegaMenuTitle>
          </MegaMenuColumn>
          <MegaMenuColumn>
            <MegaMenuTitle 
              to="/catalog/detective"
              onClick={() => handleGenreSelect('detective')}
            >
              Детективы и триллеры
            </MegaMenuTitle>
          </MegaMenuColumn>
        </MegaMenu>
      )}
    </NavItem>
    <NavItem>
      <NavLink 
        to="/catalog/children"
        onClick={() => handleGenreSelect('children')}
      >
        Книги для детей
      </NavLink>
    </NavItem>
  </NavigationContainer>
      {isMobile && mobileMenuOpen && (
        <BoxMobile>
         <MenuItem
            onClick={() => {
              handleMobileMenuClose();
            }}
            component={Link}
            to="/catalog/"
          >
            Каталог
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleGenreSelect('classic');
              handleMobileMenuClose();
            }}
            component={Link}
            to="/catalog/classic"
          >
            Классическая литература
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleGenreSelect('fantasy');
              handleMobileMenuClose();
            }}
            component={Link}
            to="/catalog/fantasy"
          >
            Фэнтези
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleGenreSelect('detective');
              handleMobileMenuClose();
            }}
            component={Link}
            to="/catalog/detective"
          >
            Детективы и триллеры
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleGenreSelect('children');
              handleMobileMenuClose();
            }}
            component={Link}
            to="/catalog/children"
          >
            Книги для детей
          </MenuItem>
        </BoxMobile>
      )}

</>
);
});

export default NavigationMenu;


