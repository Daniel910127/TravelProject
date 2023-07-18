import React, { Children } from "react";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
});

export default function CustomMuiTypography({ children, ...props }) {
  return (
    <ThemeProvider theme={theme}>
      <Typography {...props}>{children}</Typography>
    </ThemeProvider>
  );
}
