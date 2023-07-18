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
    console.log(data);
  };

  const validationSchema = yup.object().shape({
    t_NameField: yup.string().required(),
    datesField: yup
      .object()
      .required("Date range is required")
      .shape({
        startDate: yup.date().required("Start date is required"),
        endDate: yup.date().required("End date is required"),
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
