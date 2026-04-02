"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryContainer from "../categoryContainer/categoryContainer";

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next" onClick={onClick}>
    &#10095;
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev" onClick={onClick}>
    &#10094;
  </div>
);

export default function Departments2({ departments, onClick }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: false,

    // ✅ RESPONSIVE FIX (IMPORTANT)
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 3 },
      },
    ],
  };

  return (
    <div className="categories_slider_wrapper">
      <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />

      <div className="categories_slider">
        <Slider ref={sliderRef} {...settings}>
          {departments?.map((cat) => (
            <CategoryContainer
              key={cat._id}
              image={cat.image_2}
              name={cat.name}
              onClick={() => onClick(cat._id)}
            />
          ))}
        </Slider>
      </div>

      <NextArrow onClick={() => sliderRef.current?.slickNext()} />
    </div>
  );
}