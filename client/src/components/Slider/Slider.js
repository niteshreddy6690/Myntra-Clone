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
  object-fit: contain;
`;
const NavLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

const SwiperCarousel = styled(Swiper)`
  padding:0px 0px 30px 0px;

  .swiper-pagination-bullet {
    background: #d4d5d9;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    opacity: 1;
    
  }

  .swiper-pagination-bullet-active {
    background-color: #ff3f6c;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }
`;

const Slider = ({ sliders }) => {
  return (
    <>
      <SwiperCarousel
        // style={{ height: "55px" }}
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
      </SwiperCarousel>
    </>
  );
};

export default Slider;
