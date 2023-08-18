import React from "react";
import Typography from "@mui/material/Typography";

export default function ErrorMessage({ children, ...props }) {
    console.log(props)
  return (
    <Typography variant="body2" gutterBottom color="#d32f2f" {...props}>
      {children}
    </Typography>
  );
}
