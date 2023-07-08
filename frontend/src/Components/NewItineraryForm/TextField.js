import { TextField as MuiTextField, InputAdornment } from "@mui/material";
import { useController } from "react-hook-form";
import { CheckCircle } from "@mui/icons-material";
export default function TextField({ control, name }) {
  const {
    field: { onChange, onBlur, value, name: fieldName, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({ control, name });

  return (
    <MuiTextField
      onChange={onChange} // send value to hook form
      onBlur={onBlur} // notify when input is touched/blur
      value={value} // input value
      name={fieldName} // send down the input name
      inputRef={ref} // send input ref, so we can focus on input when error appear
    />
  );
}
