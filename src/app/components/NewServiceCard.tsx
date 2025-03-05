"use client";
import { useState } from "react";
import { ArchitectureDataProps } from "../(landing-pages)/real-estate/definition";
// import serviceIcon from "../../../public/service-icon.png";
import Line from "./Line";
import Modal from "./Modal";
import Image from "next/image";
import priceVector from "/public/priceVector.png";
import cardImage from "/public/cardImage.png";
import PlaceholderModal from "./PlaceholderModal";


export default function ServiceCard({ data }: { data: ArchitectureDataProps }) {
    console.log(data._id);
    console.log(data, "project data");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <article className="relative  group flex flex-col items-center gap-y-4 rounded-2xl border border-[#B0B0B0] bg-white px-4 py-5 text-sm transition-all duration-200"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            <header>
                <div className={isHover ? "absolute top-0 right-0 z-10" : "absolute top-0 right-0"}>
                    <Image
                        alt="Price"
                        src={priceVector}
                        width={176}
                        height={58}
                        style={{
                            width: "auto",
                            height: "auto",
                            objectFit: "cover" // optional, for controlling the fit
                        }}
                    />
                    <span className="absolute top-3 right-10 text-2xl font-medium text-white">$1234</span>
                </div>
                {isHover ?
                    <div>
                        <Image
                            alt="card image"
                            src={cardImage}
                            fill
                        />
                    </div> :
                    <div>
                        <Image
                            alt="card image"
                            src={cardImage}
                            width={337}
                            height={287}
                        />
                    </div>
                }
            </header>
            {
                isHover ? <main className="text-left px-4 pt-6 z-10">
                    <div className="bg-info w-[58px] h-[3px] z-20 mb-3"></div>
                    <h3 className="text-2xl text-white font-semibold mb-2 stroke-info">{data.title}</h3>
                    {/* Truncate description to a fixed height or max length */}
                    {/* <p className="h-16 overflow-hidden text-ellipsis">
                {data.description.length > 100
                    ? data.description.slice(0, 100) + "..."
                    : data.description}
            </p> */}
                    <p className="text-lg text-white font-normal mb-10" >Of Scripture chosen especially for the suOf Scripture chosen especially for the suOf Scripture chosen especially for the suOf Scripture chosen especially for Of Scripture chosen especially for the suOf Scripture chosen especially for the suOf Scripture  for the suOf Scripture </p>
                    <span className="text-lg text-white">NOV. 12, 2024</span>
                    <button className="w-[346px] h-[43px] bg-info z-20 mt-4 text-white" onClick={openModal}>See More</button>
                </main> : <main className="text-left px-4">
                    <span className="text-lg text-[rgba(0,0,0,0.6)] mb-1">NOV. 12, 2024</span>
                    <h3 className="text-2xl text-black font-semibold mb-3">{data.title}</h3>
                    {/* Truncate description to a fixed height or max length */}
                    {/* <p className="h-16 overflow-hidden text-ellipsis">
                    {data.description.length > 100
                        ? data.description.slice(0, 100) + "..."
                        : data.description}
                </p> */}
                    <p className="text-md text-[rgba(0,0,0,0.6)] font-normal" >Of Scripture chosen especially for the su Of Scripture chosen especially for the su</p>
                </main>
            }
            <div className="rounded-2xl absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex">
            </div>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    {isModalOpen && (
                        <PlaceholderModal
                            title={data?.title}
                            desc={data?.description}
                            onClose={closeModal}
                        />
                    )}
                </Modal>
            )}
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
