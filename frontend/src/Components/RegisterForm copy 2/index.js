import * as React from "react";

import Box from "@mui/material/Box";

import { useState, createContext} from "react";
import { useForm } from "react-hook-form";
import { produce } from "immer";
import InfoForm from "./Infoform";
import InterestForm from "./InterestForm";
import HorizontalLinearStepper from "./HorizontalLinearStepper";
import Done from "./Done";
const STEPS_STATE = [
  {
    title: "info",
    content: "First-content",
    canSelect: true,
  },
  {
    title: "interest",
    content: "Second-content",
    canSelect: false,
  },
  {
    title: "Complete",
    content: "Last-content",
    canSelect: false,
  },
];

const FORM_STATE = {
  selectedIndex: 0,
  steps: {
    info: {
      valid: false,

      value: {
        username: "",
        password: "",
        gender: "",
        birthday: "",
        phone: "",
      },
    },
    interest: {
      valid: false,

      value: {
        si_pg: -1,
        si_os: -1,
        si_tp: -1,
        si_ee: -1,
        si_ff: -1,
        si_la: -1,
        si_le: -1,
        si_ns: -1,
        si_np: -1,
        si_rt: -1,
        si_se: -1,
        si_ha: -1,
        si_tf: -1,
      },
    },
  },
};

const steps = ["個人訊息", "興趣/偏好", "完成"];
const FormStateContext = createContext({
  form: FORM_STATE,
  setForm: () => {},
  activeStep: STEPS_STATE,
  setActiveStep: () => {},
  skipped: new Set(),
  setSkipped: () => {},
  steps: steps,
  validInfoForm: {},
  validInterestForm: {},
});

function RegisterForm() {
  const [form, setForm] = useState(FORM_STATE);
  // const [selectedIndex, setSelectedIndex] = useState(0);
  //const [steps, setSteps] = useState(STEPS_STATE);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const validInfoForm = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      account: form.steps.info.value.account,
      username: form.steps.info.value.username,
      password: form.steps.info.value.password,
      email: form.steps.info.value.email,
    },
  });

  const validInterestForm = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      si_pg:
        form.steps.interest.value.si_pg === -1
          ? 1
          : form.steps.interest.value.si_pg,
      si_os:
        form.steps.interest.value.si_os === -1
          ? 1
          : form.steps.interest.value.si_os,
      si_tp:
        form.steps.interest.value.si_tp === -1
          ? 1
          : form.steps.interest.value.si_tp,
      si_ee:
        form.steps.interest.value.si_ee === -1
          ? 1
          : form.steps.interest.value.si_ee,
      si_ff:
        form.steps.interest.value.si_ff === -1
          ? 1
          : form.steps.interest.value.si_ff,
      si_la:
        form.steps.interest.value.si_la === -1
          ? 1
          : form.steps.interest.value.si_la,
      si_le:
        form.steps.interest.value.si_le === -1
          ? 1
          : form.steps.interest.value.si_le,
      si_ns:
        form.steps.interest.value.si_ns === -1
          ? 1
          : form.steps.interest.value.si_ns,
      si_np:
        form.steps.interest.value.si_np === -1
          ? 1
          : form.steps.interest.value.si_np,
      si_rt:
        form.steps.interest.value.si_rt === -1
          ? 1
          : form.steps.interest.value.si_rt,
      si_se:
        form.steps.interest.value.si_se === -1
          ? 1
          : form.steps.interest.value.si_se,
      si_ha:
        form.steps.interest.value.si_ha === -1
          ? 1
          : form.steps.interest.value.si_ha,
      si_tf:
        form.steps.interest.value.si_tf === -1
          ? 1
          : form.steps.interest.value.si_tf,
    },
  });

  return (
    <FormStateContext.Provider
      value={{
        form,
        setForm,
        activeStep,
        setActiveStep,
        skipped,
        setSkipped,
        steps,
        validInfoForm,
        validInterestForm,
      }}
    >
      <CreateTaskMultiStepForm />
    </FormStateContext.Provider>
  );
}

const CreateTaskMultiStepForm = () => {
  
  return (
    <Box sx={{ width: "100%" }}>
      <HorizontalLinearStepper>
        <InfoForm />
        <InterestForm />
        <Done></Done>
      </HorizontalLinearStepper>
    </Box>
  );
};

export { FormStateContext };

export default RegisterForm;
