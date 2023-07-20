import { Box } from "@mui/material";
import React from "react";
import CustomMuiTextField from "../../CustomMuiTextField";

export default function ProfileEditDialogForm(props) {

  console.log(props)

  return (
    <Box>
      <CustomMuiTextField label="使用者名稱" defaultValue="楊凱浩" />
      <CustomMuiTextField label="信箱" defaultValue="123@gmail.com" />
      <CustomMuiTextField
        label="密碼"
        type="password"
        defaultValue="11111111"
      />
    </Box>
  );
}
