import React from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useUser } from "../../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";
import axios from "axios";
const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useUser();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/account-login/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data:responseData } = response;
      // console.log(responseData);
      if (responseData.status === "201") {
        const { access, refresh, account, username, email } =
          await responseData;
        // localStorage.setItem("jwtToken", access);
        // localStorage.setItem("refreshToken", refresh);
        // localStorage.setItem(
        //   "userinfo",
        //   JSON.stringify({ account, username, email })
        // );
        login({ account, username, email }, access, refresh);
        console.log("登入成功");
        navigate("/");
      } else {
        setErrorMessage(responseData.error);
        console.error("登入失敗");
      }
    } catch (error) {
      console.error("發生錯誤", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            登入
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="account"
            control={control}
            rules={{
              required: "電子郵件為必填欄位",
              // pattern: {
              //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              //   message: '無效的電子郵件地址',
              // },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="帳號"
                fullWidth
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "密碼為必填欄位",
              minLength: {
                value: 3,
                message: "密碼長度不能小於6個字符",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="密碼"
                type="password"
                fullWidth
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
        
          <ErrorMessage textAlign="center">{errorMessage}</ErrorMessage>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            登入
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography textAlign={"center"}>
            沒有帳號？
            <Link to="/register">註冊</Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
