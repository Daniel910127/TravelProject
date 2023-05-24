import React, { useContext, useState } from "react";
import { DatePicker } from "antd";
import { TravelInfoStateContext } from "..";
import produce from "immer";
import * as dayjs from "dayjs";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const CustomRangePicker = () => {
  

  return (
    <DateRangePicker/>
  );
};

export default CustomRangePicker;
