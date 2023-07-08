import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
export default function CancelButton({ variant, children, onClick }) {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[600]),
    backgroundColor: grey[600],
    "&:hover": {
      backgroundColor: grey[700],
    },
  }));
  // console.log(onclick);

  return (
    <ColorButton variant={variant} disableElevation onClick={onClick}>
      {children}
    </ColorButton>
  );
}
