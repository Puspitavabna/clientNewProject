import Line from "@/src/app/components/Line";
import Image from "next/image";
import { useState } from "react";
import successIcon from "../../../../public/successfull-icon.png";

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSubmitted(true); // Show the popup on the final step
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const closePopup = () => {
    setIsSubmitted(false); // Hide the popup
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
                  fill
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
                  fill
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
                  fill
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
                fill
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

export default RegistrationForm;
