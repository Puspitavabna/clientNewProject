"use client"; // Enable client-side rendering

import Cookies from "js-cookie";
import Image from "next/image";
import React, { useState } from "react";
import { BsReceipt } from "react-icons/bs";
import { useAPPContext } from "../../app/context/AppContextType";
import OrderForm from "./OrderForm";
import { FaArrowRight } from "react-icons/fa";
import orderIcon from "@/public/icons/orderIcon.png"
import closeIcon from "@/public/Close-Square.png";


interface OrderNowButtonProps {
  className?: string;
  orderid?: string;
}

const OrderNowButton: React.FC<OrderNowButtonProps> = ({
  className,
  orderid,
}) => {
  // State to control modal visibility
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { userId, userName, currency } = useAPPContext();

  const fetchUserInfo = () => {
    const userIdFromCookies = Cookies.get("userId");
    const userNameFromCookies = Cookies.get("name");
    const currencyFromCookies = Cookies.get("currency");

    return {
      userId: userIdFromCookies || null,
      userName: userNameFromCookies || null,
      currency: currencyFromCookies || null,
    };
  };

  const isLoggedIn = (): boolean => {
    const { userId } = fetchUserInfo();
    return !!userId;
  };

  const token = Cookies.get('token');

  // const handleButtonClick = (): void => {
  //   const { userName: fetchedUserName, currency: fetchedCurrency } =
  //     fetchUserInfo();

  //   if (isLoggedIn()) {
  //     if (!fetchedUserName || !fetchedCurrency) {
  //       setIsProfileModalOpen(true);
  //     } else {
  //       setShowModal(true); // Open modal if logged in
  //     }
  //   } else {
  //     setIsRegisterModalOpen(true);
  //   }
  // };

  const handleButtonClick = (): void => {
    if (!isLoggedIn()) return
    setShowModal(true); // Open modal if logged in

  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  return (
    <>
      {/* Order Now Button */}
      <button
        onClick={handleButtonClick}
        className={`text-lg mx-auto mt-3 flex w-fit items-center gap-x-2 rounded-md bg-[#E6EDFC] px-4 py-3 font-semibold uppercase  ${className}`}
      >
        <Image src={orderIcon} alt="order" />
        <span> Order Now</span>
        <FaArrowRight />
      </button>

      {/* Modal for Order Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative h-auto max-h-full w-auto max-w-4xl overflow-y-auto rounded-lg bg-white p-5 shadow-lg scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-black">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
            <Image src={closeIcon} alt="close" width={30} height={30}/>
            </button>

            {/* Order Form Component */}
            <OrderForm orderid={orderid} />
            {/* <ExportForm orderid={orderid}/>
             <VisaForm orderid={orderid}/> */}
            {/* <TravelingForm orderid={orderid}/> */}
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center rounded bg-white p-6 text-center shadow-lg">
            <Image src="/icons/warn.png" height={50} width={50} alt="" />
            <h2 className="mt-2">Unacceptable?</h2>
            <p className="mt-2">Please sign in and try again.</p>

            <div className="mt-4 flex gap-x-2">
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="mt-4 rounded-md bg-[#151B54] px-8 py-2 font-semibold text-white"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center rounded bg-[#ffffff] p-6 text-center shadow-lg">
            <Image src="/icons/warn.png" height={50} width={50} alt="" />
            <h2 className="mt-2">Profile not updated?</h2>
            <p className="mt-2">
              Please try again by selecting your <br /> name and a currency in
              your <br /> profile.
            </p>

            <div className="mt-4 flex gap-x-2">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="mt-4 bg-[#151B54] px-8 py-2 text-white"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderNowButton;
