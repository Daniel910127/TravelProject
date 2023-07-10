import React, { useContext } from "react";

import { styled } from "@mui/material/styles";
import { default as ZoneSelect } from "./MultiSelect";
import CustomMuiTypography from "../CustomMuiTypography";
import { Box, Button } from "@mui/material";
import DateRangePickerComponent from "./DateRangePicker";

import MyTextField from "./MyTextField";
import ErrorMessage from "./ErrorMessage";
import CustomSwitch from "./CustomSwitch";

const ItineraryInfoWrapper = styled("div")({
  height: "100%",
  width: "360px",
  display: "flex",
  flexDirection: "column",
});

const FieldContainer = styled("div")({
  marginBottom: "1rem",
});

export default function ItineraryInfo({
  t_NameFieldProps,
  playZoneFieldProps,
  datesFieldProps,
  customFieldProps,
  handleSubmit,
  expanded,
}) {
  const { error: t_NameFieldError } = t_NameFieldProps;
  // const { error: playZoneError } = playZoneFieldProps;
  const { error: datesFieldError } = datesFieldProps;

  // console.log(t_NameFieldError, playZoneError, datesFieldError);

  return (
    <ItineraryInfoWrapper>
      <Box>
        <CustomMuiTypography variant={"h3"} gutterBottom>
          建立新的行程
        </CustomMuiTypography>
        <CustomMuiTypography variant={"subtitle1"} gutterBottom>
          依照您的個人興趣為您規劃旅程
        </CustomMuiTypography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
          height: "100%",
        }}
      >
        <FieldContainer>
          <CustomMuiTypography variant={"h6"} gutterBottom>
            行程名稱
          </CustomMuiTypography>
          <MyTextField {...t_NameFieldProps} />
          <ErrorMessage>
            {t_NameFieldError ? t_NameFieldError.message : <br />}
          </ErrorMessage>
        </FieldContainer>

        <FieldContainer>
          <CustomMuiTypography variant={"h6"} gutterBottom>
            旅遊區域
          </CustomMuiTypography>
          <ZoneSelect
            {...playZoneFieldProps}
            options={["1區", "2區", "3區", "4區", "5區"]}
          />
        </FieldContainer>

        <FieldContainer>
          <CustomMuiTypography variant={"h6"} gutterBottom>
            旅遊日期
          </CustomMuiTypography>

          <DateRangePickerComponent {...datesFieldProps} />
          <ErrorMessage>
            {datesFieldError ? "請輸入遊玩日期" : <br />}
          </ErrorMessage>
        </FieldContainer>
        <FieldContainer sx={{ display: "flex", alignItems: "center" }}>
          <CustomMuiTypography variant={"h6"}>自訂義</CustomMuiTypography>
          <CustomSwitch {...customFieldProps} />
        </FieldContainer>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, float: "right" }}
        >
          創建旅程
        </Button>
      </Box>
    </ItineraryInfoWrapper>
  );
}
