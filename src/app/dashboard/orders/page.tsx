"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
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
import chatPhone from "../../../../public/chat-phone.png";
import Card from "../components/Card";
import ProjectDetailsPage from "../project-detail/page";
import { fetchPaymentMethod, fetchUserDashboard } from "./action";
import Modal from "./Modal/page";
import feedback from "/public/images/feedback.png";
import endCallImg from "/public/images/fendCallImg.png";
import micImg from "/public/images/fmicImg.png";
import speakerImg from "/public/images/fspeakerImg.png";
import SkeletonCard from "../../components/Loader";

interface BankData {
  _id: string;
  name: string;
  qrcode: string;
  type: string;
  account_info: { account_number: string }[];
  routing: string;
  logo: string;
  tax_rate: number[];
  qrImage: any;
}
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

// function Page() {
const Page: React.FC<{ banks: BankData[] }> = () => {
  //const [data, setData] = useState<any>();
  const [payAmount, setPayAmount] = useState<number>(); // User-input pay amount
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isPaymentAccountDetailsModalOpen, setPaymentAccountDetailsModalOpen] =
    useState(false);
  const HCAPTCHA_SITE_KEY = "cc30dd1a-a148-4414-8f2a-548c2bc80cf2";
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSuccessfulPaymentModalOpen, setSuccessfulPaymentModalOpen] =
    useState(false);

  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setFailureModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const statusColors: { [key: string]: string } = {
    pending: "bg-[#FFB200]",
    payment: "bg-[#9F7924]",
    waiting: "bg-[#FF3D00]",
    working: "bg-[#2A56EB]",
    complete: "bg-[#00CB20]",
    delivery: "bg-[#001A72]",
    cancel: "bg-[#DE1D1D]",
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

  // Handle form input changes for payment
  const [formData, setFormData] = useState({
    userid: "",
    paymentmethod: "",
  });

  const [paymentAmount, setPaymentAmount] = useState("");

  const handlePaymentAmoundChange = (e: any) => {
    const value = e.target.value;
    const amount = value.replace(/[^0-9.]/g, ""); // Removes non-numeric characters except for the decimal point
    setPaymentAmount(amount); // Updates only the numeric part
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleImageSize = () => {
    setIsOpen(!isOpen);
  };

  // Handle hCaptcha verification
  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  };

  //End handle Payment

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // const [selectedBank, setSelectedBank] = useState<{ name: string; qrcode: string }>({ name: "", qrcode: "" });
  const [selectedBank, setSelectedBank] = useState<SelectedBank>({
    name: "",
    qrcode: "",
    type: "",
    account_number: "",
    routing: "",
    logo: "",
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBankId = event.target.value;
    const selectedBank = banks.find((bank) => bank._id === selectedBankId);
    if (selectedBank) {
      setSelectedBank({
        name: selectedBank.name,
        qrcode: selectedBank.qrcode,
        type: selectedBank.type,
        account_number: selectedBank.account_info[0].account_number,
        routing: selectedBank.routing,
        logo: selectedBank.logo,
        tax_rate: selectedBank.tax_rate[0],
        qrImage: selectedBank.qrImage,
      });
    } else {
      setSelectedBank({ name: "", qrcode: "" });
    }
  };

  const [dashboardData, setDashboardData] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);

    const userid = Cookies.get("userId") || "";
    const token = Cookies.get("token") || "";
    try {
      const response = await fetchUserDashboard({
        status: true,
        viewperpage: size,
        userid: userid,
        token: token,
      });
      console.log(response);
      setDashboardData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [page, size, sortBy, sortOrder]);

  // start Bank Data
  const [banks, setBanks] = useState<BankData[]>([]); //useState<any>();

  const loadData = async () => {
    try {
      const res = await fetchPaymentMethod();
      setBanks(res as unknown as BankData[]); // Cast the response to the correct type
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPaymentModalOpen) {
      loadData();
    }
  }, [isPaymentModalOpen]);

  //End bank Data

  const cardData = dashboardData
    ? [
        { title: "Total Orders", value: dashboardData.totalorders },
        {
          title: "Total Pending Orders",
          value: dashboardData.totalpendingorders,
        },
        {
          title: "Total Payment Orders",
          value: dashboardData.totalpaymentorders,
        },
        {
          title: "Total Waiting Orders",
          value: dashboardData.totalwaitingorders,
        },
        {
          title: "Total Working Orders",
          value: dashboardData.totalworkingorders,
        },
        {
          title: "Total Complete Orders",
          value: dashboardData.totalcompleteorders,
        },
        {
          title: "Total Delivery Orders",
          value: dashboardData.totaldeliveryorders,
        },
        {
          title: "Total Cancel Orders",
          value: dashboardData.totalcancelorders,
        },
        {
          title: "Total project amount",
          value: dashboardData.totalprojectamount,
        },
        { title: "Total paid amount", value: dashboardData.totalpaidamount },
        { title: "Total  Left Amount", value: dashboardData.totalleftamount },
      ]
    : [];
    console.log(cardData, "bank data for order")
  return (
    <section>
      {loading ? (
        <SkeletonCard/>
      ) : (
        // Render content after loading is complete
        <>
          <div className="mb-3 grid grid-cols-6 gap-1">
            {cardData.map(({ title, value }, i) => (
              <Card title={title} key={i} value={value} />
            ))}
          </div>
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
            <tbody className="border border-[#B0B0B0] text-center">
              {dashboardData?.orders?.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-4">
                    There is no available order
                  </td>
                </tr>
              ) : (
                dashboardData?.orders?.map((order: any, index: number) => (
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
                    <td className="border-r border-r-[#B0B0B0]">
                      {order.leftAmount ? `${order.leftAmount}` : "0"}{" "}
                      {order.pay_currency}
                    </td>
                    <td className="border-r border-r-[#B0B0B0]">
                      <button
                        onClick={() => setIsChatModalOpen(true)}
                        className="m-2 flex items-center gap-2 rounded bg-[#151B54] px-2 py-2 text-sm font-semibold text-white"
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
                          const status = order.status.toLowerCase()
                          // Check if the status allows opening the modal
                          if (["delivery", "dancel"].includes(status)) {
                            // Open modal for these statuses
                            setPaymentModalOpen(false);
                          } else if (
                            [
                              "pending",
                              "payment",
                              "waiting",
                              "working",
                              "completed",
                            ].includes(status)
                          ) {
                            // Open modal for these statuses
                            setPaymentModalOpen(true);
                          }
                        }}
                        className="uppercase text-black"
                      >
                        <span
                          className={`flex justify-center rounded px-4 py-1 uppercase text-black ${statusColors[order.status.toLowerCase()]}`}
                        >
                          {order.status}
                        </span>
                      </button>
                      {/* Payment Modal */}

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
                                    <option disabled>
                                      No payment methods available
                                    </option>
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
                                  value={
                                    paymentAmount
                                      ? `${paymentAmount} ${order.pay_currency}`
                                      : order.pay_currency
                                  }
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
                                  <span className="w-80 font-semibold">
                                    Bank
                                  </span>
                                  <span className="text-[#151B54]">
                                    {" "}
                                    {selectedBank.name ? selectedBank.name : ""}
                                  </span>
                                </p>
                                <p className="mb-3 flex">
                                  <span className="w-80 font-semibold">
                                    Account name
                                  </span>
                                  <span className="text-[#151B54]">
                                    {" "}
                                    {selectedBank.type ? selectedBank.type : ""}
                                  </span>
                                </p>
                                <p className="mb-3 flex">
                                  <span className="w-80 font-semibold">
                                    Account
                                  </span>
                                  <span className="text-[#151B54]">
                                    {selectedBank.account_number
                                      ? selectedBank.account_number
                                      : ""}
                                  </span>
                                </p>
                                <p className="flex">
                                  <span className="w-80 font-semibold">
                                    Routing
                                  </span>
                                  <span className="text-[#151B54]">
                                    {selectedBank.routing
                                      ? selectedBank.routing
                                      : ""}
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
                                        (Number(paymentAmount) *
                                          (selectedBank.tax_rate || 0)) /
                                          100 -
                                        Number(paymentAmount)
                                      ).toFixed(3)}{" "}
                                      {order.pay_currency}
                                    </span>
                                  </p>
                                  <p className="mb-3 flex">
                                    <span className="w-32 font-semibold text-gray-500">
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

                      {isPaymentAccountDetailsModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6">
                          {/* div label */}
                          <div className="grid grid-cols-2 gap-8 rounded-lg bg-[#E9F0FF] shadow-lg">
                            <div className="col-span-2 flex items-center justify-between rounded-t-lg bg-[#151B54] p-4">
                              <h2 className="flex-1 text-center text-2xl font-bold text-white">
                                Payment Account Details
                              </h2>
                              <button
                                className="h-9 w-9 rounded-lg border-2 border-[#ffffff] p-2 text-[#ffffff]"
                                onClick={() => {
                                  setPaymentAccountDetailsModalOpen(false);
                                }}
                              >
                                &#x2715; {/* Close icon (X) */}
                              </button>
                            </div>

                            {/* div 1 */}
                            <div className="flex flex-col gap-2 px-6 py-2 text-start">
                              <div className="flex flex-col text-start">
                                <label>Account holder name</label>
                                <input className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#ffffff] p-1"></input>
                              </div>
                              <div className="flex flex-col text-start">
                                <label>Account name</label>
                                <input className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#ffffff] p-1"></input>
                                <span className="py-1 text-end text-[#C90000]">
                                  Bank/wallet
                                </span>
                              </div>
                              <div className="flex flex-col text-start">
                                <label>Account number</label>
                                <input className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#ffffff] p-1"></input>
                              </div>
                              <div className="flex flex-col text-start">
                                <label>Transaction ID</label>
                                <input className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#ffffff] p-1"></input>
                              </div>
                              <div className="flex flex-col text-start">
                                <label>Transaction reciept</label>
                                <input className="mt-1 block h-8 w-full rounded-lg border border-gray-300 bg-[#ffffff] p-1"></input>
                                <span className="py-1 text-end text-[#C90000]">
                                  Size is below 1 MB
                                </span>
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
                                  Payment processing
                                </h2>
                              </div>
                              <div className="space-y-2 text-left">
                                <p className="flex">
                                  <span className="w-80 font-semibold text-gray-500">
                                    Pay amount:
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
                                    setPaymentAccountDetailsModalOpen(false);
                                    setSuccessfulPaymentModalOpen(true);
                                  }}
                                  className="w-full rounded bg-[#151B54] py-2 font-bold text-white"
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
                                className="mt-4 w-full bg-[#151B54] py-2 font-semibold text-white"
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
                        className="rounded bg-[#151B54] px-3 py-2 text-sm font-semibold uppercase text-white"
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
};

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
    //setIsModalClose(true);  // Open the modal when chat is closed
    setIsChatModalOpen(false);
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
              height={200}
              width={200}
              alt="user"
              className="mx-auto"
            />
            <h2 className="mt-2 text-xl font-bold">Did we help you?</h2>
            <h1 className="mt-4 text-xl font-bold">Your Feedback Matters</h1>
            <h3 className="mt-2">
              Have you benefited from the
              <span className="block"> services you received from us?</span>
            </h3>
            <div className="flex gap-6 p-4 mt-4">
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
      <div style={{ width: "auto", maxWidth: "80%" }}>
        <button className="text-s rounded-bl-[101px] rounded-br-[5px] rounded-tl-[101px] rounded-tr-[95px] bg-[#E9F0FF] px-3 py-1 text-[#000000]">
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
