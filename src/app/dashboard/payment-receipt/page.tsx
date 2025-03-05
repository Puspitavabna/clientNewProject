"use client";
import Image from "next/image";
import { useState } from "react";
import { formatDate3 } from "../../lib/formatDate";

// type IPaymentReceipt = {
//   back_url: string;
// };

const PaymentReceipt = (payment: any) => {
  //Image
  const [isImageVisible, setIsImageVisible] = useState(true);
  // Function to handle closing the modal (hiding the image)
  const closeImageModal = () => {
    setIsImageVisible(false);
  };
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-black md:min-h-[60vh]">
      <div className="relative rounded bg-white px-4 pt-5">
        <div className="grid grid-cols-2">
          <h3 className="text-left text-2xl font-semibold text-blue-600">
            Payment Reception
          </h3>
          <div className="flex items-start justify-center font-semibold text-[#FFB200]">
            <div className="text-left">
              <p>Payment ID: {payment?.PaymentNumber}</p>
              <p>Payment Date: {formatDate3(payment?.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white">
          <p className="items-start text-left font-semibold">
            Dear, {payment?.userid?.name}
          </p>
          <p className="mb-4 items-start text-left font-semibold">
            You have paid <span className="font-bold">{payment?.amount}</span>{" "}
            {payment?.currency} to {payment?.bankid?.name}.{" "}
            <span className="text-[#5296D6]">
              Your payment status is {payment?.status}
            </span>
          </p>

          <div className="grid grid-cols-7 gap-5">
            <div className="col-span-4 flex-1">
              <table className="w-full table-auto text-left">
                <tbody className="text-left">
                  <tr className="text-left">
                    <td>Payment method</td>
                    <td>:</td>
                    <td>{payment?.bankid?.name}</td>
                  </tr>
                  <tr>
                    <td>Account Holder Name</td>
                    <td>:</td>
                    <td>{payment?.account_holder_name}</td>
                  </tr>
                  <tr>
                    <td>Account Name</td>
                    <td>:</td>
                    <td>{payment?.account_name}</td>
                  </tr>
                  <tr>
                    <td>Account Number</td>
                    <td>:</td>
                    <td>{payment?.account_number}</td>
                  </tr>
                  <tr>
                    <td>Transaction ID</td>
                    <td>:</td>
                    <td>{payment?.transaction_id}</td>
                  </tr>
                  <tr>
                    <td>Transaction Receipt</td>
                    <td>:</td>
                    <td>{payment?.transaction_receipt ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td>Any Additional information</td>
                    <td>:</td>
                    <td>{payment?.additional_note}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {isImageVisible && (
              <div className="relative col-span-3 flex flex-1 items-center justify-center">
                {/* <div className="bg-red overflow-hidden relative h-32"> */}
                <Image
                  src="/images/image 12130.png"
                  alt="spam"
                  className="rounded-lg border-8 border-[#FFB200]"
                  width={300}
                  height={33}
                />
                <button
                  className="absolute -right-3 -top-1 flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white text-sm font-bold text-gray-400 shadow-md hover:text-gray-600"
                  onClick={closeImageModal}
                >
                  &times;
                </button>
                {/* </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
