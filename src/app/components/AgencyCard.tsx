"use client";
import Image from "next/image";
import { useState } from "react";
import { BiBuildings } from "react-icons/bi";
import { CgCloseR } from "react-icons/cg";
import { FaFacebookF } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { ImLocation } from "react-icons/im";
import { LiaUserCheckSolid } from "react-icons/lia";
import { PiMapPinAreaBold } from "react-icons/pi";
import { EmployersDataProps } from "../(landing-pages)/traveling/definition";
import Line from "./Line";

function AgencyCard({ data }: { data: any }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const formatAddress = (address: any) => {
    if (!address || typeof address !== "object") return "N/A";

    return Object.values(address) // Get all values dynamically
      .filter((val) => typeof val === "string" && val.trim() !== "") // Keep only valid non-empty strings
      .join(", "); // Convert to a comma-separated string
  };

  return (
    // <article onClick={openModal}>
    //   <div className="group flex w-full space-x-4 rounded-lg bg-white p-4 shadow-lg transition-colors duration-300 hover:bg-[#151B54]">
    //     <div className="flex flex-col items-center">
    //       <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#FFB200] p-0 transition-colors duration-300 group-hover:border-white group-hover:bg-[#fff]">
    //         <Image
    //           src="/images/agency_profile.png"
    //           alt="Profile"
    //           //width={96}
    //           //height={96}
    //           fill // Fills the parent div
    //           objectFit="cover" // Ensures the image covers the area of the parent div
    //           className="absolute"
    //         />
    //       </div>

    //       <div className={`my-2 rounded ${data?.status == 'Active'? 'bg-[#00CB20]': 'bg-secondary'} px-4 py-1 text-xs font-semibold text-[#000]`}>
    //          {data?.status}
    //       </div>
    //       <div className="mt-2 text-center">
    //         <span className="px-1 text-sm font-bold text-[#000000B2] group-hover:text-white">
    //           Ranking:
    //         </span>
    //         <span className="text-sm font-bold text-[#000000B2] group-hover:text-white">
    //           40
    //         </span>
    //       </div>

    //       <div className="mt-4 flex justify-center space-x-3">
    //         <a href="#" className="rounded bg-[#D9D9D9] px-2 py-2">
    //           <FaFacebookF />
    //         </a>
    //         <a href="#" className="rounded bg-[#D9D9D9] px-2 py-2">
    //           <FaFacebookF />
    //         </a>
    //         <a href="#" className="rounded bg-[#D9D9D9] px-2 py-2">
    //           <FaFacebookF />
    //         </a>
    //         <a href="#" className="rounded bg-[#D9D9D9] px-2 py-2">
    //           <FaFacebookF />
    //         </a>
    //       </div>
    //     </div>

    //     <div className="mt-4 flex flex-col justify-start gap-1 group-hover:text-white">
    //       <div className="flex w-full flex-row items-center">
    //         <div className="flex w-40 flex-grow-0 gap-2 whitespace-nowrap rounded p-1">
    //           {/* <Image
    //             src="/icons/agname.png"
    //             width={16}
    //             height={16}
    //             alt="Name Icon"
    //           /> */}
    //           <BiBuildings />
    //           <p className="text-sm">Name</p>
    //         </div>
    //         <span className="flex-1 text-left text-sm">{data?.name}</span>
    //       </div>

    //       <div className="flex w-full flex-row items-center">
    //         <div className="flex w-40 flex-grow-0 items-center gap-2 whitespace-nowrap rounded p-1">
    //           {/* <Image
    //             src="/icons/agservicedivision.png"
    //             width={16}
    //             height={16}
    //             alt="Service Division Icon"
    //           /> */}
    //           <LiaUserCheckSolid />
    //           <p className="text-sm">Service Division</p>
    //         </div>
    //         <span className="flex-1 text-left text-sm">{data?.serviceDivision}</span>
    //       </div>

    //       <div className="flex w-full flex-row items-center">
    //         <div className="flex w-40 flex-grow-0 items-center gap-2 whitespace-nowrap rounded p-1">
    //           {/* <Image
    //             src="/icons/agestablishement.png"
    //             width={16}
    //             height={16}
    //             alt="Service Division Icon"
    //           /> */}

    //           <HiOutlineBuildingLibrary />
    //           <p className="text-sm">Establishment</p>
    //         </div>
    //         <span className="flex-1 text-left text-sm">
    //           {data?.servicePeriod}
    //         </span>
    //       </div>

    //       <div className="flex w-full flex-row items-center">
    //         <div className="flex w-40 flex-grow-0 items-center gap-2 whitespace-nowrap rounded p-1">
    //           {/* <Image
    //             src="/icons/agservicearea.png"
    //             width={16}
    //             height={16}
    //             alt="Service Division Icon"
    //           /> */}
    //           <PiMapPinAreaBold />
    //           <p className="text-sm">Service Area </p>
    //         </div>
    //         {/* <span className="flex-1 text-left text-sm">{data?.serviceArea && data?.serviceArea?.length > 0 && data?.serviceArea?.map((item: string)=> {
    //            return item
    //         })} </span> */}
    //       </div>

    //       <div className="flex w-full flex-row items-center">
    //         <div className="flex w-40 flex-grow-0 items-center gap-2 whitespace-nowrap rounded p-1">
    //           {/* <Image
    //             src="/icons/agname.png"
    //             width={16}
    //             height={16}
    //             alt="Service Division Icon"
    //           /> */}
    //           <FaUsersGear />
    //           <p className="text-sm">Employee</p>
    //         </div>
    //         <span className="flex-1 text-left text-sm">{data?.employees && data?.employees?.length > 0 && 
    //         data?.employees?.map((emp:string) => {
    //           emp
    //         })}</span>
    //       </div>

    //       <div className="flex w-full flex-row items-start">
    //         <div className="flex w-40 flex-grow-0 items-center gap-2 whitespace-nowrap rounded p-1">
    //           {/* <Image
    //             src="/icons/aglocation.png"
    //             width={16}
    //             height={16}
    //             alt="Service Division Icon"
    //           /> */}
    //           <ImLocation />
    //           <p className="m-0 text-sm">Office Address</p>
    //         </div>
    //         <span className="ml-2 flex-1 break-words text-left text-xs">
    //           {formatAddress(data?.physicalAddress)}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    //   {isModalOpen && (
    //     <div
    //       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    //       onClick={closeModal} // Close modal when backdrop is clicked
    //     >
    //       <div
    //         className="relative w-full max-w-5xl rounded-lg bg-tertiary p-10"
    //         onClick={(e) => e.stopPropagation()} // Prevent event from reaching the backdrop
    //       >
    //         {/* <button
    //           className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded border-2 border-[#000] text-3xl text-[#000]"
    //           onClick={closeModal} // Close modal when close button is clicked
    //         >
    //           ×
    //         </button> */}
    //         <button
    //           onClick={closeModal}
    //           className="absolute right-4 top-4 p-1 text-2xl text-gray-700 hover:text-black"
    //         >
    //           <CgCloseR />
    //         </button>

    //         <div className="mb-4 flex flex-col items-center justify-center text-center">
    //           <Line width="57.75px" />
    //           <h2 className="mt-4 text-2xl font-bold">Tarzan</h2>
    //         </div>

    //         <div className="flex flex-col items-start justify-start text-left text-sm font-semibold text-[#4B4B4D]">
    //           <div className="flex w-full flex-row items-start justify-start gap-2">
    //             <span className="">Name:</span>
    //             <span className="">Mr jack</span>
    //           </div>
    //           <div className="flex w-full flex-row items-start justify-start gap-2">
    //             <span className="">Nationality:</span>
    //             <span className="">Dubai</span>
    //           </div>
    //           <div className="flex w-full flex-row items-start justify-start gap-2">
    //             <span className="">Status:</span>
    //             <span className="">Active</span>
    //           </div>
    //           <div className="flex w-full flex-row items-start justify-start gap-2">
    //             <span className="">Ranking:</span>
    //             <span className="">01</span>
    //           </div>
    //           <div className="flex w-full flex-row items-start justify-start gap-2">
    //             <span className="">Service Division:</span>
    //             <span className="">Civil engineering</span>
    //           </div>
    //           <div className="flex w-full flex-row items-start justify-start gap-2">
    //             <span className="">Service Area:</span>
    //             <span className="">Dubai</span>
    //           </div>
    //           <div className="flex w-full flex-row items-start justify-start gap-2">
    //             <span className="">Employee:</span>
    //             <span className="">45</span>
    //           </div>
    //           <div className="flex w-full flex-row items-start justify-start gap-2">
    //             <span className="">Registered Date:</span>
    //             <span className="">1 jan 2010</span>
    //           </div>
    //           <div className="flex w-full flex-row items-start justify-start gap-2">
    //             <span className="">Establishment:</span>
    //             <span className="">14 years ,12 months </span>
    //           </div>
    //           <div className="flex w-full flex-row items-start justify-start gap-2">
    //             <span className="">Agent Identification Number:</span>
    //             <span className="">15715386</span>
    //           </div>
    //           <div className="flex w-full flex-row items-start justify-start gap-2">
    //             <span className="">Office address :</span>
    //             <span className="">
    //               United Arab Emirates , Dubai , Nadd Al Hamar, Dubai , 61, 14d
    //               Street
    //             </span>
    //           </div>
    //           <div className="flex w-full flex-row items-start justify-start gap-2 py-4">
    //             <span className="text-lg font-bold text-[#000]">
    //               Description of Services
    //             </span>
    //           </div>
    //           <div className="flex w-full flex-row items-start justify-start gap-2">
    //             <span className="text-justify">
    //               The Netherlands is known as the country with the highest
    //               density of cyclists in the world. The approximately 17 million
    //               inhabitants own over 18 million bicycles and approximately 25%
    //               of all commutes are done by bicycle (1). While cycling in the
    //               Netherlands has been a common means of transport for decades
    //               already, recently popularity seems to increase internationally
    //               as well. Cycling has many advantages like the improvement of
    //               health and being environmentally friendly. One disadvantage is
    //               that cyclist is vulnerable in traffic (2). In the Netherlands,
    //               approximately 70000 patients are treated annually in an
    //               emergency department (ED) after a bicycle injury. Of these
    //               patients, almost 10,000 are admitted to a hospital and
    //               approximately two hundred patients die as a result of their
    //               injuries (1). Therefore, many efforts are made to prevent
    //               injuries amongst cyclists, including special safety programs
    //               for cyclists and creating a safer infrastructure (2-5).
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </article>
    <article onClick={openModal} className="w-full max-w-3xl mx-auto ">
      <div className="group flex flex-col md:flex-row w-xl rounded-lg bg-white p-4 shadow-lg transition-colors duration-300 hover:bg-[#151B54] items-center justify-center gap-6 md:gap-10">
        {/* Left Side - Profile Image & Social Links */}
        <div className="flex flex-col items-center w-full md:w-1/3 flex-shrink-0">
          {/* Profile Image */}
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-dotted border-2 border-[#FFB200] transition-colors duration-300 group-hover:border-white">
            <Image
              src="/images/agency_profile.png"
              alt="Profile"
              fill
              className="absolute object-cover"
            />
          </div>


          {/* Status */}
          <div className={`my-2 rounded px-4 py-1 text-xs font-semibold text-black ${data?.status === 'Active' ? 'bg-[#00CB20]' : 'bg-gray-500'}`}>
            {data?.status}
          </div>

          {/* Ranking */}
          <div className="mt-2 text-center">
            <span className="text-sm font-bold text-[#000000B2] group-hover:text-white">Ranking: </span>
            <span className="text-sm font-bold text-[#000000B2] group-hover:text-white">40</span>
          </div>

          {/* Social Media Icons */}
          <div className="mt-4 flex justify-center space-x-2">
            {[1, 2, 3, 4].map((_, index) => (
              <a key={index} href="#" className="rounded bg-gray-300 p-2 transition-all duration-300 hover:bg-gray-400">
                <FaFacebookF className="text-gray-700 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side - Text Content */}
        <div className="flex flex-col justify-between w-full md:w-1/2 flex-grow space-y-3 text-left group-hover:text-white">
          {/* Name */}
          <div className="flex items-center">
            <BiBuildings className="text-lg" />
            <span className="ml-2 text-sm">{data?.name}</span>
          </div>

          {/* Service Division */}
          <div className="flex items-center">
            <LiaUserCheckSolid className="text-lg" />
            <span className="ml-2 text-sm">{data?.serviceDivision}</span>
          </div>

          {/* Establishment */}
          <div className="flex items-center">
            <HiOutlineBuildingLibrary className="text-lg" />
            <span className="ml-2 text-sm">{data?.servicePeriod}</span>
          </div>

          {/* Service Area */}
          <div className="flex items-center">
            <PiMapPinAreaBold className="text-lg" />
            {/* <span className="ml-2 text-sm">{data?.serviceArea?.join(', ')}</span> */}
          </div>

          {/* Employees */}
          <div className="flex items-center">
            <FaUsersGear className="text-lg" />
            <span className="ml-2 text-sm">{data?.employees?.join(', ')}</span>
          </div>

          {/* Office Address */}
          <div className="flex items-center">
            <ImLocation className="text-lg" />
            <span className="ml-2 text-sm">{formatAddress(data?.physicalAddress)}</span>
          </div>
        </div>
      </div>




    </article>



  );
}

export default AgencyCard;
