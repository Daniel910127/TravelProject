import {
  IconButton,
  TextField as MuiTextField,
  Button,
  Grid,
  InputAdornment,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

import { Visibility, VisibilityOff, CheckCircle } from "@mui/icons-material";

import { useState, useContext } from "react";
import { useForm, useController, Controller } from "react-hook-form";
import { produce } from "immer";
import { FormStateContext } from ".";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

function TextField({
  control = null,
  required = null,
  name = null,
  id = null,
  fullWidth = null,
  label = null,
  autoComplete = null,
  helperText = "",
  rules = {},
  error = false,
  type = "text",
  InputProps = null,

  ...rest
}) {
  const {
    field: { onChange, onBlur, value = "", name: fieldName, ref },
    fieldState: { invalid, isTouched },
  } = useController({ control, name, rules });

  return (
    <MuiTextField
      {...rest}
      required={required}
      fullWidth={fullWidth}
      id={id}
      label={label}
      name={fieldName}
      autoComplete={autoComplete}
      onChange={onChange}
      value={value}
      ref={ref}
      onBlur={onBlur}
      helperText={helperText}
      error={error}
      rules={rules}
      InputProps={
        InputProps
          ? InputProps
          : {
              endAdornment: (
                <InputAdornment position="end">
                  {!invalid && isTouched ? (
                    <CheckCircle color="success" />
                  ) : (
                    <></>
                  )}
                </InputAdornment>
              ),
            }
      }
      type={type}
    />
  );
}

function InfoForm(props) {
  const { form, setForm } = useContext(FormStateContext);
  const { steps } = useContext(FormStateContext);

  const { activeStep, setActiveStep, setSkipped, skipped } =
    useContext(FormStateContext);
  const {
    validInfoForm: {
      handleSubmit,
      control,
      getFieldState,

      formState: { errors },
    },
  } = useContext(FormStateContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const [isDuplicate, setIsDuplicate] = useState(false); // 是否重複
  const validateUsername = (value) => {
    setIsDuplicate(true);
    // const response = await fetch(`/check-username?username=${value}`);
    // const result = await response.json();
    const result = { isDuplicate: false, error: "用戶名已存在" };
    if (result.isDuplicate) {
      setIsDuplicate(true);
      return result.error;
    } else {
      setIsDuplicate(false);
      const regex = /^[\u4E00-\u9FFFa-zA-Z0-9]+$/;
      if (!regex.test(value)) {
        return "用戶名只能包含中文、英文和數字";
      }
    }
  };

  //console.log("info server errors", errors);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((data) => {
        setForm(
          produce((state) => {
            state.steps.info = {
              valid: true,
              value: data,
            };
          })
        );
        handleNext();
      })}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            control={control}
            name="username"
            required
            fullWidth
            id="username"
            label="用戶名"
            rules={{
              required: "用戶名必須填",
              minLength: { value: 2, message: "用戶名不得小於2字元" },
              maxLength: { value: 10, message: "用戶名不得超過10字元" },
              validate: validateUsername,
            }}
            error={errors.username ? true : false}
            helperText={
              errors.username
                ? errors.username.message
                : getFieldState("username").isTouched &&
                  !getFieldState("username").inValid
                ? " "
                : "請輸入中英文用戶名"
            }
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            control={control}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            rules={{
              required: "E-mail必須填",
              validate: {
                validate1: (value) => {
                  const regex =
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                  return regex.test(value) || "非法的E-mail格式";
                },
              },
            }}
            error={errors.email ? true : false}
            helperText={
              errors.email
                ? errors.email.message
                : getFieldState("email").isTouched &&
                  !getFieldState("email").inValid
                ? " "
                : "請輸入電子信箱"
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            control={control}
            type={showPassword ? "text" : "password"}
            name="password"
            required
            fullWidth
            id="password"
            label="密碼"
            rules={{
              required: "密碼必須填",
              minLength: { value: 8, message: "密碼長度介於8~15位元" },
              maxLength: { value: 15, message: "密碼長度介於8~15位元" },
              validate: {
                validate1: (value) => {
                  const regex = /^[a-zA-Z0-9]*$/;
                  return regex.test(value) || "密碼含非法字元";
                },
                validate2: (value) => {
                  const regex =
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]*$/;
                  return (
                    regex.test(value) || "密碼必須包含數字及大寫、小寫字母"
                  );
                },
              },
            }}
            error={errors.password ? true : false}
            helperText={
              errors.password
                ? errors.password.message
                : getFieldState("password").isTouched &&
                  !getFieldState("password").inValid
                ? " "
                : "請輸入包含一大寫、一小寫英文字母、數字的密碼"
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
            下一步
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
export default InfoForm;
