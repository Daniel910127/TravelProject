import { TextField, InputAdornment } from "@mui/material";

export default function MyTextField({ error, ...rest }) {
  // console.log(props);
  // console.log(rest,'rest',error,ref)
  return (
    <TextField
      {...rest}
      sx={{ width: "100%" }}
      // onChange={onChange} // send value to hook form
      // onBlur={onBlur} // notify when input is touched/blur
      // value={value} // input value
      // name={fieldName} // send down the input name
      // inputRef={ref} // send input ref, so we can focus on input when error appear
      error={error ? true : false}
    />
  );
}
