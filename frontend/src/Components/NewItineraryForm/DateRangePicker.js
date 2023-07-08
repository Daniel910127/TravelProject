import React, { useState } from "react";
import { DateRangePicker } from "react-dates";

import produce from "immer";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import "./react_dates_overrides.css";
const DateRangePickerComponent = ({ onBothDatesChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);

    if (startDate && endDate) {
      onBothDatesChange(startDate, endDate);
    }

    // console.log(startDate, endDate);
  };

  return (
    <div>
      <DateRangePicker
        startDate={startDate}
        startDateId="start_date_id"
        endDate={endDate}
        endDateId="end_date_id"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      />
    </div>
  );
};

export default DateRangePickerComponent;
