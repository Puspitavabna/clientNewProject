"use client"
import Image from "next/image";
import { ArchitectureDataProps } from "../(landing-pages)/real-estate/definition";
import { FaArrowRight } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { useState } from "react";
import skyfaced from "/public/skyfaced.jpg";
import canoe from "/public/canoe.jpg";
import PlaceholderModal from "./PlaceholderModal";



export default function CommonCard({
    data,
    type
}: {
    type: String,
    data: ArchitectureDataProps;
}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(type, 'type')
    debugger

    const getCard = () => {
        if (type == "technical") {
            return (
                <article className="group relative overflow-hidden rounded-xl bg-white hover:bg-primary p-4 font-medium text-[#00000099] shadow-xl cursor-pointer">
                    <header className="relative mb-3 h-48 overflow-hidden rounded-t-lg">
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
                    </header>

                    <main className="mb-2 px-2 space-y-[6px] flex flex-col justify-center items-center font-Poppins">
                        <h3 className="text-xl text-center leading-6 font-bold capitalize text-black group-hover:text-white">
                            {data?.title}
                        </h3>
                        <div className="w-16 border-2 border-primary group-hover:border group-hover:border-secondary"></div>
                        <p className="text-base leading-6 text-black text-center font-light mb-2 group-hover:text-[#cccc]">
                            {data?.description}
                        </p>
                        <button
                            className="text-base font-semibold text-black group-hover:text-white"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span className="flex flex-row justify-center items-center tracking-widest group-hover:shadow-none">
                                Read more <FaArrowRight className="ml-1" />
                            </span>
                        </button>
                    </main>
                </article>

            )
        } if (type == "construction") {
            return (
                <article className="group relative overflow-hidden rounded-xl bg-white hover:bg-primary p-4 font-medium text-[#00000099] shadow-xl cursor-pointer">
                    <header className="relative mb-3 h-48 overflow-hidden rounded-lg">
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
                    </header>

                    <main className="mb-2 px-2 space-y-[6px] flex flex-col justify-start items-start font-Poppins">
                        <h3 className="text-xl leading-6 font-bold capitalize text-black group-hover:text-white">
                            {data?.title}
                        </h3>
                        <p className="text-base leading-6 text-black font-light mb-2 group-hover:text-[#cccc]">
                            {data?.description}
                        </p>
                        <button
                            className="text-base font-semibold text-black group-hover:text-white"
                            onClick={() => setIsModalOpen(true)}
                        >
                            {/* <span className="flex flex-row items-center tracking-widest group-hover:shadow-none">
                                Read more <FaArrowRight className="ml-1" />
                            </span> */}
                        </button>
                    </main>
                </article>


            )
        } if (type == "export") {
            return (
                <article className="group relative overflow-hidden rounded-xl bg-white hover:bg-primary font-medium text-[#00000099] shadow-xl cursor-pointer pb-4">
                    <header className="relative h-52 overflow-hidden rounded-t-lg">
                        <Image
                            alt="Mountains"
                            src={skyfaced}
                            placeholder="blur"
                            quality={100}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"  // Adjusting sizes for different screen widths
                            style={{
                                objectFit: "cover",
                            }}
                        />

                    </header>

                    <main className="px-4 py-4 font-Inter space-y-3">
                        <div className="w-[55%] flex flex-row items-center rounded-lg border border-black p-2 group-hover:border group-hover:border-white">
                            <FiCalendar size={24} className="text-black mr-[8px] group-hover:text-white" />
                            <span className="text-sm font-normal text-black group-hover:text-white">December 23, 2025</span>
                        </div>
                        <h3 className="text-lg text-left leading-normal font-bold capitalize text-[#0f172a] group-hover:text-white">
                            {data?.title}
                        </h3>
                        <p className="text-lg leading-relaxed text-[#344156] text-left font-light mb-3 group-hover:text-[#BDBDBD]">
                            {data?.description}
                        </p>
                        <button className="text-lg  text-primary group-hover:text-[#ABABAC] font-JosefinSans float-right" onClick={() => setIsModalOpen(true)}>
                            <span className="flex flex-row justify-center items-center tracking-widest group-hover:shadow-none">Read more <FaArrowRight className="ml-1" /> </span>
                        </button>
                    </main>
                </article>
            )
        }
        if (type == "visa") {
            return (
                <article className="group relative overflow-hidden rounded-xl bg-white hover:bg-primary px-5 py-6 font-medium text-[#00000099] shadow-xl">
                    <header className="relative mb-4 h-52 overflow-hidden rounded-t-lg">
                        <Image
                            alt="Mountains"
                            src={skyfaced}
                            placeholder="blur"
                            quality={100}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"  // Adjusting sizes for different screen widths
                            style={{
                                objectFit: "cover",
                            }}
                        />

                    </header>

                    <main className="mb-2 px-2 space-y-[24px] flex flex-col justify-center items-center font-Poppins">
                        <h3 className="text-2xl text-center leading-relaxed font-semibold capitalize text-[#00010B] group-hover:text-white">
                            {data?.title}
                        </h3>
                        {/* <button className="text-lg font-normal leading-loose text-black border 
                        border-black w-[174px] h-[45px] rounded-xl group-hover:bg-white group-hover:text-primary"
                            onClick={() => setIsModalOpen(true)}>
                            Details
                        </button> */}
                    </main>
                </article>
            )
        }
        if (type == "traveling") {
            return (
                <article className="group relative rounded-md border-2 border-black  w-[380px] h-[323px] font-inter "> {/* Square card */}
                    <header className="relative h-full"> {/* Header takes full height */}
                        <Image
                            alt="Mountains"
                            src={skyfaced}
                            placeholder="blur"
                            quality={100}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"  // Adjusting sizes for different screen widths
                            style={{
                                objectFit: "cover",
                            }}
                        />

                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div> {/* Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 flex justify-between items-center"> {/* Text at bottom, left and right */}
                            <h3 className="text-2xl text-white"> {/* Adjusted text size */}
                                London
                            </h3>
                            <p className="text-lg text-white"> {/* Adjusted text size and opacity */}
                                Place 15
                            </p>
                        </div>
                    </header>

                    <main className="hidden group-hover:flex items-center justify-center absolute inset-0">
                        <button className="text-xl bg-primary text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>Button</button>
                    </main>
                </article>
            )
        }

    }
    return (
        <>
            {getCard()}

            {isModalOpen && (
                <PlaceholderModal
                    title={data?.title}
                    desc={data?.description}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}
