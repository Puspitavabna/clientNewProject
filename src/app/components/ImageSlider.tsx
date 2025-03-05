"use client";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import camp from "/public/camp.jpg";

type ImageSliderProps = {
  data: { src: StaticImageData; alt: string }[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ data }) => {
  const divsPerSlide = 3; // Number of divs per slide
  const imagesPerDiv = 3; // Number of images per div
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group images into divs
  const groupedDivs = Array.from(
    { length: Math.ceil(data.length / imagesPerDiv) },
    (_, index) => data.slice(index * imagesPerDiv, (index + 1) * imagesPerDiv),
  );

  // Group divs into slidesss
  const slides = Array.from(
    { length: Math.ceil(groupedDivs.length / divsPerSlide) },
    (_, index) =>
      groupedDivs.slice(index * divsPerSlide, (index + 1) * divsPerSlide),
  );

  // Handle left arrow click
  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  // Handle right arrow click
  const handleRightClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Check if the left or right arrow should be disabled
  const isLeftDisabled = currentIndex === 0;
  const isRightDisabled = currentIndex === slides.length - 1;

  return (
    <section className="mb-0 w-full">
      <div className="">
        {/* Slides Container */}
        <div
          className="flex p-2 transition-transform duration-500 flex-wrap"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // Slide horizontally
            width: `${slides.length * 100}%`, // Adjust width for all slides
          }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              className="flex"
              style={{ flex: "0 0 100%" }} // Each slide takes full width
            >
              {slide.map((div, divIndex) => (
                <div
                  key={divIndex}
                  className="flex bg-white p-4 gap-y-2 w-20 lg:w-24 xl:w-30 rounded-md m-1 xl:m-4"
                >
                  {" "}
                  {/* Center images in each div */}
                  {div.map((image, imageIndex) => (
                    <div key={imageIndex} className="flex justify-center">
                      {" "}
                      {/* Center image horizontally */}
                      <Image
                        src={camp} // Path to the image (ensure it's accessible from the public folder or an external URL)
                        alt={image.alt} // Alt text for accessibility
                        width={50} // Fixed width (Next.js requires width and height for optimization)
                        height={50} // Fixed height
                        style={{
                          objectFit: "contain", // Prevents distortion by maintaining the aspect ratio
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow Controls */}
      <div className="mt-4 flex justify-start gap-x-4">
        <button
          onClick={handleLeftClick}
          className={`flex h-8 w-8 items-center justify-center rounded-full ${isLeftDisabled ? "bg-gray-500" : "bg-[#2C3539]"} text-white`}
          disabled={isLeftDisabled}
        >
          {/* ← */}
          <FaArrowLeft />
        </button>
        <button
          onClick={handleRightClick}
          className={`flex h-8 w-8 items-center justify-center rounded-full ${isRightDisabled ? "bg-gray-500" : "bg-[#2C3539]"} text-white`}
          disabled={isRightDisabled}
        >
          {/* → */}
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default ImageSlider;
