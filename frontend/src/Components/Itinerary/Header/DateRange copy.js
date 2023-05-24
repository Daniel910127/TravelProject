import React, { useContext, useState } from "react";
import { DateRangePicker } from "react-dates";
import { TravelInfoStateContext } from "..";
import produce from "immer";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import "./style.css";
import { useEffect } from "react";
const DateRangePickerExample = () => {
  const { travelInfo, setTravelInfo } = useContext(TravelInfoStateContext);

  const { travelList, startDate, dayCount, startTime } = travelInfo;
  console.log("@@", startDate);
  const [focusedInput, setFocusedInput] = useState(null);

  const [nowStartDate, setNowStartDate] = useState();

  const [nowEndDate, setNowEndDate] = useState();

  useEffect(() => {
    setNowStartDate(moment(startDate));
    setNowEndDate(moment(startDate).add(dayCount - 1, "days"));
  }, [startDate]);

  // console.log(
  //   "nowe and end",

  //   nowStartDate,
  //   nowEndDate,
  //   nowStartDate === nowEndDate
  // );

  const handleDatesChange = ({ startDate, endDate }) => {
    // console.log(startDate, endDate);
    setNowStartDate(startDate);
    setNowEndDate(endDate);

    if (startDate && endDate) {
      
      setTravelInfo(
        produce((draft) => {
          draft.startDate = startDate.format("YYYY-MM-DD");
          draft.dayCount = endDate.diff(startDate, "day") + 1;
        })
      );
    }
  };

  const handleFocusChange = (focusedInput) => {
    console.log(focusedInput);
    // if (focusedInput === "endDate") {
    //   // setNowStartDate(null);
    //   setNowEndDate(null);
    // }
    setFocusedInput(focusedInput);
  };

  return (
    <div>
      <DateRangePicker
        startDateId="start_date_id"
        endDateId="end_date_id"
        startDate={nowStartDate}
        endDate={nowEndDate}
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        required
        minimumNights={5} // 限制日期範圍在三天或以上
      />
    </div>
  );
};

export default DateRangePickerExample;
