"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  LazyMotion,
  domAnimation,
  ValueAnimationTransition,
  PanInfo,
} from "framer-motion";

interface CarouselProps {
  /**
   * The cards - items that will be rendered in the carousel
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Auto moves slides
   */
  autoplay?: boolean;
  /**
   * how fast the autoplay will play
   */
  autoPlayDelay?: number;
  /**
   * The number of slides that will be shown if screen sizes allows it
   */
  count?: number;
  loop?: boolean;
  transition?: ValueAnimationTransition<number>;
  averageWidth?: number;
}

const Carousel = ({
  children,
  autoplay = false,
  count = 3,
  loop = true,
  transition = {
    ease: "easeInOut",
    duration: 0.5,
  },
  averageWidth = 300,
}: CarouselProps) => {
  const x = useMotionValue(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragEndX, setDragEndX] = useState(0);
  const childrens: any = React.Children.toArray(children);

  const calculateNewX = React.useCallback(
    () => -index * averageWidth,
    [index, averageWidth]
  );

  const handleNext = React.useCallback(() => {
    const idx = loop ? 0 : index;
    const nextIndex = index + 1 === childrens.length ? idx : index + 1;
  
    setIndex(nextIndex);
  }, [index, loop, childrens.length]);

  const handlePrev = () => {
    
    const idx = loop ? childrens.length - 1 : 0;
  
    const newIndex = index - 1 < 0 ? idx : index - 1;

    setIndex(newIndex);
  };

  const handleDragStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartX(event.touches[0].clientX);
  };

  const handleDragEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setDragEndX(event.changedTouches[0].clientX);
    if (dragStartX - dragEndX > 50) {
      handleNext();
    } else if (dragStartX - dragEndX < -50) {
      handlePrev();
    }
  };

  React.useEffect(() => {
    const controls = animate(x, calculateNewX(), transition);

    return controls.stop;
  }, [calculateNewX, index, x, transition]);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      animate(x, calculateNewX(), transition);
    });
  }, [calculateNewX, transition, x]);

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      <button
        aria-label="back"
        id="back-arrow"
        onClick={handlePrev}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform"
      >
        <ChevronLeft />
      </button>

      <motion.div
        id="track"
        className="flex flex-row gap-4"
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        style={{
          x,
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            id={`card-${index}`}
            key={index}
            style={{
              x,
            }}
            className="inline-block  flex-none"
          >
            {child}
          </motion.div>
        ))}
      </motion.div>

      <button
        aria-label="forward"
        id="forward-arrow"
        onClick={handleNext}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
