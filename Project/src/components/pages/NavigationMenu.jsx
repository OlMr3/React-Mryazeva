import React, { memo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
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

const NavigationMenu = memo(function NavigationMenu() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [fictionAnchor, setFictionAnchor] = useState(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

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
                >
                  Классическая литература
                </MegaMenuTitle>
              </MegaMenuColumn>
              <MegaMenuColumn>
                <MegaMenuTitle
                  to="/catalog/fantasy"
                >
                  Фэнтези
                </MegaMenuTitle>
              </MegaMenuColumn>
              <MegaMenuColumn>
                <MegaMenuTitle
                  to="/catalog/detective"
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


