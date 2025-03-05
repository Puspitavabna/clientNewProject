"use client";
import Image from "next/image";
import { useState } from "react";
import ReactDOM from "react-dom";
import { ArchitectureDataProps } from "../(landing-pages)/real-estate/definition";
import { formatISODateString } from "../lib/formatISODateString";
import Line from "./Line";
import ModalNews from "./ModalNews";
import Overlay from "./Overlay";
import canoe from "/public/canoe.jpg";
import ceiling from "/public/ceiling.jpg";
import closeIcon from "../../../public/Close-Square.png";


export default function ArchitectureCard({
  data,
}: {
  data: ArchitectureDataProps;
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="flip-card relative shadow-xl">
      <div className="flip-card-inner absolute h-fit transform transition duration-500 ease-in-out">
        <ArchitectureCardFront data={data} />
        <ArchitectureCardBack data={data} onClick={openModal} />
      </div>
      {/* Modal rendering outside the card using portal */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <ModalNews onClose={closeModal}>
              <div className="fixed inset-0 flex items-center justify-center overflow-y-scroll bg-black bg-opacity-50 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-black">
                <div className="relative w-full max-w-screen-lg rounded-md bg-[#E6EDFC]">
                  {/* Modal Content */}
                  <div className="grid max-h-[90vh] grid-cols-1 gap-4 overflow-x-hidden overflow-y-scroll p-6 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-black md:grid-cols-[65%_35%] md:p-10">
                    {/* First Column: Image */}
                    <div className="relative w-full overflow-hidden rounded bg-yellow-50">
                      <Image
                        src={canoe}
                        alt="Canoe"
                        placeholder="blur"
                        quality={100}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw" // Adjust size based on viewport width
                        style={{
                          objectFit: "cover", // Ensure the image covers the container properly
                          borderTopLeftRadius: "6px", // Optional, if you need rounded corners
                          borderTopRightRadius: "6px", // Optional, if you need rounded corners
                        }}
                      />



                      <div className="absolute left-0 right-0 top-0 flex items-center justify-center p-4 text-center">
                        <div className="flex flex-col items-center">
                          {/* <div className="w-full h-px bg-black"></div>  */}
                          <Line />
                          <p className="mt-4">{data.title}</p>
                        </div>
                      </div>
                    </div>

                    {/* Second Column: Text */}
                    <div className="flex flex-col items-stretch rounded bg-white p-4">
                      {/* Date with PNG Icon */}
                      <Line />
                      <span className="mt-2 font-bold">Project Planning</span>
                      <ul className="text mt-2 flex flex-col gap-y-1 to-black">
                        <li>
                          <span className="font-semibold">Client:</span> Awesome
                        </li>
                        <li>
                          <span className="font-semibold">Location:</span> USA
                        </li>
                        <li>
                          <span className="font-semibold">Surface Area:</span>{" "}
                          600m2
                        </li>
                        <li>
                          <span className="font-semibold">
                            Years Completed:
                          </span>{" "}
                          2023
                        </li>
                        <li>
                          <span className="font-semibold">House:</span>{" "}
                          Apartment
                        </li>
                        <li>
                          <span className="font-semibold">Bed:</span> 5
                        </li>
                        <li>
                          <span className="font-semibold">Bath:</span> 4
                        </li>
                        <li>
                          <span className="font-semibold">Kitchen:</span> 1
                        </li>
                        <li>
                          <span className="font-semibold">Architect:</span> Raju
                          Ahammad
                        </li>
                        <li>
                          <span className="font-semibold">Address:</span>
                          Country: United States Street: 3497 Holland Rd
                          City/Town: Virginia Beach Zip/Postal Code: 23452
                          State/Province/Region: Vermont
                        </li>
                      </ul>

                      <span className="mx-auto mt-10 inline-block w-max rounded bg-[#ffb200] px-6 py-3 text-sm font-semibold">
                        Price 456 USD
                      </span>
                    </div>

                    {/* Spanning Row: Full Width */}
                    <div className="rounded bg-[#E6EDFC] p-4 md:col-span-2 border border-[#B0B0B0]">
                      <Line />
                      <p className="mb-2 mt-2">Description</p>
                      <p>{data.description}</p>
                    </div>
                  </div>
                  <div>

                  </div>

                  {/* Close Button */}
                  <button
                    className="absolute right-2 top-2 text-3xl text-gray-500 hover:text-gray-800 p-0 mr-4 h-[35px] "
                    onClick={closeModal}
                  >
                    <Image src={closeIcon} alt="icon" width={20} height={20} />
                  </button>
                </div>
              </div>
            </ModalNews>
          </div>,
          document.body, // Render modal outside the card (in the body)
        )}
    </div>
  );
}

