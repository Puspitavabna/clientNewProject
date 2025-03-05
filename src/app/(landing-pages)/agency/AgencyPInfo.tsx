import Line from "@/src/app/components/Line"
import { FaRegUser } from "react-icons/fa";
import { CgNametag } from "react-icons/cg";
import { MdGrade } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
import { GiGreekTemple } from "react-icons/gi";
import { RiPassportLine } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { VscLocation } from "react-icons/vsc";
import { FaRegFileLines } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { useState } from 'react'
import AgencyDesc from './AgencyDesc'

interface AgencyProps {
    agencyData: any; // Replace 'any' with a proper type if needed
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }


const AgencyRegistrationForm: React.FC<AgencyProps> = ({ agencyData, handleChange, handleFileChange }) => {

    const [isOpen, setIsOpen] = useState(false)


    function OpenAgencyForm(e: any) {
        e.preventDefault()
        setIsOpen(true)

    }

    const shortenFileName = (name: string | undefined, maxLength = 15) => {
        if (!name) return "";
        if (name.length <= maxLength) return name;
    
        const extension = name.split(".").pop(); // Get file extension
        const baseName = name.replace(`.${extension}`, ""); // Remove extension
    
        return `${baseName.slice(0, 5)}...${baseName.slice(-5)}.${extension}`; // Shorten the middle part
      };

    return (
        <div className="fixed top-2 bottom-3 left-0 right-0 mx-auto bg-opacity-50 w-full h-screen z-100 bg-black flex flex-col justify-center items-center">
            <div className="mb-3 md:overflow-y-hidden overflow-y-scroll bg-white w-[840px] h-[200%] md:h-[90%] flex flex-col z-1000">
                <div className="flex flex-col items-center justify-center px-14 py-10 text-black w-full">
                    <Line />
                    <h1 className="text-bold mb-2 mt-3 md:text-xl text-lg">Agency Registration Form</h1>
                    <p>Personal Information</p>
                    <form className="mt-6 grid md:grid-cols-2 justify-center items-center gap-5">
                        <fieldset className="border-2 border-[#151854] px-4 py-1.5">
                            <legend className="text-[#151854] font-bold text-sm px-2" >Agency Logo</legend>
                            <div className="flex items-center justify-between">
                                <FaRegFileLines />
                                <input className="border-none outline-none" type="file"
                                    name="logo"
                                    onChange={handleFileChange} />
                                <FiDownload />
                            </div>
                        </fieldset>

                        <fieldset className="border-2 border-[#151854] px-4">
                            <legend className="text-[#151854] font-bold text-sm px-2" >Agency Name</legend>
                            <div className="flex items-center gap-5">
                                <CgNametag />
                                <input name="name" className="border-none outline-none py-1" type="text" onChange={handleChange} required />
                            </div>
                        </fieldset>

                        <fieldset className="border-2 border-[#151854] px-4">
                            <legend className="text-[#151854] font-bold text-sm px-2" >Service Division</legend>
                            <div className="flex items-center gap-5">
                                <MdDesignServices />
                                <select className="py-1" name="serviceDivision" onChange={handleChange}>
                                    <option className="text-sm" value="Technical">Technical</option>
                                    <option className="text-sm" value="Construction">Construction</option>
                                    <option className="text-sm" value="Export">Export</option>
                                    <option className="text-sm" value="Visa">Visa</option>
                                    <option className="text-sm" value="Traveling">Traveling</option>
                                </select>
                            </div>
                        </fieldset>

                        <fieldset className="border-2 border-[#151854] px-4">
                            <legend className="text-[#151854] font-bold text-sm px-2" >Service Area</legend>
                            <div className="flex items-center gap-5">
                                <VscLocation />
                                <input name="serviceArea" onChange={handleChange} className="border-none outline-none py-1" type="text" required />
                            </div>
                        </fieldset>

                        <fieldset className="border-2 border-[#151854] px-4">
                            <legend className="text-[#151854] font-bold text-sm px-2" >Grade</legend>
                            <div className="flex items-center gap-5">
                                <MdGrade />
                                <select className="py-1" name="grade" onChange={handleChange}>
                                    <option className="text-sm" value="">Select Grade</option>
                                    <option className="text-sm" value="A">A</option>
                                    <option className="text-sm" value="B">B</option>
                                    <option className="text-sm" value="C">C</option>
                                </select>
                            </div>
                        </fieldset>

                        <fieldset className="border-2 border-[#151854] px-4">
                            <legend className="text-[#151854] font-bold text-sm px-2" >Employee</legend>
                            <div className="flex items-center gap-5">
                                <GiGreekTemple />
                                <select className="py-1" name="employers" onChange={handleChange}>
                                    <option className="text-sm" value="">Select Employee</option>
                                    <option className="text-sm" value="employee 1">employee 1</option>
                                    <option className="text-sm" value="employee 2">employee 2</option>
                                    <option className="text-sm" value="employee 3">employee 3</option>
                                </select>
                            </div>
                        </fieldset>

                        <fieldset className="border-2 border-[#151854] px-4">
                            <legend className="text-[#151854] font-bold text-sm px-2" >Phone Number</legend>
                            <div className="flex items-center gap-5">
                                <FaPhone />
                                <input name="mobileNumber" onChange={handleChange} className="border-none outline-none py-1" type="number" required />
                            </div>
                        </fieldset>

                        <fieldset className="border-2 border-[#151854] px-4">
                            <legend className="text-[#151854] font-bold text-sm px-2" >Email address</legend>
                            <div className="flex items-center gap-5">
                                <MdOutlineEmail />
                                <input name="email" onChange={handleChange} className="border-none outline-none py-1" type="email" required />
                            </div>
                        </fieldset>

                        <fieldset className="border-2 border-[#151854] px-4">
                            <legend className="text-[#151854] font-bold text-sm px-2" >Office Address</legend>
                            <div className="flex items-center gap-5">
                                <VscLocation />
                                <input name="physicalAddress" onChange={handleChange} className="border-none outline-none py-1" type="text" required />
                            </div>
                        </fieldset>

                        <fieldset className="border-2 border-[#151854] px-4 py-2">
                            <legend className="text-[#151854] font-bold text-sm px-2" >Provide the Document</legend>
                            <div className="flex items-center justify-between">
                                <FaRegFileLines />
                                <input className="border-none outline-none" type="file" />
                                <FiDownload />
                            </div>
                        </fieldset>
                        <div></div>
                        <button onClick={OpenAgencyForm} className="block bg-[#151854] py-3 text-white font-bold text-center text-sm">Next</button>
                        {isOpen && <AgencyDesc agencyData={agencyForm} handleChange={handleChange} />}

                    </form>
                </div>
            </div>
        </div>
    )

}



export default AgencyRegistrationForm; 