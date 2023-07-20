import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
const MyButton = React.forwardRef((props, ref) => (
  <Button {...props} ref={ref} sx={{ color: "red" }} />
));

export default MyButton;
