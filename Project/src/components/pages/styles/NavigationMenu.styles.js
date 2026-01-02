import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const NavigationContainer = styled(Box)(({ theme }) => ({

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

export const NavItem = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "0.5rem 1rem",
  cursor: "pointer"
}));

export const NavLink = styled(Link)(({ theme }) => ({
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

export const DropdownTrigger = styled(Box)(({ theme }) => ({
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

export const MegaMenu = styled(Box)(({ theme }) => ({
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

export const MegaMenuColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
});

export const MegaMenuTitle = styled(Link)(({ theme }) => ({
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

export const BoxMobile = styled(Box)(({ theme }) =>({
  position: 'absolute',
  top: 48,
  right: 8,
  width: '300px',
  backgroundColor: theme.palette.grey[50],
  color: theme.palette.secondary.main,
  boxShadow: 1,
  border: "1px solid #e0e0e0",
  borderRadius: 2,
  zIndex: 999
}))
