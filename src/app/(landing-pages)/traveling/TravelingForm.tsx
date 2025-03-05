import React, { useEffect, useState } from "react";
import blueLine from "../../../../public/blu-line.png";
import Cookies from "js-cookie";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { FaPhone } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useAPPContext } from "../../context/AppContextType";
import { env } from "@/config/env";
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
const TravelingForm: React.FC<OrderProps> = ({ orderid }) => {
  const { userId, userName, currency } = useAPPContext();
  const router = useRouter();
  const [formData, setFormData] = useState({
    userid: "",
    fullName: "",
    projectRequirement: "",
    projectType: "",
    payCurrency: currency || "",
    budget: 0,
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

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]); // Log whenever formData changes

  const token = Cookies.get('token');

  const [errors, setErrors] = useState<any>({});
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
  };

  // Validate the form
  const validateForm = () => {
    const newErrors: any = {};

    // Check required fields
    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.projectRequirement)
      newErrors.projectRequirement = "Project Requirement is required.";
    if (!formData.projectType)
      newErrors.projectType = "Project Type is required.";
    // if (!formData.payCurrency)
    //   newErrors.payCurrency = "Pay Currency is required.";
    if (!formData.budget) newErrors.budget = "Budget is required.";
    if (!formData.deadline)
      newErrors.deadline = "Project Deadline is required.";
    if (!formData.referenceName)
      newErrors.referenceName = "Reference Name is required.";
    //if (!formData.projectFiles) newErrors.projectFiles = 'You must upload a file.';
    //if (!formData.minimumPay) newErrors.minimumPay = 'Minimum Pay is required.';
    if (!formData.projectdetail)
      newErrors.projectdetail = "Project Details is required.";
    //if (!formData.terms) newErrors.terms = 'terms is required.';
    if (!isCaptchaVerified)
      newErrors.captcha = "Please complete CAPTCHA verification.";

    setErrors(newErrors);

    // If there are no errors, the form is valid
    return Object.keys(newErrors).length === 0;
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };
  const handlePhoneNumberChange = (value: string | undefined) => {
    if (value) {
      const code = value.slice(0, value.indexOf(" "));
      const number = value.slice(value.indexOf(" ") + 1);

      setFormData((prevState: any) => {
        return {
          ...prevState,
          phoneNumber: {
            ...prevState.phoneNumber,
          },
        };
      });
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
    console.log("Form Submitted:", formData);

    //  alert(formData.type);
    //  alert(formData.Signature);
    //   return;

    if (validateForm()) {
      try {
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
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between">
        <div className="mb-2 flex justify-center text-center">
          <Image src={blueLine} alt="line" />
        </div>
        <div className="flex-1">
          <h3 className="flex justify-center text-xl font-semibold">Traveling</h3>
        </div>
        <div></div>
      </div>
      <div className="space-4 mt-10 grid w-[100%] grid-cols-1 gap-1 md:grid-cols-3">
        <fieldset className="mb-8 rounded-md border-2 border-[#151854] px-4 relative">
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
          {errors.fullName && <p className="text-red-600 absolute">{errors.fullName}</p>}
        </fieldset>

        <fieldset className="mb-8 rounded-md border-2 border-[#151854] px-4 relative mx-4">
          <legend className="px-2 text-sm font-bold text-[#151854]">
            Nationality
          </legend>
          <div className="flex items-center gap-5">
            <input
              className="border-none py-2 outline-none"
              type="text"
              required
              name="fullName"
              // value={formData.address}
              onChange={handleChange}
            />
          </div>
          {errors.address && <p className="text-red-600 absolute">{errors.address}</p>}
        </fieldset>

        <fieldset className="mb-8 rounded-md border-2 border-[#151854] px-4 relative">
          <legend className="px-2 text-sm font-bold text-[#151854]">
            Visa Types
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

        </fieldset>
        <fieldset className="mb-8 rounded-md border-2 border-[#151854] px-4 relative ">
          <legend className="px-2 text-sm font-bold text-[#151854]">
            Passport number
          </legend>
          <div className="flex items-center gap-5">
            <input
              className="border-none py-2 outline-none"
              type="text"
              required
              name="fullName"
              // value={formData.address}
              onChange={handleChange}
            />
          </div>
          {errors.address && <p className="text-red-600 absolute">{errors.address}</p>}
        </fieldset>
        <fieldset className="mb-8 rounded-md border-2 border-[#151854] px-4 relative mx-4">
          <legend className="px-2 text-sm font-bold text-[#151854]">
            Departure Date
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

        <fieldset className="mb-8 rounded-md border-2 border-[#151854] px-4 relative">
          <legend className="px-2 text-sm font-bold text-[#151854]">
            Phone Number
          </legend>
          <div className="flex items-center">
            <PhoneInput
              country="in"
              // value={formData?.phoneNumber}
              value=""
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

        <fieldset className="mb-8 rounded-md border-2 border-[#151854] px-4 relative">
          <legend className="px-2 text-sm font-bold text-[#151854]">
            Email
          </legend>
          <div className="flex items-center gap-5">
            <input
              className="border-none py-2 outline-none"
              type="text"
              required
              name="email"
              value=""
              // value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="text-red-600 absolute">{errors.email}</p>}
        </fieldset>



        {/* <fieldset className="mb-4 rounded-md border-2 border-[#151854] px-4">
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
        </fieldset>
        {errors.deadline && <p className="text-red-600">{errors.deadline}</p>} */}

        <fieldset className="mb-8 rounded-md border-2 border-[#151854] px-4 relative mx-4">
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


        <fieldset className="mb-8 rounded-md border-2 border-[#151854] px-4 relative">
          <legend className="px-2 text-sm font-bold text-[#151854]">
            Provide the Document
          </legend>
          <input
            type="file"
            name="projectFiles"
            onChange={handleFileChange}
            className="mt-1 block h-8 w-full rounded-lg border border-[#ffffff] bg-[#D9D9D91A]"
          />
          {errors.projectFiles && (
            <p className="text-red-600 absolute">{errors.projectFiles}</p>
          )}
        </fieldset>

      </div>
      <div className="mt-4">
        <fieldset className="mb-8 rounded-md border-2 border-[#151854] px-4 relative">
          <legend className="px-2 text-sm font-bold text-[#151854]">
            Description
          </legend>
          <textarea
            name="projectdetail"
            value={formData.projectdetail}
            onChange={handleChange}
            className="h-30 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-black mt-1 block w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
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



      <div className="my-4 flex transform items-center md:col-span-2 md:justify-between">
        <div className="mb-4 md:col-span-3">
          <div className="items-left flex space-x-2">
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
          {errors.terms && (
            <p className="mt-2 text-sm text-red-600">{errors.terms}</p>
          )}
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
    </div>
  );
};

export default TravelingForm;