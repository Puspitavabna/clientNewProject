"use client";
import Image from "next/image";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa"; // Importing social media icons
import { useEffect, useRef, useState } from "react";
import { FaFileUpload, FaMicrophone } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { VscChromeMinimize } from "react-icons/vsc";
import chatPhone from "../../../../public/chat-phone.png";
import feedback from "/public/images/feedback.png";
import endCallImg from "/public/images/fendCallImg.png";
import micImg from "/public/images/fmicImg.png";
import speakerImg from "/public/images/fspeakerImg.png";
//import { SERVER_URL } from "@/src/app/constants/api";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Cookies from "js-cookie";
import { env } from "../../../../config/env";
import pioneerLogo from "../../../../public/icons/image 7103.png";
import qrLogo from "../../../../public/icons/qrcode.png";
import Modal from "../../components/Modal";
import AgentFrom from "../edit-profile/AgentFrom";
import ProfileForm from "../edit-profile/ProfileForm";
import { formatDate2, formatTime } from "../../lib/formatDate";
import { useSelector } from "react-redux";
import {
  fetchAgencies,
  fetchUserMessage,
  Message,
  sendUserMessage,
} from "../orders/action";
import { FaFile, FaPlay } from "react-icons/fa";


const callTone = "/audio/call.mp3"; 
const messageTone = "/audio/message.mp3";

