import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomMuiTypography from "../../CustomMuiTypography";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const Card = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: `1.5px dashed ${grey[400]}`,
  height: "60px",
  borderRadius: "4px",
  overflow: "hidden",
}));

const CardContent = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "60px",
}));

const CardMedia = styled("img")(({ theme }) => ({
  width: "60px",
  height: "60px",
  objectFit: "cover",
}));

export default function SlideCard() {
  return (
    <Card>
      <CardContent>
        <CardMedia src="https://picsum.photos/300/200" />
        <CustomMuiTypography
          variant="h5"
          sx={{
            wordBreak: "break-word",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            marginLeft: "10px",
          }}
        >
          adsfdflfdfgklldflkflfdfgklldflkflfdfgklldflk
        </CustomMuiTypography>
      </CardContent>

      <div>
        <IconButton aria-label="delete" size="small">
          <AddCircleOutlineIcon fontSize="small" />
        </IconButton>
      </div>
    </Card>
  );
}
