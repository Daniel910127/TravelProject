import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CustomMuiTypography from "../../CustomMuiTypography";
import DefaultButton from "../../Button/DefaultButton";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import ProfileEditDialogForm from "../ProfileEditDialogForm";
import { useForm } from "react-hook-form";
import CancelButton from "../../Button/CancelButton";
import useFormController from "../../../hooks/useFormController";

const HeaderWrapper = styled(Paper)((props) => {
  // console.log(props);
  return {
    marginBottom: "1.25rem",
  };
});

const HeaderContainer = styled(Card)({
  display: "flex",
  flexDirection: "column",
});

const Avatar = styled("img")({
  width: "120px",
  height: "120px",
  border: "5px solid white",
  borderRadius: "4px",
});

const UserInfoContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  marginTop: "-20px",
  padding: "0 1.25rem",
  "&:last-child": {
    paddingBottom: "1.25rem",
  },
  [theme.breakpoints.up("xs")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "end",
  },
}));

export default function ProFileHeader() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      accountField: "",
      passwordField: "",
      usernameField: "",
      emailField: "",
    },
  });

  const [open, setOpen] = useState(false);

  // const [userInfo, setUserInfo] = useState({
  //   account: "11",
  //   email: "",
  //   username: "",
  //   password: "",
  // });

  useEffect(() => {
    // setUserInfo({
    //   account: "account",
    //   email: "123@gmail.com",
    //   username: "楊凱浩",
    //   password: "1111111",
    // });

    reset({
      accountField: "account",
      passwordField: "123@gmail.com",
      usernameField: "楊凱浩",
      emailField: "1111111",
    });
  }, [reset]);

  const onSubmit = (data) => {
    // console.log("ajax PUT data");
    // setInterestData({ data: data.customInterestField });
    console.log(data);
  };

  const accountFieldProps = useFormController(control, "accountField");
  const passwordFieldProps = useFormController(control, "passwordField");
  const usernameFieldProps = useFormController(control, "usernameField");
  const emailFieldProps = useFormController(control, "emailField");

  // console.log(customInterestFieldProps);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HeaderWrapper elevation={4}>
        <HeaderContainer>
          <CardMedia
            sx={{ height: { xs: 150, sm: 250 } }}
            image="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-3/images/pages/profile-banner.png"
            title="profile banner"
          />
          <UserInfoContent>
            <Avatar src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-3/images/avatars/1.png" />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            >
              <CustomMuiTypography
                variant="h4"
                sx={{ marginBottom: { xs: ".2rem", sm: "0" } }}
              >
                username
              </CustomMuiTypography>
              <DefaultButton onClick={handleClickOpen}>
                編輯使用者
              </DefaultButton>
            </Box>
          </UserInfoContent>
        </HeaderContainer>
      </HeaderWrapper>

      <Dialog
        open={open}
        onClose={handleClose}
        // scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          sx: { maxWidth: "600px", width: "calc(100% - 64px)" },
        }}
      >
        <DialogTitle id="scroll-dialog-title">資料修改</DialogTitle>

        <DialogContent>
          <ProfileEditDialogForm
            usernameFieldProps={usernameFieldProps}
            accountFieldProps={accountFieldProps}
            passwordFieldProps={passwordFieldProps}
            emailFieldProps={emailFieldProps}
          />
          {/* <InterestForm2 customInterestFieldProps={customInterestFieldProps} /> */}
        </DialogContent>
        <DialogActions
          sx={{
            paddingLeft: "3.75rem",
            paddingRight: "3.75rem",
            paddingBottom: "1.125rem",
            justifyContent: "center",
          }}
        >
          <CancelButton onClick={handleClose}>取消</CancelButton>
          <DefaultButton
            onClick={() => {
              handleClose();
              handleSubmit(onSubmit)();
            }}
          >
            修改
          </DefaultButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
