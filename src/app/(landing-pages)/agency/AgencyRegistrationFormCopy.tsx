import { env } from "@/config/env";
import Line from "@/src/app/components/Line";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RxDownload } from "react-icons/rx";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select"
import successIcon from "../../../../public/successfull-icon.png";

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
    serviceArea?: string;
    grade?: string;
    employees?: string;
    servicePeriod?: string;
    physicalAddress?: string;
    mobileNumber: {
      code: string;
      number: string;
    };
    email?: string;
    description?: string;
    currency?: string;
    feeAmount?: number;
    depositAmount?: number;
  };
  terms: boolean;
}
const initialFormData: FormData = {
  personalInfo: {
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    identificationNumber: "",
    phoneNumber: {
      code: "",
      number: "",
    },
    email: "",
    permanentAddress: "",
    educationQualifications: "",
    skillsAcquired: "",
    languagesSpoken: "",
    document: null,
  },
  agencyInfo: {
    logo: null,
    name: "",
    serviceDivision: "",
    serviceArea: "",
    grade: "",
    employees: "",
    servicePeriod: "",
    physicalAddress: "",
    email: "",
    mobileNumber: {
      code: "",
      number: "",
    },
    description: "",
    currency: "",
    feeAmount: 0,
    // depositAmounnt: 0,
  },
  terms: false,
};
interface agencyProps {
  agencyid?: string;
}
interface Country {
  code: string;
  label: string;
}
const countries = ["Egypt", "UK", "USA", "India"];
const educations = [
  "Batchelor of Science",
  "Master of of Science",
  "Polytechnic",
];
const languages = ["English", "Hindi", "Russian", "French"];
const skills = ["Civil Engineer", "Mechanical Engineer", "Software Engineer"];

