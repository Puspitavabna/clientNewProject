"use client";
import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall, IoLogoTiktok } from "react-icons/io5";
import { MdFax, MdOutlineEmail } from "react-icons/md";
import logo from "/public/logo.svg";
//import chatbot from "../../public/icons/live1.png";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { VscChromeMinimize } from "react-icons/vsc";
import chatbot from "/public/icons/chatbot.svg";
import livechaticon from "/public/icons/live-chat 5.png";
import bitcoin from "/public/logos/bitcoin.png";
import master from "/public/logos/master.png";
import payoneer from "/public/logos/payoneer.png";
import paypl from "/public/logos/paypal.png";
import sbi from "/public/logos/sbi.png";

import { useRef } from "react";
import { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
//import { SERVER_URL } from "@/src/app/constants/api";
import ContactForm from "../(landing-pages)/contactus/page";
import feedback from "/public/images/feedback.png";
import endCallImg from "/public/images/fendCallImg.png";
import micImg from "/public/images/fmicImg.png";
import speakerImg from "/public/images/fspeakerImg.png";

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

// const UserImg =
//   "https://s3-alpha-sig.figma.com/img/880c/b967/a11c7be2f51928dfc76dc15828fbf03f?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BUjm3IMAGAAGPPh4gBNiRn0U48bqHeSiYPnBCwtQftJ4U9g0g1kV1z3YsthXtK8TeFSi4ZrDqCpkBb-mqFWnHSMPH3idI57Z3fiKFP5Q-ZoeGqzOIaUK0egd-6AmrmsfpbwqN7j6Qk3RTR6EXjzHVfPWcmzJpKZ1WvB2JjEJe3EdEOFbQxa~eucVyn7dmzBk3nFFh70E3OgZcX9Yoy46fSRoT2MSzj3-WqyvNTjRCkdn~N~~8iCviu2qjPCUDyoSIDn74680qY3QKtZ7TwJyaH94uBC2esI1C4edUoYcQ4S-8evaZpZOFLYkkTq6IGaTPjO~hnin5KQtVuPEscLMKw__";
// const CallImg =
//   "https://s3-alpha-sig.figma.com/img/624f/871d/45260d905371dea61ba160316d35b90f?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U5EJ9ZWAtvuTd-pRdvcFi44AtiXjfOUGHvLK8jqEB7ZyiYPd9pUbF-zvSwmfQmf5Et-bWqTYFpZ-kZRN4oHlW0~HFtPAp3o32x8tSF3tq2Q4MUBM7l0jPRRigtxwDhw78doglUopNFf2j6pmdmhHfHrV6ni~eriPjNGTKvfxS9peUyDE1eWzBGr5cRIKB-BNMjlJHDTeuQxRrQxG22730FWvx8G2vf~E46VTCj2Ea-b5uHM9~QOPCBdBKPkImAVn47oPF8DNLYMZlvL6S6S9jjPOSSMU427SNl8oXjmAcIK9CH-LL42c7Pb7p8VNJSE3d4FK2gc4wokSyx9hrvIkoQ__";

// const SettingImg =
//   "https://s3-alpha-sig.figma.com/img/9801/9810/595295091f5ec9a38dac6a413fa25d44?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eZlxH0CmJ8Xgxcz84Dvh4HofwmdIEqYU2QeticWwMi7EKl0jxjBdRGcWdU543Y1fWGtzC8SHnduUu6sCeaD0KE9-tdf1mtgc54FWiVhVZ1Wx5vabnRb8x9Mqa5CFR0Xtz9r2Symn37YNd3BBbkweiHKpVXXpRi7oQkx9IAascgglsUeN~JwXSy17BAVmGnnpqyGB2tKHZZ-KaiD~zIKN3qP~8EV3xRSNvlEuQhz15~Scz1t9nsMEr7m3Pu7SeJTNmDpGvfqtm4kfAtQsGNIX4UUpmjsyYv~syphD7RMlMxFQj1cH4lwKAUIHarz3UDagpLfOOi0N7dmc7RcpDbA6jw__";

// const uplodeImg =
//   "https://s3-alpha-sig.figma.com/img/1f47/ffa3/2c8ba17913110f01c196cd58628d7dbf?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OzFznPgk4VmJsJWUyy4XOJ7iGRsYS5r~iQBaDnZfO3kBUzqgsbTn3maWrHgQMLDk72OP8UpCDoaYOjVXZLcctx0JZEZ1tNJyOge~ZDpTbRhhW9yFlfHlJsMIuThqogXG6wJbKP9y~2RWNp4BKncOVy~Ea1TwaPicJCIRK~6ToegE4TPMsTCV6JfhJVHPYH~eO0JUwvnBjNMrxufJQjKR-T~qZKHYm~hw3zUJw2SPU74dzYaIoR9emlMfdzFg8aywBize2J4GyVUXQGIa8w7WIoTnYmseCNhsuhKs-20K94LzV3N3XqQKQzUjoVaGjPVYxVuflcdf3kg8znqN6uRbAA__";

// const micImg =
//   "https://s3-alpha-sig.figma.com/img/af8f/ca79/c89fe2faf4acf520e359d8e7b284a5af?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SDoG5F-iHGgXDtwo~a1nWCQ-oLaTMv5NgwTacEhXNiTNphTw60wwq5m4WwWwU0KZaKO5tkpUOWwDF2UIpu-oI6TkJZyVb10ZmhWVyh6c9BVkDl-8Sy84twqC4dGvmNZrImYeKWjoraZpCFhTEXfAokfo-JYWVJA1-hvkL~MNF9Do6JEn985UMemxBdheugqBAtrgZb55t3BSAipzUkLVaS-Dg6qJkXYNTNxUxQJs941mXqoQ65teAxnZG4SfAUVV0aLFe-lrbu5JWQgQBnxD7WIAWgLWZmtyoxTd0XBkkDhj7sdlfyHVbe7mdv3BWFX9~HXz8yMg7CfUJ0ISFI0THA__";

// const sendImg =
//   "https://s3-alpha-sig.figma.com/img/d8a6/8b6d/1b543b866ac384f9b25e25687422c02a?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VWwLFQHN2qYgzbT9~-urJvP8l473nULswLGWWMFPkEeObr5DZQNwsvbwOjwpMdgXpvW~1X-UgTlRvY3yr4~rZy6VaQEtnT0CRQ7-pu6dSOLVEHb7W3u9cN3AJaGYDqg3qjqYV-CS00EYbCsNOpIw9s7~gTPYa0HQrWcF4Nl7dYUxuWyIM8tqTtb~JkqhJIZMHaKFa0urJRRZKNosWFxM8s652sPfH6SgTfrHLehQG3me-vdB4hSOOlk-90R9Z44Ckf8j~B7Z9CI-e~hNgXsZFTsEQd5Ky8YpnBrSQoTZDgomtsNHGmNnFzrSNV8DKP8lbe0kPlv6aRrLnuNKYXeQ5Q__";

// const endCallImg =
//   "https://s3-alpha-sig.figma.com/img/a372/37eb/0e32f3dcf2380391826895c640315452?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pXakADlN9DsD61m8DTjA~AgA312cz~Otc5mx6iSxlGredeppwHUmtg20uqg~PfhJlPxJ1kZ0HEYj4KCQB-QqzeldZKyGyETzcodysXVKzof-cKB7LBy~KzbmsszCHzczyL9MBbWmcR9r-o9JqdSH7GPkxprHzn8NE52dtDHIbAtMy8Ly5GLCDm9Qg0KW4x5UiVAb9kbJU4b~9ql47jLJeqmzhsRvyUsU6XyuQCdeoYD7E68v45HTDlaVYFoayRp7h4y5bvjK-9bN837qZDHlAKF26LdPXMFFwWQJ549eM7ailXJkObIsd8VFJFK5W3J4MoL4sHvjizZ2vFwQqWwgpw__";

// const speakerImg =
//   "https://s3-alpha-sig.figma.com/img/069d/0da1/dcf117916f2b0317956b5fbcca67acc6?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mXa5IfbZq08WIM50peXvJeywddt1Ey1m00ddybcVFxIw7FtwW4GRDCvZ2yocqTK6Ao8ExKamQrx9AqLPCEBAbesDU1RerCfbqqiwtD7GXh53EAko9NgYb2HE-JxEweQ9ZBGbYW72Zsy6aOvHQ4PeyLlkZ3YIa8-UUbpyLCdmxTWwBJUMx5MCnZ6foR8PNGwYffid52fNHNQ9XFXfdB8rGhOvvo9EK8fTqTmezouTKjf~YhkiGG7QSSDR~WsLIDi71LRomOEwtvinU12vogCPcOES39075MCi1pS8doHpUS54NCgpak~AsM725uswUxy-YJT5VIVy~P6q7OiVz0CQLA__";
// const recordImg =
//   "https://s3-alpha-sig.figma.com/img/78a4/db6a/cf6505fcd094931f96bc9d0bd272c4af?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IMpx8SvvzWbbXLDRZ03CuMfx0Z9WwqyJ5DHqaQPUr5G-jxXrYLa4VO-~4NIhioQxyQMO-oN5ICVscHdESy0MwQWlZQb0dudhQFaO8kV5ThAGgdvu1-Ez-zVIWF8qSHg7JkBd1iMyGXZR-JAfnbm2gyGVrjtahr7szBOKhqt~Zr1QgVEHnRovRmMyMgzaboXvwoIBi3PH47ub6h5ujH-F-wH6odnj4OswJsidgAFKH9G13YpsoCMVm-~2ubLI33ujnG-x5f~u-qs3JFGu3p-j-ORLXY5YbYVxoI21Elhdrz2kQpNIC6VOJqn6b9pmybR50ZWSwamCxZTDHjHptERwyg__";

export default function Footer() {
  // const messages = [
  //   { name: "Mr Jack", avatar: "/images/profile/Abstract04.png", text: "Hi", time: "2 Hours ago" },
  //   { name: "Ms Paris", avatar: "/images/profile/IconSet (1).png", text: "Hello", time: "14 Hours ago" },
  //   { name: "Mr Jams", avatar: "/images/profile/IconSet (2).png", text: "Can you help me?", time: "3 hours ago" },
  //   { name: "Misa", avatar: "/images/profile/IconSet (3).png", text: "Hi", time: "1 Hour ago" },
  //   { name: "Misa", avatar: "/images/profile/IconSet.png", text: "Hi!", time: "1 Hour ago" },
  // ];
  const [isSmallModalOpen, setSmallModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // Function to open the chat modal
  const openChatModal = () => {
    setIsChatModalOpen(true);
    setSmallModalOpen(false);
  };

  // Function to close the chat modal
  const closeChatModal = () => {
    setIsChatModalOpen(false);
  };

  // Function to handle opening and closing of modals
  const openSmallModal = () => setSmallModalOpen(true);
  const closeSmallModal = () => setSmallModalOpen(false);

  // const openChatModal = () => {
  //   setSmallModalOpen(false);  // Close small modal
  //   // setChatModalOpen(true);    // Open chat modal
  // };

  // const closeChatModal = () => setChatModalOpen(false);
  // const usefulLinks = [
  //   "cookies",
  //   "contact us",
  //   "help &support",
  //   "about us",
  //   "terms and condition",
  //   "privacy policy",
  //   "return policy",
  //   "global locations",
  //   "global businesses",
  // ];

  const usefulLinks = [
    { name: "Cookies", url: "" },
    { name: "Contact Us", url: "/contactus" },
    { name: "Help & Support", url: "" },
    { name: "About Us", url: "" },
    { name: "Terms and Conditions", url: "" },
    { name: "Privacy Policy", url: "" },
    { name: "Return Policy", url: "" },
    { name: "Global Locations", url: "/locations" },
    { name: "Global Businesses", url: "" },
  ];

  // const informationTech = [

  //   "fire safety",
  //   "electrical safety",
  //   "detailed engineering assessment(DEA)",
  //   "Energy efficient audit",
  //   "architectural",
  //   "testing and training",
  //   "environmental and social",
  //   "impact assessment",
  //   "green building",
  // ];

  const informationTech = [
    { name: "fire safety", url: "" },
    { name: "electrical safety", url: "" },
    { name: "detailed engineering assessment(DEA)", url: "" },
    { name: "Energy efficient audit", url: "" },
    { name: "architecture", url: "" },
    { name: "testing and training", url: "" },
    { name: "environmental and social", url: "" },
    { name: "impact assessment", url: "" },
    { name: "green building", url: "" },
  ];

  // const civilEng = [
  //   "energy efficient audit",
  //   "architectural",
  //   "testing and training",
  //   "environmental and social",
  //   "impact assessment",
  //   "green building",
  //   "cap management",
  //   "material testing",
  // ]

  const civilEng = [
    { name: "energy efficient audit", url: "" },
    { name: "architectural", url: "" },
    { name: "testing and training", url: "" },
    { name: "environmental and social", url: "" },
    { name: "impact assessment", url: "" },
    { name: "green building", url: "" },
    { name: "cap management", url: "" },
    { name: "material testing", url: "" },
  ];

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  // Function to open the contact modal
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  // Function to close the contact modal
  const closeContactModal = () => {
    setIsContactModalOpen(false);
    console.log("close please");
  };
  const [minimise, setMinimise] = useState(false);

  return (

    <footer className="relative bg-[#CCCCFF] px-14 pb-2">
      <section className="relative -top-10 bg-[#ffb200] px-10 py-10 text-sm">
        <div className="mb-10 flex justify-between">
          <ul>
            <li className="flex items-center justify-center">
              <Image src={logo} alt="Logo" className="flex justify-center" />
            </li>
            <li>
              <p className="text-md mt-3 text-center font-bold tracking-wider text-[#14208F]">
                NASA or the National Aeronautics <br /> and Space Administration
              </p>
            </li>
            <li className="mt-5">
              <ul className="flex flex-col gap-y-2">
                {/* <li>
                  <Image
                    src={usa}
                    alt="text with USA flag text color"
                    width={100}
                  />
                </li> */}
                <li className="flex items-center gap-x-1">
                  <FaLocationDot /> London, Vladivostok named Sergey
                </li>
                <li className="flex items-center gap-x-1">
                  <MdOutlineEmail /> sampleemail@email.com
                </li>
                <li className="flex items-center gap-x-1">
                  <MdFax />
                  +1 949494+99
                </li>
                <li className="flex items-center gap-x-1">
                  <IoCall />
                  +44 496961999
                </li>
              </ul>
            </li>
          </ul>
          <ul className="flex flex-col gap-y-2">
            <li className="mb-2 text-base font-bold">Company</li>
            {/* {usefulLinks.map((link, i) => (
              <FooterLink key={i}>{url}</FooterLink>
            ))} */}

            {/* {usefulLinks.map((link, i) => (
              <FooterLink key={i} href={link.url}>
                {link.name}
              </FooterLink>
            ))} */}

            {/* {usefulLinks.map((link, i) => (
              <FooterLink key={i} href={link.url} onClick={link.name === "Contact Us" ? openContactModal : undefined}>
                {link.name}
              </FooterLink>
            ))} */}

            {usefulLinks.map((link, i) => (
              <FooterLink
                key={i}
                href={link.name === "Contact Us" ? "#" : link.url}
                onClick={
                  link.name === "Contact Us" ? openContactModal : undefined
                }
              >
                {link.name}
              </FooterLink>
            ))}
          </ul>
          <ul className="flex flex-col gap-y-2">
            <li className="mb-2 text-base font-bold">Information technology</li>
            {/* {informationTech.map((link, i) => (
              <FooterLink key={i}>{link}</FooterLink>
            ))} */}

            {informationTech.map((link, i) => (
              <FooterLink key={i} href={link.url}>
                {link.name}
              </FooterLink>
            ))}
          </ul>
          <ul className="flex flex-col gap-y-2">
            <li className="mb-2 text-base font-bold">Civil Engineering</li>
            {/* {civilEng.map((link, i) => (
              <FooterLink key={i}>{link}</FooterLink>
            ))} */}

            {civilEng.map((link, i) => (
              <FooterLink key={i} href={link.url}>
                {link.name}
              </FooterLink>
            ))}
          </ul>
        </div>

        <div className="flex justify-between gap-x-5">
          <div className="flex items-center gap-x-4">
            {/* <Switch /> */}
            <Subscribe />
          </div>

          <div className="flex flex-col items-end">
            <div className="relative flex items-center">
              <div className="mr-2">
                <BackToTop />
              </div>
            </div>
            {/* Other items like payment logos */}
            <div className="flex items-center gap-x-4">
              <Image src={bitcoin} alt="bitcoin logo" width={60} />
              <Image src={payoneer} alt="Payoneer logo" width={50} />
              <Image src={master} alt="Master card logo" width={40} />
              <Image src={paypl} alt="Paypal logo" width={50} />
              <Image src={sbi} alt="SBI logo" width={50} />
            </div>
          </div>
        </div>
      </section>
      <section className="mb-3 flex items-center justify-between">
        <ul className="flex items-center gap-x-2">
          <p className="text-sm text-[#000000B2]">FOLLOW US</p>
          <SocialLink link="">
            <FaFacebookF />
          </SocialLink>
          <SocialLink link="">
            <FaYoutube />
          </SocialLink>
          <SocialLink link="">
            <IoLogoTiktok />
          </SocialLink>
          <SocialLink link="">
            <BsTwitterX />
          </SocialLink>
        </ul>
        <p className="text-sm text-[#000000B2]">
         { "© 2024 Truzz Online. All rights reserved."}
        </p>
      </section>
      {/* Contact Us Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative h-[580px] w-full max-w-2xl rounded-lg bg-[#F2EDE4] shadow-lg">
            <ContactForm />
            <button
              onClick={closeContactModal}
              className="absolute right-4 top-4 text-xl text-black hover:text-gray-600"
            >
              x
            </button>
          </div>
        </div>
      )}
      {/* Chatbot Floating Button */}
      <div className="fixed bottom-4 right-4 z-100 p-10">
        {/* Chatbot Icon */}
        <div className="relative">
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
            width={60}
            className="h-20 w-20 cursor-pointer rounded-full transition-transform hover:scale-105 hover:animate-chatbot-talk hover:shadow-lg"
          />
          {/* Chat Bubble on Hover */}
          <div className="absolute -top-14 left-[-30px] rounded-md bg-blue-500 px-4 py-2 text-sm text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
            {/* Hello! How can I help you? */}
          </div>
        </div>

        {/* Small Modal */}
        {isSmallModalOpen && (
          <div className="z-70 fixed bottom-20 right-6 w-[570px] rounded-xl bg-[#ECEEF1] pb-4">
            <button
              onClick={closeSmallModal}
              className="absolute right-6 top-4 text-5xl text-black hover:text-gray-600"
            >
              x
            </button>
            <div className="mb-4 flex items-center gap-4 rounded-t-lg bg-[#FFB200F2] p-10">
              <Image
                src={livechaticon}
                alt="Live chat icon"
                width={200}
                className="mr-4"
              />
              <h2 className="text-lg font-semibold">
                Hello, <br /> Welcome to our live chat! <br />If you need to talk to us, you can get a quick
               response through the &quot;Live Chat&quot; feature. It is fast and secure, and the team is available 24/7.
              </h2>
            </div>
            <div className="flex items-center justify-center gap-4 p-8">
              {["Orders", "Payment", "Withdraw", "Report", "Advice"].map(
                (option) => (
                  <button
                    key={option}
                    onClick={openChatModal}
                    className="rounded bg-blue-500 px-4 py-2 text-center text-white"
                  >
                    {option}
                  </button>
                ),
              )}
            </div>

            <div className="relative mx-auto flex items-center justify-center gap-1 px-8 py-10">
              <input
                type="text"
                placeholder="Send a Message"
                className="w-full rounded-lg border-[#B9B9B9] bg-white px-10 py-2 text-black outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
              <FaFileUpload className="text-meta-5 absolute left-10 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl" />
              <IoIosSend className="absolute right-10 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl" />
            </div>
          </div>
        )}

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
  );
}
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
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff] text-xl"
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
    "O'zbek",
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
    <form>
      <select
        ref={selectRef}
        value={selectedLanguage}
        onChange={handleSelectChange}
        className="mr-4 rounded-lg border border-black px-3 py-2"
        style={{ width: "auto", minWidth: "150px" }} // Allow dynamic resizing while maintaining a min width
      >
        {languages.map((language, index) => (
          <option value={language} key={index}>
            {language}
          </option>
        ))}
      </select>

      <input
        type="email"
        className="rounded-l-full px-6 py-3 text-sm font-semibold"
        placeholder="Enter your email"
        required
        aria-label="Email address"
      />
      <Link href="/subscribe">
        <button className="rounded-r-full bg-[#0000FF] px-6 py-3 text-sm font-semibold text-white">
          Subscribe
        </button>
      </Link>
    </form>
  );
};

