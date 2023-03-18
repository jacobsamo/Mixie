import React from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface SwiperTemplateProps {
  children: React.ReactNode;
}

/**   
   * Simple use of the swiper component  
   * @param children - JSX of the slides to be displayed in the swiper with the SwiperSlide component.
   */
const SwiperTemplate = ({ children }: SwiperTemplateProps) => {
  return (
    <Swiper
      loop
      grabCursor
      slidesPerView={3}
      spaceBetween={710}
      centeredSlides={true}
      centerInsufficientSlides={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Autoplay, Navigation]}
      navigation={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="w-full h-full justify-center"
    >
      {children}
    </Swiper>
  );
};

export default SwiperTemplate;


