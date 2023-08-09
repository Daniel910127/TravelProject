import { Box } from "@mui/material";
import React from "react";
import CustomMuiTextField from "../../CustomMuiTextField";
import { useUser } from "../../../contexts/UserContext";

export default function ProfileEditDialogForm(props) {

  const {userinfo} = useUser()


  return (
    <Box>
      <CustomMuiTextField label="使用者名稱" defaultValue={userinfo.username} />
      <CustomMuiTextField label="信箱" defaultValue={userinfo.email} />
      <CustomMuiTextField
        label="密碼"
        type="password"
        defaultValue=""
      />
    </Box>
  );
}
