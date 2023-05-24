import React, { useContext, useState } from "react";
import { DatePicker } from "antd";
import { TravelInfoStateContext } from "..";
import produce from "immer";
import * as dayjs from "dayjs";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

const CustomRangePicker = () => {
  const [editCondition, setEditCondition] = useState({range:'end'});
  const { travelInfo, setTravelInfo } = useContext(TravelInfoStateContext);
  const { travelList, startDate, dayCount, startTime } = travelInfo;

  const nowStartDate = dayjs(startDate);

  const nowEndDate = nowStartDate.add(dayCount - 1, "day");

  const maxDay = travelList.reduce((max, item) => {
    return item.day > max ? item.day : max;
  }, 0);

  console.log("最大day值:", maxDay);

  console.log(nowStartDate, nowEndDate);

  const handleButtonClick = () => {
    console.log(nowStartDate.format("YYYY-MM-DD"));
  };

  const handlePickerChange = (dates, dateStrings) => {
    // 处理选择日期的逻辑
    // return false

    console.log("Selected Dates:", dates);
    console.log("Selected Date Strings:", dateStrings);
    console.log("Selected Date info:");
    console.log(dates[0].format("YYYY-MM-DD"), dates[1].diff(dates[0], "day"));
    setTravelInfo(
      produce((draft) => {
        draft.startDate = dates[0].format("YYYY-MM-DD");
        draft.dayCount = dates[1].diff(dates[0], "day") + 1;
      })
    );
  };

  return (
    <>
      <DatePicker.RangePicker
        // open={pickerOpen}
        onChange={handlePickerChange}
        // onChange={(a,b,c)=>{
        //   console.log('onChange',a,b,c)
        // }}
        onCalendarChange={(a, b, c) => {
          console.log("onCalendarChange", a, b, c);
          setEditCondition(c);
        }}
        bordered={false}
        allowClear={false}
        inputReadOnly
        value={[nowStartDate, nowEndDate]}
        disabledDate={(d) => {
          // console.log(editCondition)
          if(!editCondition) return false;

          if (editCondition.range === "end") {
            return d.isBetween(
              nowEndDate.add(-maxDay + 1, "day"),
              nowEndDate
            );
          } else if (editCondition.range === "start") {
            d.isBetween(nowStartDate, nowStartDate.add(maxDay - 1, "day"));
          }
        }}
        format="MM-DD"
        size="small"
        allowEmpty={[false, false]}
      />
      <button onClick={handleButtonClick}></button>
    </>
  );
};

export default CustomRangePicker;
