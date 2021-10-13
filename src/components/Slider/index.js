import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.scss"

export default function SimpleSlider() {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [dataBanner, setDataBanner] = useState([
    {
      id: 1,
      src: "https://cdn.cellphones.com.vn/media/ltsoft/promotion/smb-690-300-max.png",
      text: {text1: "Tháng thành viên", text2: "Ưu đãi tên miền"}
    },
    {
      id: 2,
      src: "https://cdn.cellphones.com.vn/media/ltsoft/promotion/690x300_A52s_2.png",
      text: {text1: "GALAXY A52S 5G", text2: "Ưu đãi cực lớn"}
    },
    {
      id: 3,
      src: "https://cdn.cellphones.com.vn/media/ltsoft/promotion/_ol-690-300-max.png",
      text: {text1: "ZENBOOK 13 OLED", text2: "Giá tốt mua ngay"}
    },
    {
      id: 4,
      src: "https://cdn.cellphones.com.vn/media/ltsoft/promotion/htb-690-300-max.png",
      text: {text1: "IPHONE 12 MINI", text2: "Hàng trưng bày"}
    },
    {
      id: 5,
      src: "https://cdn.cellphones.com.vn/media/ltsoft/promotion/tbyt-690-300-max.png",
      text: {text1: "WIFI MESH TP-LINK", text2: "Bảo vệ sức khỏe"}
    }
  ]
   
  );
const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    // cssEase: "linear"
}
  return (
      
    <div>
      <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}  {...settings} >
       {dataBanner.map((data) => {
         return (
           <div key={data.id}>
             <img alt ="" src={data.src} />
           </div>
         )
       })}
        
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
      >
       {dataBanner.map((data) => {
         return (
           <div key={data.id}>
             <p>{data.text.text1} <br /> {data.text.text2}</p>
           </div>
         )
       })}
      </Slider>
    </div>
  );
}
