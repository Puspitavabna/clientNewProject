"use client";
import Link from "next/link";
import { useState } from "react";
import { SignUpSuccess } from "../../types/auth.d";
import OTPModal from "../otp/otp-form";
import RegisterForm from "./signup-form";

interface SignUpProps {
  onClose: () => void;
}

function SignUp1({ onClose }: SignUpProps) {
  const [active, setActive] = useState<"login" | "register" | null>("register");

  const [isOtpModalOpen, setOtpModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  //Added new sa
  //const [activeForm, setActiveForm] = useState<'login' | 'register' | 'forgot-password'>('login');

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loginData, setLoginData] = useState<SignUpSuccess | null>(null);

  const handleSignUpSuccess = (sucess: SignUpSuccess) => {
    // setLoginData(sucess.data);
    // setUserEmail(sucess.email);
    // setUserPassword(sucess.password)
    // Store login data like token and userId
    setShowOtpModal(true); // Open OTP modal
    setActive(null); // Hide other forms
  };

  const closeOtpModal = () => {
    setShowOtpModal(false);
    onClose(); // Close the entire modal upon OTP completion
  };

  // const handleCloseOtpModal = () => {
  //   setOtpModalOpen(false);
  // };

  const handleResendOtp = () => {
    // Add logic to resend OTP if needed
    console.log("Resending OTP...");
  };

  return (
    <>
      <header className="mb-10 flex flex-col items-center space-y-6 text-center">
        {/* Header Text */}
        <h1 className="text-lg font-semibold text-gray-800 lg:text-xl">
          Welcome to our Website!
        </h1>

        {/* Button Container */}
        <div className="flex w-full max-w-[400px] justify-center gap-4 rounded-full px-4 py-3">
          {/* Login Button */}
          <button
            onClick={() => setActive("login")}
            className={`w-full max-w-[150px] rounded-full py-2 text-sm font-semibold text-white transition-transform duration-300 ${
              active === "login"
                ? "scale-105 bg-teal-500 shadow-md hover:bg-teal-600"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            <Link href="/sign-in" className="block w-full">
              Login
            </Link>
          </button>

          {/* Register Button */}
          <button
            onClick={() => setActive("register")}
            className={`w-full max-w-[150px] rounded-full py-2 text-sm font-semibold text-white transition-transform duration-300 ${
              active === "register"
                ? "scale-105 bg-cyan-500 shadow-md hover:bg-cyan-600"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            <Link href="/sign-up" className="block w-full">
              Register
            </Link>
          </button>
        </div>
      </header>

      <main>
        {active === "register" && (
          <RegisterForm onRegisterSuccess={handleSignUpSuccess} />
        )}
        {/* {showOtpModal && loginData && (
          <OTPModal
          password={userPassword}
            email={userEmail}
            onClose={closeOtpModal}
          />
        )} */}
      </main>

      {/* {showOtpModal && (
        <OTPModal
        password={userPassword}
          email={userEmail}
          onClose={closeOtpModal}
          mode="register"
        />
      )} */}
    </>
  );
}

export default SignUp1;
