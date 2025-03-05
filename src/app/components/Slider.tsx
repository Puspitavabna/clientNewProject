"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type SliderProps = {
  data: string[];
};

const Slider: React.FC<SliderProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll left or right
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of the container width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Check scroll position
  const checkScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Check scroll position on mount and whenever the container is scrolled
  useEffect(() => {
    checkScrollButtons();
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollButtons);
      }
    };
  }, []);

  return (
    <div className="relative mt-3 flex w-full items-center justify-between gap-4">
      {/* Left Scroll Button */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={`rounded-full p-2 transition-all duration-200 ${canScrollLeft
            ? "bg-black text-white hover:bg-gray-800"
            : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
      >
        <FaArrowLeft />
      </button>

      {/* Scrollable Content */}
      <div
        ref={containerRef}
         className="scrollbar-hide flex h-16 items-center gap-x-4 overflow-x-hidden whitespace-nowrap"
      >
        {data.map((item, index) => (
          <button
            key={index}
            className={`${item.includes('Home') ? 'text-sm font-semibold bg-black text-bold text-white' : 'bg-white'
              } border-2 rounded-md text-center p-3 uppercase transition-all duration-150 hover:bg-primary cursor-pointer hover:text-white text-[#231F20] w-70 h-20 sm:w-auto sm:h-auto`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={`rounded-full p-2 transition-all duration-200 ${canScrollRight
            ? "bg-black text-white hover:bg-gray-800"
            : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Slider;
