"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Carousel from "@/src/common/components/elements/Carousel";

export default () => {
  return (
    <Carousel autoplay={true} speed={3000}>
      <div className="bg-yellow h-64 w-64">1</div>
      <div className="bg-peach h-64 w-64 rounded-md">2</div>
      <div className="bg-red h-64 w-64 rounded-md">3</div>
    </Carousel>
  );
};
