import React, { useState } from "react";
import { Button } from "@mui/material";
export default function MyButton(props) {
  const { title, isChecked } = props;
  //const [isHover, setIsHover] = useState(false);
  return (
    <Button

      variant={isChecked ? "contained" : "outlined" }
      // sx={{
        
        
      //   border: isChecked ? "1px solid #1976d2" : "1px solid #bbb",
      //   backgroundColor: isChecked ? "#1976d2" : "white",
      //   color: isChecked ? "white" : "black",
      //   transition: ".2s ease-in-out",
      //   cursor: "pointer" 
      // }}
      onClick={(e) => {
        e.preventDefault();
      }}
      // onMouseEnter={() => {
      //   setIsHover(true);
      // }}
      // onMouseLeave={() => {
      //   setIsHover(false);
      // }}
    >
      {title}
    </Button>
  );
}
