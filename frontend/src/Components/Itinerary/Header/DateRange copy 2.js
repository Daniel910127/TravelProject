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

  // const nowStartDate =
  // const nowEndDate = ;

  // console.log(nowStartDate, nowEndDate);

  const maxDay = travelList.reduce((max, item) => {
    return item.day > max ? item.day : max;
  }, 0);

  const [focusedInput, setFocusedInput] = useState(null);

  const [nowDate, setNowDate] = useState({});

  useEffect(() => {
    setNowDate({
      nowStartDate: moment(startDate),
      nowEndDate: moment(moment(startDate).add(dayCount-1, "days")),
    });
  }, [startDate, dayCount]);

  // const [nowEndDate, setNowEndDate] = useState();

  // console.log(
  //   "nowe and end",

  //   nowStartDate,
  //   nowEndDate,
  //   nowStartDate === nowEndDate
  // );

  const handleDatesChange = ({ startDate, endDate }) => {
    console.log("@@@!!", startDate, endDate);
    // setNowStartDate(null);
    // setNowEndDate(null);
    setNowDate({
      nowStartDate: startDate,
      nowEndDate: endDate,
    });

    if (startDate && endDate) {
      console.log('daycount',endDate.diff(startDate, "day"));
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
    setFocusedInput(focusedInput);
  };

  return (
    <div>
      <DateRangePicker
        startDateId="start_date_id"
        endDateId="end_date_id"
        startDate={nowDate.nowStartDate}
        endDate={nowDate.nowEndDate}
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        // required
        isOutsideRange={() => null}
        minimumNights={maxDay -1 < 0 ? 0 : maxDay-1 } // 限制日期範圍在三天或以上
      />
    </div>
  );
};

export default DateRangePickerExample;
