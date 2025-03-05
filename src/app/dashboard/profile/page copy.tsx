import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"; // Importing social media icons

export default function Profile() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-100">
      <div className="container max-w-5xl overflow-auto rounded-lg bg-gray-100 p-6 shadow-lg">
        {/* User Profile Information */}
        <div className="flex flex-col items-center gap-4 p-4 md:flex-row">
          <div className="flex items-center gap-4 md:w-1/2">
            <Image
              src="/images/user.png" // Replace with the actual image path
              alt="User Profile"
              width={60}
              height={60}
              className="rounded-full"
            />
            <p className="text-gray-700">User ID : 12345</p>
          </div>

          <div className="flex items-center justify-end md:w-1/2">
            <button className="text-blue-500 hover:underline focus:outline-none">
              Edit
            </button>
          </div>
        </div>

        {/* User Information Card */}
        <div className="my-6 flex justify-center">
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg md:w-[500px] lg:w-[600px]">
            <h2 className="mb-3 text-2xl font-bold text-gray-800">
              Personal Information
            </h2>
            <div className="w-full space-y-2">
              {/* Name */}
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Name:</span>
                <span>Samir Moussa</span>
              </div>
              <hr className="my-1 border-t border-gray-300" />

              {/* Phone with red background */}
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Phone:</span>
                <span>+104348373</span>
              </div>
              <hr className="my-1 border-t border-gray-300" />

              {/* Email */}
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Email:</span>
                <span>xx@email.com</span>
              </div>
              <hr className="my-1 border-t border-gray-300" />

              {/* Company */}
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Company:</span>
                <span>Test</span>
              </div>
              <hr className="my-1 border-t border-gray-300" />
            </div>
          </div>
        </div>

        {/* Social Media Card */}
        <div className="my-6 flex justify-center">
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-8 shadow-lg md:w-[500px] lg:w-[600px]">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Social Links
            </h2>
            <div className="flex justify-center space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