// ==========================
// interface UpdateConversation {
//   show: boolean;
//   onClose: () => void;
// }
// const UpdateConversation = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
//   const [isShowChats, setIsShowChats] = useState(false);
//   const [isCallPopUp, setICallPopUp] = useState(false);
//   const [isSettingOn, setIsSettingOn] = useState(false);
//   const [minimise, setMinimise] = useState(false);
//   return (
//     <>
//       {isOpen && (
//         <div className="fixed mt-20 max-w-52 mx-auto inset-28 z-999 flex items-center justify-center bg-black bg-opacity-90 rounded-xl">
//           <div className="">
//             {/* close */}
//             <div className="flex right-2 top-2 items-center gap-2 text-xl font-bold">

//               <span className="rounded-full bg-slate-200 p-1">
//                 <VscChromeMinimize className="cursor-pointer text-meta-5" />
//               </span>
//               <span className="rounded-full bg-slate-200 p-1">
//                 <button onClick={onClose} className="absolute top-5 z-80 -right-5 p-2 text-gray-600 hover:text-gray-900">
//                   <IoClose size={24} />
//                 </button>
//               </span>
//             </div>
//             {/* top */}
//             <div className="flex items-center bg-[#FFB200F2] p-1">
//               <div className="flex items-center gap-1 font-semibold">
//                 <div className="">
//                   <Image src="/images/user.png" height={40} width={40} className="rounded-full" alt="user" />

