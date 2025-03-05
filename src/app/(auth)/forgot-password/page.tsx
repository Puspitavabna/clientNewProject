"use client";
import { useState } from "react";
// import { ForgetPasswordSuccess } from "../../types/auth.types";
import OtpModal from "../otp/otp-form"; // Assuming you have an OTP modal component
import ForgotPasswordForm from "./forgot-password-form";
import { ForgetPasswordSuccess } from "../../types/auth";

function ForgotPassword() {
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false); // Manage OTP modal visibility
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(true); // Manage Forgot Password modal visibility
  const savedEmail = localStorage.getItem("userForgotEmail");
  // Function to open OTP modal
  const handleOtpOpen = (data: ForgetPasswordSuccess) => {
    setIsOtpModalOpen(true); // Open OTP modal
  };

  // Function to close Forgot Password modal
  const handleForgotPasswordClose = () => {
    setIsForgotPasswordModalOpen(false); // Close Forgot Password modal
  };

  return (
    <>
      <header className="mb-8 text-center">
        <h1 className="mb-3 font-extrabold lg:text-2xl">Forgot Password</h1>
        <p>Enter your valid email address where you will receive an OTP.</p>
      </header>
      {/* Render the ForgotPasswordForm with props */}
      <main>
        {isForgotPasswordModalOpen && (
          <ForgotPasswordForm
            onClose={handleForgotPasswordClose} // Close the Forgot Password modal
            onSuccess={handleOtpOpen} // Trigger OTP modal upon success // Trigger OTP modal upon successpOpen={handleOtpOpen}  // Open the OTP modal
          />
        )}
      </main>
      {/* Render the OTP modal */}
      {isOtpModalOpen && (
        <OtpModal
          email={savedEmail || ""}
          onClose={() => setIsOtpModalOpen(false)}
          mode="forgotPassword"
        />
      )}
    </>
  );
}

export default ForgotPassword;
