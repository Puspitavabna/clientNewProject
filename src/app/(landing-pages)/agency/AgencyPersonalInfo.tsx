import Line from "@/src/app/components/Line";
import Image from "next/image";

const AgencyPersonalInfo = () => {
  return (
    <div>
      <form className="p-8 text-gray-500">
        <div className="flex flex-col items-center justify-center">
          <Line />
          <h2 className="flex justify-center text-2xl font-bold text-gray-500">
            Agency Registration Form
          </h2>
          <p>Personal Information</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="">
            <label className="mb-2 block text-sm font-medium">
              Photo or logo
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
            <div className="flex justify-end">
              <span className="text-sm text-[#C90000]">Size is below 1 MB</span>
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
              Ownership Name
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
              National Identity Card/passport
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
            <label className="mb-2 block text-right text-sm font-medium">
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
            <label className="mb-2 block text-nowrap text-sm font-medium">
              Service Area
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
              Employee
            </label>
            <input
              type="text"
              name="fullName"
              // value={formData.fullName}
              //  onChange={handleChange}
              className="block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
            />
          </div>

          <div className="col-span-3">
            <label className="mb-2 block text-nowrap text-sm font-bold">
              Office Address
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
            <label className="mb-2 block text-nowrap text-sm font-medium">
              Email Address
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
              Agency Application Form
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
            <div className="flex justify-end">
              <span className="text-sm text-[#C90000]">Size is below 3 MB</span>
            </div>
          </div>

          <div></div>
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
          <div></div>
          <div className="flex items-end justify-end">
            <button
              type="button"
              // onClick={handleSubmit}
              className="mt-4 rounded-lg bg-[#151B54] px-16 py-4 text-lg font-semibold text-[#ffffff]"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgencyPersonalInfo;
