'use client'
import Image from "next/image";
import heroVector from "/public/heroVector.png";
import heroImage from "/public/heroImage.png";
import { useEffect, useState } from "react";

export default function Hero({
    image,
    title,
    desc,
    categories,
    cardData,
    category,
    setCategory,
    setCardData
}: {
    desc: String;
    title: String;
    image: any;
    categories?: string[]
    cardData?: { [key: string]: any }[]; // General array of objects
    setCardData?: React.Dispatch<React.SetStateAction<{ [key: string]: any }[]>>; // Setter function
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>; // Setter function

}) {
    const [search, setSearch] = useState('')
    const [originalData, setOriginalData] = useState<{ [key: string]: any }[]>(cardData || []);

    useEffect(() => {
        if (!search) {
            setCardData?.(originalData || []); // Reset to original data when search is empty
            return;
        }

        const filteredData = cardData?.filter(item =>
            Object.values(item).some(value =>
                typeof value === "string" || typeof value === "number"
                    ? value.toString().toLowerCase().includes(search.toLowerCase())
                    : false
            )
        );

        setCardData?.(filteredData as object[]);
    }, [search, cardData, originalData, setCardData]);


    return (
        <section className="relative w-[100%] font-poppins">
            <div className="flex flex-row h-[553px] w-[100%] bg-primary px-[80px]">
                <div className="w-[50%] h-[380px] py-24">
                    <div>
                        <h1 className="text-4xl font-semibold text-white">OUR <span className="text-secondary">{title}</span></h1>
                        <p className="mt-[32px] w-[80%] leading-relaxed text-xl font-light text-white">{desc}</p>
                    </div>
                    <div className="mt-[80px] flex items-center"> {/* Flexbox for layout */}
                        {categories && ( // Conditionally render dropdown
                            <div className="relative"> {/* Relative for absolute positioning of arrow */}
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="rounded-l-lg border border-r-0 px-3 py-[11px] h-[54px] text-black focus:border-[#FFB200] focus:outline-none appearance-none pr-8" // Added pr-8 for arrow space
                                >
                                    <option value="" className="bg-white">Category</option> {/* Default option */}
                                    {categories?.map((category) => (
                                        <option key={category + ''} value={category} className="bg-white space-x-4">
                                            <span className="mr-2">{category}</span>
                                            <span>60</span>
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none"> {/* Down arrow */}
                                    <svg
                                        className="w-5 h-5 text-primary"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        )}
                        <input
                            type="search"
                            placeholder="Search"
                            onChange={(e) => setSearch(e.target.value)}
                            className={`${categories ? 'rounded-l-none' : 'rounded-l-lg' // Conditional rounded corners
                                } min-w-[280px] w-[329px] h-[54px] border px-3 py-[11px] text-black shadow-xl focus:border-[#FFB200] focus:outline-none`}
                        />
                        <button className="rounded-r-lg text-white border-2 border-white bg-primary h-[54px] w-[158px] font-semibold">
                            Search
                        </button>
                    </div>
                </div>
                <div className="w-[50%] m-auto flex justify-end">
                    <div className="w-[80%]">
                        <Image
                            alt="hero image"
                            src={heroImage}
                            className="m-auto"
                            priority
                        />
                    </div>
                </div>
            </div>
            <div>
                <Image
                    alt="hero image"
                    src={heroVector}
                    className="m-auto"
                />
            </div>
        </section>
    );
}