//                 </div>
//                 <span className="mr-4">Richard Poon</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Image
//                   onClick={() => setICallPopUp(true)}
//                   src="/images/call.png" height={20} width={20} alt="call" />
//               </div>
//             </div>
//             {/* chat */}
//             <div className="max-h-[300px] min-h-[250px] bg-[#ECEEF1] space-y-2 overflow-y-scroll px-2 py-5 text-white">
//               {Chats.map((chat, index) =>
//                 chat.role === "you" ? (
//                   <ChatLineYou key={index} chat={chat} />
//                 ) : (
//                   <ChatLineSender chat={chat} key={index} />
//                 ),
//               )}
//               {/* {Chats.map((chat, index) =>
//                   chat.role === "you" ? (
//                     <ChatLineYou key={index} chat={chat} />
//                   ) : (
//                     <ChatLineSender chat={chat} key={index} />
//                   ),
//                 )}
//                 {Chats.map((chat, index) =>
//                   chat.role === "you" ? (
//                     <ChatLineYou key={index} chat={chat} />
//                   ) : (
//                     <ChatLineSender chat={chat} key={index} />
//                   ),
//                 )} */}
//             </div>
//             {/* Bottom */}
//             <div className="flex items-center gap-1 rounded-full px-3 py-2">
//               <button><FaFileUpload className="cursor-pointer text-meta-5 text-xl" /></button>
//               {/* <Image
//                   src={uplodeImg}
//                   height={30}
//                   width={30}
//                   alt="setting"
//                   className="cursor-pointer"
//                 />
//                 <Image
//                   src={micImg}
//                   height={30}
//                   width={30}
//                   alt="setting"
//                   className="cursor-pointer"
//                 /> */}
//               <input
//                 type="text"
//                 placeholder="Enter a message"
//                 className="w-2/3 rounded-full bg-slate-500 px-2 py-1 text-white outline-none"
//               />
//               <button><IoIosSend className="cursor-pointer text-xl" /></button>
//               {/* <Image
//                   src={sendImg}
//                   height={30}
//                   width={30}
//                   alt="setting"
//                   className="cursor-pointer"
//                 /> */}
//             </div>

