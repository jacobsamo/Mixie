"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { MouseEvent as ReactMouseEvent, useRef, useState } from "react";

interface CarouselProps {
  /**
   * The cards - items that will be rendered in the carousel
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Auto moves slides
   * @default false
   */
  autoplay?: boolean;
  /**
   * how fast the autoplay will play
   * @default 5000
   */
  autoPlayDelay?: number;
  /**
   * The number of slides that will be shown if screen sizes allows it
   * @default 3
   */
  count?: number;
  /**
   * Whether the carousel should loop
   * @default true
   */
  loop?: boolean;
  /**
   * The index of the slide that will be shown first
   * @default 1
   */
  startIndex?: number;
  /**
   * the threshold before dragging
   * @default 500
   */
  drag_threshold?: number;
  /**
   * The width of the slide in px
   * @default 500
   */
  fallback_width?: number;
  /**
   * The size of the cursor
   * @default 80
   */
  cursor_size?: number;
}

export default function Carousel({
  children,
  autoplay = false,
  count = 3,
  loop = true,
  cursor_size = 80,
  startIndex = 1,
  drag_threshold = 150,
  fallback_width = 500,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(startIndex);
  const childrens: any = React.Children.toArray(children);

  const canScrollPrev = activeSlide > 0;
  const canScrollNext = activeSlide < childrens.length - 1;

  const offsetX = useMotionValue(0);
  const animatedX = useSpring(offsetX, {
    damping: 20,
    stiffness: 150,
  });

  const [isDragging, setIsDragging] = useState(false);

  function handleDragSnap(
    _: MouseEvent | TouchEvent | PointerEvent,
    { offset: { x: dragOffset } }: PanInfo
  ) {
    //reset drag state
    setIsDragging(false);
    containerRef.current?.removeAttribute("data-dragging");

    //stop drag animation (rest velocity)
    animatedX.stop();

    const currentOffset = offsetX.get();

    //snap back if not dragged far enough or if at the start/end of the list
    if (
      Math.abs(dragOffset) < drag_threshold ||
      (!canScrollPrev && dragOffset > 0) ||
      (!canScrollNext && dragOffset < 0)
    ) {
      animatedX.set(currentOffset);
      return;
    }

    let offsetWidth = 0;
    /*
      - start searching from currently active slide in the direction of the drag
      - check if the drag offset is greater than the width of the current item
      - if it is, add/subtract the width of the next/prev item to the offsetWidth
      - if it isn't, snap to the next/prev item
    */
    for (
      let i = activeSlide;
      dragOffset > 0 ? i >= 0 : i < itemsRef.current.length;
      dragOffset > 0 ? i-- : i++
    ) {
      const item = itemsRef.current[i];
      if (item === null) continue;
      const itemOffset = item.offsetWidth;

      const prevItemWidth =
        itemsRef.current[i - 1]?.offsetWidth ?? fallback_width;
      const nextItemWidth =
        itemsRef.current[i + 1]?.offsetWidth ?? fallback_width;

      if (
        (dragOffset > 0 && //dragging left
          dragOffset > offsetWidth + itemOffset && //dragged past item
          i > 1) || //not the first/second item
        (dragOffset < 0 && //dragging right
          dragOffset < offsetWidth + -itemOffset && //dragged past item
          i < itemsRef.current.length - 2) //not the last/second to last item
      ) {
        dragOffset > 0
          ? (offsetWidth += prevItemWidth)
          : (offsetWidth -= nextItemWidth);
        continue;
      }

      if (dragOffset > 0) {
        //prev
        offsetX.set(currentOffset + offsetWidth + prevItemWidth);
        setActiveSlide(i - 1);
      } else {
        //next
        offsetX.set(currentOffset + offsetWidth - nextItemWidth);
        setActiveSlide(i + 1);
      }
      break;
    }
  }

  function scrollPrev() {
    //prevent scrolling past first item
    if (!canScrollPrev) return;

    const nextWidth = itemsRef.current
      .at(activeSlide - 1)
      ?.getBoundingClientRect().width;
    if (nextWidth === undefined) return;
    offsetX.set(offsetX.get() + nextWidth);

    setActiveSlide((prev) => prev - 1);
  }

  function scrollNext() {
    // prevent scrolling past last item
    if (!canScrollNext) return;

    const nextWidth = itemsRef.current
      .at(activeSlide + 1)
      ?.getBoundingClientRect().width;
    if (nextWidth === undefined) return;
    offsetX.set(offsetX.get() - nextWidth);

    setActiveSlide((prev) => prev + 1);
  }

  const [hoverType, setHoverType] = useState<"prev" | "next" | "click" | null>(
    null
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function navButtonHover({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
    const parent = currentTarget.offsetParent;
    if (!parent) return;
    const { left: parentLeft, top: parentTop } = parent.getBoundingClientRect();

    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const offsetFromCenterX = clientX - centerX;
    const offsetFromCenterY = clientY - centerY;

    mouseX.set(left - parentLeft + offsetFromCenterX / 4);
    mouseY.set(top - parentTop + offsetFromCenterY / 4);
  }

  function disableDragClick(e: ReactMouseEvent<HTMLAnchorElement>) {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <>
      <div className="relative overflow-hidden">
        <motion.div
          ref={containerRef}
          className="flex w-fit items-start"
          style={{
            x: animatedX,
          }}
          drag="x"
          dragConstraints={{
            left: -(fallback_width * (childrens.length - 1)),
            right: fallback_width,
          }}
          onDragStart={() => {
            containerRef.current?.setAttribute("data-dragging", "true");
            setIsDragging(true);
          }}
          onDragEnd={handleDragSnap}
        >
          {React.Children.map(children, (child, index) => {
            const active = index === activeSlide;
            return (
              <motion.div
                layout
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className={cn(
                  "group relative shrink-0 select-none px-3 transition-opacity duration-300"
                )}
                transition={{
                  ease: "easeInOut",
                  duration: 0.4,
                }}
                onDragStart={() => {
                  containerRef.current?.setAttribute("data-dragging", "true");
                  setIsDragging(true);
                }}
                onDragEnd={handleDragSnap}
              >
                {child}
              </motion.div>
            );
          })}
        </motion.div>

        <button
          id="prev"
          type="button"
          className="group absolute left-0 top-1/3 z-20 h-12 w-12 transition-colors"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          onMouseEnter={() => setHoverType("prev")}
          onMouseMove={(e) => navButtonHover(e)}
          onMouseLeave={() => setHoverType(null)}
        >
          <ChevronLeft className="h-10 w-10 stroke-[1.5] transition-colors group-enabled:group-hover:text-gray-900 group-disabled:opacity-50" />
        </button>

        <button
          id="next"
          type="button"
          className="group absolute right-0 top-1/3 z-20 h-12 w-12 transition-colors"
          onClick={scrollNext}
          disabled={!canScrollNext}
          onMouseEnter={() => setHoverType("next")}
          onMouseMove={(e) => navButtonHover(e)}
          onMouseLeave={() => setHoverType(null)}
        >
          <ChevronRight className="group-enabled:group-hover:text-gray h-10 w-10 stroke-[1.5] transition-colors group-disabled:opacity-50" />
        </button>
      </div>
    </>
  );
}
