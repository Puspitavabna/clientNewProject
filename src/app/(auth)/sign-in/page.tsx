"use client";
import { SignUpSuccess } from "@/src/app/types/auth.d";
import { useState } from "react";
import { LoggedInSuccess } from "../../types/auth.d"; 
import ForgotPasswordForm from "../forgot-password/forgot-password-form";
import OTPModal from "../otp/otp-form";
import RegisterForm from "../sign-up/signup-form";
import LoginForm from "./login-form";
//new new
import { ForgetPasswordSuccess } from "../../types/auth.d";
interface SignInProps {
  onClose: () => void; // Function to close the entire modal
}
interface OTPModalProps {
  email: string; // Add email to the props
  onClose: () => void; // Function to close OTP modal and parent SignIn modal
}
function SignIn({ onClose }: SignInProps) {
  const [activeForm, setActiveForm] = useState<
    "login" | "register" | "forgot-password" | null
  >("register");
  const [userEmail, setUserEmail] = useState<string>(""); // Store the email

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loginData, setLoginData] = useState<LoggedInSuccess | null>(null);
  const [signupData, setSignupData] = useState<SignUpSuccess | null>(null);
  //new new
  const [forgetpasswordData, setforgetpasswordData] =
    useState<ForgetPasswordSuccess | null>(null);
  const openForgotPasswordModal = () => {
    setActiveForm("forgot-password"); // Switch directly to Forgot Password form
  };

  const handleLoginSuccess = (success: LoggedInSuccess) => {
    console.log("Noweeeeeeeeee");
    setLoginData(success);
    // setUserEmail(data.email); // Assuming `data.email` contains the email
    // Store login data like token and userId
    if (success.data.enable_2fa) {
      setShowOtpModal(true); // Open OTP modal
      setActiveForm(null); // Hide other forms
      return
    }
    setShowOtpModal(false); // Open OTP modal
    setActiveForm(null); // Hide other forms
  };
  //console.log(showOtpModal);
  //console.log(loginData);

  const closeOtpModal = () => {
    setShowOtpModal(false);
    onClose(); // Close the entire modal upon OTP completion
  };

  const handleSignUpSuccess = (data: SignUpSuccess) => {
    console.log("Noweeeeeeeeee");
    setSignupData(data);
    setUserEmail(data.email); // Assuming `data.email` contains the email
    // Store login data like token and userId

    setShowOtpModal(true); // Open OTP modal
    setActiveForm(null); // Hide other forms
  };

  const handleResetPasswordSuccess = (data: ForgetPasswordSuccess) => {
    setforgetpasswordData(data);
    setUserEmail(data.email);
    setShowOtpModal(true); // Open OTP modal
    setActiveForm(null);
  };

  const getModalDimension = () => {
    if ((activeForm === "login" || activeForm === "register"))
      return "flex w-full max-w-[500px] h-[550px] rounded-lg bg-[#FEFCFF]"

    if (activeForm === "forgot-password")
      return "flex w-full max-w-[500px] h-[275px] rounded-lg bg-[#FEFCFF]"

    if (showOtpModal)
      return "flex w-full max-w-[500px] h-[470px] rounded-lg bg-[#FEFCFF]"

  }

  const getformDimension = () => {
    if ((activeForm === "login" || activeForm === "register"))
      return "m-auto w-[435px] h-[534px]"

    if (activeForm === "forgot-password")
      return "m-auto w-[435px] h-[324px]"

    if (showOtpModal)
      return "m-auto w-[415px] h-[386px]"
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={getModalDimension()}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside it
      >
        <div className={getformDimension()}>
          {/* Conditionally render the header only for Login and Register forms */}
          {(activeForm === "login" || activeForm === "register") && (
            <header className="mb-8 rounded-full bg-[#FFFFFFCC] text-center">
              <div className="text-[#151B54] font-semibold text-3xl mb-[26px] mt-[20px]">{
                activeForm == "login" ? "Login to your account" : "Create a new account"}</div>
              <div className="flex flex-row items-center justify-around rounded-md bg-[#E9F0FF] h-[69px] mb-[35px]">
                <button
                  onClick={() => setActiveForm("login")}
                  className={`text-md w-[180px] h-[45px] rounded-md  text-center font-semibold transition-all duration-300 ${activeForm === "login"
                      ? "w-[145px] scale-110 bg-[#151B54] text-white"
                      : "bg-transparent text-black"
                    }`}
                >
                  Sign In
                </button>

                <button
                  onClick={() => setActiveForm("register")}
                  className={`text-md w-[196px] h-[49px] rounded-md  text-center font-semibold transition-all duration-300 ${activeForm === "register"
                      ? "w-[145px] scale-110 bg-[#151B54] text-white"
                      : "bg-transparent text-black"
                    }`}
                >
                  Sign Up
                </button>
              </div>
            </header>
          )}

          <main className="bg-transparent">
            {activeForm === "login" && (
              <LoginForm
                onForgotPassword={openForgotPasswordModal}
                onSuccess={handleLoginSuccess}
                setActiveForm={setActiveForm}
              />
            )}
            {activeForm === "register" && (
              <RegisterForm onRegisterSuccess={handleSignUpSuccess} />
            )}
            {activeForm === "forgot-password" && (
              <ForgotPasswordForm
                onClose={() => setActiveForm("login")}
                onSuccess={handleResetPasswordSuccess}
              />
            )}


            {showOtpModal && signupData && (
              <OTPModal
                mode="register"
                email={userEmail}
                onClose={closeOtpModal}
              />
            )}

            {showOtpModal && forgetpasswordData && (
              <OTPModal
                mode="forgotPassword"
                email={userEmail}
                onClose={closeOtpModal} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
