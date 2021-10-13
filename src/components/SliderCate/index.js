import React from "react";
import Slider from "react-slick";

export default function SliderCate(props) {
  const {autoSpeed} = props
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: autoSpeed,
    };

    return (
      <div>
        <Slider {...settings}>
          <div>
            <img src="https://cdn.cellphones.com.vn/media/resized//ltsoft/promotioncategory/ff-c595-100-max.png" alt="" />
          </div>
          <div>
            <img src="https://cdn.cellphones.com.vn/media/resized//ltsoft/promotioncategory/ff-c595-100-max.png" alt="" />
          </div>
          <div>
            <img src="https://cdn.cellphones.com.vn/media/resized//ltsoft/promotioncategory/ff-c595-100-max.png" alt="" />
          </div>
          <div>
            <img src="https://cdn.cellphones.com.vn/media/resized//ltsoft/promotioncategory/ff-c595-100-max.png" alt="" />
          </div>
          <div>
            <img src="https://cdn.cellphones.com.vn/media/resized//ltsoft/promotioncategory/ff-c595-100-max.png" alt="" />
          </div>
     
        </Slider>
      </div>
    );
  
}