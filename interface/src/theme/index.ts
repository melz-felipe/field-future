import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans,sans-serif",
    h1: {
      fontFamily: "Open Sans,sans-serif",
      color: "#ffffff",
    },
    h2: {
      fontFamily: "Open Sans,sans-seriff",
      color: "#ffffff",
    },
    h3: {
      fontFamily: "Open Sans,sans-serif",
      color: "#ffffff",
    },
    h4: {
      fontFamily: "Open Sans,sans-serif",
      color: "#ffffff",
    },
    h5: {
      fontFamily: "Open Sans,sans-serif",
      color: "#ffffff",
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #d61efd",
          borderRadius: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#fff !important",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#fff !important",
        },
      },
    },
  },
});

export default theme;
