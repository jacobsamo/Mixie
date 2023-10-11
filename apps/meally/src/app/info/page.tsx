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
      <div className="bg-red-500 h-64">1</div>
      <div className="bg-blue-500 h-64">2</div>
      <div className="bg-green-500 h-64">3</div>
    </Carousel>
  );
};
