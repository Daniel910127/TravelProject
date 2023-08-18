import React from "react";
import { useEffect, useRef } from "react";
import SpotGallery from "./SpotGallery";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "antd";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import trimPrefix from "../../utils/trimPrefix";
export default function SpotCard(props) {
  console.log('props',props);
  // const {
  //   s_Name,
  //   s_picture,
  //   s_Summary,
  //   s_OpenTime,
  //   s_Tel,
  //   s_Address,
  //   s_Category,
  // } = props.spot;

  const {spot} = props;
  const trimSpot = trimPrefix(spot)

  const {
    Name,
    picture,
    Summary,
    OpenTime,
    Tel,
    Address,
    Category,
  } = trimSpot;
  // const tel_link = useRef();
  // useEffect(() => {
  //   tel_link.current.href = `tel:${s_Tel}`;
  // }, [s_Tel]);
  const category = Category.split(",");
  // console.log( s_Category,category)
  //console.log(s_Name);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <SpotGallery s_picture={picture}></SpotGallery>
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {Summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
