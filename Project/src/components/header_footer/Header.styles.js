import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, TextField, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  width: '100%',
  zIndex: 999,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.grey[700],
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.grey[300]}`
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
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

export const LogoLink = styled(Link)(({ theme }) => ({
  display: "flex",
  marginRight: "2rem",
  "&:hover": {
    opacity: 0.8
  }
}));

export const SearchTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: "600px",
  margin: "0 2rem",
  [theme.breakpoints.down("md")]: {
    margin: "0 1rem"
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: theme.palette.grey[400]
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: theme.palette.secondary.main
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.secondary.main
  },
  "& .MuiInputBase-input": {
    color: theme.palette.grey[800]
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[500]
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.secondary.main
  }
}));

export const IconsContainer = styled(Box)({
  display: "flex",
  alignItems: "center"
});
export const logoStyle = { height: "50px" };