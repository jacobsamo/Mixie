import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

interface SwiperTemplateProps {
  children: React.ReactNode;
}

/**
 * Simple use of the swiper component
 * @param children - JSX of the slides to be displayed in the swiper with the SwiperSlide component.
 */
const SplideTemplate = ({ children }: SwiperTemplateProps) => {
  return (
    <Splide
      options={{
        type: 'loop',
        gap: '10rem',
        autoplay: true,
        pauseOnHover: false,
        resetProgress: false,
        focus: 'center',
        // perPage: 3,
      }}
    >
      {children}
    </Splide>
  );
};

export default SplideTemplate;
