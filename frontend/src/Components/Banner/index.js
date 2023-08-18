import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "./style.css";
import { Link } from "react-router-dom";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import axios from "axios";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { authApi } from "../../utils/apis/authApi";

export default function Banner() {
  const [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    authApi
      .get("/spot/1")
      .then((response) => {
        // console.log("Response:", response.data);
        setBannerList(response.data.data.s_picture);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }, []);
  return (
    <Box sx={{ position: "relative" }}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="myBannerSwiper"
      >
        {bannerList.map((banner) => {
          return (
            <SwiperSlide key={banner.sp_Id}>
              <img src={`http://localhost:8000${banner.sp_URL}`} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" color={"white"}>
          發現台南之美
        </Typography>
        <Typography variant="h5" color={"white"} sx={{ marginBottom: 2 }}>
          AI智能規劃旅程 品味古都風華
        </Typography>

        <Button variant="contained" component={Link} to={"/itinerary/create"}>
          立即規劃
        </Button>
      </Box>
    </Box>
  );
}
