"use client";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Image from "next/image";
import React, { useState } from "react";
import NextModal from "./NextModal/page";

const DepositModal: React.FC = () => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isWithdrawSuccess, setIsWithdrawSuccess] = useState(false);

  // const [currentPage, setCurrentPage] = useState<'deposithistory' | 'withdrawhistory'>('deposithistory');
  const [modalType, setModalType] = useState<
    "deposithistory" | "withdrawhistory" | "deposit" | "withdraw" | null
  >(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isWalletChecked, setIsWalletChecked] = useState<boolean>(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsWalletChecked(e.target.checked);
  };

  // Show modal on button click
  const handleWithdraw = () => {
    setShowModal(true);
  };

  // Close modal function
  const closeModal = () => {
    setShowModal(false);
  };
  const handlePaymentSuccess = () => {
    setIsPaymentSuccess(true);
  };

  // const openModalWithPage = (page: 'deposithistory' | 'withdrawhistory' | 'deposit' | 'withdraw') => {
  //   setModalType(page);
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  //   setModalType(null);
  // };

  const HCAPTCHA_SITE_KEY = "cc30dd1a-a148-4414-8f2a-548c2bc80cf2";

  // Handle hCaptcha verification
  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  };

  // const handleWithdraw = () => {
  //   if (isCaptchaVerified) {
  //     setIsWithdrawSuccess(true);
  //   } else {
  //     alert('Please complete the CAPTCHA verification!');
  //   }
  // };

  return (
    <div className="mb-4 mt-4 flex max-h-fit max-w-[80vw] flex-col items-start">
      <nav className="-mt-6 flex w-full items-center justify-center gap-20 px-6 py-4 text-black shadow-lg">
        <select className="rounded-full border border-blue-500 bg-white px-2 py-1 text-black">
          <option value="account" disabled>
            Payment Method
          </option>
          <option value="sbi">SBI Bank</option>
          <option value="uk">UK Bank</option>
          <option value="venmo">Venmo</option>
          <option value="paypal">Paypal</option>
        </select>
        <h1>Pay Amount $</h1>
        <input
          type="number"
          placeholder="Enter amount"
          className="w-30 rounded-full border border-blue-500 px-2 py-1"
        />
      </nav>

      <div className="mt-2 w-full rounded-b-lg bg-white p-5">
        <div className="flex justify-between">
          <Image
            src="/icons/image 7103.png"
            alt="bank"
            width={270}
            height={150}
          />
          <div className="font-semibold">
            <p>Bank: Payoneer</p>
            <p>Account Name: parsonal</p>
            <p>Account: 49494949449</p>
            <p>Routing: SD46649646</p>
          </div>
          <Image
            src="/icons/image 7104.png"
            alt="bank"
            width={140}
            height={130}
          />
        </div>

        <div className="mt-6 flex justify-between">
          {/* Withdraw Processing Section */}
          <div className="flex-1 rounded-lg border border-blue-300 bg-blue-50 p-4">
            {/* <h2 className="text-lg text-center font-semibold mb-4">Withdrawal Processing</h2> */}
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span>Pay amount:</span>
                <span>500 USD</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (2%):</span>
                <span>10 USD </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Amount:</span>
                <span>510 USD</span>
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-end">
            <button
              type="button"
              onClick={handleWithdraw}
              className="rounded bg-blue-500 px-16 py-2 font-bold text-white hover:bg-blue-600"
            >
              Next
            </button>
          </div>
          {/* Modal component */}
          <NextModal show={showModal} onClose={closeModal}>
            <div className="w-full">
              {/* Navbar */}
              <nav className="-mt-6 flex w-full items-center justify-center px-6 py-4 text-black shadow-lg">
                <h3 className="text-md flex justify-center text-center font-semibold">
                  Enter Your Payment Account Details
                </h3>
              </nav>

              <div className="mt-2 w-full rounded-b-lg bg-white p-5">
                <div className="flex justify-between gap-4">
                  <form className="flex-1 pr-4">
                    <div className="mb-2">
                      <label className="mb-1 block">Account Holder Name</label>
                      <input
                        type="text"
                        className="w-full rounded border px-3 py-2"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="mb-1 block">Account Name/Type</label>
                      <input
                        type="text"
                        className="w-full rounded border px-3 py-2"
                        placeholder="Enter your account name/type"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="mb-1 block">Account Number/Type</label>
                      <input
                        type="text"
                        className="w-full rounded border px-3 py-2"
                        placeholder="Enter your account number"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="mb-1 block">Transaction ID</label>
                      <input
                        type="text"
                        className="w-full rounded border px-3 py-2"
                        placeholder="Enter your Transaction ID"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="mb-1 block">Transaction receipt</label>
                      <input
                        type="text"
                        className="w-full rounded border px-3 py-2"
                        placeholder="Enter Transaction Receipt"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="mb-1 block">
                        Any Additional Information
                      </label>
                      <textarea
                        className="w-full rounded border px-3 py-2"
                        placeholder="Enter any additional information"
                      ></textarea>
                    </div>
                  </form>

                  {/* Withdraw Processing Section */}
                  <div className="flex-1 rounded-lg border border-blue-300 bg-blue-50 p-4">
                    <h2 className="mb-4 text-center text-lg font-semibold">
                      Payment Processing
                    </h2>
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between">
                        <span>Pay amount:</span>
                        <span>500 USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VAT (2%):</span>
                        <span>10 USD</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total Amount:</span>
                        <span>510 USD</span>
                      </div>
                    </div>
                    <div className="my-4 flex flex-1 items-center">
                      <input type="checkbox" className="form-checkbox mr-2" />
                      <span className="text-md">
                        I agree with the terms & conditions
                      </span>
                    </div>
                    <div className="my-4">
                      {/* Add HCaptcha */}
                      <div className="my-8">
                        <HCaptcha
                          sitekey={HCAPTCHA_SITE_KEY}
                          onVerify={handleCaptchaChange}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={handlePaymentSuccess} // Trigger the success modal
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      >
                        Submit Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NextModal>
        </div>
      </div>
      {/* Payment Success Modal */}
      {isPaymentSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-lg bg-white p-8 text-center">
            <div className="mb-4 text-2xl font-bold text-green-600">
              <span>✔</span> Payment Successful
            </div>
            <p className="mb-6 text-lg">Thank you! Your payment is complete.</p>
            <button
              className="rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600"
              onClick={() => setIsPaymentSuccess(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositModal;