//             {isSettingOn && <ChatSettings />}
//           </div>
//         </div>

//       )}
//       {minimise && (
//         <div
//           onClick={() => [setICallPopUp(true), setMinimise(false)]}
//           className="fixed bottom-5 right-2 z-40 cursor-pointer"
//         >
//           <Image src={UserImg} height={70} width={70} alt="user" />
//         </div>
//       )}

//       {isCallPopUp && (
//         <CallPopUp
//           isCallPopUp={isCallPopUp}
//           setICallPopUp={setICallPopUp}
//           setMinimise={setMinimise}
//         />
//       )}

//     </>
//   );
// };

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
    setIsModalClose(true); // Open the modal when chat is closed
    // Your existing onClose logic to close the chat, etc.
    //setIsChatModalOpen(false);

    // alert(isModalClose);
    // alert(setIsChatModalOpen);
  };

  //alert(isOpen);
  //alert(!minimise);

  return (
    <>
      {/* {isOpen && !minimise && ( */}
      {isOpen && !isModalClose && (
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
              <FaFileUpload className="text-meta-5 absolute left-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl" />
              <IoIosSend className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl" />
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
          <h3>Report</h3>
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

// const CallPopUp = ({
//   isCallPopUp,
//   setICallPopUp,
//   setMinimise,
// }: {
//   isCallPopUp: boolean;
//   setICallPopUp: any;
//   setMinimise: any;
// }) => {
//   return (
//     <div className="absolute -left-125 top-5  rounded-xl bg-red-500 p-5 z-30">
//       <div className="relative flex min-h-[250px] min-w-[200px] flex-col items-center justify-between">
//         <div className="flex flex-col items-center justify-center gap-2">
//           <Image src="/images/user.png" height={60} width={60} alt="user" />
//           <h2 className="text-xl font-semibold">Richard Poon</h2>
//         </div>
//         <div className="flex items-center justify-center gap-2">
//           <Image src={micImg} height={40} width={40} alt="user" />
//           <Image src={recordImg} height={40} width={40} alt="user" />
//           <Image
//             onClick={() => setICallPopUp(false)}
//             src={endCallImg}
//             height={40}
//             width={40}
//             alt="user"
//           />
//           <Image src={speakerImg} height={40} width={40} alt="user" />
//         </div>
//         <span
//           onClick={() => [setICallPopUp(false), setMinimise(true)]}
//           className="absolute right-0 top-0 rounded-full bg-white p-2"
//         >
//           <VscChromeMinimize className="cursor-pointer text-meta-5" />
//         </span>
//       </div>
//     </div>
//   );
// };

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
            width={50}
            height={50}
          />
        </button>
      )}
    </div>
  );
};
