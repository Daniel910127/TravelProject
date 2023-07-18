import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import { useState, useContext ,useRef} from "react";
import { useForm, useController } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { produce } from "immer";
import { FormStateContext } from ".";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";

import Lottie from "lottie-react";
import register_map from "./register_map.json";

const { RangePicker } = DatePicker;

function InfoForm(props) {
  const { form, setForm } = useContext(FormStateContext);
  const { steps } = useContext(FormStateContext);
  const { activeStep, setActiveStep, setSkipped, skipped } =
    useContext(FormStateContext);

  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Lottie
          animationData={register_map}
          style={{ width: "400px", height: "400px" }}
        />
        <Typography sx={{ mb: 1, textAlign: "center" }}>
          立即體驗AI行程規劃的樂趣，讓你為旅遊輕鬆做準備。
        </Typography>
        <RangePicker
          size={"large"}
          disabledDate={disabledDate}
          style={{ border: "1px solid black", maxWidth: "350px" }}
        />
        <Button>開始規劃</Button>
      </Box>
    </>
  );
}
export default InfoForm;
