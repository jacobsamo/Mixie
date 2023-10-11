"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode;
  autoplay?: boolean;
  speed?: number;
}

const Carousel = ({ children, autoplay = true, speed = 3000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const numSlides = React.Children.count(children);

  useEffect(() => {
    let timer;

    if (autoplay) {
      timer = setInterval(() => {
        setCurrentSlide((currentSlide + 1) % numSlides);
      }, speed);
    }

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide, numSlides, autoplay, speed]);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % numSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + numSlides) % numSlides);
  };

  return (
    <div className="relative">
      <div className="flex">
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 transform"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {React.Children.map(children, (child, index) => (
              <div className="w-full">{child}</div>
            ))}
          </div>
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 transform"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
