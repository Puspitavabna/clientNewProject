import Image from "next/image";
import facebook from "../../../../public/blue-facebook.png";
import instagram from "../../../../public/blue-insta.png";
import pinterest from "../../../../public/blue-pinterest.png";
import twitter from "../../../../public/blue-twitter.png";
import PhoneInput from "react-phone-number-input";

const AgentFrom = () => {
  return (
    <form className="my-10">
      <div className="mt-16 flex flex-grow items-end justify-end px-[10%] text-end">
        <button
          type="button"
          className="rounded-lg bg-[#151B54] px-10 py-2 font-semibold text-[#ffffff]"
        >
          Save
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="px-4">
          <label className="mb-2 block text-sm font-medium">Email</label>
          <input
            type="text"
            name="email"
            className="block h-10 w-full rounded-lg border border-gray-300 bg-[#E9F0FF] p-2"
          />
        </div>
        <div className="px-4">
          <label className="mb-2 block text-sm font-medium">Employee</label>

          <select
            name="nationality"
            // value={formData.projectRequirement}
            // onChange={handleChange}
            className="block h-10 w-full rounded-lg border border-gray-300 bg-[#E9F0FF] p-2"
          >
            <option value="">10-15</option>
            <option value="web">5-10</option>
            <option value="app">20-25</option>
          </select>
        </div>
        <div className="px-4">
          <label className="mb-2 block text-sm font-medium">Phone No</label>
          <div className="ml-4 mr-4 flex items-center rounded-lg border border-gray-300 bg-[#E9F0FF] px-1 py-1">
            <PhoneInput
              country="in"
              value=""
              name="phone"
              placeholder=" mobile number"
              className="w-full"
              onChange={() => {
                console.log("first")
              }}
              inputStyle={{
                width: "100%",
                padding: "10px",
                fontSize: "12px",
                // paddingLeft: "100px",
              }}
              inputProps={{
                name: "mobileNo",
                required: true,
                autoFocus: true,
              }}
            />
          </div>
        </div>
        {/* Contact Information Section */}
        <div className="px-4">
          <label className="mb-2 block text-sm font-medium">
            Contact Information
          </label>
          <div className="flex flex-row items-center justify-start gap-2">
            <select
              className="block h-10 w-full rounded-lg border border-gray-300 bg-[#E9F0FF] p-2"
              defaultValue=""
              name="social"
            >
              <option value="" disabled className="font-semibold text-black">
                Select
              </option>
              <option value="Facebook">Facebook</option>
              <option value="X">X</option>
              <option value="Snapchat">Snapchat</option>
            </select>
            <input
              type="text"
              name="fullName"
              placeholder="Enter URL"
              className="block h-10 w-full rounded-lg border border-gray-300 bg-[#E9F0FF] p-2"
            />
            <button
              type="button"
              className="rounded bg-[#151B54] px-4 py-1 font-bold text-white"
            >
              Add
            </button>
          </div>
          {/* Social Media  */}
          <div className="mt-2 flex flex-row items-center justify-start space-x-4 rounded-full p-4">
            <Image
              src={facebook}
              height={30}
              width={30}
              alt="FB"
              className="h-10 w-10 rounded-full"
            />
            <Image
              src={twitter}
              height={30}
              width={30}
              alt="FB"
              className="h-10 w-10 rounded-full"
            />
            <Image
              src={pinterest}
              height={30}
              width={30}
              alt="FB"
              className="h-10 w-10 rounded-full"
            />
            <Image
              src={instagram}
              height={30}
              width={30}
              alt="FB"
              className="h-10 w-10 rounded-full"
            />
          </div>
        </div>
        {/* Description of Services */}
        <div className="col-span-2 px-4">
          <label className="mb-2 block text-sm font-medium">
            Description of Services
          </label>
          <textarea
            name="projectdetail"
            //value={formData.projectdetail}
            // onChange={handleChange}
            className="h-30 mt-1 block w-full rounded-lg border border-gray-300 bg-[#E9F0FF] p-1 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-black"
            rows={6}
          />
        </div>
      </div>
    </form>
  );
};

export default AgentFrom;
