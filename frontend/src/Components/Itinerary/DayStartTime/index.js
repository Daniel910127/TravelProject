import React from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Height } from "@mui/icons-material";
import produce, { setAutoFreeze, setUseProxies } from "immer";

import { TravelInfoStateContext } from "../index";
import { useState, useContext } from "react";

import secToClock from "../../../utils/secToClock";
import toStrClock from "../../../utils/toStrClock";
setAutoFreeze(false);
setUseProxies(true);
const minutes = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];
const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 50,
    },
  },
};
export default function DayStartTime({ day, time }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const { travelInfo, setTravelInfo } = useContext(TravelInfoStateContext);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen(!open);
  };

  const [hour, setHour] = React.useState(secToClock.getHour(time));

  const handleHourChange = (event) => {
    setHour(event.target.value);
  };

  const [min, setMin] = React.useState(secToClock.getMin(time));

  const handleMinChange = (event) => {
    setMin(event.target.value);
  };

  const handleChangeStartTime = () => {
    setTravelInfo(
      produce((draft) => {
        const newStartTime = hour * 60 * 60 + min * 60;
        draft.t_StartTime[day] = newStartTime;
      })
    );
  };

  const handleCancelChangeStayTime = () => {
    setMin(secToClock.getMin(time));

    setHour(secToClock.getHour(time));
  };

  const handleClose = () => setOpen(false);

  const id = open ? "simple-popper" : undefined;
  return (
    <div>
      <span onClick={handleClick}>
        開始時間 {toStrClock(secToClock.getHour(time), secToClock.getMin(time))}
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            // width: "max-content",
            position: "absolute",
            bgcolor: "white",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 1,
          }}
        >
          <h3>開始時間</h3>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormControl
              sx={{
                m: 1,
                minWidth: 68,
              }}
            >
              <Select
                value={hour}
                onChange={handleHourChange}
                displayEmpty
                sx={{ height: 40 }}
                inputProps={{ "aria-label": "Without label" }}
                MenuProps={MenuProps}
              >
                {hours.map((h, i) => (
                  <MenuItem value={h} key={i}>
                    {h}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <span>:</span>
            <FormControl
              sx={{
                m: 1,
                minWidth: 68,
              }}
            >
              <Select
                value={min}
                onChange={handleMinChange}
                displayEmpty
                sx={{ height: 40 }}
                inputProps={{ "aria-label": "Without label" }}
                MenuProps={MenuProps}
              >
                {minutes.map((min, i) => (
                  <MenuItem value={min} key={i}>
                    {min}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              color="secondary"
              onClick={() => {
                handleClick();
                handleCancelChangeStayTime();
              }}
            >
              取消
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleClick();
                handleChangeStartTime();
                // handleChangeStayTime();
              }}
            >
              完成
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
