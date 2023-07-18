import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, createContext, useContext, useCallback } from "react";
import { FormStateContext } from ".";

const steps = ["個人訊息", "興趣/偏好", "完成"];

export default function HorizontalLinearStepper(props) {
  const { activeStep } = React.useContext(FormStateContext);

  const { skipped, setSkipped } = useContext(FormStateContext);

  const isStepOptional = (step) => {
    return step === 1;
  };
  console.log("render", skipped);
  const isStepSkipped = (step) => {
    //console.log(skipped)
    return skipped.has(step);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            console.log("skip");
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length - 1 ? (
        <>
          {props.children[activeStep]}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </Box>
        </>
      ) : activeStep === steps.length - 2 ? (
        <>{props.children[activeStep]}</>
      ) : (
        <>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>
            Step111 {activeStep + 1}
          </Typography> */}
          {props.children[activeStep]}
        </>
      )}
    </Box>
  );
}
