import HCaptcha from "@hcaptcha/react-hcaptcha";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { env } from "../../../config/env";
import { useAPPContext } from "../../app/context/AppContextType";
import Tabs from "./Tabs";
import { useRouter } from "next/navigation";
import blueLine from "../../../public/blu-line.png"
import { FaPhone } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaRegFileLines } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";


// Define Errors type
type Errors = {
  fullName?: string;
  projectRequirement?: string;
  projectType?: string;
  payCurrency?: string;
  phoneNumber?: string;
  budget?: string;
  deadline?: string;
  email?: string;
  referenceName?: string;
  projectFiles?: string;
  projectdetail?: string;
  captcha?: string;
  api?: string;
};

interface OrderProps {
  orderid?: string;
}

const OrderForm: React.FC<OrderProps> = ({ orderid }) => {
  const { userId, userName, currency } = useAPPContext();
  const router = useRouter();
  const [formData, setFormData] = useState({
    userid: "",
    fullName: "",
    projectRequirement: "",
    projectType: "",
    payCurrency: currency || "",
    budget: 0,
    phoneNumber: {
      code: "",
      number: ""
    },
    email: "",
    deadline: "",
    referenceName: "",
    projectFiles: null as File | null,
    minimumPay: 0,
    projectdetail: "",
    terms: false,
    type: "",
    Signature: "",
    orderid: "",

    // content: `First, you need to create robust product requirement documentation that clearly defines your goals and the scope of your work...`, // truncated for brevity
  });

  const handleSignatureSave = (type: "typed" | "drawn", content: string) => {
    console.log("Saving signature", type, content); // Check if this logs correctly
    setFormData((prevFormData) => ({
      ...prevFormData,
      type, // Save the type ('typed' or 'drawn')
      Signature: content, // Save the content (typed text or base64 string)
    }));
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]); // Log whenever formData changes

  const token = Cookies.get('token');

  const [errors, setErrors] = useState<any>({});
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null); // Define the ref

  const HCAPTCHA_SITE_KEY = "cc30dd1a-a148-4414-8f2a-548c2bc80cf2";

  // Handle hCaptcha verification
  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  };

  const handleCheckStatus = () => {
    // setIsSubmitSuccess(false);
    router.push("/dashboard/orders");

  }

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    validateForm();
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        projectFiles: file,
      }));
    }
    validateForm();
  };

  // Validate the form
  const validateForm = () => {
    const newErrors: any = {};

    // Check required fields
    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.projectRequirement)
      newErrors.projectRequirement = "Requirement is required.";
    if (!formData.projectType)
      newErrors.projectType = "Project Type is required.";
    // if (!formData.payCurrency)
    //   newErrors.payCurrency = "Pay Currency is required.";
    // if (!formData.budget) newErrors.budget = "Budget is required.";
    if (!formData.deadline)
      newErrors.deadline = "Project Deadline is required.";
    if (!formData.referenceName)
      newErrors.referenceName = "Reference Name is required.";
    if (!formData.email) newErrors.email = 'Email is required';
    //if (!formData.minimumPay) newErrors.minimumPay = 'Minimum Pay is required.';
    if (!formData.projectdetail)
      newErrors.projectdetail = "Project Details is required.";
    if (!formData.phoneNumber.code) newErrors.phoneNumber = 'Phone number is required.';
    // if (!isCaptchaVerified)
    //   newErrors.captcha = "Please complete CAPTCHA verification.";

    setErrors(newErrors);

    // If there are no errors, the form is valid
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  // const handleSubmit = () => {
  //     if (validateForm()) {
  //         setIsSubmitSuccess(true);
  //     } else {
  //         //alert('Please fill out all required fields.');
  //     }
  // };

  // Handle form submission
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };
  const handlePhoneNumberChange = (value: string | undefined) => {
    if (value) {
      const code = value.slice(0, value.indexOf(" "));
      const number = value.slice(value.indexOf(" ") + 1);

      setFormData((prevState) => ({
        ...prevState,
        phoneNumber: {
          ...prevState.phoneNumber, // Ensure previous phoneNumber state is preserved
          code: code,
          number: number
        }
      }));
    }
  };
  // Log isChecked whenever it changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      terms: isChecked, // Set the userid from cookies to formData
    }));
  }, [isChecked]);

  useEffect(() => {
    const userid = Cookies.get("userId");
    if (userid) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userid: userid, // Set the userid from cookies to formData
      }));
    }
  }, []);

  useEffect(() => {
    if (orderid) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        orderid: orderid, // Set the orderid from Prop to formData
      }));
    }
  }, [orderid]);

  const handleSubmit = async () => {
    setSubmitting(true)
    console.log("Form Submitted:", formData);

    //  alert(formData.type);
    //  alert(formData.Signature);
    //   return;

    if (validateForm()) {
      try {
        // const formDataToSend = new FormData();
        // Object.entries(formData).forEach(([key, value]) => {
        //     if (key === 'projectFiles' && value instanceof File) {
        //         formDataToSend.append(key, value);
        //        // alert(key+""+value)
        //     } else {
        //         formDataToSend.append(key, value as string);
        //     }
        // });
        // for (const [key, value] of Object.entries(formDataToSend)) {
        //     console.log(`${key}: ${value}`);
        //     alert(`${key}: ${value}`)
        //   }
        setSubmitting(true);
        const response = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/user/order/create/order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set Content-Type to JSON
              "Authorization": token ? `Bearer ${token}` : ""
            },
            body: JSON.stringify(formData), // Convert formDataToSend to JSON
          },
        );

        // alert(response);
        if (response.ok) {
          //  alert("Succcess");
          const result = await response.json();
          console.log("API Response:", result);
          setSubmitting(false);
          setIsSubmitSuccess(true);
        } else {
          //  alert("Failed");
          setSubmitting(false);
          console.error("Unexpected response:", response.statusText);
          setErrors((prevErrors: Errors) => ({
            ...prevErrors,
            api: "An unexpected error occurred while submitting the form.",
          }));
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form:" + error);
        setErrors((prevErrors: Errors) => ({
          ...prevErrors,
          api: "An error occurred while submitting the form. Please try again.",
        }));
      }
    } else {
      console.log(errors)
    }
  };

  const shortenFileName = (name: string | undefined, maxLength = 15) => {
    if (!name) return "";
    if (name.length <= maxLength) return name;

    const extension = name.split(".").pop(); // Get file extension
    const baseName = name.replace(`.${extension}`, ""); // Remove extension

    return `${baseName.slice(0, 5)}...${baseName.slice(-5)}.${extension}`; // Shorten the middle part
  };


  return (
    <div className="-mt-15 mx-auto max-w-5xl rounded-md bg-white p-3 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-black">
      {isSubmitSuccess ? (
        <div className="flex w-[90%] max-w-md flex-col items-center justify-center rounded-lg bg-white">
          <div className="ml-12 flex flex-col items-center">
            <div className="mb-4 rounded-full p-4">
              <Image
                src="/images/ordersuccess.png"
                alt="Order successful"
                width={120}
                height={120}
              />
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-black">
              Order successful
            </h2>
            <p className="mb-4 text-center text-gray-700">
              Thank you so much for your order.
            </p>
            <button
              type="button"
              onClick={handleCheckStatus}
              className="rounded bg-[#151B54] px-4 py-2 text-white hover:bg-[#151B54]"
            >
              Check Status
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-between ">
            <div className="flex justify-center text-center mb-2">
              <Image src={blueLine} alt="line" />
            </div>
            <div className="flex-1">
              <h3 className="mb-4 ml-10 flex justify-center text-xl">
                Technical , Construction , Hiring Orders form
              </h3>
            </div>
            <div></div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-1 md:grid-cols-3 w-[100%] space-4">
            <fieldset className="border-2 border-[#151854] px-4 rounded-md mb-4 relative">
              <legend className="px-2 text-sm font-bold text-[#151854]">
                Full Name
              </legend>
              <div className="flex items-center gap-5">
                <input
                  className="border-none py-2 outline-none"
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-600 absolute">{errors.fullName}</p>
              )}
            </fieldset>

            <fieldset className="border-2 border-[#151854] px-4 rounded-md mb-4 mx-4 relative">
              <legend className="px-2 text-sm font-bold text-[#151854]">
                Requirements
              </legend>
              <select
                name="projectRequirement"
                value={formData.projectRequirement}
                onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border-none outline-none bg-[#D9D9D91A]"
              >
                <option value="">Select type</option>
                <option value="web">Normal</option>
                <option value="app">Medium</option>
                <option value="design">Urgent</option>
              </select>
              {errors.projectRequirement && (
                <p className="text-red-600 absolute">{errors.projectRequirement}</p>
              )}
            </fieldset>

            <fieldset className="border-2 border-[#151854] px-4 rounded-md mb-4 relative">
              <legend className="px-2 text-sm font-bold text-[#151854]">
                Type
              </legend>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="mt-1 block h-8 w-full rounded-lg border-none outline-none bg-[#D9D9D91A]"
              >
                <option value="">Select type</option>
                <option value="web">Personal</option>
                <option value="app">Government</option>
                <option value="design">Private Company</option>
              </select>
              {errors.projectType && (
                <p className="text-red-600 absolute">{errors.projectType}</p>
              )}
            </fieldset>

            <fieldset className="border-2 border-[#151854] px-4 rounded-md mb-4 relative">
              <legend className="px-2 text-sm font-bold text-[#151854]">
                Phone Number
              </legend>
              <div className="flex items-center">
                <PhoneInput
                  country="in"
                  value={`${formData?.phoneNumber.code}${formData.phoneNumber.number} `}
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
              {errors.phoneNumber && (
                <p className="text-red-600 absolute">{errors.phoneNumber}</p>
              )}
            </fieldset>

            <fieldset className="border-2 border-[#151854] px-4 rounded-md mb-4 mx-4 relative">
              <legend className="px-2 text-sm font-bold text-[#151854]">
                Email
              </legend>
              <div className="flex items-center gap-5">
                <input
                  className="border-none py-2 outline-none"
                  type="text"
                  required
                  name="email"
                  value={formData.email}
                  // value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 absolute">{errors.email}</p>
              )}
            </fieldset>

            <fieldset className="border-2 border-[#151854] px-4 rounded-md mb-4 relative">
              <legend className="px-2 text-sm font-bold text-[#151854]">
                Deadline
              </legend>
              <div className="flex items-center gap-5">

                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="mt-1 block h-8 w-full rounded-lg border border-[#ffffff] bg-[#D9D9D91A] p-1"
                />
              </div>
              {errors.deadline && (
                <p className="text-red-600 absolute">{errors.deadline}</p>
              )}

            </fieldset>

            <fieldset className="border-2 border-[#151854] px-4 rounded-md mb-4 mr-4 relative">
              <legend className="px-2 text-sm font-bold text-[#151854]">
                Reference Name
              </legend>
              <div className="flex items-center gap-5">
                <input
                  type="text"
                  name="referenceName"
                  value={formData.referenceName}
                  onChange={handleChange}
                  className="mt-1 block h-8 w-full rounded-lg border border-[#ffffff] bg-[#D9D9D91A] p-1"
                />
              </div>
              {errors.referenceName && (
                <p className="text-red-600 absolute">{errors.referenceName}</p>
              )}
            </fieldset>

            <fieldset className="border-2 border-[#151854] px-4 py-3 relative">
              <legend className="px-2 text-sm font-bold text-[#151854]">
                Provide the Document
              </legend>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => fileInputRef.current.click()} >
                <FaRegFileLines />

                {/* Hidden file input */}
                <span>{shortenFileName(formData?.projectFiles?.name)}</span>
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
              {errors.projectFiles && (
                <span className="text-xs text-[#f70a22] top-10 absolute">
                  {errors.projectFiles}
                </span>
              )}
            </fieldset>
          </div>
          <div className="mt-4">
            <fieldset className="border-2 border-[#151854] px-4 rounded-md mb-4 relative">
              <legend className="px-2 text-sm font-bold text-[#151854]">
                Description
              </legend>
              <textarea
                name="projectdetail"
                value={formData.projectdetail}
                onChange={handleChange}
                className="h-30 mt-1 block w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-black"
                rows={6}
              />
              {errors.projectdetail && (
                <p className="text-red-600 absolute">{errors.projectdetail}</p>
              )}

            </fieldset>
          </div>
          <div className="flex items-center justify-between">
            <p className="whitespace-nowrap text-sm text-gray-600"></p>
            <p className="whitespace-nowrap text-sm text-gray-600">
              Enter 50 to 1000 keywords
            </p>
          </div>

          <div className="my-4 flex  transform items-center  md:col-span-2 md:justify-between">
            <div className="mb-4 md:col-span-3">
              <div className="flex items-left space-x-2">
                <input
                  type="checkbox"
                  name="terms"
                  className="mr-2"
                  onChange={handleCheckboxChange}
                />
                <label className="text-sm font-medium">
                  I agree to all Terms and conditions , privacy policy.
                </label>
              </div>
              {errors.terms && <p className="text-red-600 text-sm mt-2">{errors.terms}</p>}
            </div>
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-md bg-[#151B54] px-16 py-3 text-lg font-semibold text-white"
              >
                {submitting ? "Submitting" : "Submit"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderForm;
