"use client";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { customUTCFormat, customUTCTime } from "../../lib/formatISODateString";
import ModalView from "../accounting/ModalView/page";
import Card from "../components/Card";
import PaymentReceipt from "../payment-receipt/page";
import { fetchUserDashboard } from "./action";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import Image from "next/image";
import SkeletonCard from "../../components/Loader";

function OnlinePaymentPage() {
  const [showModal, setShowModal] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Handle hCaptcha verification
  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  };
  // Start Data

  const statusColors: { [key: string]: string } = {
    Pending: "bg-[#FFB200]",
    Spam: "bg-[#DE1D1D]",
    Accepted: "bg-[#00EE0A]",
  };

  const [dashboardData, setDashboardData] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaymentAccountDetailsModalOpen, setPaymentAccountDetailsModalOpen] =
    useState(false);
  const [isSuccessfulPaymentModalOpen, setSuccessfulPaymentModalOpen] =
    useState(false);

  const HCAPTCHA_SITE_KEY = "cc30dd1a-a148-4414-8f2a-548c2bc80cf2";

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const userid = Cookies.get("userId") || "";
    const token = Cookies.get("token") || "";

    try {
      const response = await fetchUserDashboard();
      setDashboardData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [size]);

  useEffect(() => {
    loadDashboardData();
  }, [page, size, sortBy, sortOrder, loadDashboardData]);

  const cardData = dashboardData
    ? [
        { title: "Total Payment", value: dashboardData.totalpayment },
        { title: "Total Pay Amount", value: dashboardData.totalpayamount },
        {
          title: "Total Pending Payment",
          value: dashboardData.totalpendingpayment,
        },
        {
          title: "Total Accepted Payment",
          value: dashboardData.totalacceptedpayment,
        },
        { title: "Total Spam Payment", value: dashboardData.totalspampayment },
      ]
    : [];

    console.log(cardData, "card Data")
    console.log(dashboardData, "dashboard for payment Data")
    
  //End data

  // const cardTitles = [
  //   "Total Payment",
  //   "Total Pay Amount",
  //   "Total Pending Payment",
  //   "Total Accepted Payment",
  //   "Total Spam Payment",
  // ];

  return (
    <section className="">
      {loading ? (
        // Show the loading image or spinner
        <SkeletonCard/>
      ) : (
        <>
          <div className="mb-3 grid grid-cols-5 gap-2">
            {/* {cardTitles.map((title, i) => (
              <Card title={title} key={i} />
            ))} */}

            {cardData.map(({ title, value }, i) => (
              <Card title={title} key={i} value={value} />
            ))}
          </div>

          <header className="mb-7 mt-3 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#231F20]">
              Payment History
            </h1>
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
                <th className="w-[8%] py-6">No.</th>
                <th className="w-[12%]">Payment ID</th>
                {/* <th className="w-[12%]">Pay Account</th> */}
                <th className="w-[12%]">
                  Account Name
                  <span className="block text-sm font-semibold text-red-600">
                    Bank/Wallet
                  </span>
                </th>
                <th className="w-[12%]">Amount</th>
                <th className="w-[12%]">Payment Day</th>
                <th className="w-[12%]">Status</th>
                <th className="w-[11%]">Action</th>
              </tr>
            </thead>
            <tbody className="border border-[#B0B0B0] text-center">
              {dashboardData?.payments?.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-4">
                    There is no available order
                  </td>
                </tr>
              ) : (
                dashboardData?.payments?.map((payment: any, index: number) => (
                  <tr
                    key={payment.id}
                    className="odd:bg-[#FAEFD8] even:bg-white"
                  >
                    <td className="border-r border-r-[#FFB200] py-6">
                      <span className="rounded bg-[#FFB200] px-2 py-1 font-semibold">
                        {index + 1}
                      </span>
                    </td>
                    <td className="border-r border-r-[#FFB200]">
                      {payment.PaymentNumber}
                    </td>
                    <td className="border-r border-r-[#FFB200]">
                      {payment.bankid.name}
                    </td>
                    <td className="border-r border-r-[#FFB200]">
                      {payment.amount} {payment.currency}
                    </td>
                    <td className="border-r border-r-[#FFB200]">
                      {customUTCFormat(payment.createdAt)} <br />
                      {customUTCTime(payment.createdAt)}
                    </td>
                    <td className="border-r border-r-[#FFB200]">
                      <button
                        onClick={() => {
                          if (["Pending"].includes(payment.status)) {
                            // Open modal for these statuses
                            setPaymentAccountDetailsModalOpen(true);
                          } else if (
                            ["Spam", "Accepted"].includes(payment.status)
                          ) {
                            // Open modal for these statuses
                            setPaymentAccountDetailsModalOpen(false);
                          }
                        }}
                        className=""
                      >
                        <span
                          className={`rounded px-4 py-1 text-white ${statusColors[payment.status]}`}
                        >
                          {payment.status}
                        </span>
                      </button>
                      {isPaymentAccountDetailsModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6">
                          {/* div label */}
                          <div className="grid grid-cols-2 gap-8 rounded-lg bg-white p-2 px-6 shadow-lg">
                            <div className="col-span-2 flex items-center justify-between">
                              <h2 className="flex-1 text-center text-2xl font-bold">
                                Payment Account Details
                              </h2>
                              <button
                                className="h-9 w-9 rounded-lg border-2 border-[#231F20] bg-white p-2 text-[#231F20]"
                                onClick={() => {
                                  setPaymentAccountDetailsModalOpen(false);
                                }}
                              >
                                &#x2715; {/* Close icon (X) */}
                              </button>
                            </div>

                            {/* div 1 */}
                            <div className="flex flex-col gap-2 text-start">
                              <div className="flex flex-col text-start">
                                <label>Account holder name</label>
                                <input
                                  className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
                                  value={payment.account_holder_name}
                                />
                              </div>
                              <div className="flex flex-col text-start">
                                <label>Account name</label>
                                <input
                                  className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
                                  value={payment.account_name}
                                />
                                <span className="py-1 text-end text-[#C90000]">
                                  Bank/wallet
                                </span>
                              </div>
                              <div className="flex flex-col text-start">
                                <label>Account number</label>
                                <input
                                  className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
                                  value={payment.account_number}
                                />
                              </div>
                              <div className="flex flex-col text-start">
                                <label>Transaction ID</label>
                                <input
                                  className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
                                  value={payment.transaction_id}
                                />
                              </div>
                              <div className="flex flex-col text-start">
                                <label>Transaction reciept</label>
                                <input className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"></input>
                                <span className="py-1 text-end text-[#C90000]">
                                  Size is below 1 MB
                                </span>
                              </div>
                              <div className="flex flex-col text-start">
                                <label>Additional information</label>
                                <textarea
                                  className="mt-1 block h-24 w-full rounded-lg border border-gray-300 bg-[#D9D9D91A] p-1"
                                  placeholder="Provide the account details from which you made payment"
                                  value={payment.additional_note}
                                />
                              </div>
                            </div>
                            {/* div 2 */}
                            <div className="">
                              <div className="col-span-2 py-4">
                                <h2 className="text-center text-xl font-bold">
                                  Payment processing
                                </h2>
                              </div>
                              <div className="space-y-2 text-left">
                                <p className="flex">
                                  <span className="w-80 font-semibold">
                                    Pay amount:
                                  </span>
                                  <span className="text-[#FFB200]">
                                    {payment.amount.toFixed(3)}
                                  </span>
                                </p>
                                <p className="flex">
                                  <span className="w-80 font-semibold">
                                    VAT({payment.bankid.tax_rate[0]}%):
                                  </span>
                                  <span className="text-[#FFB200]">
                                    {" "}
                                    {(
                                      payment.amount +
                                      (payment.amount *
                                        payment.bankid.tax_rate[0]) /
                                        100 -
                                      payment.amount
                                    ).toFixed(3)}
                                  </span>
                                </p>
                                <p className="flex">
                                  <span className="w-80 font-semibold">
                                    Total amount:
                                  </span>
                                  <span className="text-[#FFB200]">
                                    {(
                                      payment.amount +
                                      (payment.amount *
                                        payment.bankid.tax_rate[0]) /
                                        100
                                    ).toFixed(3)}
                                  </span>
                                </p>
                              </div>
                              <div className="mt-6 text-left">
                                <input
                                  type="checkbox"
                                  name="terms"
                                  className="mr-2"
                                  checked={payment.accepted_terms}
                                  //onChange={handleCheckboxChange}
                                />
                                <label className="text-sm font-medium">
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
                                    setPaymentAccountDetailsModalOpen(false);
                                    setSuccessfulPaymentModalOpen(true);
                                  }}
                                  className="w-full rounded bg-[#FFB200] py-2 font-bold text-black"
                                >
                                  Submit Payment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
                              Payment sucessful
                            </h2>
                            <p className="mt-2">
                              Thank you! Your payment is complete
                            </p>

                            <div className="mt-4 flex w-full">
                              <button
                                onClick={() => {
                                  setSuccessfulPaymentModalOpen(false); // Close the modal
                                }}
                                className="mt-4 w-full bg-[#FFB200] py-2 font-semibold text-black"
                              >
                                Done
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
                      {/* Modal for Withdrawal Details */}
                      <ModalView show={showModal} onClose={closeModal}>
                        <PaymentReceipt payment={payment} />
                      </ModalView>
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
        </>
      )}
    </section>
  );
}

export default OnlinePaymentPage;
