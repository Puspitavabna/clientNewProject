"use client";
import { useState } from "react";
import { ArchitectureDataProps } from "../(landing-pages)/real-estate/definition";
// import serviceIcon from "../../../public/service-icon.png";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import Line from "./Line";
import Modal from "./Modal";

export default function ServiceCard({ data }: { data: ArchitectureDataProps }) {
  console.log(data._id);
  console.log(data, "project data");
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <article className="group flex h-full flex-col items-center gap-y-4 rounded-md border border-[#B0B0B0] bg-white px-4 py-5 text-sm transition-all duration-200 hover:border hover:border-white hover:bg-[#151B54] hover:text-white">
      <header>
        {/* <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6EDFC] transition-all duration-200 group-hover:bg-white">
          <GrServices className="text-4xl text-black transition-all duration-200 group-hover:text-[#151B54]" />
        </div> */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E9F0FF]">
          {/* <Image src={data.photo} alt="icon" width={60} className="mx-auto" /> */}
          {/* <Image src={serviceIcon} alt="icon" width={64} height={64} /> */}
          <TfiHeadphoneAlt className="h-10 w-10 text-[#1877F2]" />
        </div>
      </header>
      <main className="text-center">
        <h3 className="text-lg font-semibold">{data.title}</h3>
        {/* Truncate description to a fixed height or max length */}
        <p className="h-16 overflow-hidden text-ellipsis">
          {data.description.length > 100
            ? data.description.slice(0, 100) + "..."
            : data.description}
        </p>
        <button
          onClick={openModal}
          className="mt-4 rounded border border-[#151B54] bg-transparent px-4 py-2 text-xs font-bold transition-all duration-150 group-hover:border-white group-hover:bg-[#151B54] group-hover:text-white"
        >
          LEARN MORE
        </button>

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <div className="flex flex-col items-center justify-center pt-8 text-black">
              <Line width="57.75px" />
              <h2 className="mt-4 text-2xl font-semibold">{data.title}</h2>
              <p className="mb-4 mt-4">{data.description}</p>
            </div>
          </Modal>
        )}
      </main>
    </article>
  );
}

export function ServiceCardGrid({
  dataArray,
}: {
  dataArray: ArchitectureDataProps[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {dataArray.map((data) => (
        <ServiceCard key={data._id} data={data} />
      ))}
    </div>
  );
}
