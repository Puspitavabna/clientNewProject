"use client"; // Indicate that this is a client-side component
import noticeImage from "/public/images/noticeImage.png";
import { useState } from "react";
import { formatDate } from "../lib/formatDate";
import Loader from "./Loader";
import NoRecords from "./NoRecordFound";
import Modal from "./NoticeModal";

type Notice = {
  id: string;
  title: string;
  createdAt: string;
  status: string;
};

interface TableProps {
  notices: Notice[];
}

export const NoticeTable: React.FC<TableProps> = ({ notices }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState("");


  const openModal = (notice: string) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotice("");
  };
  if (notices.length === 0) {
    return <p>No notices available.</p>; // Handle empty data gracefully
  }
  return (
    <>
      <table className="mb-6 w-full text-xs">
        <thead className="bg-[#151B54] text-white">
          <tr>
            <th className="py-6">SL</th>
            <th className="">NOTICE TITLE</th>
            <th className="">UPLOAD DATE</th>
            <th className="">STATUS</th>
            <th className="">ACTION</th>
          </tr>
        </thead>
        <tbody className="text-center bg-[#FAFBFE] w-full">
          {notices?.length > 0 ? notices?.map((notice, index) => (
            <tr
              key={notice.id}
              className="bg-[#FAFBFE] border-b border-tertiary"
            >
              <td className="py-6 font-medium">
                <span className="rounded text-xs bg-[#151B54] px-2 py-1 font-semibold text-white">
                  {index + 1}
                </span>
              </td>
              <td className="font-semibold text-lg text-[#6C757D]">{notice.title}</td>
              <td className="font-semibold text-lg text-[#6C757D]">{formatDate(notice.createdAt)}</td>
              <td className="font-light text-lg text-[#6C757D]">
                <span
                  className={`flex m-auto text-[#6C757D] text-center shadow-md rounded-lg border w-[140px] h-[40px] text-lg font-medium items-center justify-center ${notice?.status?.toLowerCase() === "ongoing"
                      ? "bg-[#4CAF5066] border border-[#4CAF50]" // light green
                      : notice.status?.toLowerCase() === "expired"
                        ? "bg-[#F4433666] border border-[#F44336]" // light red
                        : notice.status?.toLowerCase() === "coming soon"
                          ? "bg-[#FFEB3B66] border border-[#FFEB3B]" // light yellow
                          : "border-none"
                    }`}
                >
                  {notice.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => openModal(notice?.title)}
                  className="rounded bg-[#151B54] px-6 py-2 text-sm font-semibold uppercase text-white hover:bg-black"
                >
                  View
                </button>
              </td>
            </tr>
          )) : (
            <div className="w-full flex justify-center border border-black">
              <NoRecords className="bg-[#FAFBFE]" />
            </div>
          )}
        </tbody>
      </table>


      {/* Modal */}
      {isModalOpen && selectedNotice && (
        <div className="w-full">
          <Modal onClose={closeModal} title={selectedNotice} image={noticeImage} />
        </div>
      )}
    </>
  );
};
