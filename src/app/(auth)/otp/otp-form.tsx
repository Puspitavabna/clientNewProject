"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SubmitButton from "../components/submit-button";
import { verifyToken } from "./action";
import { env } from "../../../../config/env";
import ResetPasswordLoginForm from "../reset-pasword/reset-password-form";
import { authenticateUser } from "../../store/slices/authSlice";
import loadingIcon from "../../../../public/icons/loading-bar-icon.svg";
import Image from "next/image";
// actions/authActions.ts
import { bindActionCreators } from "@reduxjs/toolkit";
import { store } from "./../../store/store";

// Bind actions
export const authActions = bindActionCreators(
  {
    authenticateUser,
  },
  store.dispatch,
);

const OTP_LENGTH = 6;
export interface OTPModalProps {
  email: string;
  mode: "register" | "forgotPassword";
  onClose?: () => void;
}

export default function Page({ email, mode, onClose }: OTPModalProps) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(120);
  const [timer, setTimer] = useState(120);
  const [currentModal, setCurrentModal] = useState<"otp" | "resetPassword">(
    "otp",
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [serverMessage, setServerMessage] = useState<string>();
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timer <= 0) return;
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalId); // Clear interval when timer reaches 0
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [timer]);

  // Timer logic for Resend countdown
  useEffect(() => {
    if (resendTimer <= 0) return; // Stop if resend timer reaches 0
    const intervalId = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalId); // Clear interval when resend timer reaches 0
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [resendTimer]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(OTP_LENGTH).fill(null),
  );

  const focusNextInput = (idx: number) => {
    if (idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1]?.focus();
      setTimeout(() => {
        inputRefs.current[idx + 1]?.setSelectionRange(1, 1);
      }, 0);
    }
  };

  const focusPrevInput = (idx: number) => {
    if (idx > 0) {
      inputRefs.current[idx - 1]?.focus();
      setTimeout(() => {
        inputRefs.current[idx - 1]?.setSelectionRange(1, 1);
      }, 0);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e.key === "ArrowRight") focusNextInput(idx);
    if (e.key === "ArrowLeft") focusPrevInput(idx);
    if (e.key === "Backspace" && !(e.target as HTMLInputElement).value)
      focusPrevInput(idx);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const value = e.target.value;
    if (isNaN(+value)) return;

    // Update the otp state array values
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[idx] = value;
      return newOtp;
    });

    // Focus on next input
    value.trim() && focusNextInput(idx);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const value = e.clipboardData.getData("text");
    if (isNaN(+value)) return;

    const updatedValue = value.split("").slice(0, OTP_LENGTH);
    setOtp(updatedValue);
    inputRefs.current.forEach((input) => input?.blur());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setServerMessage("");
    const otpCode = otp.join("");
    try {
      const forgotEmail = localStorage.getItem("userForgotEmail") || "";
      const safeemail = email || forgotEmail || "";
      console.log("in verify toekn handle submit", safeemail, otpCode);
      const otpResponse = await verifyToken({
        email: safeemail,
        otp: otpCode,
      });
      if (otpResponse.isSuccessfull) {
        localStorage.removeItem("userEmail");
        localStorage.setItem("userOTP", otpCode);

        if (mode === "forgotPassword") {
          setCurrentModal("resetPassword");
        } else {
          onClose?.(); // Close the modal
          const userData = otpResponse?.userData;
          if (userData) {
            authActions?.authenticateUser(userData);
            router.push("/dashboard/profile");
            return;
          }

          alert("something went wrong try again.");
        }
      } else {
        setIsLoading(false);
        setServerMessage(otpResponse.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      setServerMessage(`Error occurred ${error.message}`);
    }
  };

  // Function to handle OTP resend
  const handleResendOtp = async () => {
    if (isResending) return;
    setIsResending(true);
    setIsLoading(true);
    setServerMessage("");
    const forgotEmail = localStorage.getItem("userForgotEmail") || "";
    const safeemail = email || forgotEmail || "";
    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/user/resend-otp`,
        {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: safeemail }),
        },
      );

      if (response.ok) {
        setIsLoading(false);
        setServerMessage("OTP has been resent!");
        setResendTimer(120);
      } else {
        setIsLoading(false);
        const res = await response.json();

        setServerMessage(res.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      setServerMessage(error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {currentModal === "otp" ? (
        <form onSubmit={handleSubmit}>
          <header className="space-y-[26px]">
            <h1 className="items-center justify-center text-center text-3xl font-semibold text-[#151B54]">
              Enter Verification Code
            </h1>
            <div className="m-auto w-[372px] text-center">
              <h2 className="whitespace-nowrap text-center text-base font-normal">
                We have sent you a 6 digit verification code
              </h2>
            </div>
            <h3 className="mt-4 text-center font-semibold">to {email}</h3>
          </header>
          <main>
            <div className="mx-auto mt-8 flex w-fit gap-x-4">
              {otp.map((input: string, idx: number) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  value={input}
                  maxLength={1}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={(e) => handlePaste(e)}
                  className={`h-[50px] w-[58px] rounded-xl border border-transparent ${
                    input ? "bg-[#A9B7E5]" : "bg-[#2F2F2F33]"
                  } text-center text-4xl font-extrabold text-[#151B54] focus:border-[#A9B7E5] focus:bg-[#A9B7E5] focus:outline-none`}
                />
              ))}
            </div>
            <h3 className="mt-[26px] text-center text-sm font-normal">
              {formatTime(timer)}
            </h3>
          </main>
          <footer className="mt-4 text-center">
            <h1 className="text-center text-lg font-light">
              Didn&apos;t receive code?{" "}
              <button
                onClick={handleResendOtp}
                disabled={resendTimer > 0 || isResending}
                className="font-bold"
              >
                {resendTimer > 0
                  ? `Resend in ${formatTime(resendTimer)}`
                  : "Resend Again"}
              </button>
            </h1>

            <div className="mt-6 flex flex-col justify-start">
              <SubmitButton
                pendingText="Verifying..."
                text="Verify"
                className="w-full"
              />
              {isLoading && (
                <div className="flex w-full place-items-center justify-center">
                  <Image
                    alt="loader"
                    src={loadingIcon}
                    className="h-[80px] w-[80px] animate-spin-circle"
                  />
                </div>
              )}
              {serverMessage && (
                <p
                  aria-live="polite"
                  className="mt-2 text-center text-sm text-red-500"
                >
                  {serverMessage}
                </p>
              )}
            </div>
          </footer>

          {/* <div className="mt-10 flex justify-end">
            <SubmitButton pendingText="Verifying..." text="Verify" />
          </div> */}
        </form>
      ) : (
        <ResetPasswordLoginForm token={""} userId={""} email={""} />
      )}
    </>
  );
}
