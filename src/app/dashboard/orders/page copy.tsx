"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFileUpload,
  FaMicrophone,
} from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { VscChromeMinimize } from "react-icons/vsc";
import { env } from "../../../../config/env";
import Card from "../components/Card";
import ProjectDetailsPage from "../project-detail/page";
import Modal from "./Modal/page";
import feedback from "/public/images/feedback.png";
import endCallImg from "/public/images/fendCallImg.png";
import micImg from "/public/images/fmicImg.png";
import speakerImg from "/public/images/fspeakerImg.png";

// interface UserOrder {
//   id: string;
//   projectName: string;
//   projectAmount: number;
//   paidAmount: number;
//   leftAmount: number;
// }

function Page() {
  const [data, setData] = useState<any>();
  const [payAmount, setPayAmount] = useState<number>(); // User-input pay amount
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setFailureModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const statusColors: { [key: string]: string } = {
    Pending: "bg-[#FFB200]",
    Payment: "bg-[#896024]",
    Waiting: "bg-[#FF3D00]",
    Working: "bg-[#4402FF]",
    Complete: "bg-[#00EE0A]",
    Delivery: "bg-[#001A72]",
    Cancel: "bg-[#DE1D1D]",
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handler to simulate payment
  const handlePayment = () => {
    setPaymentModalOpen(false); // Close payment modal
    // Simulate a successful or failed payment (you can customize this logic)
    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
      setSuccessModalOpen(true); // Open success modal
    } else {
      setFailureModalOpen(true); // Open failure modal
    }
  };

  useEffect(() => {
    const userid = Cookies.get("userId") || "";
    const token = Cookies.get("token") || "";
    async function getOrders(userid: string, token: string) {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/user/order/dashboard/${userid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setData(data?.data || {}); // Safely set data
    }
    getOrders(userid, token);
  }, []);

  const cardTitles = [
    "Total Orders",
    "Total project amount",
    "Total project paid",
    "Total amount left",
    "Total pending Orders",
    "Total Waiting orders",
    "Total working orders",
    "total complete orders",
    "total delivery orders",
    "total cancel orders",
  ];

  return (
    <section className="">
      <div className="mb-3 grid grid-cols-6 gap-1">
        {cardTitles.map((title, i) => (
          <Card title={title} key={i} value={""} />
        ))}
      </div>

      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div>
          <input
            type="search"
            placeholder="Search here..."
            className="mr-2 min-w-[280px] rounded-lg border px-3 py-3 shadow-xl focus:border-[#FFB200] focus:outline-none"
          />
          <button className="rounded-lg bg-[#FFB200] px-6 py-3 font-semibold">
            Search
          </button>
        </div>
      </header>

      <table className="mt-4 w-full rounded-lg border border-[#FFB200] text-sm">
        <thead className="bg-[#FFB200]">
          <tr>
            <th className="py-6">No.</th>
            <th className="w-[12%]">Order ID</th>
            <th className="w-[12%]">Project Name</th>
            <th className="w-[13%]">Project Amount</th>
            <th className="w-[12%]">Paid Amount</th>
            <th className="w-[12%]">Left Amount</th>
            <th className="w-[12%]">Message</th>
            <th className="w-[12%]">Status</th>
            <th className="w-[11%]">Action</th>
          </tr>
        </thead>
        <tbody className="border border-[#FFB200] text-center">
          {data?.userorders?.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-4">
                There is no available order
              </td>
            </tr>
          ) : (
            data?.userorders?.map((order: any, index: number) => (
              <tr key={order.id} className="odd:bg-[#FAEFD8] even:bg-white">
                <td className="border-r border-r-[#FFB200] py-6">
                  <span className="rounded bg-[#FFB200] px-2 py-1 font-semibold">
                    {index + 1}
                  </span>
                </td>
                <td className="border-r border-r-[#FFB200]">
                  {order.orderNumber}
                </td>
                <td className="border-r border-r-[#FFB200]">
                  {order.orderid.title}
                </td>
                <td className="border-r border-r-[#FFB200]">
                  {order.budget} {order.pay_currency}
                </td>
                <td className="border-r border-r-[#FFB200]">
                  {" "}
                  {order.paidAmount ? `${order.paidAmount}` : "0"}{" "}
                  {order.pay_currency}
                </td>
                <td className="border-r border-r-[#FFB200]">
                  {order.leftAmount ? `${order.leftAmount}` : "0"}{" "}
                  {order.pay_currency}
                </td>
                <td className="border-r border-r-[#FFB200]">
                  <button
                    onClick={() => setIsChatModalOpen(true)}
                    className="m-2 flex items-center gap-2 rounded bg-[#FFB200] px-2 py-2 text-sm font-semibold"
                  >
                    Message
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
                      1
                    </span>
                  </button>
                  {/* UpdateConversation modal */}
                  <UpdateConversation
                    isOpen={isChatModalOpen} // Pass the modal state
                    setIsChatModalOpen={setIsChatModalOpen} // Function to close the modal
                    //setMinimise={setMinimise} // Function to minimize the modal
                  />
                </td>
                <td className="border-r border-r-[#FFB200]">
                  <button
                    //onClick={() => setPaymentModalOpen(true)}
                    onClick={() => {
                      // Check if the status allows opening the modal
                      if (
                        ["Pending", "Delivery", "Cancel"].includes(order.status)
                      ) {
                        // Open modal for these statuses
                        setPaymentModalOpen(false);
                      } else if (
                        ["Payment", "Waiting", "Working", "Completed"].includes(
                          order.status,
                        )
                      ) {
                        // Open modal for these statuses
                        setPaymentModalOpen(true);
                      }
                    }}
                    className=""
                  >
                    <span
                      className={`flex justify-center rounded px-4 py-1 text-black ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </button>
                  {/* Payment Modal */}
                  {isPaymentModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-center text-2xl font-bold">
                          Payment
                        </h2>
                        <div className="mb-4 text-left">
                          <p>
                            Project Name:{" "}
                            <span className="font-semibold">
                              {order.projectName}
                            </span>
                          </p>
                          <p>
                            Project Amount:{" "}
                            <span className="font-semibold">
                              {order.projectAmount} USD
                            </span>
                          </p>
                          <p>
                            Paid Amount:{" "}
                            <span className="font-semibold">
                              {order.paidAmount} USD
                            </span>
                          </p>
                          <p>
                            Left Amount:{" "}
                            <span className="font-semibold">
                              {order.leftAmount} USD
                            </span>
                          </p>
                          <p>
                            Pay Amount:{" "}
                            <input
                              type="number"
                              value={payAmount}
                              onChange={(e) =>
                                setPayAmount(Number(e.target.value))
                              }
                              className="w-24 rounded border text-center"
                              placeholder="Enter amount"
                            />{" "}
                            USD
                          </p>
                          <p>
                            Total:{" "}
                            <span className="font-semibold">${payAmount}</span>
                          </p>
                        </div>
                        <div className="mb-4 flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <p>I agree with the terms and conditions</p>
                        </div>
                        <div className="flex justify-around">
                          <button
                            className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                            onClick={() => setPaymentModalOpen(false)}
                          >
                            Cancel Payment
                          </button>
                          <button
                            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                            onClick={handlePayment}
                          >
                            Pay ${payAmount}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
                <td>
                  <button
                    onClick={openModal}
                    className="rounded bg-[#FFB200] px-3 py-2 text-sm font-semibold uppercase"
                  >
                    View
                  </button>
                  {/* Modal with Project Details Page */}
                  <Modal show={isModalOpen} onClose={closeModal}>
                    <ProjectDetailsPage userOrder={order} />
                  </Modal>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <footer className="flex justify-between bg-white px-4 py-6 text-sm">
        <div>
          <p className="font-bold">Showing 1 to 5 of 97 results</p>
        </div>
        <div className="flex items-center gap-x-2">
          <FaArrowLeft className="text-[#FFB200]" />
          <button className="flex items-center gap-2 rounded-lg border border-[#FFB200] bg-white px-3 py-2">
            1
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-[#FFB200] bg-white px-3 py-2">
            2
          </button>
          <FaArrowRight className="text-[#FFB200]" />
        </div>
      </footer>
    </section>
  );
}

export default Page;

const Chats = [
  {
    role: "sender",
    message: "Are you being serious about the consent form?",
    time: "8:03PM",
  },
  {
    role: "you",
    message: "Is that an issue?",
    time: "8:03PM",
  },
  {
    role: "sender",
    message: "Are you being serious?Because this is weird then",
    time: "8:05PM",
  },
  {
    role: "you",
    message: "We are never going to go a trip. We can be friends though.",
    time: "8:03PM",
  },
];

interface UpdateConversationProps {
  isOpen: boolean;
  setIsChatModalOpen: (value: boolean) => void; // Set chat modal open as a function accepting a boolean
}
const UpdateConversation = ({
  isOpen,
  setIsChatModalOpen,
}: UpdateConversationProps) => {
  const [isShowChats, setIsShowChats] = useState(false);
  const [isCallPopUp, setICallPopUp] = useState(false);
  const [isSettingOn, setIsSettingOn] = useState(false);
  const [minimise, setMinimise] = useState(false);

  const handleMinimize = () => {
    setIsChatModalOpen(false); // Close the chat modal
    setMinimise(true); // Set minimized state
  };

  const handleCall = () => {
    setIsChatModalOpen(false); // Close the chat modal
    setMinimise(true);
    setICallPopUp(true);
    // Set minimized state
  };

  const [isModalClose, setIsModalClose] = useState(false);
  const onClose = () => {
    setIsModalClose(true); // Open the modal when chat is closed
  };

  return (
    <>
      {/* {isOpen && !minimise && ( */}
      {isOpen && !isModalClose && !minimise && (
        <div className="fixed bottom-0 right-0 m-4 h-[450px] w-[350px] rounded-xl bg-white shadow-lg">
          {/* Top Section */}
          <div className="flex items-center justify-between rounded-t-xl bg-[#FFB200F2] p-3">
            <div className="relative flex items-center gap-2">
              <Image
                src="/images/user.png"
                height={40}
                width={40}
                className="rounded-full"
                alt="User"
              />
              <span className="absolute right-[115px] top-0 h-3 w-3 rounded-full bg-[#08D304]"></span>
              <span className="font-semibold text-[#231F20]">Richard Poon</span>
            </div>
            <div className="flex gap-2">
              <Image
                onClick={handleCall}
                src="/images/fcall.png"
                height={10}
                width={20}
                alt="call"
              />
              <span className="rounded-full">
                <VscChromeMinimize
                  onClick={handleMinimize}
                  className="cursor-pointer text-2xl font-bold text-[#080202]"
                />
              </span>
              <span className="rounded-full">
                <button
                  onClick={onClose}
                  className="text-[#080202]"
                  aria-label="Close chat"
                >
                  <IoClose size={24} />
                </button>
              </span>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex h-[calc(100%-72px)] flex-col justify-between rounded-b-xl bg-[#ECEEF1] p-4">
            {/* Messages */}
            <div className="h-[200px] flex-grow overflow-y-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-black">
              {Chats.map((chat, index) =>
                chat.role === "you" ? (
                  <ChatLineYou key={index} chat={chat} />
                ) : (
                  <ChatLineSender key={index} chat={chat} />
                ),
              )}
            </div>

            {/* Input Area */}
            {/* <div className="mt-3 flex items-center gap-2 bg-white p-2 rounded-full shadow">
              <FaFileUpload className="cursor-pointer text-meta-5 text-xl" />
              <input
                type="text"
                placeholder="Enter a message"
                className="flex-grow rounded-full bg-slate-200 px-3 py-2 text-black outline-none"
              />
              <button>
                <IoIosSend className="cursor-pointer text-xl text-meta-5" />
              </button>
            </div> */}
            <div className="relative mx-auto flex items-center justify-center gap-1 px-2 py-10">
              <input
                type="text"
                placeholder="Send a Message"
                className="w-full rounded-lg border-[#B9B9B9] bg-white px-10 py-2 text-black outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
              {/* mic.png */}
              {/* Microphone Icon */}
              <FaMicrophone className="text-meta-5 absolute left-1 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl" />

              {/* File Upload Icon */}
              <FaFileUpload className="text-meta-5 absolute left-6 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl" />

              {/* Send Button */}
              <IoIosSend className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl" />
            </div>
          </div>

          {/* Settings */}
          {/* {isSettingOn && <ChatSettings />} */}
        </div>
      )}

      {/* {minimise*/}
      {minimise && (
        <div
          // onClick={() => [setICallPopUp(true),
          //  setMinimise(false)]}
          // onClick={() => [setMinimise(false)]}
          className="fixed bottom-5 right-10 z-40 cursor-pointer"
        >
          <div className="relative">
            {/* Notification Badge */}
            <span className="absolute bottom-8 left-11 flex h-5 w-5 items-center justify-center rounded-full border-2 border-black bg-transparent font-semibold text-black">
              1
            </span>

            {/* Image */}
            <Image
              src="/default-avatar.png"
              height={50}
              width={50}
              alt="user"
              className="rounded-full border-2 border-[#FFB200F2]"
              onClick={() => {
                setIsChatModalOpen(true);
                setMinimise(false);
              }}
            />
          </div>
        </div>
      )}

      {isCallPopUp && (
        <CallPopUp
          isCallPopUp={isCallPopUp}
          setICallPopUp={setICallPopUp}
          setMinimise={setMinimise}
        />
      )}
      {/* Modal when chat is closed */}
      {isModalClose && (
        <div className="fixed bottom-0 right-2 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="rounded-lg bg-[#ECEEF1] p-4 text-center shadow-lg">
            <Image
              src={feedback}
              height={120}
              width={120}
              alt="user"
              className="mx-auto"
            />
            <h2 className="mt-2 text-xl font-bold">Did we help you?</h2>
            <h1 className="mt-2 text-xl font-bold">Your Feedback Matters</h1>
            <h3 className="mt-2">
              Have you benefited from the
              <span className="block"> services you received from us?</span>
            </h3>
            <div className="flex gap-6 p-4">
              <button
                onClick={() => {
                  setIsModalClose(false); // Close the "Chat Closed" modal
                  setIsChatModalOpen(false); // Close the chat modal as well
                }}
                className="rounded bg-[#F5271E] px-10 py-1 text-white"
              >
                NO
              </button>

              <button
                onClick={() => {
                  setIsModalClose(false); // Close the "Chat Closed" modal
                  setIsChatModalOpen(false); // Close the chat modal as well
                }}
                className="rounded bg-[#009933] px-10 py-1 text-white"
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ChatLineYou = ({
  chat,
}: {
  chat: { role: string; message: string; time: string };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-3 flex items-center justify-end gap-1">
      <div>
        <button className="rounded-bl-[101px] rounded-br-[5px] rounded-tl-[101px] rounded-tr-[95px] bg-[#2A56EBE5] px-3 py-1">
          {chat.message}
        </button>
        <p className="flex justify-end text-xs text-gray-400">{chat.time}</p>
      </div>
    </div>
  );
};

const ChatLineSender = ({
  chat,
}: {
  chat: { role: string; message: string; time: string };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-start gap-1">
      {/* <Image src="/images/user.png" height={30} width={30} alt="user" className="rounded-full" /> */}
      <div>
        <button className="rounded-bl-[5px] rounded-br-[101px] rounded-tl-[95px] rounded-tr-[101px] bg-[#FFB200E5] px-3 py-1 text-left">
          {chat.message}
        </button>
        <p className="text-xs text-gray-400">{chat.time}</p>
      </div>
    </div>
  );
};

const CallPopUp = ({
  isCallPopUp,
  setICallPopUp,
  setMinimise,
}: {
  isCallPopUp: boolean;
  setICallPopUp: any;
  setMinimise: any;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative z-30 mb-12 flex min-h-[300px] min-w-[250px] flex-col items-center justify-between rounded-xl bg-[#ECEEF1] p-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/images/user.png"
            height={60}
            width={60}
            alt="user"
            className="rounded-full"
          />
          <h2 className="text-xl font-semibold">Richard Poon</h2>
          <h3>Web App</h3>
          {/* <h4>02:02:01</h4> */}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Image src={micImg} height={40} width={40} alt="user" />
          {/* <Image src={recordImg} height={40} width={40} alt="user" /> */}
          <Image
            onClick={() => setICallPopUp(false)}
            src={endCallImg}
            height={40}
            width={40}
            alt="user"
          />
          <Image src={speakerImg} height={40} width={40} alt="user" />
        </div>
        {/* <span
          onClick={() => [setICallPopUp(false), setMinimise(true)]}
          className="absolute right-0 top-0 rounded-full bg-white p-2"
        >
          <VscChromeMinimize className="cursor-pointer text-meta-5" />
        </span> */}
      </div>
    </div>
  );
};
