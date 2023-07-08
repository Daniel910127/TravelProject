import React, { useContext } from "react";
import ItineraryCreateContext from "../../contexts/ItineraryCreateContext";
import TextField from "./TextField";
import ZoneSelect from "./ZoneSelect";
import { useForm, Controller } from "react-hook-form";
import { Box, Button } from "@mui/material";
import DateRangePickerComponent from "./DateRangePicker";

import { produce } from "immer";

export default function ItineraryForm() {
  const { itineraryCreateInfo, setItineraryCreateInfo } = useContext(
    ItineraryCreateContext
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const onDatesChange = (startDate, endDate) => {

    

    const stayDay = endDate.diff(startDate, "days") + 1;
    const nextState = produce(itineraryCreateInfo, (draftState) => {
      draftState.startDate = startDate;
      draftState.stayDay = stayDay;
    });
    setItineraryCreateInfo(nextState);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      {/* <label>MUI TextField</label>
        <TextField
          control={control}
          name="itineraryName"
          required
          fullWidth
          id="itineraryName"
          label="行程名稱"
          rules={{ required: "請填行程名稱" }}
        ></TextField>
        <ZoneSelect /> */}
      <div className="custom-picker">
        <DateRangePickerComponent
          onDatesChange={onDatesChange}
          startDate={itineraryCreateInfo.startDate}
          endDate={itineraryCreateInfo.endDate}
        />
      </div>
      {/* <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
          submit
        </Button> */}
    </Box>
  );
}
