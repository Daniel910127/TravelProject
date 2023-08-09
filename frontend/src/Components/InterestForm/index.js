import React, { useContext } from "react";

import { Box, Button, Typography } from "@mui/material";
import CustomMuiTypography from "../CustomMuiTypography";
import IconSlider from "../IconSlider";
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

import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";



const PrettoSlider = styled(Slider)({

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




const CustomInterestWrapper = styled("div")({
  height: "100%",
  width: "360px",
  display: "flex",
  flexDirection: "column",
  marginRight: "1.6rem",
});

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

export default function InterestForm({ customInterestFieldProps }) {
  // console.log("customInterestFieldProps", customInterestFieldProps);

  return (
    <Box>
      {interests.map((interest) => {
        return (
          <Box key={interest.i_Key} sx={{ width: "100%" }}>
            <Typography gutterBottom>{interest.i_Name}</Typography>
            <IconSlider
              min={1}
              max={10}
              value={customInterestFieldProps.value[interest.i_Key]}
              onChange={(evt) => {
                customInterestFieldProps.onChange({
                  ...customInterestFieldProps.value,
                  [interest.i_Key]: evt.target.value,
                });
              }}
              Icon={interest.i_Icon}
            ></IconSlider>
          </Box>
        );
      })}
    </Box>
  );
}