const ArchitectureCardFront = ({ data }: { data: ArchitectureDataProps }) => {
  return (
    <article className="flip-card-front absolute flex h-[481px] w-full flex-col rounded-[6px] p-6 bg-white shadow-lg">
      <header className="relative h-full grow rounded-[6px] overflow-hidden">
        <div className="relative h-full">
          <Image
            alt="Mountains"
            src={canoe}
            placeholder="blur"
            quality={100}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
            }}
          />
        </div>

        {/* <Overlay /> */}
        <ArchitectureTag price={data.price} />

        {/* Title and Date (Aligned at the bottom and in one line) */}
        <div className="absolute bottom-0 left-0 w-full flex items-center gap-x-4 p-2 bg-black/50 text-white rounded-md">
          <p className="font-bold capitalize">{data.title}</p>
        </div>
      </header>

      {/* Footer with project planning */}
      <div className="rounded-bl-[6px] rounded-br-[6px] bg-white pt-6 px-0 pb-0 text-sm text-[#727272] text-left">
        <footer className="flex items-start gap-x-4">
          <div>
            <span className="font-bold">Project Planning</span>
            <ul className="mb-4 flex flex-col gap-y-1 text-black">
              <li><span className="">House:</span> 1200 sq ft. house</li>
              <li><span className="">Kitchens:</span> 2</li>
              <li><span className="">Bedrooms:</span> 3</li>
              <li><span className="">Balconies:</span> 1</li>
            </ul>
          </div>
        </footer>
      </div>
    </article>
  );
};

const ArchitectureCardBack = ({
  data,
  onClick,
}: {
  data: ArchitectureDataProps;
  onClick: () => void;
}) => {
  return (
    // <article className="flip-card-back relative h-[400px] w-full bg-gray-900 px-6 py-10">
    //   <Image
    //     alt="Mountains"
    //     src={ceiling}
    //     placeholder="blur"
    //     quality={100}
    //     sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    //     fill
    //     style={{
    //       objectFit: "cover",
    //     }}
    //     className="-z-20"
    //   />

    //   <Overlay />

    //   <ArchitectureTag price={data.price} />

    //   <main className="relative z-50 mb-4 pt-4 text-sm font-semibold text-[#727272]">
    //     <Line width="57.75px" />
    //     <h3 className="mb-4 mt-2 text-2xl font-bold capitalize text-white">
    //       {data.title}
    //     </h3>
    //     <ul className="mb-4 flex flex-col gap-y-1 text-white">
    //       <li>
    //         <span className="">House:</span> 1200 sq ft. house
    //       </li>
    //       <li>
    //         <span className="">Kitchens:</span> 2
    //       </li>
    //       <li>
    //         <span className="">Bedrooms:</span> 3
    //       </li>
    //       <li>
    //         <span className="">Balconies:</span> 1
    //       </li>
    //     </ul>
    //     <p className="mb-3 text-white">{formatISODateString(data.createdAt)}</p>
    //     <button
    //       onClick={onClick}
    //       className="w-full rounded bg-[#ffb200] py-3 text-black"
    //     >
    //       SEE MORE
    //     </button>
    //   </main>

    //   <footer className="relative z-50 flex items-center gap-x-4 text-base">
    //     {/* <div className="flex items-center gap-x-2">
    //       <IoEyeSharp className="text-2xl font-bold text-[#ffb200]" />
    //       <p className="font-medium text-white">{data.view}</p>
    //     </div>
    //     <div className="flex items-center gap-x-2">
    //       <IoMdShare className="text-2xl font-bold text-[#ffb200]" />
    //       <p className="font-medium text-white">{data.share}</p>
    //     </div>
    //     <div className="flex items-center gap-x-2">
    //       <CiHeart className="text-2xl font-bold text-[#ffb200]" />
    //       <p className="font-medium text-white">{data.favourite}</p>
    //     </div>  */}
    //   </footer>
    // </article>

    <article className="flip-card-back relative flex h-[481px] w-full flex-col rounded-[6px] p-6 bg-[#151B54] shadow-lg">
      <header className="relative h-full grow rounded-[6px] overflow-hidden">
        <div className="relative h-full">
          <Image
            alt="Mountains"
            src={canoe}
            placeholder="blur"
            quality={100}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
            }}
          />
        </div>

        {/* <Overlay /> */}
        <ArchitectureTag price={data.price} />

        {/* Title and Date (Aligned at the bottom and in one line) */}
        <div className="absolute bottom-0 left-0 w-full flex items-center gap-x-4 p-2 bg-black/50 text-white rounded-md">
          <p className="font-bold capitalize">{data.title}</p>
        </div>
      </header>

      {/* Footer with project planning */}
      <div className="rounded-bl-[6px] rounded-br-[6px] bg-[#151B54] pt-6 px-0 pb-0 text-sm text-[#FFFFFF99] text-left">
        <footer className="flex items-start gap-x-4">
          <div>
            <span className="font-bold">Project Planning</span>
            <ul className="mb-4 flex flex-col gap-y-1 text-white">
              <li><span className="text-white">House:</span> 1200 sq ft. house</li>
              <li><span className="text-white">Kitchens:</span> 2</li>
              <li><span className="text-white">Bedrooms:</span> 3</li>
              <li><span className="text-white">Balconies:</span> 1</li>
            </ul>
          </div>
        </footer>
      </div>
    </article>

  );
};

const Tag = ({ price }: { price: number }) => {
  return (
    <div className="absolute right-0 top-0 z-20 flex items-center gap-x-1 rounded-es-full bg-[#172554] px-6 py-1.5 font-medium text-white">
      <p>${price}</p>
    </div>
  );
};

const ArchitectureTag = ({ price }: { price: number }) => {
  return (
    <div className="absolute left-0 top-4 z-20 flex items-center gap-x-1 bg-[#FFB200] px-3 py-1 font-medium text-black">
      <p>${price}</p>
    </div>
  );
};
