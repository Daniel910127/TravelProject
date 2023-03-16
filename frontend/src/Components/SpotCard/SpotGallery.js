import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SpotGallery(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { s_picture } = props;
  const swiperRef = useRef();
  //console.log(s_picture);
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
        {s_picture.map((picture) => (
          <SwiperSlide key={picture.sp_Id}>
            <img src={`http://127.0.0.1:8000${picture.sp_URL}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {s_picture.map((picture) => (
          <SwiperSlide key={picture.sp_Id}>
            <img src={`http://127.0.0.1:8000${picture.sp_URL}`} />
          </SwiperSlide>
        ))}

        <button
          slot="container-start"
          className="pre-slide"
          onClick={() => swiperRef.current.slidePrev()}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-angle-left"
            size="2x"
            className="arrow-icon"
          />
        </button>
        <button
          slot="container-end"
          className="next-slide"
          onClick={() => swiperRef.current.slideNext()}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-angle-right"
            size="2x"
            className="arrow-icon"
          />
        </button>
      </Swiper>
    </div>
  );
}

//thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
