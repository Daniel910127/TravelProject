import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { styled } from "@mui/material/styles";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import trimPrefix from "../../utils/trimPrefix";
const SwiperWrapper = styled("div")(({ theme }) => ({
  position: "relative",
}));

const SwiperContainer = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "6px",
}));

const NavigationWrapper = styled("div")(({ theme }) => ({}));

export default function SpotGallery(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { s_picture } = props;
  const trimPictures = s_picture.map((p) => {
    // console.log(trimPrefix(p))
    return trimPrefix(p);
  });

  const swiperRef = useRef();
  return (
    <div className="gallery-container">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={10}
        freeMode={true}
        loop
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Thumbs, Navigation]}
        className="mySwiper2"
      >
        {trimPictures.map((picture,index) => (
          <SwiperSlide key={index}>
            <img src={`http://127.0.0.1:8000${picture.URL}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <SwiperWrapper>
        <SwiperContainer>
          <NavigationWrapper>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                swiperRef.current?.slidePrev();
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
          </NavigationWrapper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={3}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumbSwiper"
          >
            {trimPictures.map((picture,index) => (
              <SwiperSlide key={index}>
                <img src={`http://127.0.0.1:8000${picture.URL}`} />
              </SwiperSlide>
            ))}
          </Swiper>
          <NavigationWrapper>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </NavigationWrapper>
        </SwiperContainer>
      </SwiperWrapper>
    </div>
  );
}

//thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
