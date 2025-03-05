"use client";

import { useRouter } from "next/navigation";
import { env } from "process";
import { useState } from "react";
import { apiInstance } from "../../dashboard/orders/action";


interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
}

const ContactForm = (props: any) => {


  const [formData, setFormData] = useState<FormData>(initialFormData);
  const router = useRouter();
const {closeContactModal} =props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/footer/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Failed to submit. Status: ${res.status}`);

      console.log("Form submitted successfully!");
      alert("Form submitted successfully!");
      // router.push("/"); // Redirect to home page
       closeContactModal()

    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };
  return (
    <div className="flex items-center justify-center">
      {/* Form Container */}
      <form onSubmit={handleSubmit} className="mb-2 w-full max-w-[400px] h-[500px] rounded-lg bg-[#D9D9D91A] px-4 text-black shadow-md">
        <div className="flex flex-col items-center justify-center p-2">
          <h1 className="text-center text-xl font-semibold text-black">
            Contact Us
          </h1>
        </div>
        <div>
          <div>
            <label
              htmlFor="name"
              className="my-2 block text-sm font-medium text-black"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name || ""}
              className="mt-1 block w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder=""
              required
            />
          </div>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="my-2 block text-sm font-medium text-black"
            >
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={formData.email || ""}
              className="mt-1 block w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder=""
              required
            />
          </div>
          {/* Phone No Field */}
          <div>
            <label
              htmlFor="phone"
              className="my-2 block text-sm font-medium text-black"
            >
              Phone No <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              value={formData.phone || ""}
              id="phone"
              className="mt-1 block w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder=""
              required
            />
          </div>
          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="my-2 block text-sm font-medium text-black"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              onChange={handleChange}
              value={formData.message || ""}
              rows={4}
              className="mb-2 block w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder=""
              required
            ></textarea>
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"

              className="mb-2 rounded-md bg-[#151B54] px-4 py-2 text-[#ffffff] shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Blue Corner Triangle at Bottom */}
      {/* <div className="absolute bottom-0 right-0 w-0 h-0 border-l-8 border-t-8 border-transparent border-l-blue-500 border-t-blue-500"></div> */}
    </div>
  );
};

export default ContactForm;
function closeContactModal() {
  throw new Error("Function not implemented.");
}

