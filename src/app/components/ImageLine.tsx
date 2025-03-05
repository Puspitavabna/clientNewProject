"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ImageLine(placeholderData:any ) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [linePoints, setLinePoints] = useState<number[]>([]); // Store positions for bold points

  const handleImageLoad = () => {
    const allImages = document.querySelectorAll(".article img");
    const loadedImages = Array.from(allImages).every((img) => img.complete);

    if (loadedImages) {
      setImagesLoaded(true); // Trigger the effect only when all images are loaded
    }
  };

  useEffect(() => {
    if (imagesLoaded && lineRef.current) {
      const container = document.querySelector(".image-container");

      if (container) {
        const articles = container.querySelectorAll("article");

        if (articles.length > 1) {
          const firstImg = articles[0].querySelector("img");
          const lastImg = articles[articles.length - 1].querySelector("img");

          if (firstImg && lastImg) {
            const firstRect = firstImg.getBoundingClientRect();
            const lastRect = lastImg.getBoundingClientRect();

            // Dynamically calculate start and end points based on images
            const startX = firstRect.left + firstRect.width / 2 - 15; // Center of the first image
            const endX = lastRect.left + lastRect.width / 2 - 15; // Center of the last image

            // Dynamically calculate start and end points based on images
            //const startX = firstRect.left + firstRect.width / 2;  // Center of the first image
            //const endX = lastRect.left + lastRect.width / 2;  // Center of the last image

            // const startX = 190; // Start point at 190px
            //const endX = 1079.5; // End point at 1079.5px

            const width = endX - startX;

            if (width > 0) {
              lineRef.current.style.left = `${startX}px`;
              lineRef.current.style.width = `${width}px`;
              lineRef.current.style.position = "absolute";

              // Ensure we have exactly 6 points along the line
              const points = [];
              const interval = width / 8; // 5 intervals create 6 points
              for (let i = 0; i < 8; i++) {
                points.push(startX - 20 + i * interval); // 6 points
              }
              setLinePoints(points); // Store the points for rendering
            }
          }
        }
      }
    }
  }, [imagesLoaded]);

  return (
    <div className="image-container relative flex justify-center gap-x-52">
      {placeholderData.map((data:any, i:any) => (
        <article
          className="article relative mx-4 inline-block max-w-[200px] text-center text-sm text-[#000000]"
          key={i}
        >
          <div className="image-wrapper relative z-10 mx-auto mb-3 h-[60px] w-[60px] ">
            <Image
              src={data.icon}
              alt="icon"
              fill
              objectFit="contain"
              onLoadingComplete={handleImageLoad} // Trigger when image loads
            />
          </div>
          <h3 className="mb-3 text-base font-bold">{data.title}</h3>
          <p className="mb-3 text-[#000000]">{data.text}</p>
          <button className="rounded bg-[#FFB200] px-4 py-2 text-xs font-semibold uppercase text-black transition-all duration-150 hover:bg-black hover:text-white">
            Read more
          </button>
        </article>
      ))}
      {/* Line element behind the images */}
      <div
        ref={lineRef}
        className="absolute top-[29px] z-0 h-[2px] bg-[#000]"
      ></div>

      {/* Bold points along the line */}
      {linePoints.map((point, index) => (
        <div
          key={index}
          style={{ left: `${point}px` }}
          className="absolute top-[27px] h-[8px] w-[8px] rounded-full bg-[#000]"
        ></div>
      ))}
    </div>
  );
}
