import { TextField as MuiTextField, InputAdornment } from "@mui/material";
import { useController } from "react-hook-form";
import { CheckCircle } from "@mui/icons-material";
export default function TextField({
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