const AgencyRegistrationFormOld: React.FC<agencyProps> = ({}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

 

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
    if (!formData.personalInfo.fullName) {
      newErrors.fullName = "Full name is required";
      console.log("Validation failed: Full name is missing");
      return
    }
    if (!formData.personalInfo.dateOfBirth)
     return newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.personalInfo.nationality)
     return newErrors.nationality = "Nationality is required";
    if (!formData.personalInfo.identificationNumber)
     return newErrors.identificationNumber = "Identification number is required";
    if (!formData.personalInfo.phoneNumber.code)
    return  newErrors.code = "Code is required";
    if (!formData.personalInfo.phoneNumber.number)
     return newErrors.number = "Number is required";
    if (
      !formData.personalInfo.email ||
      !/\S+@\S+\.\S+/.test(formData.personalInfo.email)
    )
     return newErrors.email = "Valid email is required";

    // Validate permanentAddress fields
    if (!formData.personalInfo.permanentAddress)
     return newErrors.permanentAddress = "permanentAddress is required";
    // if (!formData.personalInfo.permanentAddress.city) newErrors.city = "City is required";
    // if (!formData.personalInfo.permanentAddress.state) newErrors.state = "State is required";
    // if (!formData.personalInfo.permanentAddress.zipCode) newErrors.zipCode = "Zip code is required";
    // if (!formData.personalInfo.permanentAddress.address) newErrors.address = "Address is required";

    // Validate agencyInfo fields
    if (!formData.agencyInfo.name)
     return newErrors.agencyName = "Agency name is required";
    if (!formData.agencyInfo.serviceDivision)
      return newErrors.serviceDivision = "Service division is required";
    if (!formData.agencyInfo.serviceArea)
      return newErrors.serviceArea = "Service area is required";
    if (!formData.agencyInfo.grade) return newErrors.grade = "Grade is required";
    if (!formData.agencyInfo.employees)
      return newErrors.employees = "Number of employees is required";
    
    
    // if (
    //   !formData.agencyInfo.servicePeriod.start ||
    //   !formData.agencyInfo.servicePeriod.end
    // )
    if (!formData.agencyInfo.servicePeriod)
      return newErrors.servicePeriod = "Service period is required";
    if (!formData.agencyInfo.mobileNumber.code)
      return newErrors.code = "Code is required";
    if (!formData.agencyInfo.mobileNumber.number)
      return newErrors.number = "Number is required";

    if (!formData.agencyInfo.description)
      return newErrors.description = "Description is required";
    if (!formData.agencyInfo.physicalAddress)
      return newErrors.physicalAddress = "Physical Address is required";

    if (!formData.terms)
      return newErrors.terms = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      const keys = name.split(".");
      let temp = { ...prevState };

      keys.reduce((acc: any, key: any, index) => {
        if (index === keys.length - 1) {
          acc[key] = value;
        } else {
          acc[key] = acc[key] || {};
        }
        return acc[key];
      }, temp);

      return temp;
    });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name]; // Remove the error for this field
      return newErrors;
    });
  };

  const handlePhoneNumberChange = (value: string | undefined) => {
    if (value) {
      const code = value.slice(0, value.indexOf(" "));
      const number = value.slice(value.indexOf(" ") + 1);

      setFormData((prevState: any) => {
        return {
          ...prevState,
          personalInfo: {
            ...prevState.personalInfo,
            phoneNumber: { code, number },
          },
        };
      });
    }
  };

  const handleMobileNumberChange = (value: string | undefined) => {
    if (value) {
      const code = value.slice(0, value.indexOf(" ")); // Extract the country code (e.g., +91)
      const number = value.slice(value.indexOf(" ") + 1); // Extract the phone number

      setFormData((prevState: any) => {
        return {
          ...prevState,
          agencyInfo: {
            ...prevState.agencyInfo,
            mobileNumber: { code, number },
          },
        };
      });
    }
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setErrors((prev) => ({
        ...prev,
        document: "No file selected.",
      }));
      return;
    }

    const maxFileSize = 3 * 1024 * 1024;
    if (file.size > maxFileSize) {
      setErrors((prev) => ({
        ...prev,
        document: "File size exceeds 3 MB. Please select a smaller file.",
      }));
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        document: "Invalid file type. Please upload a JPEG, PNG, or PDF file.",
      }));
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      personalInfo: {
        ...prevState.personalInfo,
        document: file,
      },
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.document; // Clear document error
      return newErrors;
    });

    console.log("File uploaded successfully:", file.name);
  };
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setErrors((prev) => ({
        ...prev,
        logo: "No file selected.",
      }));
      return;
    }

    const maxFileSize = 3 * 1024 * 1024;
    if (file.size > maxFileSize) {
      setErrors((prev) => ({
        ...prev,
        logo: "File size exceeds 3 MB. Please select a smaller file.",
      }));
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        logo: "Invalid file type. Please upload a JPEG, PNG, or PDF file.",
      }));
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      agencyInfo: {
        ...prevState.agencyInfo,
        logo: file,
      },
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.logo; // Clear document error
      return newErrors;
    });

    console.log("File uploaded successfully:", file.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("called now.. ....")
    if (!validateForm()) return;
   console.log("called now..")
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (subValue instanceof File) {
              formDataToSend.append(`${key}.${subKey}`, subValue);
            } else if (typeof subValue === "object" && subValue !== null) {
              formDataToSend.append(
                `${key}.${subKey}`,
                JSON.stringify(subValue),
              );
            } else {
              formDataToSend.append(`${key}.${subKey}`, String(subValue));
            }
          });
        } else {
          formDataToSend.append(key, String(value));
        }
      });


      //get user token for authorization
      const token = Cookies.get("token");
      console.log(token)
       if(!token){
        throw Error("Token is needed to continue.")
       }

      const response = await axios.post(
        `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/agencies/register`,
        formDataToSend,
        
        {
          headers: { "Content-Type": "multipart/form-data",
            "Authorization":`Bearer ${token}`

           },
          
        },
      );

      alert("submit successfull");
      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error registering agency:", error);
    }

  };
  const prevStep = () => setCurrentStep(currentStep - 1);

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      console.log("Cannot proceed to the next step. Errors:", errors);
    }
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    addressType: "permanentAddress" | "physicalAddress",
  ) => {
    const { name, value } = e.target;
    const section =
      addressType === "permanentAddress" ? "personalInfo" : "agencyInfo";

    setFormData((prevState) => {
      const sectionData = prevState[section as keyof FormData];

      if (
        sectionData &&
        typeof sectionData === "object" &&
        addressType in sectionData
      ) {
        return {
          ...prevState,
          [section]: {
            ...sectionData,
            [addressType]: {
              ...(sectionData as any)[addressType],
              [name]: value,
            },
          },
        };
      }

      return prevState; // Return the original state if the conditions are not met
    });
  };
  const handleNationalityChange = (
    event: any,
    newValue: { code: string; label: string } | null,
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      personalInfo: {
        ...prevFormData.personalInfo,
        nationality: newValue ? newValue.label : "",
      },
    }));
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);

    setFormData((prevFormData) => ({
      ...prevFormData,
      terms: isChecked,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (isChecked) {
        delete newErrors.terms; // Clear terms error if checked
      }
      return newErrors;
    });
  };

 

  return (
    <div>
      {/* {currentStep === 1 && ( */}
      <form className="p-8 text-black">
        <div className="flex flex-col items-center justify-center">
          <Line />
          <h2 className="my-2 flex justify-center text-2xl font-bold text-black">
            Agency Registration Form
          </h2>
          <p>Personal Information</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
          <div className="">
            <label className="mb-2 block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="personalInfo.fullName"
              value={formData.personalInfo.fullName}
              onChange={handleInputChange}
              className="block h-8 w-full rounded-lg border border-[#151854] bg-[#D9D9D91A] p-1 "
            />
            {errors.fullName && (
              <span className="text-xs text-[#f70a22]">{errors.fullName}</span>
            )}
          </div>
          {/* <div className="">
            <label className="mb-2 block text-left text-sm font-medium">
              Date of birth
            </label>
            <input
              type="date"
              name="personalInfo.dateOfBirth"
              placeholder="MM/DD/YYYY"
              value={formData.personalInfo.dateOfBirth}
              onChange={handleInputChange}
              className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
            />

            {errors.dateOfBirth && (
              <span className="text-xs text-[#f70a22]">
                {errors.dateOfBirth}
              </span>
            )}
          </div> */}

          <div className="">
            <label className="mb-2 block text-sm font-medium">
              Nationality
            </label>
            {/* <select
              name="personalInfo.nationality"
              value={formData.personalInfo.nationality}
              onChange={handleInputChange}
              className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
            >
              <option value="">Select Nationality</option>
              {countries.map((country,index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select> */}
            <Select className="py-1.5 border:none"
      options={countries}
      value={formData.personalInfo.nationality}
      onChange={(selectedOption:any) => setSelectedCountry(selectedOption)}
    />
            {errors.nationality && (
              <span className="text-xs text-[#f70a22]">
                {errors.nationality}
              </span>
            )}
          </div>

          <div className="">
            <label className="mb-2 block text-nowrap text-sm font-medium">
              National Identify No /passport No
            </label>
            <input
              type="text"
              name="personalInfo.identificationNumber"
              value={formData.personalInfo.identificationNumber}
              onChange={handleInputChange}
              className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
            />
            {errors.identificationNumber && (
              <span className="text-xs text-[#f70a22]">
                {errors.identificationNumber}
              </span>
            )}
          </div>
          {/* <div className="">
            <label className="mb-2 block text-nowrap text-sm font-medium">
              Education Qualifications
            </label>
            
            <select
              name="personalInfo.educationQualifications"
              value={formData.personalInfo.educationQualifications}
              onChange={handleInputChange}
              className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
            >
              <option value="">Select Education</option>
              {educations.map((education,index) => (
                <option key={index} value={education}>{education}</option>
              ))}
            </select>
            {errors.educationQualifications && (
              <span className="text-xs text-[#f70a22]">
                {errors.educationQualifications}
              </span>
            )}
          </div>

          <div className="">
            <label className="mb-2 block text-nowrap text-sm font-medium">
              Skills Acquired
            </label>
            <select
              name="personalInfo.skillsAcquired"
              value={formData.personalInfo.skillsAcquired}
              onChange={handleInputChange}
              className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
            >
              <option value="">Select Education</option>
              {skills.map((skill,index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
            {errors.skillsAcquired && (
              <span className="text-xs text-[#f70a22]">
                {errors.skillsAcquired}
              </span>
            )}
          </div>

          <div className="">
            <label className="mb-2 block text-nowrap text-sm font-medium">
              Languages Spoken
            </label>
            
            <select
              name="personalInfo.languagesSpoken"
              value={formData.personalInfo.languagesSpoken}
              onChange={handleInputChange}
              className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
            >
              <option value="">Select Education</option>
              {languages.map((language,index) => (
                <option  key={index} value={language}>{language}</option>
              ))}
            </select>
            {errors.languagesSpoken && (
              <span className="text-xs text-[#f70a22]">
                {errors.languagesSpoken}
              </span>
            )}
          </div> */}
<div className="col-span-3">
            <label className="mb-2 block text-nowrap text-sm font-bold">
              Permanent Address
            </label>
          </div>
          <div className="">
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>
            <div className="flex flex-row items-center justify-center rounded-lg border border-gray-300 p-[0.125rem]">
              <div className="block h-8 w-full rounded-lg bg-[#D9D9D91A] p-1">
                <PhoneInput
                  country="in"
                  value={`${formData.personalInfo.phoneNumber.code} ${formData.personalInfo.phoneNumber.number}`}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter mobile number"
                  inputStyle={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "12px",
                    paddingLeft: "45px",
                  }}
                  inputProps={{
                    name: "mobileNo",
                    required: true,
                    autoFocus: true,
                  }}
                />
              </div>
            </div>
            {errors.phoneNumber && (
              <span className="text-xs text-[#f70a22]">
                {errors.phoneNumber}
              </span>
            )}
          </div>
          <div className="">
            <label className="mb-2 block text-nowrap text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              name="personalInfo.email"
              value={formData.personalInfo.email}
              onChange={handleInputChange}
              className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
            />
            {errors.email && (
              <span className="text-xs text-[#f70a22]">{errors.email}</span>
            )}
          </div>
          
          <div className="mb-4">
            <label className="mb-2 block text-nowrap text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              name="personalInfo.permanentAddress"
              value={formData.personalInfo.permanentAddress}
              onChange={handleInputChange}
              className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
            />
            {errors.permanentAddress && (
              <span className="text-xs text-[#f70a22]">
                {errors.permanentAddress}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Provide the Document
              <span className="text-sm text-[#C90000]">Size is below 3 MB</span>
            </label>
            <div className="flex flex-row rounded-lg border border-gray-300 px-2">
              <input
                type="file"
                name="document"
                onChange={handleFileUpload}
                className="block h-8 w-full rounded-lg bg-[#D9D9D91A] p-1 text-sm"
              />
              <div className="flex items-center justify-center text-2xl text-[#151B54]">
                <RxDownload />
              </div>
            </div>
            {errors.document && (
              <span className="text-xs text-[#f70a22]">{errors.document}</span>
            )}
          </div>

          {/* <div className="flex items-end justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="mt-4 rounded-lg bg-[#151B54] px-16 py-4 text-lg font-semibold text-[#ffffff]"
              >
                Next
              </button>
            </div> */}
        </div>
      </form>
      {/* )}  */}
      {/* {currentStep === 2 && ( */}
      <form className="p-8 text-black">
        <div className="flex flex-col items-center justify-center">
          <Line />
          <h2 className="my-2 flex justify-center text-2xl font-bold text-black">
            Agency Registration Form
          </h2>
          <p>Agency Information</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-3">
          <div className="">
            <label className="mb-2 block text-sm font-medium">
              Agency logo{" "}
              <span className="text-sm text-[#C90000]">Size is below 1 MB</span>
            </label>
            <div className="flex flex-row rounded-lg border border-gray-300 px-2">
              <input
                type="file"
                name="agencyInfo.logo"
                onChange={handleLogoUpload}
                className="block h-8 w-full rounded-lg bg-[#D9D9D91A] p-1 text-sm"
              />
              <Image
                src="/images/download.png"
                alt="Upload Document"
                width={30}
                height={30}
               
              />
            </div>
            {errors.logo && (
              <span className="text-xs text-[#f70a22]">{errors.logo}</span>
            )}
          </div>
          <div className="">
            <label className="mb-2 block text-sm font-medium">
              Agency Name
            </label>
            <input
              type="text"
              name="agencyInfo.name"
              value={formData.agencyInfo.name}
              onChange={handleInputChange}
              className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
            />
          </div>
          <div className="">
            <label className="mb-2 block text-sm font-medium">
              Service Division
            </label>
            <select
              name="agencyInfo.serviceDivision"
              value={formData.agencyInfo.serviceDivision}
              onChange={handleInputChange}
              className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
            >
              <option value="Select Service">Select Service</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Information Technology">Information Technology</option>
            </select>
          </div>
          <div className="">
            <label className="mb-2 block text-sm font-medium">Grade</label>
            <select
              name="agencyInfo.grade"
              value={formData.agencyInfo.grade}
              onChange={handleInputChange}
              className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="">
            <label className="mb-2 block text-sm font-medium">Employee</label>
            <select
              name="agencyInfo.employees"
              value={formData.agencyInfo.employees}
              onChange={handleInputChange}
              className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
            >
              <option value="10-15">10-15</option>
              <option value="5-10">5-10</option>
              <option value="20-30">20-25</option>
            </select>
          </div>
          <div className="">
            <label className="mb-2 block text-sm font-medium">
              Service Period
            </label>
            <select
              name="agencyInfo.servicePeriod"
              value={formData.agencyInfo.servicePeriod}
              onChange={handleInputChange}
              className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
            >
              <option value="1 years">1 Year</option>
              <option value="5 years">5 Year</option>
              <option value="10 years">10 Year</option>

            </select>
          </div>
          <div className="">
            <label className="mb-2 block text-nowrap text-sm font-medium">
              Service Area
            </label>
            <input
              type="text"
              name="agencyInfo.serviceArea"
              value={formData.agencyInfo.serviceArea}
              onChange={handleInputChange}
              className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
            />
          </div>

          <div className="">
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>
            <div className="flex flex-row items-center justify-center rounded-lg border border-gray-300 p-[0.125rem]">
              <div className="block h-8 w-full rounded-lg bg-[#D9D9D91A] p-1">
                <PhoneInput
                  country="in"
                  value={`${formData.agencyInfo.mobileNumber.code} ${formData.agencyInfo.mobileNumber.number}`}
                  onChange={handleMobileNumberChange}
                  placeholder="Enter mobile number"
                  inputStyle={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "12px",
                    paddingLeft: "45px",
                  }}
                  inputProps={{
                    name: "mobileNo",
                    required: true,
                    autoFocus: true,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="">
            <label className="mb-2 block text-nowrap text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              name="agencyInfo.email"
              value={formData.agencyInfo.email}
              onChange={handleInputChange}
              className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
            />
          </div>

          <div className="col-span-3">
            <label className="mb-2 block text-nowrap text-sm font-bold">
              Agency’s physical Address
            </label>
          </div>

          {/* <div className="">
              <label className="mb-2 block text-sm font-medium">Country</label>
              <select
                name="nationality"
                value={formData.agencyInfo.physicalAddress.country}
                onChange={(e) => handleAddressChange(e, "physicalAddress")}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div> */}

          {/* <div className="">
              <label className="mb-2 block text-sm font-medium">State</label>
              <select
                name="state"
                value={formData.agencyInfo.physicalAddress.state}
                onChange={(e) => handleAddressChange(e, "physicalAddress")}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">Select State </option>
                <option value="web">Cairo</option>
                <option value="app">Dubai</option>
              </select>
            </div> */}

          {/* <div className="">
              <label className="mb-2 block text-sm font-medium">City</label>
              <select-7*+-6*-
                name="city"
                value={formData.agencyInfo.physicalAddress.city}
                onChange={(e) => handleAddressChange(e, "physicalAddress")}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">Select City </option>
                <option value="web">Cairo</option>
                <option value="app">Dubai</option>
              </select-7*+-6*->
            </div> */}

          {/* <div className="">
              <label className="mb-2 block text-nowrap text-sm font-medium">
                zip code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.agencyInfo.physicalAddress.zipCode}
                onChange={(e) => handleAddressChange(e, "physicalAddress")}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div> */}

          <div className="">
            <label className="mb-2 block text-nowrap text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              name="agencyInfo.physicalAddress"
              value={formData.agencyInfo.physicalAddress}
              onChange={handleInputChange}
              className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
            />
            {errors.physicalAddress && (
              <span className="text-xs text-[#f70a22]">
                {errors.physicalAddress}
              </span>
            )}
          </div>

          <div className="">
            <label className="mb-2 block text-sm font-medium">
              Provide the Document{" "}
              <span className="text-sm text-[#C90000]">Size is below 3 MB</span>
            </label>
            <div className="flex flex-row rounded-lg border border-gray-300 px-2">
              <input
                type="file"
                name="document"
                onChange={handleFileUpload}
                className="block h-8 w-full rounded-lg bg-[#D9D9D91A] p-1 text-sm"
              />
              <div className="flex items-center justify-center text-2xl text-[#151B54]">
                <RxDownload />
              </div>
            </div>
          </div>

          {/* <div>
              {" "}
              <button
                type="button"
                onClick={prevStep}
                className="mt-4 rounded-lg bg-gray-300 px-16 py-4 text-lg font-semibold"
              >
                Previous
              </button>
            </div>
            <div className="flex items-end justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="mt-4 rounded-lg bg-[#151B54] px-16 py-4 text-lg font-semibold text-[#ffffff]"
              >
                Next
              </button>
            </div> */}
        </div>
      </form>
      {/* )}  */}
      {/* {currentStep === 3 && (  */}
      <>
        <form onSubmit={handleSubmit} className="p-8 text-black">
          <div className="flex flex-col items-center justify-center">
            <Line />
            <h2 className="my-2 flex justify-center text-2xl font-bold text-gray-500">
              Agency Registration Form 
            </h2>
            <p>Agency Information</p>
          </div>
          <div className="col-span-1 py-4">
            <label className="mb-2 block text-sm font-medium">
              Description of Services
            </label>
            <textarea
              name="agencyInfo.description"
              value={formData.agencyInfo.description}
              onChange={handleInputChange}
              className="h-30 mt-1 block w-full rounded-lg border border-gray-300 bg-[#fffffff] p-1 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-black"
              rows={8}
            />
            {errors.description && (
              <span style={{ color: "red" }}>{errors.description}</span>
            )}
          </div>
          <div className="grid-col-1 md:grid-col-1 mt-10 grid gap-2">
            <div className="">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label className="text-sm font-medium">
                I agree to all Terms and conditions , privacy policy{" "}
              </label>
            </div>
            {errors.terms && (
              <span style={{ color: "red" }}>{errors.terms}</span>
            )}
            {/* <div>
                <button
                  type="button"
                  onClick={prevStep}
                  className="mt-4 rounded-lg bg-gray-300 px-16 py-4 text-lg font-semibold"
                >
                  Previous
                </button>
              </div> */}
            <div className="flex items-end justify-end">
              <button
                type="submit"  value={"submit"}
                className="mt-4 rounded-lg bg-[#151B54] px-16 py-4 text-lg font-semibold text-[#ffffff]"
              >
                Submit  
              </button>
            </div>
          </div>
        </form>
      </>
      {/* )}  */}
      {/* Popup */}
      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-auto w-[350px] rounded-lg bg-white p-6 text-center shadow-lg">
            <div className="align-center mb-2 flex justify-center">
              <Image
                src={successIcon}
                alt="success icon"
                width={80}
                height={80}
               
              />
            </div>

            <h6 className="text-xl font-bold text-black">Successful</h6>
            <p className="mt-2 text-black">
              Thank you very much for registering the Agency.
            </p>
            <button
              className="mt-6 rounded-lg bg-[#151B54] px-6 py-2 text-white"
              //   onClick={closePopup}
              onClick={() => {
                setIsSubmitted(false); // Close the popup
                setCurrentStep(1); // Reset the form to step 1 or hide it entirely
              }}
            >
              Check Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyRegistrationFormOld;
