import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import "./styles.scss";

// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);

export default function SliderDetail(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const {images} = props.product

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2"
      >
      {
        images === undefined ? "" : images.map((imgSrc) => {
          return (
            <SwiperSlide key={imgSrc}>
              <img src={imgSrc} alt="" />
            </SwiperSlide>
          )
        })
      }
       
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className="mySwiper"
      >
          {
        images === undefined ? "" : images.map((imgSrc) => {
          return (
            <SwiperSlide key={imgSrc}>
              <img src={imgSrc} alt="" />
            </SwiperSlide>
          )
        })
      }
      </Swiper>
    </>
  );
}
