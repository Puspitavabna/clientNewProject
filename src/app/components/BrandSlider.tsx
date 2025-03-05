"use client";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

type BrandSliderProps = {
  data: { src: StaticImageData; alt: string }[];
};

const BrandSlider: React.FC<BrandSliderProps> = ({ data }) => {
  const divsPerSlide = 5; // Number of divs per slide
  const imagesPerDiv = 1; // Number of images per div
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group images into divs
  const groupedDivs = Array.from(
    { length: Math?.ceil(data && data?.length / imagesPerDiv) },
    (_, index) => data && data?.slice(index * imagesPerDiv, (index + 1) * imagesPerDiv),
  );

  // Group divs into slides
  const slides = Array.from(
    { length: Math?.ceil(groupedDivs.length / divsPerSlide) },
    (_, index) =>
      groupedDivs?.slice(index * divsPerSlide, (index + 1) * divsPerSlide),
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
    <section className="mb-0">
      <div className="relative mt-6 overflow-hidden">
        {/* Slides Container */}
        <div
          className="flex p-2 transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // Slide horizontally
            width: `${slides.length * 100}%`, // Adjust width for all slides
          }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              className="flex w-full gap-x-6"
              style={{ flex: "0 0 100%" }} // Each slide takes full width
            >
              {slide.map((div, divIndex) => (
                <div
                  key={divIndex}
                  className="flex flex-col items-center gap-y-2"
                >
                  {" "}
                  {/* Center images in each div */}
                  {div.map((image, imageIndex) => (
                    <div key={imageIndex} className="flex justify-center">
                      <Image
                        src={image.src.src} // Path to the image (ensure it's accessible from the public folder or an external URL)
                        alt={image.alt} // Alt text for accessibility
                        width={70} // Fixed width (Next.js requires width and height for optimization)
                        height={70} // Fixed height
                        style={{
                          objectFit: "contain", // Prevents distortion by maintaining the aspect ratio
                          height: "32px",
                          width: "auto",
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
      {slides.length > 1 && (
        <div className="mt-4 flex justify-start gap-x-4">
          <button
            onClick={handleLeftClick}
            className={`flex h-[16px] w-[28px] items-center justify-center rounded-s-3xl ${isLeftDisabled ? "bg-gray-500" : "bg-[#2C3539]"} text-[#151B54]`}
            disabled={isLeftDisabled}
          >
            ←
          </button>
          <button
            onClick={handleRightClick}
            className={`flex h-[16px] w-[28px] items-center justify-center rounded-e-3xl ${isRightDisabled ? "bg-gray-500" : "bg-[#2C3539]"} text-[#151B54]`}
            disabled={isRightDisabled}
          >
            →
          </button>
        </div>
      )}
      {/* <div className="mt-4 flex justify-start gap-x-4">
        <button
          onClick={handleLeftClick}
          className={`flex h-[16px] w-[28px] items-center justify-center rounded-s-3xl ${isLeftDisabled ? "bg-gray-500" : "bg-[#2C3539]"} text-[#151B54]`}
          disabled={isLeftDisabled}
        >
          ←
        </button>
        <button
          onClick={handleRightClick}
          className={`flex h-[16px] w-[28px] items-center justify-center rounded-e-3xl ${isRightDisabled ? "bg-gray-500" : "bg-[#2C3539]"} text-[#151B54]`}
          disabled={isRightDisabled}
        >
          →
        </button>
      </div> */}
    </section>
  );
};

export default BrandSlider;
