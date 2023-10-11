"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface CarouselProps {
  /**
   * The cards - items that will be rendered in the carousel
   */
  children: React.ReactNode;
  /**
   * Auto moves slides
   */
  autoplay?: boolean;
  /**
   * how fast the autoplay will play
   */
  speed?: number;
  /**
   * The number of slides that will be shown if screen sizes allows it
   */
  count?: number;
}

/**
 *
 * @param {React.ReactNode} children - the slides to be rendered
 * @param {boolean} autoplay - will automatically move slides
 * @param {number} speed - how fast the autoplay will go
 * @param {number} count - number of slides shown
 * @returns {React.JSX.Element} Carousel
 */
const Carousel = ({
  children,
  autoplay = true,
  speed = 500,
  count = 3,
}: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const numSlides = React.Children.count(children);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % numSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + numSlides) % numSlides);
  };

  return (
    <div className="relative flex w-full flex-row justify-between">
      <button aria-label="back" onClick={prevSlide}>
        <ChevronLeft />
      </button>
      <div className="relative w-full">
        <div
          id="track"
          className="flex h-full w-full flex-row items-center justify-center gap-4 overflow-hidden"
        >
          {React.Children.map(children, (child, index) => (
            <div
              id={`card-${index}`}
              key={index}
              className="w-full translate-x-0 transform transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <button aria-label="forward" onClick={nextSlide}>
        <ChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
