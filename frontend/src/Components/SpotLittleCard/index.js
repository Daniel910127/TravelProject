import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardActionArea } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
const ImageCardWrapper = styled("div")(({ theme }) => ({
  overflow: "hidden",
}));

export default function RecipeReviewCard(props) {
  const { s_Id, s_Name, s_Pictures, s_District } = props;
  // console.log(s_Pictures);
  return (
    <Card
      sx={{
        height: "100%",
        flexGrow: 1,
        position: "relative",
        "&:hover .MuiCardMedia-img": {
          transform: "scale(1.1)", // 通过将图像放大10%来放大图像
          transition: "transform 0.2s ease-in-out", // 为过渡效果添加0.2秒的动画效果
        },
        "&:not(:focus):not(:hover) .MuiCardMedia-img": {
          transform: "scale(1)", // 将图像缩小回原始大小
          transition: "transform 0.2s ease-in-out", // 为过渡效果添加0.2秒的动画效果
        },
      }}
    >
      <ImageCardWrapper>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:8000${s_Pictures[0].sp_URL}`}
          alt="Paella dish"
        />
      </ImageCardWrapper>
      <CardContent sx={{ marginBottom: 2 }}>
        <Typography
          gutterBottom
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            fontSize: "1.2rem",
          }}
        >
          {s_Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {s_District}
        </Typography>
      </CardContent>

      <Box sx={{ position: "absolute", right: 0, bottom: 0 }}>
        <IconButton
          aria-label="add to favorites"
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            console.log("Button clicked");
          }}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="share"
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            console.log("Button clicked");
          }}
        >
          <ShareIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
