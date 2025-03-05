"use client";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"; // Importing social media icons

import { useEffect, useState } from "react";
//import { SERVER_URL } from "@/src/app/constants/api";
import Cookies from "js-cookie";
import { env } from "../../../../config/env";
import AgentFrom from "../edit-profile/AgentFrom";
import ProfileForm from "../edit-profile/ProfileForm";

function ShowProfile() {
  const [data, setData] = useState<any>();
  const [errMsg, setErrMsg] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false); // State to manage modal visibility

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  console.log(data);

  useEffect(() => {
    const userid = Cookies.get("userId"); //localStorage.getItem("userid");
    const token = Cookies.get("token"); //localStorage.getItem("token");
    // fetch("http://localhost:5001/api/user/retrieve/profile/"
    fetch(`${env.NEXT_PUBLIC_API_URL}/api/user/profile/retrieve`, {
      method: "POST",
      body: JSON.stringify({ userid: userid }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) =>
      res.json().then((data) => {
        if (data.status && data.status_code === 200) {
          setData(data.data);

          const profileImageUrlFromServer = data.data.profile_image;
          if (
            profileImageUrlFromServer &&
            profileImageUrlFromServer.trim() !== ""
          ) {
            const fullProfileImageUrl = profileImageUrlFromServer.includes(
              "http",
            )
              ? profileImageUrlFromServer
              : `${env.NEXT_PUBLIC_API_URL}/uploads/${profileImageUrlFromServer}`;
            setProfileImageUrl(fullProfileImageUrl);
          } else {
            setProfileImageUrl("/images/upload-avatar.png");
          }

          console.log(data);
        } else {
          setErrMsg(data.message);
        }
      }),
    );
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleAgentOpenModal = () => {
    setIsAgentModalOpen(true); // Open the modal
  };

  const handleAgentCloseModal = () => {
    setIsAgentModalOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="container overflow-auto rounded-lg p-6 shadow-lg">
        {/* User Profile Information */}
        <div className="flex flex-col items-center justify-between gap-4 p-4 md:flex-row">
          <div>{/* Other content can go here */}</div>

          <div className="flex justify-end">
            <div className="">
              <button
                onClick={handleEditClick}
                className="m-2 text-lg font-semibold text-blue-700"
              >
                Edit
              </button>
            </div>

            <div className="flex items-center justify-center px-1">
              <Image
                src="/icons/edit.png"
                onClick={handleEditClick}
                alt=""
                width={15}
                height={15}
                className="cursor-pointer rounded-full"
              />
            </div>
          </div>
        </div>

        {/* User Profile Information */}

        {/* <div className="flex flex-col md:flex-row gap-4 items-center p-4">
                    <div className="flex items-center gap-4">
                        <Image
                            src={profileImageUrl ? profileImageUrl : "/images/upload-avatar.png"} // Replace with the actual image path
                            alt="User Profile"
                            width={60}
                            height={60}
                            className="rounded-full"
                        />
                        <p className="text-gray-700">User ID : {data && data._id}</p>
                    </div>

                    <div className="md:w-1/2 flex justify-end items-center">

                        <button onClick={handleEditClick} className="text-lg font-semibold text-blue-700">
                            Edit
                        </button>
                    </div>
                </div> */}

        {/* User Information Card */}
        <div className="my-6 flex justify-center">
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg md:w-[500px] lg:w-[600px]">
            <h2 className="mb-3 text-2xl font-bold text-gray-800">
              Personal Information
            </h2>
            <div className="w-full space-y-2">
              {/* Name */}
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Name</span>
                <span> {data && data.name} </span>
              </div>
              <hr className="my-1 border-t border-gray-300" />

              {/* Phone with red background */}
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Phone</span>
                <span>
                  {" "}
                  {data && data.company_info.phone_code}
                  {data && data.company_info.phone}
                </span>
              </div>
              <hr className="my-1 border-t border-gray-300" />

              {/* Email */}
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Email</span>
                <span> {data && data.email}</span>
              </div>
              <hr className="my-1 border-t border-gray-300" />
              {/* currency */}
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Currency</span>
                <span> {data && data.currency}</span>
              </div>
              <hr className="my-1 border-t border-gray-300" />
              {/* Company */}
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Company</span>
                <span>{data && data.company_info.company_name} </span>
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
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-[#fff]">
                <FaFacebook size={36} />
              </div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-[#fff]">
                <FaYoutube size={24} />
              </div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-[#fff]">
                <FaTwitter size={24} />
              </div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-[#fff]">
                <FaInstagram size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Agent Card */}
        <div className="my-6 flex items-center justify-center">
          <div className="w-full rounded-lg bg-white p-8 shadow-lg md:w-[500px] lg:w-[600px]">
            <div className="relative flex flex-grow items-center justify-center">
              <div className="flex flex-grow items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-800">Tarzan</h1>
              </div>
              <button className="absolute -top-1 right-2 rounded border border-[#000] bg-[#DE1D1D] px-4 py-2 text-sm font-semibold text-[#fff]">
                Dissolved
              </button>
            </div>

            <div className="flex flex-col text-sm font-semibold">
              <div className="flex w-full flex-row items-start justify-start gap-2">
                <span className="text-left text-sm">Name:</span>
                <span className="text-left text-sm">Mr.jack</span>
              </div>
              <div className="flex w-full flex-row items-start justify-start gap-2">
                <span className="text-left text-sm">Ranking:</span>
                <span className="text-left text-sm">01</span>
              </div>
              <div className="flex w-full flex-row items-start justify-start gap-2">
                <span className="text-left text-sm">Renewal date:</span>
                <span className="text-left text-sm">03-02-2025</span>
              </div>
              <div className="flex w-full flex-row items-start justify-start gap-2">
                <span className="text-left text-sm">Service Division:</span>
                <span className="text-left text-sm">Civil engineering</span>
              </div>
              <div className="flex w-full flex-row items-start justify-start gap-2">
                <span className="text-left text-sm">Registered Date:</span>
                <span className="text-left text-sm">1 jan 2010</span>
              </div>
              <div className="flex w-full flex-row items-start justify-start gap-2">
                <span className="text-left text-sm">
                  Agent Identification Number:
                </span>
                <span className="text-left text-sm">15715386</span>
              </div>
            </div>

            <div className="flex w-full flex-row items-end justify-end gap-4">
              <button
                onClick={handleAgentOpenModal}
                className="rounded border border-[#000] bg-[#FFB200] px-6 py-2 text-sm font-semibold text-[#000]"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative h-[580px] w-full max-w-2xl overflow-y-auto rounded-lg bg-[#F2E6C9] shadow-lg scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-[#FFB200]">
            <ProfileForm data={data} />
            <button
              onClick={handleCloseModal}
              className="absolute -top-2 right-0 rounded-lg text-5xl font-normal text-[#000]"
            >
              ×
            </button>
          </div>
        </div>

        // <Modal onClose={handleCloseModal}>
        //         {/* <ProfileForm  userId={data && data._id} token={data && data.token} /> */}
        //         <ProfileForm data={data} />

        // </Modal>
      )}
      {isAgentModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={handleAgentCloseModal} // Trigger close modal on overlay click
        >
          <div
            className="relative h-[580px] w-full max-w-5xl overflow-y-auto rounded-lg bg-[#CCCCFF] shadow-lg scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-[#FFB200]"
            onClick={(e) => e.stopPropagation()} // Prevent close modal when clicking inside the modal content
          >
            <AgentFrom data={data} />
            {/* Uncomment this button if you also want a close button */}
            {/* <button
                onClick={handleAgentCloseModal}
                className="text-[#000] text-5xl absolute -top-2 right-0 font-normal  rounded-lg"
            >
                ×
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
export default ShowProfile;
