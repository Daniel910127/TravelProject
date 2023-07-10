import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

const CustomDateRangePicker = styled("div")(({ valid }) => {
  const commonStyles = {
    width: "100%",
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    " .DateRangePicker": {
      width: "100%",
    },
    " .DateInput": {
      flexGrow: "1",
    },
    " .DateInput_input": {
      lineHeight: "1.4375em",
      padding: "16.5px 14px",
      fontSize: "1rem",
      fontWeight: 400,
      fontFamily: "inherit",
    },
    " .DateRangePicker_picker": {
      top: "80px !important",
    },
    " .DateInput_fang": {
      display: "none",
    },
  };

  const validStyle = {
    " .DateRangePickerInput": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "6px",
      border: "1px solid rgba(0, 0, 0, 0.23)",
      overflow: "hidden",
      borderRadius: "4px",

      [`:hover`]: {
        border: "1px solid rgba(0, 0, 0, 0.87)",
      },

      [`:focus-within`]: {
        border: "1px solid #1976d2",
      },
    },
    " .DateInput_input__focused": {
      borderBottom: "2px solid #1976d2",
    },
  };

  const invalidStyle = {
    " .DateRangePickerInput": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "6px",
      border: "1px solid #d32f2f",
    },
    " .DateInput_input__focused": {
      borderBottom: "2px solid #d32f2f",
    },
  };

  return valid
    ? { ...commonStyles, ...validStyle }
    : {
        ...commonStyles,
        ...invalidStyle,
      };
});
const DateRangePickerComponent = ({ ...otherProps }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  // console.log(otherProps);
  /*   error
    : 
    endDate
    : 
    {message: 'End date is required', type: 'optionality', ref: undefined}
    startDate
    : 
    {message: 'Start date is required', type: 'optionality', ref: undefined}
    [[Prototype]]
    : 
    Object
    name
    : 
    "datesField"
    onBlur
    : 
    () => {…}
    onChange
    : 
    event => {…}
    value
    : 
    {}
    [[Prototype]]
    : 
    Object
     */
  const { onChange, value, error } = otherProps;
  const handleDatesChange = (dates) => {
    onChange(dates);
  };

  return (
    <CustomDateRangePicker valid={error === undefined ? true : false}>
      <DateRangePicker
        // onChange={onChange}
        // required
        startDate={value.startDate}
        startDateId="start_date"
        endDate={value.endDate}
        endDateId="end_date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      />
    </CustomDateRangePicker>
  );
};

export default DateRangePickerComponent;
