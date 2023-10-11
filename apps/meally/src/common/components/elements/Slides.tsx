"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface SlidesTemplateProps {
  render: () => JSX.Element;
}

/**
 * Simple use of the Slides component
 * @param children - JSX of the slides to be displayed in the Slides with the SlidesSlide component.
 */
const Slides = ({ render }: SlidesTemplateProps) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay
      navigation={true}
      modules={[Navigation]}
    >
      {render()}
    </Swiper>
  );
};

export default Slides;
