import React from "react";
import InterestChart from "../InterestChart";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InterestForm2 from "../InterestForm2";
import useFormController from "../../hooks/useFormController";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import CancelButton from "../Button/CancelButton";

import DefaultButton from "../Button/DefaultButton";
import { Padding } from "@mui/icons-material";

export default function ProfileInterest() {
  const [open, setOpen] = React.useState(false);

  const [interestData, setInterestData] = React.useState({
    data: {
      si_pg: 1,
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
  });

  /*  const validationSchema = yup.object().shape({
    t_NameField: yup.string().required(),
    datesField: yup
      .object()
      .required("Date range is required")
      .shape({
        startDate: yup.date().required("Start date is required"),
        endDate: yup.date().required("End date is required"),
      }),
  }); */

  const onSubmit = (data) => {
    console.log("ajax PUT data");
    setInterestData({ data: data.customInterestField });
    console.log(data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      customInterestField: interestData.data,
    },
  });

  const customInterestFieldProps = useFormController(
    control,
    "customInterestField"
  );

  // console.log(customInterestFieldProps);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <InterestChart data={interestData.data} />
      <DefaultButton
        onClick={() => {
          console.log("click open2");
          handleClickOpen();
        }}
      >
        修改興趣表
      </DefaultButton>

      <Dialog
        open={open}
        onClose={handleClose}
        // scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          sx: { maxWidth: "600px", width: "calc(100% - 64px)" },
        }}
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>

        <DialogContent>
          <InterestForm2 customInterestFieldProps={customInterestFieldProps} />
        </DialogContent>
        <DialogActions
          sx={{
            paddingLeft: "3.75rem",
            paddingRight: "3.75rem",
            paddingBottom: "1.125rem",
            justifyContent: "center",
          }}
        >
          <CancelButton onClick={handleClose}>取消</CancelButton>
          <DefaultButton
            onClick={() => {
              console.log("Submit");
              handleClose();
              handleSubmit(onSubmit)();
              console.log("Submit2");
            }}
          >
            修改
          </DefaultButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
