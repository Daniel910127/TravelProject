import { useState, useContext, useEffect } from "react";
import { Controller } from "react-hook-form";
import { produce } from "immer";
import { FormStateContext } from ".";
import { createAccount } from "./createAccount";
import { Button, Grid, Box, Typography } from "@mui/material";

import {
  ParkOutlined,
  HikingOutlined,
  EmojiNatureOutlined,
  YardOutlined,
  ColorLensOutlined,
  MuseumOutlined,
  LandscapeOutlined,
  StorefrontOutlined,
  TempleBuddhistOutlined,
  Shop2Outlined,
  TempleHinduOutlined,
  FactoryOutlined,
  AttractionsOutlined,
} from "@mui/icons-material";

import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const PrettoSlider = styled(Slider)({
  height: 8,

  "& .airbnb-bar": {
    height: 9,
    width: 1,
    backgroundColor: "currentColor",
    marginLeft: 1,
    marginRight: 1,
  },

  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },

    "&:hover": {
      boxShadow: "0 0 0 7px rgba(25, 118, 210, 0.36)",
    },

    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#1976d2",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const IconSlider = (props) => {
  //const { form, setForm } = useContext(FormStateContext);
  const { max, min, control, name, Icon } = props;
  const [value, setValue] = useState(0);
  function IconThumbComponent(props) {
    const { children, ...other } = props;
    console.log(other)
    return (
      <SliderThumb {...other}>
        {children}
        <Icon style={{ fontSize: "20px" }} />
      </SliderThumb>
    );
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={{ min: 1, max: 10, required: true }}
      render={({ field }) => (
        <PrettoSlider
          valueLabelDisplay="auto"
          aria-label={name}
          min={min}
          max={max}
          onChange={(e) => {
            field.onChange(e); // 调用默认的 onChange 事件处理程序
            setValue(field.value); // 调用自定义的事件处理程序
          }}
          value={field.value}
          slots={{ thumb: IconThumbComponent }}
        />
      )}
    />
  );
};

function InfoForm(props) {
  const { form, setForm } = useContext(FormStateContext);
  const { steps } = useContext(FormStateContext);
  const { activeStep, setActiveStep, setSkipped, skipped } =
    useContext(FormStateContext);

  const {
    validInterestForm: { handleSubmit, control },
  } = useContext(FormStateContext);

  const {
    validInfoForm: {
      setError: InfoSetError,
      formState: { isValid: InfoIsValid },
    },
  } = useContext(FormStateContext);
  // console.log("isvalid", InterestIsValid, InfoIsValid);

  const interests = [
    {
      i_Key: "si_pg",
      i_Name: "公園綠地",
      i_Icon: ParkOutlined,
    },
    { i_Key: "si_os", i_Name: "戶外運動", i_Icon: HikingOutlined },
    { i_Key: "si_tp", i_Name: "主題園區", i_Icon: AttractionsOutlined },
    { i_Key: "si_ee", i_Name: "生態教育", i_Icon: EmojiNatureOutlined },
    { i_Key: "si_ff", i_Name: "休閒農漁", i_Icon: YardOutlined },
    { i_Key: "si_la", i_Name: "在地藝文", i_Icon: ColorLensOutlined },
    { i_Key: "si_le", i_Name: "地方展館", i_Icon: MuseumOutlined },
    { i_Key: "si_ns", i_Name: "自然景觀", i_Icon: LandscapeOutlined },
    { i_Key: "si_np", i_Name: "夜市夜遊", i_Icon: StorefrontOutlined },
    { i_Key: "si_rt", i_Name: "宗教廟宇", i_Icon: TempleBuddhistOutlined },
    { i_Key: "si_se", i_Name: "消費娛樂", i_Icon: Shop2Outlined },
    { i_Key: "si_ha", i_Name: "歷史古蹟", i_Icon: TempleHinduOutlined },
    { i_Key: "si_tf", i_Name: "觀光工廠", i_Icon: FactoryOutlined },
  ];

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function handleError(errorMessage) {
    errorMessage.forEach(({ name, type, message }) =>
      InfoSetError(name, { type, message })
    );

    setForm(
      produce((state) => {
        state.steps.interest.valid = false;
      })
    );
    setForm(
      produce((state) => {
        state.steps.info.valid = false;
      })
    );
    setActiveStep(0);
  }

  useEffect(() => {
    async function createAccountFlow() {
      if (form.steps.info.valid && form.steps.interest.valid) {
        let infoStatus = await createAccount(form.steps.info.value);
        let interestStatus = await createAccount(form.steps.interest.value);

        const errorMessage = [
          {
            type: "manual",
            name: "username",
            message: "username error",
          },
          {
            type: "manual",
            name: "password",
            message: "password error",
          },
        ]; //back end return error msg

        if ((await infoStatus) && (await interestStatus)) {
          handleNext();
        }

        if (!(await infoStatus) || !(await interestStatus)) {
          handleError(errorMessage);
        }
      }
    }

    createAccountFlow();
  }, [form]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((data) => {
        setForm(
          produce((state) => {
            state.steps.interest = {
              valid: true,
              value: data,
            };
          })
        );
      })}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        {interests.map((interest) => (
          <Grid item xs={6} key={interest.i_Key}>
            <Typography gutterBottom>{interest.i_Name}</Typography>
            <IconSlider
              min={1}
              max={10}
              control={control}
              name={interest.i_Key}
              Icon={interest.i_Icon}
            ></IconSlider>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {isStepOptional(activeStep) && (
          <Button
            color="inherit"
            onClick={handleSubmit((data) => {
              setSkipped(skipped.add(activeStep));
              setForm(
                produce((state) => {
                  state.steps.interest = {
                    valid: true,
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
                  };
                })
              );
            })}
            sx={{ mr: 1 }}
          >
            Skip
          </Button>
        )}

        <Button type="submit">
          {activeStep === steps.length - 1 ? "完成" : "下一步"}
        </Button>
      </Box>
    </Box>
  );
}
export default InfoForm;
