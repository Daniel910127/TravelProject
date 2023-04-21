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

const ImageCardWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  overflow: "hidden",
}));

export default function RecipeReviewCard() {
  return (
    <Card
      sx={{
        maxWidth: 300,
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
      <CardActionArea component="a">
        <ImageCardWrapper>
          <CardMedia
            component="img"
            height="194"
            image="https://picsum.photos/200/300"
            alt="Paella dish"
            sx={{}}
          />
        </ImageCardWrapper>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "end" }}
        >
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
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
