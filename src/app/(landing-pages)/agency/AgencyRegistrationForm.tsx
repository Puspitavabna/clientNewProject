import Line from "@/src/app/components/Line";
import { FaRegUser } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { RiPassportLine } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { VscLocation } from "react-icons/vsc";
import { FaRegFileLines } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import AgencyPInfo from "./AgencyPInfo";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select"
import axios from "axios";
import Cookies from "js-cookie";
import { env } from "@/config/env";

interface FormData {
  personalInfo: {
    fullName?: string;
    dateOfBirth?: string;
    nationality?: string;
    identificationNumber?: string;
    phoneNumber: {
      code: string;
      number: string;
    };
    email?: string;
    permanentAddress?: string;
    educationQualifications?: string;
    skillsAcquired?: string;
    languagesSpoken?: string;
    document?: File | string | null;
  };
  agencyInfo: {
    logo?: File | string | null;
    name?: string;
    serviceDivision?: string;
    serviceArea?: {};
    grade?: string;
    employees?: string;
    physicalAddress?: "";
    mobileNumber: "";
    email?: string;
    description?: string;
    currency?: string;
    feeAmount?: number;
    depositAmount?: number;
    document?: string
    socialLinks: [{
      platform: string,
      link: string
    }]
  };
  terms: boolean;
}
const initialFormData: FormData = {
  agencyInfo: {
    logo: "",
    name: "",
    serviceDivision: "",
    serviceArea: {
      streetAddress: "",
      zipCode: "",
      country: "",
      state: "", // Required field: state
      city: "" // Required field: city
    },
    socialLinks: [
      {
        platform: "",
        link: "" // Required field: link
      }
    ],
    grade: "",
    physicalAddress: "",
    mobileNumber: "",
    email: "",
    description: "",
    document: "",
    currency: "",
    feeAmount: 500,
    depositAmount: 1000
  },
  personalInfo: {
    fullName: undefined,
    dateOfBirth: undefined,
    nationality: undefined,
    identificationNumber: undefined,
    phoneNumber: {
      code: "",
      number: ""
    },
    email: undefined,
    permanentAddress: undefined,
    document: undefined
  },
  terms: false
}

interface agencyProps {
  agencyid?: string;
}
interface Country {
  code: string;
  label: string;
}

