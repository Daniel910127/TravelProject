import React from "react";
import Switch from "@mui/material/Switch";
export default function CustomSwitch({ value, ...customFieldProps }) {
  // console.log(value, customFieldProps);
  return <Switch checked={value} {...customFieldProps} />;
}
