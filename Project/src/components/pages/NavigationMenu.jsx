import React, { memo, useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuItem,
  useMediaQuery,
  useTheme,
  IconButton,
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
//import { useFilterSync } from '../../hooks/useFilterSync';

const NavigationMenu = memo(function NavigationMenu() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

 // const { filters, updateURL } = useFilterSync();
  //const navigate = useNavigate();

  const [fictionAnchor, setFictionAnchor] = useState(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  /*const handleGenreSelect = useCallback((genre) => {
    const newFilters = {
      ...filters,
      genre: genre,
      page: 1
    };
    console.log('handleGenreSelect вызван');

    dispatch(setGenre(genre));
    dispatch(setPage(1));
    updateURL(newFilters);
   

    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [filters, dispatch, updateURL, isMobile]);*/

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
      console.log('handleFictionClick вызван')
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
          sx={{ position: 'fixed', top: 8, right: 8, zIndex: 1000, }}
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
                 //onChange={() => handleGenreSelect('classic')}
                >
                  Классическая литература
                </MegaMenuTitle>
              </MegaMenuColumn>
              <MegaMenuColumn>
                <MegaMenuTitle
                  to="/catalog/fantasy"
                  //onChange={() => handleGenreSelect('fantasy')}
                >
                  Фэнтези
                </MegaMenuTitle>
              </MegaMenuColumn>
              <MegaMenuColumn>
                <MegaMenuTitle
                  to="/catalog/detective"
                 // onChange={() => handleGenreSelect('detective')}
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
           // onChange={() => handleGenreSelect('children')}
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
              handleMobileMenuClose();
            }}
            component={Link}
            to="/catalog/classic"
          >
            Классическая литература
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMobileMenuClose();
            }}
            component={Link}
            to="/catalog/fantasy"
          >
            Фэнтези
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMobileMenuClose();
            }}
            component={Link}
            to="/catalog/detective"
          >
            Детективы и триллеры
          </MenuItem>
          <MenuItem
            onClick={() => {
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