const AgencyRegistrationForm: React.FC<agencyProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  function OpenAgencyForm(e: any) {
    const validated = validateForm();
    if (!validated) return
    e.preventDefault();

    setIsOpen(true);
  }

  function CloseAgencyForm(e: any) {
    e.preventDefault();
    setIsOpen(false);
  }

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [agencyForm, setAgencyForm] = useState({
    fullName: "",
    nationality: "",
    nationalIdOrPassport: "",
    phoneNumber: {
      code: "",
      number: ""
    },
    personalEmail: "",
    permanentAddress: "",
    personalDocuments: null,
    logo: "",
    name: "",
    serviceDivision: "Visa",
    serviceArea: "",
    grade: "",
    physicalAddress: "",
    mobileNumber: {
      code: "",
      number: ""
    },
    employers: "",
    email: "",
    description: "",
    document: "",
    currency: "",
    feeAmount: 0,
    depositAmount: 0,
    terms: false
  })

  const fileInputRef = useRef(null); // Define the ref

  function handleChange(e: any) {
    const { name } = e.target;
    const value = name == "terms" ? e.target.checked : e.target.value

    setAgencyForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateForm()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]); // Convert file to Base64
      reader.onload = () => {
        setAgencyForm((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      };
    }
    validateForm()
  }


  useEffect(() => {
    const userId = Cookies.get("userId");

    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: userId,
      }));
    }
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    console.log('validateForm called')
    // Validate personalInfo fields
    if (!agencyForm.fullName) {
      newErrors.fullName = "Full name is required";
    }
    if (!agencyForm.nationality) {
      newErrors.nationality = "Nationality is required";
    }
    if (!agencyForm.nationalIdOrPassport) {
      newErrors.nationalIdOrPassport = "Identification number is required";
    }
    if (!agencyForm.phoneNumber?.code || !agencyForm.phoneNumber?.number) {
      newErrors.phoneNumber  = "Phone number is required";
    }
    if (
      !agencyForm.personalEmail || 
      !/\S+@\S+\.\S+/.test(agencyForm.personalEmail) // Fix here
    ) {
      newErrors.personalEmail = "Valid email is required";
    }
    
    // Validate permanentAddress fields
    if (!agencyForm.permanentAddress) {
      newErrors.permanentAddress = "permanentAddress is required";
    }

    if (!agencyForm.personalDocuments || agencyForm.personalDocuments == null) {
      newErrors.personalDocuments = "permanentAddress is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneNumberChange = (value: string | undefined) => {
    if (value) {
      const code = value.slice(0, value.indexOf(" "));
      const number = value.slice(value.indexOf(" ") + 1);

      setAgencyForm((prevState) => ({
        ...prevState,
        phoneNumber: {
          ...prevState.phoneNumber, // Ensure previous phoneNumber state is preserved
          code: code,
          number: number
        }
      }));
    }
    validateForm()
  };

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  const shortenFileName = (name: string | undefined, maxLength = 15) => {
    if (!name) return "";
    if (name.length <= maxLength) return name;

    const extension = name.split(".").pop(); // Get file extension
    const baseName = name.replace(`.${extension}`, ""); // Remove extension

    return `${baseName.slice(0, 5)}...${baseName.slice(-5)}.${extension}`; // Shorten the middle part
  };

  console.log("Step one form::", agencyForm)

  return (
    <>
      <div className="flex w-full flex-col h-[600px] items-center justify-center md:px-4 lg:px-14  md:py-10 text-black">
        <Line />
        <h1 className="text-bold mb-2 mt-3 text-lg md:text-xl">
          Agency Registration Form
        </h1>
        <p>Personal Information</p>

        <form className="mt-6 grid items-center justify-center gap-5 md:grid-cols-2">
          {/* Full Name */}
          <fieldset className="border-2 border-[#151854] px-4 relative rounded-md">
            <legend className="px-2 text-sm font-bold text-[#151854]">
              Full Name
            </legend>
            <div className="flex items-center">
              <FaRegUser />
              <input
                className="border-none  outline-none"
                type="text"
                required
                name="fullName"
                value={agencyForm?.fullName}
                onChange={handleChange}
              />
            </div>
            {errors.fullName && (
              <span className=" absolute text-xs text-[#f70a22]">
                {errors.fullName}
              </span>
            )}
          </fieldset>
          {/* Nationality */}
          <fieldset className="border-2 border-[#151854] relative">
            <legend className="text-sm font-bold text-[#151854] borde w-[77px]  z-20 -top-3 bg-white left-4">
              Nationality
            </legend>
            <Select className=""
              name="nationality"
              options={countries}
              value={agencyForm.nationality}
              // onChange={(selectedOption: any) => setAgencyForm(prev => ({ ...prev, "nationality": selectedOption }))}
              onChange={(selectedOption: any) => {
                debugger
              }}

            />
            {errors.nationality && (
              <span className=" absolute text-xs text-[#f70a22]">
                {errors.nationality}
              </span>
            )}
          </fieldset>
          {/* National ID No / Passport No */}
          <fieldset className="border-2 border-[#151854] px-4 relative">
            <legend className="px-2 text-sm font-bold text-[#151854]">
              National ID No / Passport No
            </legend>
            <div className="flex items-center gap-5">
              <RiPassportLine />
              <input
                className="border-none py-2 outline-none"
                type="text"
                required
                name="nationalIdOrPassport"
                value={agencyForm?.nationalIdOrPassport}
                onChange={handleChange}

              />
            </div>
            {errors.nationalIdOrPassport && (
            <span className="absolute text-xs text-[#f70a22]">
              {errors.nationalIdOrPassport}
            </span>
          )}
          </fieldset>
      
          {/* Phone Number */}
          <fieldset className="border-2 border-[#151854] px-4 relative">
            <legend className="px-2 text-sm font-bold text-[#151854]">
              Phone Number
            </legend>
            <div className="flex items-center gap-5">
              {/* <FaPhone /> */}
              <div className="flex items-center">
                <PhoneInput
                  country="in"
                  value={`${agencyForm?.phoneNumber.code} ${agencyForm?.phoneNumber.number}`}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter mobile number"
                  inputStyle={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "12px",
                    paddingLeft: "45px",
                  }}
                  inputProps={{
                    name: "phoneNumber",
                    required: true,
                    autoFocus: true,
                  }}
                />
              </div>
            </div>
            {errors.phoneNumber && (
            <span className="text-xs text-[#f70a22] absolute">
              {errors.phoneNumber}
            </span>
          )}
          </fieldset>
          {/* Email Address */}
          <fieldset className="border-2 border-[#151854] px-4 relative">
            <legend className="px-2 text-sm font-bold text-[#151854]">
              Email Address
            </legend>
            <div className="flex items-center gap-5">
              <MdOutlineEmail />
              <input
                className="border-none py-2 outline-none"
                type="email"
                name="personalEmail"
                required
                value={agencyForm?.personalEmail}
                onChange={handleChange}
              />
            </div>
            {errors.personalEmail && (
            <span className="text-xs text-[#f70a22] absolute">{errors.personalEmail}</span>
          )}
          </fieldset>
        
          {/* Permanent Address */}
          <fieldset className="border-2 border-[#151854] px-4 relative">
            <legend className="px-2 text-sm font-bold text-[#151854]">
              Permanent Address
            </legend>
            <div className="flex items-center gap-5">
              <VscLocation />
              <input
                className="border-none py-2 outline-none"
                type="text"
                required
                name="permanentAddress"
                value={agencyForm?.permanentAddress}
                onChange={handleChange}
              />
            </div>
            {errors.permanentAddress && (
            <span className="text-xs text-[#f70a22] absolute">
              {errors.permanentAddress}
            </span>
          )}
          </fieldset>
      
          {/* Provide the Document */}
          <fieldset className="border-2 border-[#151854] px-4 py-3 relative">
            <legend className="px-2 text-sm font-bold text-[#151854]">
              Provide the Document
            </legend>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => fileInputRef.current.click()} >
              <FaRegFileLines />

              {/* Hidden file input */}
              <span>{shortenFileName(agencyForm?.personalDocuments?.name)}</span>
              <input
                type="file"
                name="personalDocuments"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Custom Upload Button */}
              <FiDownload
                className="cursor-pointer"
              />
            </div>
            {errors.personalDocuments && (
            <span className="text-xs text-[#f70a22] top-10 absolute">
              {errors.personalDocuments}
            </span>
          )}
          </fieldset>

          {/* Next Button */}
          <button
            onClick={OpenAgencyForm}
            className="mt-2 block bg-[#151854] py-4 text-center text-sm font-bold text-white"
            type="button"
          >
            Next
          </button>
        </form>
      </div>
      {isOpen && <AgencyPInfo agencyForm={agencyForm} setAgencyForm={setAgencyForm} />}
    </>
  );
};

export default AgencyRegistrationForm;
