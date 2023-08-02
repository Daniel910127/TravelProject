import React from "react";
import { useContext } from "react";
import { TravelInfoStateContext } from "..";
import "react-dates/initialize";
import DateRangePickerExample from "./DateRange";
// import styled from "styled-components";
// import "./react_dates_overrides.css";

import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
const HeaderWrapper = styled("div")(({ theme, bgImg }) => ({
  position: "relative",
  height: "260px",
  backgroundSize: "cover",
  backgroundImage: `url(${bgImg})`,
  padding: "30px",
  marginBottom: "100px",
}));

const InfoPanel = styled(Paper)(({ theme }) => ({
  position: "relative",
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "9px",
  height: "180px",
  width: "100%",
  top: "60%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  h3: {
    fontSize: "32px",
    color: "#545454",
    fontWeight: "600",
  },
}));

/* const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
})); */

export default function Header() {
  const { travelInfo, setTravelInfo } = useContext(TravelInfoStateContext);

  return (
    <HeaderWrapper bgImg={`https://picsum.photos/600/400`}>
      <InfoPanel elevation={6}>
        <h3>台南三日遊</h3>
        <div className="custom-picker">
          <DateRangePickerExample />
        </div>
      </InfoPanel>
    </HeaderWrapper>
  );
}
