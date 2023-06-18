import React, { useContext, useState } from "react";
import { DateRangePicker } from "react-dates";
import { TravelInfoStateContext } from "..";
import produce from "immer";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import "./react_dates_overrides.css";
import { useEffect } from "react";
const DateRangePickerExample = () => {
  const { travelInfo, setTravelInfo } = useContext(TravelInfoStateContext);

  const { travelList, t_StartDate, dayCount } = travelInfo;

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
      nowStartDate: moment(t_StartDate),
      nowEndDate: moment(moment(t_StartDate).add(dayCount - 1, "days")),
    });
  }, [t_StartDate, dayCount]);

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
      console.log("daycount", endDate.diff(startDate, "day"));
      const newStartDate = startDate.format("YYYY-MM-DD");
      const newDayCount = endDate.diff(startDate, "day") + 1;

      const startTimes = { ...travelInfo.t_StartTime };

      const defaultStartTimeValue = 28800;

      for (let key = 1; key <= newDayCount; key++) {
        if (!(key in startTimes)) {
          startTimes[key] = defaultStartTimeValue;
        }
      }

      setTravelInfo(
        produce((draft) => {
          draft.t_StartDate = newStartDate;
          draft.dayCount = newDayCount;
          draft.t_StartTime = startTimes;
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
        minimumNights={maxDay - 1 < 0 ? 0 : maxDay - 1} // 限制日期範圍在三天或以上
      />
    </div>
  );
};

export default DateRangePickerExample;
