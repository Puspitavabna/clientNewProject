"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type SliderProps = {
  data: (string | React.ReactNode)[]; // data can be image URLs or icon components
};

const SliderIcon: React.FC<SliderProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const checkScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

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
    <div className="relative m-4 flex items-center gap-x-4 overflow-hidden bg-tertiary">
      {/* Left Scroll Button */}
      <button
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className={`flex h-8 w-8 min-w-8 items-center justify-center rounded-full ${canScrollLeft ? "bg-black text-[#CCCCFF]" : "bg-gray-500 text-[#CCCCFF]"}`}
      >
        <FaArrowLeft />
      </button>
      {/* Scrollable Content */}
      <div
        ref={containerRef}
        className="scrollbar-hide flex h-16 items-center gap-x-4 overflow-x-hidden whitespace-nowrap"
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 rounded bg-white px-4 py-2 text-center font-semibold uppercase transition-all duration-150 hover:bg-black hover:text-white"
          >
            {typeof item === "string" ? (
              // <img src={item} alt={`image-${index}`} className="h-10 w-10 object-contain" />
              <Image
                src={item}
                alt={`image-${index}`}
                width={40}
                height={40}
                className="object-contain"
              />
            ) : (
              item
            )}
          </div>
        ))}
      </div>
      {/* Right Scroll Button */}
      <button
        onClick={scrollRight}
        disabled={!canScrollRight}
        className={`flex h-8 w-8 min-w-8 items-center justify-center rounded-full ${canScrollRight ? "bg-black text-[#CCCCFF]" : "bg-gray-500 text-[#CCCCFF]"}`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default SliderIcon;
