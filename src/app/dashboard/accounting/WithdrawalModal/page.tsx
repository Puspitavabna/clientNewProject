"use client"
import React, { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Modal from '../Modal/page';
import WithdrawalHistoryPage from '../../refund-payment/page';

const WithdrawModal: React.FC = () => {
  const [isWalletChecked, setIsWalletChecked] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isWithdrawSuccess, setIsWithdrawSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [currentPage, setCurrentPage] = useState<'deposithistory' | 'withdrawhistory'>('deposithistory');
  const [modalType, setModalType] = useState<'deposithistory' | 'withdrawhistory' | 'deposit' | 'withdraw' | null>(null);

  const openModalWithPage = (page: 'deposithistory' | 'withdrawhistory' | 'deposit' | 'withdraw') => {
      setModalType(page);
      setShowModal(true);
  };
  
  const closeModal = () => {
      setShowModal(false);
      setModalType(null);
  };

  const HCAPTCHA_SITE_KEY = 'cc30dd1a-a148-4414-8f2a-548c2bc80cf2';

  const handleCheckboxChange = () => {
    setIsWalletChecked(!isWalletChecked);
  };

  // Handle hCaptcha verification
  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  };

  const handleWithdraw = () => {
    if (isCaptchaVerified) {
      setIsWithdrawSuccess(true);
    } else {
      alert('Please complete the CAPTCHA verification!');
    }
  };

  return (
    <div className="h-full overflow-y-hidden over flex flex-col items-center justify-center min-h-screen">
      {isWithdrawSuccess ? (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg w-[90%] max-w-md">
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <svg
                className="h-8 w-8 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 15.172l-3.828-3.829L4 13.515 10 19.5 20.293 9.207l-1.415-1.414z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              Withdrawal Request Successful
            </h2>
            <p className="text-center text-gray-700 mb-4">
              Your withdrawal request has been confirmed. You can track its progress on the Withdrawal History page.
            </p>
            
            <button
              type="button"
              onClick={() =>{
                openModalWithPage('deposithistory')
                setIsWithdrawSuccess(false)}}
             // Resets the state to allow new requests
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Go to Withdrawal History
            </button>
           
          </div>
        </div>
      ) : (
        <>
          {/* Navbar */}
          <nav className="w-full shadow-lg -mt-6 text-black px-6 py-4 flex justify-between items-center">
            <h3 className="text-md">Current Balance: 523.64 $</h3>
            <select className="rounded-full border border-blue-500 px-2 py-1 bg-white text-black">
              <option value="account" disabled>Withdrawal Account</option>
              <option value="paypal">Paypal</option>
              <option value="isb">ISB Bank</option>
            </select>
            <h1>Withdrawal Amount $</h1>
            <input
              type="number"
              placeholder="Enter amount"
              className="border rounded-full border-blue-500 px-2 py-1 w-30"
            />
          </nav>

          <div className="bg-white w-full p-5 rounded-b-lg mt-2">
            <h2 className="text-lg font-semibold text-center mb-4">Enter the information to get your payment Withdrawal</h2>

            <div className="mb-2 flex justify-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isWalletChecked}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-green-500"
                />
                <span>Do you want to withdraw money to the wallet?</span>
              </label>
            </div>

            <div className="flex justify-between">
              <form className="w-[60%] pr-4">
                <div className="mb-2">
                  <label className="block mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-2">
                  <label className="block mb-1">Account Number</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter your account number"
                  />
                </div>

                {isWalletChecked && (
                  <>
                    <div className="mb-2">
                      <label className="block mb-1">Routing Number</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter routing number"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block mb-1">IBAN or SWIFT/BIC Code</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter IBAN or SWIFT/BIC Code"
                      />
                    </div>
                  </>
                )}

                <div className="mb-2">
                  <label className="block mb-1">Any Additional Information</label>
                  <textarea
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter any additional information"
                  ></textarea>
                </div>
              </form>

              {/* Withdraw Processing Section */}
              <div className="w-[40%] bg-blue-50 p-4 rounded-lg border border-blue-300">
                <h2 className="text-lg text-center font-semibold mb-4">Withdrawal Processing</h2>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span>Withdrawal amount:</span>
                    <span>1500 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (0%):</span>
                    <span>0.00 USD </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total Amount:</span>
                    <span>1500 USD</span>
                  </div>
                </div>
                <div className="my-4 flex items-center">
                  <input type="checkbox" className="form-checkbox mr-2" />
                  <span>I agree with the terms and conditions</span>
                </div>
                <div className="my-4">
                  <HCaptcha
                    sitekey={HCAPTCHA_SITE_KEY}
                    onVerify={handleCaptchaChange}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleWithdraw}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Confirm Withdrawal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
       <Modal show={showModal} onClose={closeModal} size={'large'}>
                    <WithdrawalHistoryPage />
                    </Modal>
    </div>
    
  );
};

export default WithdrawModal;