const HCAPTCHA_SITE_KEY = "cc30dd1a-a148-4414-8f2a-548c2bc80cf2";
interface SelectedBank {
  name: string;
  qrcode: string;
  type?: string;
  account_number?: string;
  routing?: string;
  logo?: string;
  tax_rate?: number;
  qrImage?: any;
}
const statusColors: { [key: string]: string } = {
  Pending: "bg-[#FFB200]",
  Payment: "bg-[#9F7924]",
  Waiting: "bg-[#FF3D00]",
  Working: "bg-[#2A56EB]",
  Complete: "bg-[#00CB20]",
  Delivery: "bg-[#001A72]",
  Cancel: "bg-[#DE1D1D]",
};

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
  const [chats, setChats] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // ✅ Fix: Properly type the ref
  const audioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    if (isCallPopUp) {
      if (!audioRef.current) {
        audioRef.current = new Audio(callTone);
        audioRef.current.loop = true; // Loop the ringtone
      }
      audioRef.current.play();
    } else {
      audioRef.current?.pause();
      audioRef.current = null; // Reset the audio
    }
  }, [isCallPopUp]);

  const playNotificationSound = () => {
    const audio = new Audio(messageTone);
    audio.play();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFile = event.target.files[0];
      setFile(newFile);

      const newChat = {
        role: "you",
        file: newFile,
        time: getFormattedTime(),
      };

      setChats((prevChats) => [...prevChats, newChat]);
    }
  };
  // 🎤 START RECORDING AUDIO
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream); // ✅ Create new instance safely
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        setAudioBlob(audioBlob);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
  
      mediaRecorderRef.current.ondataavailable = (event) => {
        const audioBlob = event.data;
        setAudioBlob(audioBlob);
  
        const newChat = {
          role: "you",
          audio: audioBlob,
          time: getFormattedTime(),
        };
  
        setChats((prevChats) => [...prevChats, newChat]);
      };
    }
  };
  

  const getAllMessages = async () => {
    const res = await fetchUserMessage();
    if (res?.messages) {
      setChats(res?.messages);
    } else {
      setChats([
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
      ]);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const getFormattedTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const sendMyMessage = async () => {
    if (!message) return;
    const userid = Cookies.get("userId") || "";
    const token = Cookies.get("token") || "";

    const newChat = {
      role: "you",
      message: message,
      time: getFormattedTime(),
    };

    setChats((prevChats) => [...prevChats, newChat]);

    // Reset states
    setMessage("");
    setFile(null);
    setAudioBlob(null);
    try {
      const response = await sendUserMessage({
        sender: userid,
        receiver: "67a5c5cc7b6d861285f68779",
        message: message,
      });
      console.log("sending message::", response);
    } catch (err) {
    } finally {
    }
  };

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
    //setIsModalClose(true);  // Open the modal when chat is closed
    setIsChatModalOpen(false);
  };

  const ChatLineYou = ({
    chat,
  }: {
    chat: {
      audio: any;
      file: any; role: string; message: string; time: string 
};
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="mt-3 flex items-center justify-end gap-1">
        <div style={{ width: "auto", maxWidth: "80%" }}>
          <button className="text-s rounded-bl-[101px] rounded-br-[5px] rounded-tl-[101px] rounded-tr-[95px] bg-[#E9F0FF] px-3 py-1 text-[#000000]">
            {chat.message ? chat.message : null}
            {chat.file && (
            <a href={URL.createObjectURL(chat.file)} download={chat.file.name}>
              <FaFile className="text-xl text-blue-500" />
            </a>
          )}
            {chat.audio && (
            <audio controls>
              <source src={URL.createObjectURL(chat.audio)} type="audio/webm" />
              Your browser does not support the audio element.
            </audio>
          )}
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
        <div style={{ width: "80%" }}>
          <button className="text-s rounded-bl-[5px] rounded-br-[101px] rounded-tl-[95px] rounded-tr-[101px] bg-[#9DBCFD] px-3 py-1 text-left text-[#000000]">
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
      <div className="fixed left-[40rem] top-[10rem] m-auto h-[380px] w-[300px] rounded-xl bg-white shadow-lg">
        {/* Top Section */}
        <div className="flex items-center justify-between rounded-t-xl bg-[#151B54] p-3">
          <div className="relative flex items-center gap-2">
            <span className="pl-4 font-semibold text-[#00C087]">
              Calling.......
            </span>
          </div>
        </div>
        <div className="bg-white pt-6">
          <div className="flex flex-col items-center justify-center gap-2 pb-8">
            <Image
              src="/images/user.png"
              height={80}
              width={80}
              alt="user"
              className="rounded-full border border-black"
            />
            <h2 className="text-xl font-semibold text-[#231F20]">
              Richard Poon
            </h2>
            <h3 className="text-sm text-[#000000]">Report</h3>
            {/* <h4>02:02:01</h4> */}
          </div>
          <div className="mx-auto flex w-[200px] items-center justify-center gap-2 rounded-sm bg-[#0000001A] px-2 py-2">
            <Image src={micImg} height={50} width={50} alt="user" />
            {/* <Image src={recordImg} height={40} width={40} alt="user" /> */}
            <Image
              onClick={() => setICallPopUp(false)}
              src={endCallImg}
              height={50}
              width={50}
              alt="user"
            />
            <Image src={speakerImg} height={50} width={50} alt="user" />
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
  return (
    <>
      {/* {isOpen && !minimise && ( */}
      {isOpen && !isModalClose && !minimise && (
        <div className="fixed bottom-0 right-0 m-4 h-[550px] w-[350px] rounded-xl bg-white shadow-lg">
          {/* Top Section */}
          <div className="flex items-center justify-between rounded-t-xl bg-[#151B54] p-3 text-white">
            <div className="relative flex items-center gap-2">
              <Image
                src="/images/user.png"
                height={40}
                width={40}
                className="rounded-full"
                alt="User"
              />
              <span className="absolute right-[115px] top-0 h-3 w-3 rounded-full bg-[#08D304]"></span>
              <span className="font-semibold text-[#ffffff]">Richard Poon</span>
            </div>
            <div className="flex gap-2">
              <Image
                onClick={handleCall}
                src={chatPhone}
                height={10}
                width={20}
                alt="call"
                className="text-[#ffffff]"
              />
              <span className="rounded-full">
                <VscChromeMinimize
                  onClick={handleMinimize}
                  className="cursor-pointer text-2xl font-bold text-[#ffffff]"
                />
              </span>
              <span className="rounded-full">
                <button
                  onClick={onClose}
                  className="text-[#ffffff]"
                  aria-label="Close chat"
                >
                  <IoClose size={24} />
                </button>
              </span>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex h-[calc(100%-72px)] flex-col justify-between rounded-b-xl bg-[#ffffff] p-4">
            {/* Messages */}
            <div className="scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-black h-[200px] flex-grow overflow-y-auto">
              {chats.map((chat, index) =>
                chat.role === "you" ? (
                  <ChatLineYou key={index} chat={chat} />
                ) : (
                  <ChatLineSender key={index} chat={chat} />
                ),
              )}
            </div>

            <div className="relative mx-auto flex items-center justify-center gap-1 border border-gray-500 px-2 pb-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send a Message"
                className="w-full rounded-lg border-[#B9B9B9] bg-white px-10 py-2 text-black outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMyMessage();
                  }
                }}
             />
              {
                recording ? <button onClick={stopRecording} className="text-red-500 text-meta-5 absolute left-1 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl">stop</button> :
                  <>
                    <FaMicrophone onClick={startRecording} className="text-meta-5 absolute left-1 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl" />
                    <label>
                      <FaFileUpload className="text-meta-5 absolute left-6 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl" />
                      <input type="file" hidden onChange={handleFileChange} />
                    </label>
                  </>
              }


              {/* Send Button */}
              <IoIosSend
                className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl"
                onClick={sendMyMessage}
              />
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

function ShowProfile({ userOrder }: { userOrder: any }) {
  const [data, setData] = useState<any>();
  const [errMsg, setErrMsg] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false); // State to manage modal visibility
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  console.log(data);
  const [isSuccessfulPaymentModalOpen, setSuccessfulPaymentModalOpen] =
    useState(false);
  const [isPaymentAccountDetailsModalOpen, setPaymentAccountDetailsModalOpen] =
    useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const bankData = {
    _id: "P0001",
    name: "Pioneer",
    qrcode: "0908978675",
    type: "online",
    account_info: { account_number: "6686686868686" },
    routing: "656",
    logo: pioneerLogo,
    tax_rate: "8686868",
    qrImage: qrLogo,
    orders: [],
  };

  const [agency, setAgency] = useState<any[]>([]);

  const getAllAgencies = async () => {
    const res = await fetchAgencies();
    setAgency(res);
  };

  useEffect(() => {
    getAllAgencies();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleImageSize = () => {
    setIsOpen(!isOpen);
  };
  const [selectedBank, setSelectedBank] = useState<SelectedBank>({
    name: "",
    qrcode: "",
    type: "",
    account_number: "",
    routing: "",
    logo: "",
  });
  const [isdepositModalOpen, setDepositModalOpen] = useState(false);
  const handlePaymentAmoundChange = (e: any) => {
    const value = e.target.value;
    const amount = value.replace(/[^0-9.]/g, ""); // Removes non-numeric characters except for the decimal point
    setPaymentAmount(amount); // Updates only the numeric part
  };

  const [banks, setBanks] = useState([]);
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
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isBalanceTableModalOpen, setBalanceTableModalOpen] = useState(false);

  const user = useSelector((state: any) => state.auth.user);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="container overflow-auto rounded-lg p-6 shadow-lg">
        {/* User Information Card */}
        <div className="my-6 flex justify-center">
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg md:w-[500px] lg:w-[600px]">
            <div className="flex w-full flex-row items-center">
              {/* Spacer to push "Personal Information" to the center */}
              <div className="flex-1"></div>

              {/* Centered Personal Information */}
              <h2 className="flex-1 text-nowrap text-center text-2xl font-bold text-gray-800">
                Personal Information
              </h2>

              {/* Edit button at the end */}
              <div className="flex flex-1 flex-row items-center justify-end">
                <div className="mr-2">
                  <button
                    onClick={handleEditClick}
                    className="text-lg font-semibold text-blue-700 underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="px-1">
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

            <div className="relative flex w-full space-y-20">
              {/* Left Side Icons */}
              <div className="relative flex flex-col space-y-2">
                {/* Facebook */}
                <div className="absolute left-[-44px] top-[10px] flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-[#fff]">
                  <FaFacebook size={24} />
                </div>
                {/* Youtube */}
                <div className="absolute left-[-44px] top-[120px] flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-[#fff]">
                  <FaYoutube size={24} />
                </div>

                {/* Twitter */}
                <div className="absolute left-[-44px] top-[60px] flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-[#fff]">
                  <FaTwitter size={24} />
                </div>

                {/* Instagram */}
                <div className="absolute left-[-44px] top-[180px] flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-[#fff]">
                  <FaInstagram size={24} />
                </div>
              </div>

              {/* Right Side Content */}
              <div className="w-full space-y-2 px-12">
                {/* Name */}
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Name</span>
                  <span>{user && (user.name ?? "")}</span>
                </div>
                {/* <hr className="my-1 border-t border-gray-300" />s */}

                {/* Phone */}
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Phone</span>
                  <span>{user && (user.phoneNumber ?? "")}</span>
                  {/* <span>
                    {data && data.company_info.phone_code}
                    {data && data.company_info.phone}
                  </span> */}
                </div>
                {/* <hr className="my-1 border-t border-gray-300" /> */}

                {/* Email */}
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Email</span>
                  <span>{user && user.email}</span>
                </div>
                {/* <hr className="my-1 border-t border-gray-300" /> */}

                {/* Currency */}
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Currency</span>
                  <span>{user && user.currency}</span>
                </div>
                {/* <hr className="my-1 border-t border-gray-300" /> */}

                {/* Company */}
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Company</span>
                  <span>{data && data.company_info.company_name}</span>
                </div>
                {/* <hr className="my-1 border-t border-gray-300" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Agent Card */}
        <div className="my-6 flex items-center justify-center">
          <div className="w-full rounded-lg bg-white p-8 shadow-lg md:w-[500px] lg:w-[600px]">
            <div className="relative flex flex-grow items-center justify-center">
              <div className="flex flex-grow items-center justify-center">
                <h1 className="mb-4 text-2xl font-bold text-gray-800">
                  Tarzan
                </h1>
              </div>
            </div>
            <UpdateConversation
              isOpen={isChatModalOpen}
              setIsChatModalOpen={setIsChatModalOpen}
            />

            {/* Left Side Icons */}
            <div className="relative flex flex-col space-y-2">
              {/* Facebook */}
              <div className="absolute -top-[20px] left-[-52px] flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-[#fff]">
                <FaFacebook size={24} />
              </div>
              {/* Youtube */}
              <div className="absolute left-[-52px] top-[90px] flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-[#fff]">
                <FaYoutube size={24} />
              </div>
              {/* Twitter */}
              <div className="absolute left-[-52px] top-[30px] flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-[#fff]">
                <FaTwitter size={24} />
              </div>

              {/* Instagram */}
              <div className="absolute left-[-52px] top-[150px] flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-[#fff]">
                <FaInstagram size={24} />
              </div>
            </div>

            {/* Right Side Content */}
            <div className="w-full space-y-2 px-8 text-gray-700">
              {/* Name */}
              <div className="flex items-center justify-between">
                <span className="w-[150px] font-semibold mr-4">Name</span>
                <span className="w-1/2 text-left">
                  {agency && agency?.length && agency[0]?.name || "John Doe"} 
                </span>
                <button
                  onClick={() => setPaymentModalOpen(true)}
                  className="rounded-md bg-red-600 px-4 w-[130px]  py-1.5 text-sm font-semibold text-white mb-4"
                >
                  Pending
                </button>
                {/* <button
                  onClick={() => setPaymentModalOpen(true)}
                  className="rounded-md bg-red-600 px-4 w-[130px]  py-1.5 text-sm font-semibold text-white mb-2"
                >
                  InActive
                </button> */}
              </div>

              {/* Ranking */}
              <div className="flex items-center justify-start">
                <span className="w-[150px] font-semibold mr-4">Ranking</span>
                <span className="w-1/2 text-left">01</span>
                <button
                  onClick={() => setIsChatModalOpen(true)}
                  className="relative rounded-md w-[130px] mb-4  bg-[#151854] flex justify-between px-4 py-1.5 text-sm font-semibold text-white"
                >
                  <div>Message</div>
                  <div className="ounded-full w-[21px] h-[21px] absolute right-[4px] top-[6px] rounded-full border border-white  text-center text-xs">
                    10
                  </div>
                </button>
              </div>

              {/* Grade */}
              <div className="flex items-center justify-start">
                <span className="w-[150px] font-semibold mr-4">Grade </span>
                <span className="w-1/2 text-left">
                  {agency && agency?.length && agency[0]?.name}
                </span>
                <button
                  onClick={() => setDepositModalOpen(true)}
                  className="rounded-md bg-[#FFB200] w-[130px] px-6 py-1.5 text-sm font-semibold text-white"
                >
                  ASD
                </button>
              </div>

              {/* Renewal date */}
              <div className="flex items-center justify-start">
                <span className="w-[150px] font-semibold">Renewal date </span>
                <span className="w-1/2 text-left">03-02-2025</span>
              </div>

              {/* Service Division */}
              <div className="flex items-center justify-start">
                <span className="w-[150px] font-semibold mr-5">Service Division</span>
                <span className="w-1/2">
                  {agency && agency?.length && agency[0]?.serviceDivision}
                </span>
                <button
                  onClick={handleAgentOpenModal}
                  className="rounded-md bg-green-500 w-[130px]  px-6 py-2 text-sm font-semibold text-white"
                >
                  Update
                </button>
              </div>

              {/* Registered Date  */}
              <div className="flex items-center justify-start">
                <span className="w-[150px] font-semibold">Registered Date </span>
                <span className="w-1/2">
                  {agency && agency?.length && formatDate(agency[0]?.createdAt)}
                </span>
              </div>
              {/* AIN   */}
              <div className="justify-justify-start flex items-center">
                <span className="w-[150px] font-semibold mr-4">AIN </span>
                <span className="w-1/2">AGN15715386</span>
                <button
                  // onClick={}
                  className="rounded-md bg-[#0059FF] w-[130px]  px-6 py-2 text-sm font-semibold text-[#000]"
                >
                  Document
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-[#151B54] relative overflow-y-auto rounded-lg bg-[#ffffff] shadow-lg">
            <ProfileForm data={data} />
            <button
              onClick={handleCloseModal}
              className="absolute right-6 top-5 rounded-lg border-2 border-gray-500 px-[6px] text-lg text-[#000]"
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
      {isPaymentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="grid max-w-[90%] grid-cols-1 gap-3 gap-y-8 rounded-lg bg-[#E9F0FF] shadow-lg">
            <div className="flex flex-row justify-between rounded-t-lg bg-[#151B54] p-4">
              <div className="rounded-lg border-2 bg-white px-2 py-1 text-left">
                <select
                  name="paymentmethod"
                  className="h-8 w-40 rounded-lg font-semibold"
                // value={formData.paymentmethod}
                //onChange={handleChange}
                // onChange={handleSelectChange}
                >
                  <option value="">Payment Method</option>
                  {banks.length > 0 ? (
                    banks.map(
                      (
                        method: { _id: string; name: string },
                        index: number,
                      ) => (
                        <option key={index} value={method._id}>
                          {method.name}
                        </option>
                      ),
                    )
                  ) : (
                    <option disabled>No payment methods available</option>
                  )}
                </select>
              </div>
              <div className="flex items-center space-x-4 rounded-lg border-2 bg-white p-1">
                <label className="block text-nowrap text-sm font-semibold">
                  Pay Amount
                </label>
                <input
                  type="text"
                  name="paymentamount"
                  //onChange={handleChange}
                  onChange={handlePaymentAmoundChange}
                  // value={paymentAmount ? `${paymentAmount} ${order.pay_currency}` : order.pay_currency}
                  className="mt-1 block h-8 w-full rounded-lg border border-gray-300 p-1 text-center font-bold text-black"
                />
              </div>
              <div className="text-end">
                <button
                  className="h-9 w-9 rounded-lg border-2 border-[#ffffff] p-2 text-[#ffffff]"
                  onClick={() => {
                    setPaymentModalOpen(false);
                  }}
                >
                  &#x2715; {/* Close icon (X) */}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 bg-[#E9F0FF] p-4">
              <div>
                {selectedBank.logo && (
                  <Image
                    src={`/logos/${selectedBank.logo}`}
                    alt={`${selectedBank.name} logo`}
                    width={80}
                    height={80}
                  />
                )}
              </div>
              <div className="col-span-2">
                {selectedBank.qrImage && (
                  <Image
                    src={selectedBank.qrImage} //"/icons/qrcode.png"
                    alt="Order successful"
                    width={80}
                    height={80}
                    onClick={toggleImageSize}
                  />
                )}
                {isOpen && (
                  <div
                    onClick={toggleImageSize}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 10,
                    }}
                  >
                    <Image
                      src={selectedBank.qrImage}
                      alt="Order successful"
                      width={200}
                      height={200}
                    />
                  </div>
                )}
              </div>

              <div className="col-span-2 py-4 text-left">
                <p className="mb-3 flex">
                  <span className="w-80 font-semibold">Bank</span>
                  <span className="text-[#151B54]">
                    {" "}
                    {selectedBank.name ? selectedBank.name : ""}
                  </span>
                </p>
                <p className="mb-3 flex">
                  <span className="w-80 font-semibold">Account name</span>
                  <span className="text-[#151B54]">
                    {" "}
                    {selectedBank.type ? selectedBank.type : ""}
                  </span>
                </p>
                <p className="mb-3 flex">
                  <span className="w-80 font-semibold">Account</span>
                  <span className="text-[#151B54]">
                    {selectedBank.account_number
                      ? selectedBank.account_number
                      : ""}
                  </span>
                </p>
                <p className="flex">
                  <span className="w-80 font-semibold">Routing</span>
                  <span className="text-[#151B54]">
                    {selectedBank.routing ? selectedBank.routing : ""}
                  </span>
                </p>
              </div>
              <div className="flex h-full flex-col justify-between space-y-2 text-left">
                <div className="mb-2 flex flex-col rounded-lg bg-[#ffffff] p-4">
                  <p className="mb-3 flex">
                    <span className="w-32 font-semibold text-gray-500">
                      Pay amount:
                    </span>
                    <span className="text-gray-500">
                      {(Number(paymentAmount) || 0).toFixed(3)}
                    </span>
                  </p>
                  <p className="mb-3 flex">
                    <span className="w-32 font-semibold text-gray-500">
                      VAT({selectedBank.tax_rate}%):
                    </span>
                    <span className="text-gray-500">
                      {(
                        Number(paymentAmount) +
                        (Number(paymentAmount) * (selectedBank.tax_rate || 0)) /
                        100 -
                        Number(paymentAmount)
                      ).toFixed(3)}{" "}
                      {/* {order.pay_currency} */}
                    </span>
                  </p>
                  <p className="mb-3 flex">
                    <span className="w-32 font-semibold text-gray-500">
                      Total amount:
                    </span>
                    <span className="text-gray-500">
                      {(
                        Number(paymentAmount) +
                        (Number(paymentAmount) * (selectedBank.tax_rate || 0)) /
                        100
                      ).toFixed(3)}{" "}
                      {/* {order.pay_currency} */}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentModalOpen(false);
                    setPaymentAccountDetailsModalOpen(true);
                  }}
                  className="mb-2 w-full rounded bg-[#151B54] py-2 font-bold text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isAgentModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={handleAgentCloseModal} // Trigger close modal on overlay click
        >
          <div
            className="scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-[#FFB200] relative h-[580px] w-full max-w-5xl overflow-y-auto rounded-lg bg-[#ffffff] shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent close modal when clicking inside the modal content
          >
            <AgentFrom
            // data={data}
            />
            {/* Uncomment this button if you also want a close button */}
            <button
              onClick={handleAgentCloseModal}
              className="absolute right-8 top-6 rounded-lg border-2 border-gray-500 px-[8px] text-lg text-[#000]"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {isBalanceTableModalOpen && (
        <div>
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#231F20]">Orders</h1>
            <div>
              <input
                type="search"
                placeholder="Search here..."
                className="mr-2 min-w-[280px] rounded-lg border px-3 py-3 shadow-xl focus:border-[#FFB200] focus:outline-none"
              />
              <button className="rounded-lg bg-[#151B54] px-6 py-3 font-semibold text-white">
                Search
              </button>
            </div>
          </header>
          <table className="mt-4 w-full rounded-lg border border-[#B0B0B0] text-sm">
            <thead className="bg-[#151B54] text-white">
              <tr>
                <th className="py-6">No.</th>
                <th className="w-[12%]">Return ID</th>
                <th className="w-[13%]">Return Amount</th>
                <th className="w-[12%]">Amount</th>
                <th className="w-[12%]">Return Day</th>
                <th className="w-[12%]">Status</th>
                <th className="w-[11%]">Action</th>
              </tr>
            </thead>
            <tbody className="border border-[#B0B0B0] text-center">
              {bankData?.orders?.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-4">
                    There is no available order
                  </td>
                </tr>
              ) : (
                bankData?.orders?.map((order: any, index: number) => (
                  <tr key={order.id} className="odd:bg-[#FAEFD8] even:bg-white">
                    <td className="border-r border-r-[#B0B0B0] py-6">
                      <span className="rounded bg-[#151B54] px-2 py-1 font-semibold text-white">
                        {index + 1}
                      </span>
                    </td>
                    <td className="border-r border-r-[#B0B0B0]">
                      {order.orderNumber}
                    </td>
                    <td className="border-r border-r-[#B0B0B0]">
                      {order.orderid.title}
                    </td>
                    <td className="border-r border-r-[#B0B0B0]">
                      {order.budget} {order.pay_currency}
                    </td>
                    <td className="border-r border-r-[#B0B0B0]">
                      {" "}
                      {order.paidAmount ? `${order.paidAmount}` : "0"}{" "}
                      {order.pay_currency}
                    </td>
                    <td className="border-r border-r-[#FFB200]">
                      <button
                        onClick={() => {
                          if (["Delivery", "Cancel"].includes(order.status)) {
                            setPaymentModalOpen(false);
                          } else if (
                            ["Pending", "Sending", "InEligible"].includes(
                              order.status,
                            )
                          ) {
                            setPaymentModalOpen(true);
                          }
                        }}
                        className="uppercase text-black"
                      >
                        <span
                          className={`flex justify-center rounded px-4 py-1 uppercase text-black ${statusColors[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </button>

                      {isdepositModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                          {/* div label */}
                          <div className="grid grid-cols-2 gap-8 rounded-lg bg-[#E9F0FF] shadow-lg">
                            <div className="col-span-3 flex items-center justify-between rounded-t-lg bg-[#151B54] p-4">
                              <h6 className="text-left">
                                Deposite Balance :
                                <span className="text-[]">523.64 $</span>
                              </h6>
                              <h2 className="flex-1 text-center text-2xl font-bold text-white">
                                Security deposit Return{" "}
                              </h2>
                              <button
                                className="h-9 w-9 rounded-lg border-2 border-[#ffffff] p-2 text-[#ffffff]"
                                onClick={() => {
                                  setDepositModalOpen(false);
                                }}
                              >
                                &#x2715; {/* Close icon (X) */}
                              </button>
                            </div>

                            {/* div 1 */}
                            <div className="flex flex-col gap-2 px-6 py-2 text-start">
                              <div className="flex flex-col text-start">
                                <label>Account holder Full Name</label>
                                <input className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#ffffff] p-1"></input>
                              </div>

                              <div className="flex flex-col text-start">
                                <label>Bank Account number</label>
                                <input className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#ffffff] p-1"></input>
                              </div>
                              <div className="flex flex-col text-start">
                                <label>Bank name</label>
                                <input className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#ffffff] p-1"></input>
                                <span className="py-1 text-end text-[#C90000]">
                                  Branch Name
                                </span>
                              </div>
                              <div className="flex flex-col text-start">
                                <label>Routing Number</label>
                                <input className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#ffffff] p-1"></input>
                              </div>
                              <div className="flex flex-col text-start">
                                <label>IBAN/SWIFT BIC code</label>
                                <input className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#ffffff] p-1"></input>
                              </div>
                              <div className="flex flex-col text-start">
                                <label>Additional information</label>
                                <textarea
                                  className="mt-1 block h-24 w-full rounded-lg border border-gray-300 bg-[#ffffff] p-1"
                                  placeholder="Provide the account details from which you made payment"
                                ></textarea>
                              </div>
                            </div>
                            {/* div 2 */}
                            <div className="mr-4 h-[400px] rounded-lg bg-[#ffffff] p-4">
                              <div className="col-span-2 py-4">
                                <h2 className="text-center text-xl font-bold">
                                  Return processing
                                </h2>
                              </div>
                              <div className="space-y-2 text-left">
                                <p className="flex">
                                  <span className="w-80 font-semibold text-gray-500">
                                    Return amount:
                                  </span>
                                  <span className="text-gray-500">
                                    {(Number(paymentAmount) || 0).toFixed(3)}
                                  </span>
                                </p>
                                <p className="flex">
                                  <span className="w-80 font-semibold text-gray-500">
                                    VAT({selectedBank.tax_rate}%):
                                  </span>
                                  <span className="text-gray-500">
                                    {(
                                      Number(paymentAmount) +
                                      (Number(paymentAmount) *
                                        (selectedBank.tax_rate || 0)) /
                                      100 -
                                      Number(paymentAmount)
                                    ).toFixed(3)}{" "}
                                    {order.pay_currency}
                                  </span>
                                </p>
                                <p className="flex">
                                  <span className="w-80 font-semibold text-gray-500">
                                    Total amount:
                                  </span>
                                  <span className="text-gray-500">
                                    {(
                                      Number(paymentAmount) +
                                      (Number(paymentAmount) *
                                        (selectedBank.tax_rate || 0)) /
                                      100
                                    ).toFixed(3)}{" "}
                                    {order.pay_currency}
                                  </span>
                                </p>
                              </div>
                              <div className="mt-6 text-left">
                                <input
                                  type="checkbox"
                                  name="terms"
                                  className="mr-2"
                                //onChange={handleCheckboxChange}
                                />
                                <label className="text-sm font-medium text-gray-500">
                                  I agree with the terms ans conditions
                                </label>
                              </div>
                              <div className="mt-6 px-10 text-center">
                                <HCaptcha
                                  sitekey={HCAPTCHA_SITE_KEY}
                                  onVerify={handleCaptchaChange}
                                />
                              </div>

                              <div className="mt-6 px-10">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSecurityDepositModalOpen(false);
                                    setSuccessfulPaymentModalOpen(true);
                                  }}
                                  className="w-full rounded bg-[#151B54] py-2 font-bold text-white"
                                >
                                  Submit
                                </button>
                              </div>

                              {isSuccessfulPaymentModalOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                  <div className="flex flex-col items-center rounded bg-white p-10 text-center shadow-lg">
                                    <Image
                                      src="/images/ordersuccess.png"
                                      height={100}
                                      width={100}
                                      alt=""
                                    />
                                    <h2 className="mt-4 text-lg font-bold">
                                      Return sucessful
                                    </h2>
                                    <p className="mt-2">
                                      Thank you! Your Return is complete
                                    </p>

                                    <div className="mt-4 flex w-full">
                                      <button
                                        onClick={() => {
                                          setSuccessfulPaymentModalOpen(false); // Close the modal
                                        }}
                                        className="mt-4 w-full bg-[#151B54] py-2 font-semibold text-white"
                                      >
                                        Done
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={openModal}
                        className="rounded bg-[#151B54] px-3 py-2 text-sm font-semibold uppercase text-white"
                      >
                        View
                      </button>
                      {/* Modal with Project Details Page */}
                      <Modal onClose={closeModal}>
                        <div className="flex h-full w-full items-center justify-center bg-white">
                          <div className="rounded-lg bg-white p-8">
                            <div className="mb-2 flex flex-col items-center">
                              <h1></h1>
                              <h1 className="mt-2 text-3xl font-bold">
                                {" "}
                                {userOrder?.orderid.title}
                              </h1>
                              {/* <p className="text-lg">Essential Details Of The Project</p> */}
                              <p className="mt-2 text-lg">
                                order ID : {userOrder?.orderNumber}
                              </p>
                              <p className="text-lg">
                                order Date : {formatDate2(userOrder?.createdAt)}{" "}
                                {formatTime(userOrder?.createdAt)}
                              </p>
                            </div>

                            <div className="grid grid-cols-2">
                              {/* Project Info Section */}
                              <div className="mb-4 text-left text-sm">
                                <p>
                                  <span className="font-semibold">
                                    Applicant&apos;s Full Name:
                                  </span>{" "}
                                  {userOrder?.full_name}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Project Requirements:
                                  </span>{" "}
                                  {userOrder?.project_requirement}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Type of Project:
                                  </span>{" "}
                                  {userOrder?.project_type}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Pay Currency:
                                  </span>{" "}
                                  {userOrder?.pay_currency}
                                </p>
                                <p>
                                  <span className="font-semibold">Budget:</span>{" "}
                                  {userOrder?.budget}
                                </p>
                                {userOrder?.minimum_pay > 0 && (
                                  <p>
                                    <span className="font-semibold">
                                      Minimum Pay:
                                    </span>{" "}
                                    {userOrder.minimum_pay}
                                  </p>
                                )}
                                <p>
                                  <span className="font-semibold">
                                    Project Deadline:
                                  </span>{" "}
                                  {formatDate2(userOrder?.project_deadline)}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Reference Name:
                                  </span>{" "}
                                  {userOrder?.reference_name}
                                </p>
                                <p>
                                  <span className="mr-1 font-semibold">
                                    Provide the project related files:
                                  </span>
                                  {userOrder?.project_files &&
                                    userOrder?.project_files.length > 0
                                    ? "Yes"
                                    : "No"}
                                </p>
                              </div>
                              {/* <div>
                    <p className="text-lg">Essential Details Of The Project</p>
                    <p className="text-lg">order ID : 4644
                    </p>
                    <p className="text-lg">order Date : 02-02-2024(02:23 pm)</p>

                  </div> */}
                              <div className="flex justify-end">
                                <Image
                                  src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg"
                                  alt="NASA logo"
                                  width={160}
                                  height={140}
                                  className="mb-4"
                                />
                              </div>
                            </div>

                            {/* Project Description */}
                            <div className="rounded-lg border-2 border-[#D9D9D9] text-left">
                              <h2 className="mb-2 text-lg font-semibold">
                                Give some details about the project:
                              </h2>
                              <p className="w-full px-2 text-justify text-xs">
                                {userOrder?.project_details}
                              </p>
                            </div>

                            <div className="flex justify-between gap-20">
                              {/* Agreement Section */}
                              <div className="mt-3 flex flex-col space-y-1 text-left">
                                <div>
                                  <input
                                    type="checkbox"
                                    id="accepted_terms"
                                    className="mr-2"
                                    checked={!!userOrder?.accepted_terms}
                                  />
                                  <label htmlFor="accepted_terms">
                                    I agree all Transcend & condition , privacy
                                    policy
                                  </label>
                                </div>

                                {/* <div>
                      <input type="checkbox" id="confirm" className="mr-2" defaultChecked />
                      <label htmlFor="confirm">I confirm that the information is correct.</label>
                    </div>
                    <div>
                      <input type="checkbox" id="apply" className="mr-2" defaultChecked />
                      <label htmlFor="apply">I am applying by agreeing to these terms.</label>
                    </div>*/}
                              </div>
                            </div>

                            {/* Signature Section */}
                            <div className="mt-6 flex items-center space-x-4">
                              <p className="text-right font-semibold">
                                Applicant signature:
                              </p>
                              <Image
                                src={
                                  userOrder?.user_signatory?.signature ||
                                  "/signature.png"
                                }
                                alt="sign"
                                width={80}
                                height={30}
                                className=""
                              />
                            </div>
                          </div>
                        </div>
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
              <FaArrowLeft className="text-[#151B54]" />
              <button className="flex h-6 w-6 items-center justify-center rounded-full bg-[#151B54] text-xs font-semibold text-white">
                1
              </button>
              <button className="flex h-6 w-6 items-center justify-center rounded-full bg-[#151B54BA] text-xs font-semibold text-black text-white">
                2
              </button>
              <FaArrowRight className="text-[#151B54]" />
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default ShowProfile;
