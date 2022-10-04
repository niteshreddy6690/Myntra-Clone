// Import Swiper React components
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Img = styled.img`
  box-sizing: border-box;
  margin-top: 2rem;
  width: 100%;
  height: 85%;
`;
const NavLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

const Slider = ({ sliders }) => {
  return (
    <>
      <Swiper
        style={{ height: "575px" }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Autoplay, Pagination]}
      >
        <>
          {sliders?.map((item) => (
            <SwiperSlide key={item.id}>
              <NavLink to={item.to} key={item.id}>
                <Img src={item.img} key={item.id} />
              </NavLink>
            </SwiperSlide>
          ))}
        </>
      </Swiper>
    </>
  );
};

export default Slider;
