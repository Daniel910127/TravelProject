import React from "react";
import Typography from "@mui/material/Typography";

export default function ErrorMessage({ children }) {
  return (
    <Typography variant="caption" display="block" gutterBottom color="#d32f2f">
      {children}
    </Typography>
  );
}
