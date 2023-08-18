import React from "react";

import { styled } from "@mui/material/styles";

import { useForm } from "react-hook-form";
import { Box } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useFormController from "./useFormController";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomInterest from "./CustomInterest";
import ItineraryInfo from "./ItineraryInfo";
import moment from "moment";

const NewItineraryFormWrapper = styled("div")({
  padding: "1.6rem 0 1.6rem 1.6rem",
  borderRadius: 4,
  height: "660px",
  display: "flex",
  justifyContent: "center",
  width: "max-content",
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(-90deg) " : "rotate(90deg) ",
  // marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  width: 32,
  height: 32,
  margin: "auto 1rem",
}));

export default function NewItineraryForm() {
  const onSubmit = (data) => {
    const { startDate, endDate } = data.datesField;

    const modifiedData = {
      t_StartDate: moment(startDate).format("YYYY-MM-DD"),
      t_StayDay: moment(endDate).diff(startDate, "days") + 1,
      t_NameField: data.t_NameField,
      t_Description: "",
      playZone: data.playZone,
      custom: data.custom,
      customInterestField: data.customInterestField,
      t_Privacy: data.t_Privacy,
    };
    console.log(modifiedData);
  };

  const validationSchema = yup.object().shape({
    t_NameField: yup.string().required("請填入行程名稱"),
    datesField: yup
      .object()
      .required("請填入旅遊日期")
      .shape({
        startDate: yup.date().required("請填入開始日期"),
        endDate: yup.date().required("請填入結束期"),
      }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      t_NameField: "",
      playZone: [],
      datesField: {},
      custom: false,
      t_Privacy: false,
      customInterestField: {
        si_os: 1,
        si_tp: 1,
        si_ee: 1,
        si_ff: 1,
        si_la: 1,
        si_le: 1,
        si_ns: 1,
        si_np: 1,
        si_rt: 1,
        si_se: 1,
        si_ha: 1,
        si_tf: 1,
      },
    },
  });

  const t_NameFieldProps = useFormController(control, "t_NameField");
  const playZoneFieldProps = useFormController(control, "playZone");
  const datesFieldProps = useFormController(control, "datesField");
  const customInterestFieldProps = useFormController(
    control,
    "customInterestField"
  );

  const customFieldProps = useFormController(control, "custom");
  const t_PrivacyFieldProps = useFormController(control, "t_Privacy");
  // console.log(t_NameFieldProps);
  // console.log(errors);
  return (
    <NewItineraryFormWrapper>
      <Box
        sx={{
          height: "100%",
          width: "360px",
        }}
      >
        <ItineraryInfo
          t_NameFieldProps={t_NameFieldProps}
          playZoneFieldProps={playZoneFieldProps}
          datesFieldProps={datesFieldProps}
          customFieldProps={customFieldProps}
          t_PrivacyFieldProps={t_PrivacyFieldProps}
          handleSubmit={handleSubmit(onSubmit)}
        />
      </Box>

      <ExpandMore
        expand={customFieldProps.value}
        onClick={() => {
          // console.log(customFieldProps)
          customFieldProps.onChange(!customFieldProps.value);
        }}
        aria-expanded={customFieldProps.value}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>

      <Collapse
        in={customFieldProps.value}
        timeout="auto"
        unmountOnExit
        orientation={"horizontal"}
      >
        <CustomInterest customInterestFieldProps={customInterestFieldProps} />
      </Collapse>
    </NewItineraryFormWrapper>
  );
}
