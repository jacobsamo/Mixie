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
  const [activeIndex, setActiveIndex] = useState([0, count]);
  const numSlides = React.Children.count(children);

  function prev() {
    setActiveIndex([activeIndex[0] - 1, activeIndex[1] - 1]);
    console.log("Active index", activeIndex);
  }

  function next() {
    setActiveIndex([activeIndex[0] + 1, activeIndex[1] + 1]);
    console.log("Active index", activeIndex);
  }

  return (
    <div id="carousel" className="flex flex-row items-center justify-between">
      <button aria-label="back" onClick={() => prev()}>
        <ChevronLeft />
      </button>
      <div
        id="track"
        className="flex h-full w-full flex-row items-center justify-center gap-4 overflow-hidden transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div id={`card-${index}`} key={index}>
            {child}
          </div>
        ))}
      </div>
      <button aria-label="forward" onClick={() => next()}>
        <ChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
