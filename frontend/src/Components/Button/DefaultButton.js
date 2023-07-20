import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";


export default function DefaultButton({ variant, children, onClick }) {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[600]),
    backgroundColor: purple[600],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));
  // console.log(onclick);

  return (
    <ColorButton variant={variant} disableElevation onClick={onClick}>
      {children}
    </ColorButton>
  );
}
