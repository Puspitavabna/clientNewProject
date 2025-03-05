"use client";

import { CgCloseR } from "react-icons/cg";
import bitcoin from "/public/logos/bitcoin.png";
import master from "/public/logos/master.png";
import payoneer from "/public/logos/payoneer.png";
import paypl from "/public/logos/paypal.png";
import sbi from "/public/logos/sbi.png";
import footerVector from "/public/footerVector.png";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaFacebookF,
  FaMicrophone,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import chatPhone from "../../../public/chat-phone.png";
//import chatbot from "../../public/icons/live1.png";
import chatbot from "../../../public/live-chat.png";
import fax from "../../../public/Fax.png";
import letter from "../../../public/Letter.png";
import livechaticon from "../../../public/live-chat 9.png";
import map from "../../../public/Map Point Favourite.png";
import phone from "../../../public/Phone.png";

import Link from "next/link";
import { IoChevronBack, IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { VscChromeMinimize } from "react-icons/vsc";

import { FaFileUpload } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
//import { SERVER_URL } from "@/src/app/constants/api";
import AgencyRegistrationForm from "../(landing-pages)/agency/AgencyRegistrationForm";
import ContactForm from "../(landing-pages)/contactus/page";
import feedback from "../../../public/handshake.png";
import BrandSlider from "./BrandSlider";
import endCallImg from "/public/images/fendCallImg.png";
import micImg from "/public/images/fmicImg.png";
import speakerImg from "/public/images/fspeakerImg.png";
import AgencyRegistrationFormOld from "../(landing-pages)/agency/AgencyRegistrationFormCopy";
import { getFooterIcons } from "../api/landingpagesServices";
import { SiChatbot } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { bindActionCreators } from "redux";
import { getOfficeAddress, getPaymentIcons } from "../store/actions/footer/actions";
import { FaFile, FaPlay } from "react-icons/fa";

const callTone = "/audio/call.mp3";
const messageTone = "/audio/message.mp3";


const usefulLinks = [
  { name: "Locations", url: "/locations" },
  { name: "tasting", url: "/tasting" },
  { name: "Help & Support", url: "/helpandsupport" },
  { name: "Browse with specialist", url: "/specialist" },
  { name: "Privacy", url: "/privacy" },
  { name: "Children's privacy", url: "/childrensprivacy" },
  { name: "Security", url: "/security" },
];
const informationTech = [
  {
    name: "Online banking service advertisement",
    url: "/onlinebankingservice",
  },
  { name: "Advertising practices", url: "/advertising" },
  { name: "Your privacy policies", url: "/yourprivacy" },
  { name: "Sitemap", url: "/sitemap" },
  { name: "Careers", url: "/careers" },
];
const civilEng = [
  { name: "View full online banking site", url: "/onlinebanking" },
  { name: "Share your feedback", url: "/yourfeedback" },
  // { name: "Sitemap", url: "" },
  // { name: "Careers", url: "" },
];
const contactUs = [{ name: "Contact us", url: "/contactus" }];

const FooterNav = () => {
  const [footerData, setFooterData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch()
  const officeAddress: any = useSelector((state: RootState) => state.footer.officeAddress)
  const currentOffice = officeAddress && officeAddress[0]

  console.log("offuce address::::::", officeAddress)
  // const actions = bindActionCreators
  const actions = useMemo(() => bindActionCreators({ getOfficeAddress }, dispatch), [dispatch]);

  useEffect(() => {
    actions.getOfficeAddress()
  }, [])

  const getIconLinks = async () => {
    const socialIcons = await getFooterIcons();
  }

  useEffect(() => {
    getIconLinks();
  }, [])

  const [isSmallModalOpen, setSmallModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // Function to close the chat modal
  const closeChatModal = () => {
    setIsChatModalOpen(false);
  };

  // Function to handle opening and closing of modals
  const openSmallModal = () => setSmallModalOpen(true);
  const closeSmallModal = () => setSmallModalOpen(false);
  const toggleModal = () => {
    setIsChatModalOpen((prev) => !prev); // Toggle the state (open/close)
    setSmallModalOpen((prev => !prev))
  };

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAgencyModalOpen, setIsAgencyModalOpen] = useState(false);

  // Function to open the contact modal
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };
  const openAgencyModal = () => {
    setIsAgencyModalOpen(true);
  };

  // Function to close the contact modal
  const closeContactModal = () => {
    setIsContactModalOpen(false);
    console.log("close please");
  };
  const closeAgencyModal = () => {
    setIsAgencyModalOpen(false);
    console.log("close please");
  };
  const [minimise, setMinimise] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  console.log("current user::", currentOffice)
  return (
    <div>
      {/* <footer className={`py-16 px-16 transition-colors duration-300 ${
          isDarkMode ? "bg-[#151B54] text-white" : "bg-yellow-200 text-black"
        }`}> */}

      <footer className="bg-[#151B54] px-2 md:px-6 sm:py-6 md:py-10 text-white">
        <div className="border-white-800 mx-auto mb-6 pt-6 flex max-w-[90%] flex-col items-center justify-between border-b pb-6 md:flex-row">
          <div className="mx-auto grid md:grid-cols-4 sm:grid-cols-2 items-center gap-4 justify-center space-x-4 font-semibold">
            <p className="flex flex-row overflow-hidden text-nowrap text-sm">
              <Image
                src={map}
                alt="phone"
                width={24}    // Equivalent to 'h-6' (6 * 4px, assuming 1rem = 16px)
                height={24}   // Equivalent to 'w-6'
                className="pr-1"
              /> London,
              Vladivostok named Sergey
            </p>
            <p className="flex flex-row overflow-hidden text-nowrap text-sm">
              <Image
                src={letter}
                alt="phone"
                width={24}    // Equivalent to 'h-6' (6 * 4px, assuming 1rem = 16px)
                height={24}   // Equivalent to 'w-6'
                className="pr-1"
              />
              sampleemail@email.com
            </p>
            <p className="flex flex-row overflow-hidden text-nowrap text-sm">
              <Image
                src={fax}
                alt="phone"
                width={24}    // Equivalent to 'h-6' (6 * 4px, assuming 1rem = 16px)
                height={24}   // Equivalent to 'w-6'
                className="pr-1"
              />
              +1
              949494-996768
            </p>
            <p className="flex flex-row overflow-hidden text-nowrap text-sm">
              <Image
                src={phone}
                alt="phone"
                width={24}    // Equivalent to 'h-6' (6 * 4px, assuming 1rem = 16px)
                height={24}   // Equivalent to 'w-6'
                className="pr-1"
              />
              +1
              949494-993435465
            </p>
          </div>
        </div>
        <h2 className="mx-auto mb-8 mt-2 text-center text-lg font-bold md:mt-0">
          APPLE STORE ONLINE
        </h2>
        {/* Middle Section */}
        <div className="md:px-4 md:mx-auto mb-6 grid gap-6 text-center md:text-left">
          <div className="grid-row md:grid-row grid md:gap-6">
            <div className="flex flex-wrap text-sm md:text-base md:px-4 md:mx-auto items-center justify-center gap-x-4 gap-y-2">
              {usefulLinks.map((link, i) => (
                <FooterLink key={i} href={link.url} >
                  {link.name}
                </FooterLink>
              ))}
            </div>

            <div className="mt-4 mx-auto flex flex-wrap sm:text-xs md:text-base items-center justify-center gap-x-4 gap-y-2 text-center w-full">
              {informationTech.map((link, i) => (
                <FooterLink key={i} href={link.url} >
                  {link.name}
                </FooterLink>
              ))}
            </div>


            <div className="mt-4 mx-auto flex flex-wrap sm:text-xs md:text-base items-center justify-center gap-x-4 gap-y-2 text-center w-full">
              {civilEng.map((link, i) => (
                <FooterLink key={i} href={link.url}>
                  {link.name}
                </FooterLink>
              ))}
            </div>

            {isContactModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-90">
                <div className="relative w-[400px] overflow-y-auto rounded-md bg-[#ffffff] shadow-lg scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400">
                  <ContactForm />
                  <button
                    onClick={closeContactModal}
                    className="absolute right-4 top-4 p-1 text-2xl text-gray-700 hover:text-black"
                  >
                    <CgCloseR />
                  </button>
                  {/* <button
                    onClick={closeContactModal}
                    className="absolute right-4 top-4 text-xl text-black hover:text-gray-600"
                  >
                    ×
                  </button> */}
                </div>
              </div>
            )}

            <div className="mx-auto flex flex-row items-center justify-center space-x-4">
              {/* {contactUs.map((link, i) => (
                <FooterLink key={i} href={link.url}>
                  {link.name}
                </FooterLink>
              ))} */}
              <button
                onClick={openContactModal}>
                Contact Us
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4 justify-center md:space-x-4">
              <Link href="/agency" passHref>
                <button className="text-sm sm:text-base rounded-md bg-[#0000FF] px-4 py-2 hover:bg-[#2563EB]">
                  Agency
                </button>
              </Link>
              <Link href="/locations" passHref>
                <button className="text-sm sm:text-base rounded-md bg-[#0000FF] px-4 py-2 hover:bg-[#2563EB]">
                  Global Locations
                </button>
              </Link>
              <button
                onClick={openAgencyModal}
                className="text-sm sm:text-base rounded-md bg-[#0000FF] px-4 py-2 hover:bg-[#2563EB]"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {isAgencyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-90">
            <div className="relative w-[90%] md:w-[60%] overflow-y-auto rounded-md bg-[#ffffff] shadow-lg scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400">
              {/*<RegistrationForm />*/}
              <AgencyRegistrationForm />
              {/* <AgencyRegistrationFormOld /> */}
              <button
                onClick={closeAgencyModal}
                className="absolute right-4 top-4 p-1 text-2xl text-gray-700 hover:text-black"
              >
                <CgCloseR />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        {/* <div className="mx-auto bg-black px-4"> */}
        {/* Newsletter and Buttons */}
        <div className="flex flex-col justify-between md:flex-row">
          {/* <div className="grid-col mb-6 grid h-[100px] gap-2 bg-blue-400"> */}
          <div className="flex flex-col">
            <div className="h-8 w-56 border-b">
              <p className="text-[12px] font-semibold">
                Subscribe to our news letter{" "}
              </p>
            </div>
            <div className="mt-4">
              {/* <input
              type="email"
              placeholder="Enter your email"
              className="rounded-l-full py-2 px-4 text-black w-64"
            />
            <button className="bg-[#0000FF] hover:bg-[#2563EB] text-white py-2 px-4 rounded-r-full">
              Submit
            </button> */}
              <Subscribe />
            </div>
            <div>
              {/* <DarkLightModeToggle /> */}
              {/* <button
                  onClick={toggleMode}
                  className={`py-2 px-4 rounded-md transition ${
                    isDarkMode
                      ? "bg-blue-500 hover:bg-blue-400"
                      : "bg-yellow-500 hover:bg-yellow-400"
                  }`}
                >
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>  */}
              {/* <Switch
  checked={isDarkMode}
  onChange={toggleMode}
  offColor="#0059FF" 
  onColor="yellow" 
  offHandleColor="#ffffff" 
  onHandleColor="#ffffff" 
  handleDiameter={28} 
  height={40}
  width={70} 
  uncheckedHandleIcon={
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 18,
        marginLeft: "4px",
      }}
    >
      🌙
    </div>
  }
  checkedHandleIcon={
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 18,
        marginRight: "4px",
      }}
    >
      ☀️
    </div>
  }
/> */}
            </div>
            {/* Buttons */}
          </div>

          {/* <div className="grid-col mb-8 grid min-w-[400px] max-w-[400px] gap-6 bg-yellow-400"> */}
          <div className="flex min-w-[400px] max-w-[400px] flex-col gap-6 lg:-ml-52">
            <div className="mt-6 flex justify-center gap-6 md:justify-center">
              <div className="flex space-x-4 pt-2">
                {/* Facebook */}
                <div className="cursor-pointer rounded-full bg-white p-2">
                  <SocialLink link="">
                    <FaFacebookF className="text-black hover:text-[#1877F2] hover:shadow-md" />
                  </SocialLink>
                </div>
                {/* YouTube */}
                <div className="cursor-pointer rounded-full bg-white p-2">
                  <SocialLink link="">
                    <FaYoutube className="text-black hover:text-[#FF0000] hover:shadow-md" />
                  </SocialLink>
                </div>
                {/* TikTok */}
                <div className="cursor-pointer rounded-full bg-white p-2">
                  <SocialLink link="">
                    <FaTiktok className="text-black hover:text-[#4741ee] hover:shadow-md" />
                  </SocialLink>
                </div>
                {/* Twitter */}
                <div className="cursor-pointer rounded-full bg-white p-2">
                  <SocialLink link="">
                    <FaTwitter className="text-black hover:text-[#1DA1F2] hover:shadow-md" />
                  </SocialLink>
                </div>
                {/* Instagram */}
                {/* <div className="cursor-pointer rounded-full bg-white p-2 hover:text-[#E4405F] hover:shadow-md">
                    <SocialLink link="">
                      <FaInstagram className="text-black" />
                    </SocialLink>
                  </div> */}
              </div>
            </div>
            <div className="-mt-6 overflow-hidden">
              <Brands />
            </div>
            {/* <div className="flex items-center justify-center gap-x-4 bg-yellow-400">
                <Image src={bitcoin} alt="bitcoin logo" width={40} />
                <Image src={payoneer} alt="Payoneer logo" width={40} />
                <Image src={master} alt="Master card logo" width={40} />
                <Image src={paypl} alt="Paypal logo" width={40} />
                <Image src={sbi} alt="SBI logo" width={40} />
              </div> */}
            <div>
              <p className="text-md text-center text-gray-400">
                © 2024 Sample. All rights reserved.
              </p>
            </div>
          </div>
          {/* <div className="flex flex-col"></div> */}
          {/* <div className="flex flex-col"></div> */}
          {/* <div className="flex flex-col items-end"> */}
          {/* <div className="relative flex items-center"> */}
          <div className="flex items-center justify-end">
            <div className="mr-2 min-w-10">
              <BackToTop />
            </div>
          </div>
          {/* Other items like payment logos */}
          {/* </div> */}
        </div>
        {/* Social Media Icons */}
        {/* Copyright */}
        {/* </div> */}
        <div className="fixed bottom-4 right-4 z-10">
          {/* Chatbot Icon */}
          <div
            onClick={toggleModal}
            className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#FFB200]"
          >
            <Image
              src={chatbot}
              // onClick={openSmallModal}
              onClick={() => {
                if (minimise) {
                  // Restore chat modal if it's minimized
                  setIsChatModalOpen(true);
                  setMinimise(false);
                } else {
                  // Open small modal if not minimized
                  openSmallModal();
                }
              }}
              alt="Chat bot icon"
              className="h-10 w-10 cursor-pointer rounded-full transition-transform hover:scale-105 hover:animate-chatbot-talk"
            />
            {/* Chat Bubble on Hover */}
            <div className="absolute -top-14 left-[-30px] rounded-md bg-blue-500 px-4 py-2 text-sm text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
              {/* Hello! How can I help you? */}
            </div>
          </div>

          {/* Chat Modal */}
          {isChatModalOpen && (
            <UpdateConversation
              isOpen={isChatModalOpen}
              setMinimise={setMinimise}
              setIsChatModalOpen={setIsChatModalOpen}
            />
          )}
        </div>
      </footer>
    </div>
  );
};

export default FooterNav;

const ChatModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <>
      {isOpen && (
        <div className="inset-10 z-50 flex items-center justify-center bg-opacity-60">
          <div className="relative w-full max-w-lg rounded-lg p-6 shadow-lg">
            <button
              onClick={onClose}
              className="z-80 absolute -right-5 top-5 p-2 text-gray-600 hover:text-gray-900"
            >
              <IoClose size={24} />
            </button>
            {/* Render the chat content */}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

const SocialLink = ({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ffffff] text-xl"
    >
      {children}
    </Link>
  );
};

const FooterLink = ({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => {
  return (
    <a href={href} className="footer-link" onClick={onClick}>
      {children}
    </a>
  );
};

const Subscribe = () => {
  const languages = [
    "Afrikaans",
    "Azərbaycan",
    "Bahasa Indonesia",
    "Bahasa Malaysia",
    "Bosanski",
    "Català",
    "Čeština",
    "Dansk",
    "Deutsch",
    "Eesti",
    "English (India)",
    "English (UK)",
    "English (US)",
    "Español (España)",
    "Español (Latinoamérica)",
    "Español (US)",
    "Euskara",
    "Filipino",
    "Français",
    "Français (Canada)",
    "Galego",
    "Hrvatski",
    "IsiZulu",
    "Íslenska",
    "Italiano",
    "Kiswahili",
    "Latviešu valoda",
    "Lietuvių",
    "Magyar",
    "Nederlands",
    "Norsk",
    "O‘zbek",
    "Polski",
    "Português",
    "Português (Brasil)",
    "Română",
    "Shqip",
    "Slovenčina",
    "Slovenščina",
    "Srpski",
    "Suomi",
    "Svenska",
    "Tiếng Việt",
    "Türkçe",
    "Беларуская",
    "Български",
    "Кыргызча",
    "Қазақ Тілі",
    "Македонски",
    "Монгол",
    "Русский",
    "Српски",
    "Українська",
    "Ελληνικά",
    "Հայերեն",
    "עברית",
    "اردو",
    "فارسی",
    "नेपाली",
    "मराठी",
    "हिन्दी",
    "অসমীয়া",
    "বাংলা",
    "ਪੰਜਾਬੀ",
    "ગુજરાતી",
    "ଓଡ଼ିଆ",
    "தமிழ்",
    "తెలుగు",
    "ಕನ್ನಡ",
    "മലയാളം",
    "සිංහල",
    "ภาษาไทย",
    "ລາວ",
    "ဗမာ",
    "ქართული",
    "አማርኛ",
    "ខ្មែរ",
    "中文 (简体)",
    "中文 (繁體)",
    "中文 (香港)",
    "日本語",
    "한국어",
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  // Function to resize the select element based on the selected text's exact length
  const resizeSelect = () => {
    if (selectRef.current) {
      const selectedOption =
        selectRef.current.options[selectRef.current.selectedIndex];
      const width = selectedOption.text.length;
      selectRef.current.style.width = `${width}ch`; // Set width dynamically based on the selected option
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  useEffect(() => {
    resizeSelect(); // Resize after selection changes
  }, [selectedLanguage]); // Ensure resizing on language change

  return (
    <form className="flex items-center space-x-4">
      <select
        ref={selectRef}
        value={selectedLanguage}
        onChange={handleSelectChange}
        className="min-w-16 max-w-16 rounded-[4px] px-1 py-2 text-[9px] focus:outline-none"
        style={{ color: "gray" }}
      >
        {languages.map((language, index) => (
          <option value={language} key={index}>
            {language}
          </option>
        ))}
      </select>

      <div className="relative w-full max-w-sm">
        <input
          type="email"
          id="subscribemail"
          className="submit-footer-input min-w-52 max-w-52 rounded-[4px] px-2 py-2 text-[9px] text-black focus:outline-none"
          placeholder="Enter your email"
          required
          aria-label="Email address"
        />
        <button className="left-submit-btn absolute top-1/2 w-[48px] -translate-y-1/2 transform rounded-[4px] bg-[#0059FF] py-1 text-[9px] text-white hover:bg-blue-700">
          Submit
        </button>
      </div>
    </form>
  );
};

// Chat conversation modal
interface UpdateConversationProps {
  isOpen: boolean;
  // onClose: () => void;
  setMinimise: (value: boolean) => void; // Set minimise as a function accepting a boolean
  setIsChatModalOpen: (value: boolean) => void; // Set chat modal open as a function accepting a boolean
}

const UpdateConversation = ({
  isOpen,
  setMinimise,
  setIsChatModalOpen,
}: UpdateConversationProps) => {
  const [isShowChats, setIsShowChats] = useState(false);
  const [isCallPopUp, setICallPopUp] = useState(false);
  const [isSettingOn, setIsSettingOn] = useState(false);
  const [chatbox, setChatbox] = useState(false)
  const [messageCategory, setMessageCategory] = useState("");
  const [isSmallModalOpen, setSmallModalOpen] = useState(true);
  type Chat = {
    role: "sender" | "you"; // Only allows these roles
    message: string;
    time: string;
  };

  const getFormattedTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (!messageCategory) return;
    setChats((prevChats) => [
      ...prevChats,
      {

        role: "sender",
        message: `Hello! 😊 I'm here to assist you with ${messageCategory}. How can I help you today?`,
        time: getFormattedTime(),
      },
    ]);
  }, [messageCategory])

  const sendMyMessage = async () => {
    if (!message) return;
    setMessage("");
    setChats((prevChats) => [
      ...prevChats,
      {
        role: "you",
        message: message,
        time: getFormattedTime(),
      },
    ]);
    // try {
    //   const response = await sendUserMessage({
    //     sender: userid,
    //     receiver: "67a5c5cc7b6d861285f68779",
    //     content: message,
    //   });
    //   console.log("sending message::", response);
    // } catch (err) {
    // } finally {
    // }
  };

  // Function to open the chat modal
  const openChatModal = (cat: string) => {
    setMessageCategory(cat)
    setSmallModalOpen(false);
    setChatbox(true)
  };
  //const [minimise, setMinimise] = useState(false);

  const handleMinimize = () => {
    setIsChatModalOpen(false); // Close the chat modal
    setMinimise(true); // Set minimized state
  };

  const handleCall = () => {
    //setIsChatModalOpen(false);  // Close the chat modal
    setMinimise(true);
    setICallPopUp(true);
    // Set minimized state
  };

  const [isModalClose, setIsModalClose] = useState(false);
  const onClose = () => {
    setMessageCategory("");
    setIsModalClose(true); // Open the modal when chat is closed
  };
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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


  const fileInputRef = useRef<HTMLInputElement>(null);


  return (
    <>
      {isSmallModalOpen && (
        <div
          style={{ position: "fixed", bottom: "100px", right: "16px" }}
          // className="z-70 w-[400px] rounded-lg bg-[#ECEEF1] pb-4"
          className="z-70 w-[575px] rounded-xl bg-gray-100 pb-4 shadow-md"
        >
          <button
            onClick={() => setIsChatModalOpen(false)}
            className="absolute right-4 top-2 text-3xl text-white hover:text-gray-400"
          >
            ×
          </button>
          <div className="mb-4 flex flex-col items-start justify-center gap-4 rounded-t-lg bg-[#151B54] p-10 text-gray-300">
            <div className="flex items-end space-x-2">
              <Image
                src={livechaticon}
                alt="Live chat icon"
                width={64}
                height={64}
                className="block pt-6"
              />
              <h1 className="text-lg font-bold">Hello,</h1>
            </div>
            <h2 className="text-base text-white">
              Hello,
              Welcome to our live chat!
              If you need to talk to us, you can get a quick response through the Live Chat feature. Its fast and secure, and the team is available 24/7.
            </h2>
          </div>

          <div className="bg-white px-6 py-2 grid grid-cols-6 gap-4">
            {/* First Column: "Construction", "Technical" (2 rows) */}
            <div className="col-span-1 row-span-2 space-y-4 pt-2">
              <button
                onClick={() => openChatModal("Construction")}
                className="w-full rounded-md border border-[#151854] px-4 py-1.5 text-center text-[9px] font-semibold text-[#151854]"
              >
                Construction
              </button>
              <button
                onClick={() => openChatModal("Technical")}
                className="w-full rounded-md border border-[#151854] px-4 py-1.5 text-center text-[9px] font-semibold text-[#151854]"
              >
                Technical
              </button>
            </div>

            {/* Second Column: "Visa", "Orders", "Export" (3 rows) */}
            <div className="col-span-1 row-span-3 space-y-4">
              <button
                onClick={() => openChatModal("Visa")}
                className="w-full rounded-md border border-[#151854] px-4 py-1.5 text-center text-[9px] font-semibold text-[#151854]"
              >
                Visa
              </button>
              <button
                onClick={() => openChatModal("Orders")}
                className="w-full rounded-md border border-[#151854] px-4 py-1.5 text-center text-[9px] font-semibold text-[#151854]"
              >
                Orders
              </button>
              <button
                onClick={() => openChatModal("Export")}
                className="w-full rounded-md border border-[#151854] px-4 py-1.5 text-center text-[9px] font-semibold text-[#151854]"
              >
                Export
              </button>
            </div>

            {/* Third Column: "Travelling", "Hiring" (2 rows) */}
            <div className="col-span-1 row-span-2 space-y-4 pt-4" >
              <button
                onClick={() => openChatModal("Travelling")}
                className="w-full rounded-md border border-[#151854] px-4 py-1.5 text-center text-[9px] font-semibold text-[#151854]"
              >
                Travelling
              </button>
              <button
                onClick={() => openChatModal("Hiring")}
                className="w-full rounded-md border border-[#151854] px-4 py-1.5 text-center text-[9px] font-semibold text-[#151854]"
              >
                Hiring
              </button>
            </div>

            {/* Fourth Column: "Payment" (1 row) */}
            <div className="col-span-1 row-span-1 pt-8">
              <button
                onClick={() => openChatModal("Payment")}
                className="w-full h-full rounded-md border border-[#151854] px-4 py-1.5 text-center text-[9px] font-semibold text-[#151854]"
              >
                Payment
              </button>
            </div>

            {/* Fifth Column: "Return", "Advice" (2 rows) */}
            <div className="col-span-1 row-span-2 space-y-4 pt-2">
              <button
                onClick={() => openChatModal("Return")}
                className="w-full rounded-md border border-[#151854] px-4 py-1.5 text-center text-[9px] font-semibold text-[#151854]"
              >
                Return
              </button>
              <button
                onClick={() => openChatModal("Advice")}
                className="w-full rounded-md border border-[#151854] px-4 py-1.5 text-center text-[9px] font-semibold text-[#151854]"
              >
                Advice
              </button>
            </div>

            {/* Sixth Column: "Others" (1 row) */}
            <div className="col-span-1 row-span-1 pt-8">
              <button
                onClick={() => openChatModal("Others")}
                className="w-full h-full rounded-md border border-[#151854] px-4 py-1.5 text-center text-[9px] font-semibold text-[#151854]"
              >
                Others
              </button>
            </div>
          </div>


          {/* Chatbot chat field */}
          <div className="relative mt-4 flex items-center justify-center gap-1 px-6 text-gray-700">
            <input
              id="subscriberid"
              type="text"
              placeholder="Send a Message"
              // className="w-full rounded-lg border-[#B9B9B9] bg-white px-14 py-2 text-black outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm focus:outline-none border border-gray-400"
            />

            {/* <FaMicrophone className="absolute left-16 top-1/2 -translate-y-1/2 transform cursor-pointer text-lg text-black" />
            <FaFileUpload className="absolute left-10 top-1/2 -translate-y-1/2 transform cursor-pointer text-lg text-black" />*/}
            <IoIosSend className="absolute right-10 top-1/2 -translate-y-1/2 transform cursor-pointer text-lg text-black" />
          </div>
        </div>
      )}
      {isOpen && chatbox && (
        <div className="fixed bottom-16 right-0 m-4 h-[calc(100vh-18vh)] w-[410px] rounded-xl bg-white shadow-lg">
          {/* Top Section */}
          <div className="flex items-center justify-between rounded-t-lg bg-[#151B54] p-3">
            <div className="relative flex items-center gap-2">
              <Image
                src="/images/user.png"
                height={40}
                width={40}
                className="rounded-full border-2 border-[#FFB200]"
                alt="User"
              />
              <span className="absolute right-[108px] top-0 h-3 w-3 rounded-full bg-[#08D304]"></span>
              <span className="font-semibold text-[#ffffff]">Richard Poon</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Image
                onClick={handleCall}
                src={chatPhone}
                height={16}
                width={16}
                alt="call"
                style={{
                  width: "18px",
                  height: "18px",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
              <span className="rounded-full">
                <VscChromeMinimize
                  onClick={handleMinimize}
                  className="cursor-pointer text-2xl font-bold text-[#ffffff] hover:text-gray-400"
                />
              </span>
              <button
                onClick={onClose}
                className="rounded-full text-[#ffffff] hover:text-gray-400"
                aria-label="Close chat"
              >
                <IoClose size={24} />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          {/* <div className="flex h-[calc(100%-72px)] flex-col justify-between rounded-b-xl bg-[#ffffff] p-4"> */}
          <div className="flex h-[calc(100%-72px)] flex-col justify-between rounded-b-lg p-1">
            {/* Messages */}
            <div className="h-full flex-grow overflow-y-auto p-2 text-sm scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black">
              {chats.map((chat, index) =>
                chat.role === "you" ? (
                  <ChatLineYou key={index} chat={chat} />
                ) : (
                  <ChatLineSender key={index} chat={chat} />
                ),
              )}
            </div>
            <div className="relative mt-6 flex items-center justify-center gap-1 px-2 text-gray-700">
              <input
                type="text"
                placeholder="Send a Message"
                className="w-full rounded-lg bg-white px-16 py-2 text-sm focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e?.target?.value)}
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
              <IoIosSend className="text-meta-5 absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-lg text-black" onClick={sendMyMessage} />
            </div>
          </div>

          {/* Settings */}
          {isSettingOn && <ChatSettings />}
        </div>
      )}
      {/* {minimise && (
          <div
            onClick={() => [setICallPopUp(true), setMinimise(false)]}
            className="fixed bottom-5 right-10 z-40 cursor-pointer"
          >
           <Image src={UserImg} height={50} width={50} alt="user" /> 
          </div>
        )} */}

      {isCallPopUp && (
        <CallPopUp
          isCallPopUp={isCallPopUp}
          setICallPopUp={setICallPopUp}
          setMinimise={setMinimise}
        />
      )}
      {/* Modal when chat is closed */}
      <div
        className={`fixed bottom-20 right-4 h-[calc(100vh-18vh)] w-[410px] transform rounded-lg bg-white p-4 shadow-lg transition-transform duration-500 ${isModalClose ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* <div className="rounded-lg bg-[#ECEEF1] p-4 text-center shadow-lg"> */}
        <div className="flex h-[auto] w-full flex-col items-center justify-center rounded-lg p-4 text-center">
          <div className="fixed left-0 top-0 m-4">
            <button
              onClick={() => setIsModalClose(false)}
              className="rounded-full text-black hover:text-gray-400"
              aria-label="Close chat"
            >
              <IoChevronBack />
            </button>
          </div>
          <div className="border-8 border-black mb-3 rounded-full text-center">
            <Image
              src={feedback}
              height={100}
              width={100}
              alt="user"
              className="mx-auto pt-4"
            />
          </div>
          <h2 className="mt-2 text-sm font-bold text-gray-700">
            Did we help you?
          </h2>
          <h1 className="mt-1 text-sm font-bold text-gray-700">
            Your Feedback Matters
          </h1>
          <h3 className="mt-1 text-sm text-gray-900">
            Have you benefited from the services you received
            <span className="block">  from us?</span>
          </h3>
          <div className="mt-4 flex gap-6 pb-1 pt-4">
            <button
              onClick={() => {
                setMessageCategory("")
                setIsModalClose(false); // Close the "Chat Closed" modal
                setIsChatModalOpen(false); // Close the chat modal as well
              }}
              className="rounded bg-[#151B54] px-10 py-2 text-sm font-semibold text-white"
            >
              YES
            </button>

            <button
              onClick={() => {
                setMessageCategory("")
                setIsModalClose(false); // Close the "Chat Closed" modal
                setIsChatModalOpen(false); // Close the chat modal as well
              }}
              className="rounded border border-[#151854] px-10 py-2 text-sm font-semibold text-[#151854]"
            >
              NO
            </button>
          </div>
        </div>
      </div>
    </>
  );
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
    <div className="my-1 flex items-center justify-end gap-1">
      <div style={{ width: "auto", maxWidth: "80%" }}>
        <button className="text-s rounded-bl-[101px] rounded-br-[5px] rounded-tl-[101px] rounded-tr-[95px] bg-[#E9F0FF] px-3 py-1 text-left text-[#000000]">
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
      {/* <Image
        src="/images/agency_profile.png"
        height={30}
        width={30}
        alt="user"
        className="rounded-full"
      /> */}
    </div>
  );
};

const ChatLineSender = ({
  chat,
}: {
  chat: {
    audio: any;
    file: any; role: string; message: string; time: string
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="my-1 flex items-center justify-start gap-1">
      {/* <Image
        src="/images/user.png"
        height={30}
        width={30}
        alt="user"
        className="rounded-full border-2 border-[#FFB200]"
      /> */}
      <SiChatbot size={30} color="black" />
      <div style={{ width: "auto", maxWidth: "80%" }}>
        <button className="text-s rounded-bl-[5px] rounded-br-[101px] rounded-tl-[95px] rounded-tr-[101px] bg-[#9DBCFD] px-3 py-1 text-left text-[#000000]">
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
          <h2 className="text-xl font-semibold text-[#231F20]">Richard Poon</h2>
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

const ChatSettings = () => {
  const [isDeletePopUp, setIsDeletePopUp] = useState(false);
  return (
    <div className="z-9999 absolute right-0 top-10 rounded-xl bg-white px-5 py-2 text-slate-400 dark:bg-black">
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="radio"
          name="timePeriod"
          value="60"
          className="peer sr-only"
        />
        <div className="h-3 w-3 rounded-full border-2 border-slate-300 peer-checked:bg-blue-600"></div>
        <span className="ml-3">Can not message</span>
      </label>
      <div className="flex items-center justify-between">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="radio"
            name="timePeriod"
            value="60"
            className="peer sr-only"
          />
          <div className="h-3 w-3 rounded-full border-2 border-slate-300 peer-checked:bg-blue-600"></div>
          <span className="ml-3">Can not Call</span>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="radio"
            name="timePeriod"
            value="60"
            className="peer sr-only"
          />
          <div className="h-3 w-3 rounded-full border-2 border-slate-300 peer-checked:bg-blue-600"></div>
          <span className="ml-3">Block</span>
        </label>
      </div>

      <div className="relative flex items-center justify-between">
        <span>Disappearing messages</span>
        <MdDelete
          onClick={() => setIsDeletePopUp(!isDeletePopUp)}
          className="text-meta-1"
          size={20}
        />
        {isDeletePopUp && (
          <div className="z-99999 absolute right-0 top-10 w-[200px] rounded-xl bg-slate-800 px-5 py-2 text-slate-400">
            <div className="flex items-center justify-between gap-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="radio"
                  name="timePeriod"
                  value="60"
                  className="peer sr-only"
                />
                <div className="h-3 w-3 rounded-full border-2 border-slate-300 peer-checked:bg-blue-600"></div>
                <span className="ml-3">24 Hours</span>
              </label>
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="radio"
                  name="timePeriod"
                  value="60"
                  className="peer sr-only"
                />
                <div className="h-3 w-3 rounded-full border-2 border-slate-300 peer-checked:bg-blue-600"></div>
                <span className="ml-3">7 Days</span>
              </label>
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="radio"
                  name="timePeriod"
                  value="60"
                  className="peer sr-only"
                />
                <div className="h-3 w-3 rounded-full border-2 border-slate-300 peer-checked:bg-blue-600"></div>
                <span className="ml-3">15 Days</span>
              </label>
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="radio"
                  name="timePeriod"
                  value="60"
                  className="peer sr-only"
                />
                <div className="h-3 w-3 rounded-full border-2 border-slate-300 peer-checked:bg-blue-600"></div>
                <span className="ml-3">60 Days</span>
              </label>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="radio"
                  name="timePeriod"
                  value="60"
                  className="peer sr-only"
                />
                <div className="h-3 w-3 rounded-full border-2 border-slate-300 peer-checked:bg-blue-600"></div>
                <span className="ml-3">Off</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            // position: "fixed",
            // bottom: "50px",
            // right: "30px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          {/* <img
              src="/back-to-top.png" // Replace with your image path
              alt="Back to Top"
              style={{ width: "50px", height: "50px" }}
            /> */}
          <Image
            src="/back-to-top.png"
            alt="CBack to Top"
            width={40}
            height={40}
          />
        </button>
      )}
    </div>
  );
};

const DarkLightModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center transition-all duration-300 ${isDarkMode ? "bg-blue-900 text-white" : "bg-yellow-300 text-black"
        }`}
    >
      {/* <div
      className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        isDarkMode ? "bg-blue-900 text-white" : "bg-yellow-300 text-black"
      }`}
    > */}
      <div className="flex items-center space-x-4">
        {/* Toggle switch */}
        <label className="relative flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="sr-only"
            checked={isDarkMode}
            onChange={toggleMode}
          />
          <div
            className={`flex h-8 w-14 items-center rounded-full p-1 transition-colors duration-300 ${isDarkMode ? "bg-blue-500" : "bg-yellow-400"
              }`}
          >
            <div
              className={`h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${isDarkMode ? "translate-x-6" : "translate-x-0"
                }`}
            />
          </div>
        </label>

        {/* Image representing the current mode */}
        <div>
          {isDarkMode ? (
            <Image
              src="https://cdn-icons-png.flaticon.com/512/169/169367.png"
              alt="Dark Mode Icon"
              width={32} // width of the image in pixels
              height={32} // height of the image in pixels
            />
          ) : (
            // <img
            //   src="https://cdn-icons-png.flaticon.com/512/169/169367.png"
            //   alt="Dark Mode Icon"
            //   className="h-8 w-8"
            // />
            <Image
              src="https://cdn-icons-png.flaticon.com/512/182/182291.png"
              alt="Light Mode Icon"
              width={32} // width of the image in pixels
              height={32} // height of the image in pixels
            />
            // <img
            //   src="https://cdn-icons-png.flaticon.com/512/182/182291.png"
            //   alt="Light Mode Icon"
            //   className="h-8 w-8"
            // />
          )}
        </div>
      </div>
    </div>
  );
};

// Brands
const Brands = () => {
  const dispatch = useDispatch()
  const paymentIcons: any = useSelector((state: RootState) => state.footer?.paymentIcon)
  // const actions = bindActionCreators
  const actions = useMemo(() => bindActionCreators({ getPaymentIcons }, dispatch), [dispatch]);

  useEffect(() => {
    actions.getPaymentIcons()
  }, [])

  const brand = paymentIcons && paymentIcons?.data?.map((item: any, index: number) => ({
    src: item.icon,
    alt: `Brand logo ${index + 1}`, // You can modify this based on your needs
  }));
  return (
    <section className="mb-30">
      <BrandSlider data={brand || []} />
    </section>
  );
};
