import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Slider from "../components/Slider/Slider";
import { menSlider } from "../components/Slider/SliderData";

const Men = () => {
  return (
    <div>
      <Navbar />
      <Slider sliders={menSlider} />
    </div>
  );
};

export default Men;
