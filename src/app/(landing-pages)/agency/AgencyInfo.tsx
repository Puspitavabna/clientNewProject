import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import successIcon from "../../../../public/successfull-icon.png";
import Line from "../../components/Line";
import PhoneInput from "react-phone-number-input";

interface Address {
  country: string;
  city: string;
  state: string;
  zipCode: string;
  address: string;
}

interface FormData {
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    identificationNumber: string;
    phoneNumber: string;
    email: string;
    permanentAddress: Address;
    educationQualifications: string[];
    skillsAcquired: string[];
    languagesSpoken: string[];
    document: File | null;
  };
  agencyInfo: {
    logo: File | null;
    name: string;
    serviceDivision: string;
    serviceArea: string;
    grade: string;
    employees: string;
    servicePeriod: {
      start: string;
      end: string;
    };
    physicalAddress: Address;
    phoneNumber: string;
    email: string;
    description: string;
    currency: string;
    feeAmount: number;
    depositAmount: number;
  };
}

const initialFormData: FormData = {
  personalInfo: {
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    identificationNumber: "",
    phoneNumber: "",
    email: "",
    permanentAddress: {
      country: "",
      city: "",
      state: "",
      zipCode: "",
      address: "",
    },
    educationQualifications: [""],
    skillsAcquired: [""],
    languagesSpoken: [""],
    document: null,
  },
  agencyInfo: {
    logo: null,
    name: "",
    serviceDivision: "",
    serviceArea: "",
    grade: "",
    employees: "",
    servicePeriod: {
      start: "",
      end: "",
    },
    physicalAddress: {
      country: "",
      city: "",
      state: "",
      zipCode: "",
      address: "",
    },
    phoneNumber: "",
    email: "",
    description: "",
    currency: "",
    feeAmount: 0,
    depositAmount: 0,
  },
};

const AgencyRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate personalInfo fields
    if (!formData.personalInfo.fullName)
      newErrors.fullName = "Full name is required";
    if (!formData.personalInfo.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.personalInfo.nationality)
      newErrors.nationality = "Nationality is required";
    if (!formData.personalInfo.identificationNumber)
      newErrors.identificationNumber = "Identification number is required";
    if (!formData.personalInfo.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (
      !formData.personalInfo.email ||
      !/\S+@\S+\.\S+/.test(formData.personalInfo.email)
    )
      newErrors.email = "Valid email is required";

    // Validate permanentAddress fields
    if (!formData.personalInfo.permanentAddress.country)
      newErrors.country = "Country is required";
    if (!formData.personalInfo.permanentAddress.city)
      newErrors.city = "City is required";
    if (!formData.personalInfo.permanentAddress.state)
      newErrors.state = "State is required";
    if (!formData.personalInfo.permanentAddress.zipCode)
      newErrors.zipCode = "Zip code is required";
    if (!formData.personalInfo.permanentAddress.address)
      newErrors.address = "Address is required";

    // Validate agencyInfo fields
    if (!formData.agencyInfo.name)
      newErrors.agencyName = "Agency name is required";
    if (!formData.agencyInfo.serviceDivision)
      newErrors.serviceDivision = "Service division is required";
    if (!formData.agencyInfo.serviceArea)
      newErrors.serviceArea = "Service area is required";
    if (!formData.agencyInfo.grade) newErrors.grade = "Grade is required";
    if (!formData.agencyInfo.employees)
      newErrors.employees = "Number of employees is required";
    if (
      !formData.agencyInfo.servicePeriod.start ||
      !formData.agencyInfo.servicePeriod.end
    )
      newErrors.servicePeriod = "Service period is required";
    if (!formData.agencyInfo.description)
      newErrors.description = "Description is required";

    if (!isTermsAccepted)
      newErrors.terms = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name: string, value: any) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${name.split(".").pop()} is required`,
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");

    setFormData((prevState) => {
      const updatedState = { ...prevState };
      let current: any = updatedState;
      for (let i = 0; i < nameParts.length - 1; i++) {
        current = current[nameParts[i]];
      }
      current[nameParts[nameParts.length - 1]] = value;
      return updatedState;
    });

    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/agency/register`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error registering agency:", error);
    }
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => setCurrentStep(currentStep - 1);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsAccepted(e.target.checked); // Update the state based on checkbox checked status
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
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const maxFileSize = 3 * 1024 * 1024;
    if (file.size > maxFileSize) {
      alert("File size exceeds 3 MB. Please select a smaller file.");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a JPEG, PNG, or PDF file.");
      return;
    }
    setFormData((prevState: FormData) => ({
      ...prevState,
      personalInfo: {
        ...prevState.personalInfo,
        document: file,
      },
    }));

  };
  return (
    <div>
      {currentStep === 1 && (
        <form className="p-8 text-gray-500">
          <div className="flex flex-col items-center justify-center">
            <Line />
            <h2 className="my-2 flex justify-center text-2xl font-bold text-gray-500">
              Agency Registration Form
            </h2>
            <p>Personal Information</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="">
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>
            <div className="">
              <label className="mb-2 block text-left text-sm font-medium">
                Date of birth
              </label>
              <input
                type="date"
                name="dateofbirth"
                placeholder="MM/DD/YYYY"
                //  value={formData.deadline}
                // onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>

            <div className="">
              <label className="mb-2 block text-sm font-medium">
                Nationality
              </label>
              <select
                name="nationality"
                // value={formData.projectRequirement}
                // onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">Select Nationality</option>
                <option value="web">Egypt</option>
                <option value="app">USA</option>
                <option value="design">UK</option>
              </select>
            </div>

            <div className="">
              <label className="mb-2 block text-nowrap text-sm font-medium">
                National Identify No /passport No
              </label>
              <input
                type="text"
                name="fullName"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>
            <div className="">
              <label className="mb-2 block text-nowrap text-sm font-medium">
                Education Qualifications
              </label>
              <input
                type="text"
                name="education"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>
            <div className="">
              <label className="mb-2 block text-nowrap text-sm font-medium">
                Skills Aquaired
              </label>
              <input
                type="text"
                name="education"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>
            <div className="">
              <label className="mb-2 block text-nowrap text-sm font-medium">
                Language Spoken
              </label>
              <input
                type="text"
                name="language"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>
            <div className="">
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>
              <div className="flex items-center">
                <PhoneInput
                  country="in"
                  // value={agencyForm?.phoneNumber}
                  // onChange={handlePhoneNumberChange}
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
                {/* <input
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="border-none py-2 outline-none"
                  placeholder="Phone Number"
                  required
                /> */}
              </div>
            </div>
            <div className="">
              <label className="mb-2 block text-nowrap text-sm font-medium">
                Email
              </label>
              <input
                type="text"
                name="email"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>

            <div className="col-span-3">
              <label className="mb-2 block text-nowrap text-sm font-bold">
                Permanent Address
              </label>
            </div>

            <div className="">
              <label className="mb-2 block text-sm font-medium">Country</label>
              <select
                name="nationality"
                // value={formData.projectRequirement}
                // onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">Select country</option>
                <option value="web">Egypt</option>
                <option value="app">UK</option>
              </select>
            </div>

            <div className="">
              <label className="mb-2 block text-sm font-medium">State</label>
              <select
                name="nationality"
                // value={formData.projectRequirement}
                // onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">Select State </option>
                <option value="web">Cairo</option>
                <option value="app">Dubai</option>
              </select>
            </div>

            <div className="">
              <label className="mb-2 block text-sm font-medium">City</label>
              <select
                name="nationality"
                // value={formData.projectRequirement}
                // onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">Select City </option>
                <option value="web">Cairo</option>
                <option value="app">Dubai</option>
              </select>
            </div>

            <div className="">
              <label className="mb-2 block text-nowrap text-sm font-medium">
                zip code
              </label>
              <input
                type="text"
                name="fullName"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>

            <div className="">
              <label className="mb-2 block text-nowrap text-sm font-medium">
                Address
              </label>
              <input
                type="text"
                name="fullName"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>

            <div className="">
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>
              <div className="flex flex-row items-center justify-center rounded-lg border border-gray-300 p-[0.125rem]">
                <select
                  name="code"
                  // value={formData.projectRequirement}
                  // onChange={handleChange}
                  className="block h-8 rounded-lg border border-[#6698FF96] bg-[#D9D9D91A]"
                >
                  <option value="">Code</option>
                  <option value="web">+20</option>
                  <option value="app">+1</option>
                </select>
                <input
                  type="text"
                  name="fullName"
                  // value={formData.fullName}
                  //  onChange={handleChange}
                  className="block h-8 w-full rounded-lg bg-[#D9D9D91A] p-1"
                />
              </div>
            </div>
            <div className="">
              <label className="mb-2 block text-sm font-medium">
                Provide Document{" "}
                <span className="text-sm text-[#C90000]">
                  Size is below 3 MB
                </span>
              </label>

              <div className="flex flex-row rounded-lg border border-gray-300 px-2">
                <input
                  type="text"
                  name="fullName"
                  value="Upload files"
                  //  onChange={handleChange}
                  className="block h-8 w-full rounded-lg bg-[#D9D9D91A] p-1 text-sm"
                />
                <Image
                  src="/images/download.png"
                  alt="Order successful"
                  width={30}
                  height={30}
                />
              </div>
            </div>

            <div></div>
            <div className="flex items-end justify-end">
              <button
                type="button"
                // onClick={handleSubmit}
                onClick={nextStep}
                className="mt-4 rounded-lg bg-[#151B54] px-16 py-4 text-lg font-semibold text-[#ffffff]"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      )}
      {currentStep === 2 && (
        <form className="p-8 text-gray-500">
          <div className="flex flex-col items-center justify-center">
            <Line />
            <h2 className="flex justify-center text-2xl font-bold text-gray-500">
              Agency Registration Form
            </h2>
            <p>Agency Information</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="">
              <label className="mb-2 block text-sm font-medium">
                Agency logo{" "}
                <span className="text-sm text-[#C90000]">
                  Size is below 1 MB
                </span>
              </label>
              <div className="flex flex-row rounded-lg border border-gray-300 px-2">
                <input
                  type="text"
                  name="fullName"
                  value="Size: Height 100px Weight 100px"
                  //  onChange={handleChange}
                  className="block h-8 w-full rounded-lg bg-[#D9D9D91A] p-1 text-sm"
                />
                <Image
                  src="/images/download.png"
                  alt="Order successful"
                  width={30}
                  height={30}
                 
                />
              </div>
            </div>
            <div className="">
              <label className="mb-2 block text-sm font-medium">
                Agency Name
              </label>
              <input
                type="text"
                name="fullName"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>
            <div className="">
              <label className="mb-2 block text-sm font-medium">
                Service Division
              </label>
              <select
                name="nationality"
                // value={formData.projectRequirement}
                // onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">Select Service</option>
                <option value="web">Civil Engineering</option>
                <option value="app">Information Technology</option>
              </select>
            </div>
            <div className="">
              <label className="mb-2 block text-sm font-medium">Grade</label>
              <select
                name="nationality"
                // value={formData.projectRequirement}
                // onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">A</option>
                <option value="web">B</option>
                <option value="app">C</option>
              </select>
            </div>
            <div className="">
              <label className="mb-2 block text-sm font-medium">Employee</label>
              <select
                name="nationality"
                // value={formData.projectRequirement}
                // onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">10-15</option>
                <option value="web">5-10</option>
                <option value="app">20-25</option>
              </select>
            </div>
            <div className="">
              <label className="mb-2 block text-sm font-medium">
                Service Period
              </label>
              <select
                name="nationality"
                // value={formData.projectRequirement}
                // onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">1 Year</option>
                <option value="web">5 Year</option>
                <option value="app">10 Year</option>
              </select>
            </div>
            <div className="">
              <label className="mb-2 block text-nowrap text-sm font-medium">
                Service Area
              </label>
              <input
                type="text"
                name="area"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>

            <div className="">
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>
              <div className="flex flex-row items-center justify-center rounded-lg border border-gray-300 p-[0.125rem]">
                <select
                  name="code"
                  // value={formData.projectRequirement}
                  // onChange={handleChange}
                  className="block h-8 rounded-lg border border-[#6698FF96] bg-[#D9D9D91A]"
                >
                  <option value="">Code</option>
                  <option value="web">+20</option>
                  <option value="app">+1</option>
                </select>
                <input
                  type="text"
                  name="fullName"
                  // value={formData.fullName}
                  //  onChange={handleChange}
                  className="block h-8 w-full rounded-lg bg-[#D9D9D91A] p-1"
                />
              </div>
            </div>
            <div className="">
              <label className="mb-2 block text-nowrap text-sm font-medium">
                Email
              </label>
              <input
                type="text"
                name="email"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>

            <div className="col-span-3">
              <label className="mb-2 block text-nowrap text-sm font-bold">
                Agency’s physical Address
              </label>
            </div>

            <div className="">
              <label className="mb-2 block text-sm font-medium">Country</label>
              <select
                name="nationality"
                // value={formData.projectRequirement}
                // onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">Select country</option>
                <option value="web">Egypt</option>
                <option value="app">UK</option>
              </select>
            </div>

            <div className="">
              <label className="mb-2 block text-sm font-medium">State</label>
              <select
                name="nationality"
                // value={formData.projectRequirement}
                // onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">Select State </option>
                <option value="web">Cairo</option>
                <option value="app">Dubai</option>
              </select>
            </div>

            <div className="">
              <label className="mb-2 block text-sm font-medium">City</label>
              <select
                name="nationality"
                // value={formData.projectRequirement}
                // onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A]"
              >
                <option value="">Select City </option>
                <option value="web">Cairo</option>
                <option value="app">Dubai</option>
              </select>
            </div>

            <div className="">
              <label className="mb-2 block text-nowrap text-sm font-medium">
                zip code
              </label>
              <input
                type="text"
                name="fullName"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>

            <div className="">
              <label className="mb-2 block text-nowrap text-sm font-medium">
                Address
              </label>
              <input
                type="text"
                name="fullName"
                // value={formData.fullName}
                //  onChange={handleChange}
                className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
              />
            </div>

            <div className="">
              <label className="mb-2 block text-sm font-medium">
                Provide the Document{" "}
                <span className="text-sm text-[#C90000]">
                  Size is below 3 MB
                </span>
              </label>
              <div className="flex flex-row rounded-lg border border-gray-300 px-2">
                <input
                  type="text"
                  name="fullName"
                  value="Upload files"
                  //  onChange={handleChange}
                  className="block h-8 w-full rounded-lg bg-[#D9D9D91A] p-1 text-sm"
                />
                <Image
                  src="/images/download.png"
                  alt="Order successful"
                  width={30}
                  height={30}
                 
                />
              </div>
            </div>
            <div></div>
            <div>
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
                // onClick={handleSubmit}
                onClick={nextStep}
                className="mt-4 rounded-lg bg-[#151B54] px-16 py-4 text-lg font-semibold text-[#ffffff]"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      )}
      {currentStep === 3 && (
        <>
          <form className="p-8 text-gray-500">
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
                name="projectdetail"
                //value={formData.projectdetail}
                // onChange={handleChange}
                className="h-30 mt-1 block w-full rounded-lg border border-gray-300 bg-[#fffffff] p-1 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-black"
                rows={8}
              />
            </div>
            <div className="grid-col-1 md:grid-col-1 mt-10 grid gap-2">
              <div className="">
                <input
                  type="checkbox"
                  name="terms"
                  className="mr-2"
                  //  onChange={handleCheckboxChange}
                />
                <label className="text-sm font-medium">
                  I agree to all Terms and conditions , privacy policy{" "}
                </label>
              </div>

              {/* <div> 
              <button
              type="button"
              onClick={prevStep}
              className="mt-4 font-semibold text-lg bg-gray-300 px-16 py-4 rounded-lg"
            >
              Previous
            </button>
            </div>  */}
              <div className="flex items-end justify-end">
                <button
                  type="button"
                  // onClick={handleSubmit}
                  onClick={nextStep}
                  className="mt-4 rounded-lg bg-[#151B54] px-16 py-4 text-lg font-semibold text-[#ffffff]"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      )}
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
            <p className="mt-2 text-gray-500">
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

export default AgencyRegistrationForm;
