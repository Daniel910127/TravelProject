import React, { useState } from 'react';
import { DatePicker } from 'antd';

const CustomRangePicker = () => {
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleButtonClick = () => {
    setPickerOpen(!pickerOpen);
  };

  const handlePickerChange = (dates, dateStrings) => {
    // 处理选择日期的逻辑
    console.log('Selected Dates:', dates);
    console.log('Selected Date Strings:', dateStrings);
    setPickerOpen(false);
  };

  return (
    <>
      <DatePicker.RangePicker
        open={pickerOpen}
        onChange={handlePickerChange}
        bordered={false}
        allowClear={false}
      />
      <button onClick={handleButtonClick}>Select Range</button>
    </>
  );
};

export default CustomRangePicker;