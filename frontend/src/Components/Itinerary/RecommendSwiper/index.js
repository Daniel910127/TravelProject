import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { styled } from "@mui/material/styles";
// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
import "./styles.css";

// import required modules
import { Navigation } from "swiper";
import SlideCard from "./SlideCard";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const SwiperWrapper = styled("div")(({ theme }) => ({
  position: "relative",
}));

const SwiperContainer = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems:'center',
  gap:'6px'
}));

const NavigationWrapper = styled("div")(({ theme }) => ({}));

export default function RecommendSwiper() {
    const [isFirstSlide, setIsFirstSlide] = useState(true);
    const [isLastSlide, setIsLastSlide] = useState(false);
  const swiperRef = useRef();
  const handleSlideChange = () => {
    setIsFirstSlide(swiperRef.current?.isBeginning);
    setIsLastSlide(swiperRef.current?.isEnd);
  };


  if(swiperRef.current){
    console.log(swiperRef.current.isBeginning,'is beginning',swiperRef.current.isEnd,'is end')
  }
  
  return (
    <SwiperWrapper>
      <SwiperContainer>
        <NavigationWrapper>
          <IconButton
            aria-label="delete"
            size="small"

            onClick={() => {swiperRef.current?.slidePrev();
            }}
            sx={{visibility: isFirstSlide ? "hidden" : "visible"}}            
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
        </NavigationWrapper>

        <Swiper
          slidesPerView={2.5}
          spaceBetween={8}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;

          }}
          onSlideChange={handleSlideChange}
        //   onReachBeginning={}
          modules={[Navigation]}
          className="recommendSwiper"
        >
          <SwiperSlide>
            <SlideCard />
          </SwiperSlide>
          <SwiperSlide>
            <SlideCard />
          </SwiperSlide>
          <SwiperSlide>
            <SlideCard />
          </SwiperSlide>
          <SwiperSlide>
            <SlideCard />
          </SwiperSlide>
          <SwiperSlide>
            <SlideCard />
          </SwiperSlide>
          <SwiperSlide>
            <SlideCard />
          </SwiperSlide>
        </Swiper>

        <NavigationWrapper>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => swiperRef.current?.slideNext()}
            sx={{visibility: isLastSlide ? "hidden" : "visible"}} 
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </NavigationWrapper>
      </SwiperContainer>
    </SwiperWrapper>
  );
}
