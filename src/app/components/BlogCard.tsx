"use client";
import Image from "next/image";
import { useState } from "react";
import ReactDOM from "react-dom";
import { ArchitectureDataProps } from "../(landing-pages)/real-estate/definition";
import { formatISODateString } from "../lib/formatISODateString";
import Line from "./Line";
import ModalNews from "./ModalNews";
import canoe from "/public/canoe.jpg";

const BlogCard = ({ data }: { data: ArchitectureDataProps }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flip-card relative h-[450px] w-full max-w-[350px] shadow-xl sm:max-w-[400px] md:max-w-[450px]">
      <div className="flip-card-inner hover:rotate-y-180 h-full w-full transform transition duration-500 ease-in-out">
        <BlogCardFront data={data} />
        <BlogCardBack data={data} onClick={openModal} />
      </div>

      {/* Modal rendering outside the card using portal */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <ModalNews onClose={closeModal}>
              <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
                <div className="relative w-full max-w-screen-lg rounded-md bg-tertiary">
                  {/* Modal Content */}
                  <div className="grid max-h-[90vh] grid-cols-1 gap-4 overflow-y-auto p-6 md:grid-cols-2 md:p-10">
                    {/* First Column: Image */}
                    <div className="relative h-[300px] w-full overflow-hidden rounded bg-yellow-50 sm:h-[400px]">
                      <Image
                        alt="Mountains"
                        src={canoe}
                        placeholder="blur"
                        quality={100}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Second Column: Text */}
                    <div className="flex flex-col rounded bg-white p-4">
                      {/* Date with PNG Icon */}
                      <div className="mb-2 flex items-center text-[#00000099]">
                        <Image
                          src="/images/solar_calendar-bold.png"
                          alt="Calendar Icon"
                          className="mr-2 h-5 w-5"
                          width={20}
                          height={20}
                        />
                        {formatISODateString(data.createdAt)}
                      </div>
                      <Line color="#151B54" />
                      <h2 className="mt-2 text-xl font-bold md:text-2xl">
                        {data.title}
                      </h2>
                      <p className="mt-2 text-[#00000099]">
                        {data.description.length > 100
                          ? `${data.description.slice(0, 100)}...`
                          : data.description}
                      </p>
                    </div>

                    {/* Spanning Row: Full Width */}
                    <div className="rounded bg-white p-4 md:col-span-2">
                      <Line color="#151B54" />
                      <p className="mb-2 mt-2">Description</p>
                      <p>{data.description}</p>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    className="absolute right-2 top-1 flex h-7 w-7 items-center justify-center rounded-xl border-2 border-black text-2xl text-black hover:text-gray-800"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                </div>
              </div>
            </ModalNews>
          </div>,
          document.body, // Render modal outside the card (in the body)
        )}
    </div>
  );
};

const BlogCardFront = ({ data }: { data: ArchitectureDataProps }) => {
  return (
    <article className="flip-card-front absolute flex h-full w-full flex-col overflow-hidden rounded-md bg-white p-4">
      {/* Image Section */}
      <header className="relative h-[50%] w-full  rounded-t-md overflow-hidden">
        <Image
          alt="Mountains"
          src={canoe}
          placeholder="blur"
          quality={100}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
          style={{
            objectFit: "cover",
          }}
          className="rounded-t-md"
        />
      </header>


      {/* Content Section */}
      <main className="flex-1 p-2">
        <p className="text-lg text-[#727272]">
          {formatISODateString(data.createdAt)}
        </p>
        <h3
          className="text-lg pt-2 font-bold capitalize text-black"
        >
          {data.title}
        </h3>
        <p className="mt-2 text-lg text-[#00000099]">{data.description}</p>
      </main>
    </article>


  );
};

const BlogCardBack = ({
  data,
  onClick,
}: {
  data: ArchitectureDataProps;
  onClick: () => void;
}) => {
  return (
    <article className="flip-card-back absolute flex h-full w-full flex-col justify-center rounded-md bg-[#151B54] p-4">
      {/* Image Section */}
      <header className="relative h-[50%] w-full">
        <Image
          alt="Mountains"
          src={canoe}
          placeholder="blur"
          quality={100}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
          style={{
            objectFit: "cover",
          }}
             className="rounded-t-md"
        />
      </header>

      {/* Content Section */}
      <main className="flex-1 p-2">
        <p className="text-lg text-[#D6D6D6]">
          {formatISODateString(data.createdAt)}
        </p>
        <h3
          onClick={onClick}
          onMouseDown={onClick}
          className="text-lg pt-2 font-bold capitalize text-white"
        >
          {data.title}
        </h3>
        <p className="mt-2 text-lg text-[#D6D6D6]">{data.description}</p>
      </main>
    </article>
  );
};

export default BlogCard;
