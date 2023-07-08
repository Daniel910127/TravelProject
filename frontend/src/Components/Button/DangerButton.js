import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
export default function DangerButton({ variant, children, onClick }) {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[400]),
    backgroundColor: red[400],
    "&:hover": {
      backgroundColor: red[500],
    },
  }));

  return (
    <ColorButton variant={variant} disableElevation onClick={onClick}>
      {children}
    </ColorButton>
  );
}
