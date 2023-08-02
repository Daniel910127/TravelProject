import React, { useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShareIcon from "@mui/icons-material/Share";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";

import deleteItineraryAPI from '../../../utils/apis/deleteItinerary';

import DeleteConfirmModal from "./DeleteConfirmModal";

import moment from "moment";
const CardImgWrapper = styled.div`
  position: relative;
`;

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    min-width: 10rem;
  }
`;

export default function ItineraryInfoCard({
  t_Id,
  t_Name,
  t_StartDate,
  t_StayDay,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const endDate = moment(t_StartDate, "YYYY-MM-DD")
    .add(t_StayDay - 1, "days")
    .format("YYYY-MM-DD");

  const deleteConfirmModalRef = useRef(null);

  console.log(deleteConfirmModalRef);

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          ":hover": {
            boxShadow: 6,
            cursor: "pointer",
          },
        }}
      >
        <CardImgWrapper>
          <CardMedia
            sx={{ height: 140 }}
            image="https://picsum.photos/400/300"
            title="green iguana"
          />
          <IconButton
            aria-label="settings"
            sx={{
              position: "absolute",
              right: ".6rem",
              top: ".6rem",
              color: "white",
            }}
            onClick={(event) => {
              setAnchorEl(anchorEl ? null : event.currentTarget);
            }}
          >
            <MoreVertIcon />
          </IconButton>

          <StyledMenu
            open={open}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(null);
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ minWidth: 300 }}
          >
            <MenuItem>
              <ShareIcon sx={{ marginRight: "1rem" }} />
              分享
            </MenuItem>
            <MenuItem
              onClick={() => {
                deleteConfirmModalRef.current.openDeleteConfirmModal();
              }}
            >
              <DeleteOutlineIcon sx={{ marginRight: "1rem" }} />
              刪除
            </MenuItem>
          </StyledMenu>
        </CardImgWrapper>

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontWeight={800}
          >
            {t_Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t_StartDate} ~ {endDate}
          </Typography>
        </CardContent>
      </Card>
      <DeleteConfirmModal
        ref={deleteConfirmModalRef}
        t_Id={t_Id}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
}
