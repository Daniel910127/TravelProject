import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ClickAwayListener from "@mui/base/ClickAwayListener";
const minutes = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];
const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 50,
    },
  },
};

export default function StayTime() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen(!open);
  };

  const [hour, setHour] = React.useState("");

  const handleHourChange = (event) => {
    setHour(event.target.value);
  };

  const [min, setMin] = React.useState("");

  const handleMinChange = (event) => {
    setMin(event.target.value);
  };

  const handleClickAway = (event) => {
    // setOpen(false)
    console.log('object');
  };

  const id = open ? "simple-popper" : undefined;

  return (
    <Stack direction="row" spacing={1}>
      <Chip aria-describedby={id} type="button" onClick={handleClick} />
      
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement={"bottom-start"}
        >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box
            sx={{
              p: 1,
              bgcolor: "white",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormControl
              sx={{
                m: 1,
                minWidth: 60,
              }}
            >
              <Select
                value={hour}
                onChange={handleHourChange}
                displayEmpty
                // multiple
                inputProps={{ "aria-label": "Without label" }}
                MenuProps={MenuProps}
              >
                {hours.map((hour, i) => (
                  <MenuItem value={hour} key={i}>{hour} </MenuItem>
                ))}
              </Select>
            </FormControl>
            <span>:</span>
            <FormControl
              sx={{
                m: 1,
                minWidth: 60,
              }}
            >
              <Select
                value={min}
                onChange={handleMinChange}
                displayEmpty
                // multiple
                inputProps={{ "aria-label": "Without label" }}
                MenuProps={MenuProps}
              >
                {minutes.map((min, i) => (
                  <MenuItem value={min} key={i}>{min}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          </ClickAwayListener>
        </Popper>
      
    </Stack>
  );
}
