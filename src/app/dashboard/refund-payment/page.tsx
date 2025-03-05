"use client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Card from "../components/Card";
import NavLink from "@/src/app/(auth)/NavLink";
import { useState } from "react";
import WithdrawReceipt from "../withdraw-receipt/page";
import Modal from "../orders/Modal/page";
import ModalView from "../accounting/ModalView/page";

function WithdrawalHistoryPage() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const cardTitles = [
    "Total refund",
    "Total refund amount",
    "Total pending refund",
    "Total sending refund",
    "Total ineligible refund",
  ];

  return (
    <section className="rounded-xl py-5 px-6 mt-10">
      <div className="grid grid-cols-5  gap-3 mb-3">
        {cardTitles.map((title, i) => (
          <Card title={title} key={i} value={""} />
        ))}
      </div>

      <header className="flex justify-between items-center mt-3 mb-7">
        <h1 className="text-2xl font-bold">Withdrawal History</h1>
        <div>
          <input
            type="search"
            placeholder="Search here..."
            className="py-3 border rounded-lg shadow-xl px-3 mr-2 focus:outline-none focus:border-[#FFB200] min-w-[280px]"
          />
          <button className="py-3 px-6 bg-[#FFB200] font-semibold rounded-lg">
            Search
          </button>
        </div>
      </header>

      <table className="w-full text-sm rounded-lg mt-4 border border-[#FFB200]">
        <thead className="bg-[#FFB200]">
          <tr>
            <th className="py-6 w-[5%]">No.</th>
            <th className="w-[14%]">Withdrawal ID</th>
            <th className="w-[14%]">Withdrawal Account</th>
            <th className="w-[14%]">Amount</th>
            <th className="w-[14%]">Withdrawal Day</th>
            <th className="w-[14%]">Status</th>
            <th className="w-[13%]">Action</th>
          </tr>
        </thead>
        <tbody className="text-center border border-[#FFB200]">
          <tr className="odd:bg-[#FAEFD8] even:bg-white">
            <td className="py-6 border-r border-r-[#FFB200]">
              <span className="rounded px-2 py-1 bg-[#FFB200] font-semibold">
                1
              </span>
            </td>
            <td className="border-r border-r-[#FFB200]">045001</td>
            <td className="border-r border-r-[#FFB200]">SBI Bank</td>
            <td className="border-r border-r-[#FFB200]">$110</td>
            <td className="border-r border-r-[#FFB200]">03-03-25</td>
            <td className="border-r border-r-[#FFB200]">
              <span className="bg-[#FF7777] text-white py-1 rounded px-3">
                Ineligible
              </span>
            </td>
            <td>
            
              <button 
               onClick={openModal}
              className="uppercase bg-[#FFB200] py-2 px-3 rounded font-semibold text-sm">
                View
              </button>
                                  {/* Modal for Withdrawal Details */}
      <ModalView show={showModal} onClose={closeModal}>
        <WithdrawReceipt />
      </ModalView>
            
            </td>
          </tr>
        </tbody>
      </table>
      <footer className="bg-white py-6 flex justify-between px-4 text-sm">
        <div>
          <p className="font-bold">Showing 1 to 5 of 97 results</p>
        </div>
        <div className="flex items-center gap-x-2">
          <FaArrowLeft className="text-[#FFB200]" />
          <button className="rounded-full h-6 w-6 bg-[#FFB200] text-white flex items-center justify-center text-xs font-semibold">
            1
          </button>
          <button className="rounded-full h-6 w-6 bg-[#FFF2D4] text-black font-semibold flex items-center justify-center text-xs">
            2
          </button>
          <FaArrowRight className="text-[#FFB200]" />
        </div>
      </footer>
    </section>
  );
}

export default WithdrawalHistoryPage;
