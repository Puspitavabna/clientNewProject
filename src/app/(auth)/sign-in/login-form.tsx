"use client";

import { useFormState } from "react-dom";
import { LoggedInSuccess } from "../../types/auth.d";
import SubmitButton from "../components/submit-button";
import TextInput from "../components/text-input";
import { signIn } from "./action";
import { FormState } from "./definition";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadingIcon from "../../../../public/icons/loading-bar-icon.svg";
import Image from "next/image";
import { loginSchema } from "./validate";
import { authenticateUser } from "../../store/slices/authSlice";
import Cookies from "js-cookie";

const initialState: FormState = {
  email: [],
  password: [],
  message: [],
};

interface LoginFormProps {
  onForgotPassword: () => void;
  onSuccess: (data: LoggedInSuccess) => void;
  setActiveForm: React.Dispatch<
    React.SetStateAction<"login" | "register" | "forgot-password" | null>
  >;
}

export default function LoginForm({
  onForgotPassword,
  onSuccess,
  setActiveForm,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverMessage, setServerMessage] = useState<string>();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    message: "",
  });

  const userAuth = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // Email change handler
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Password change handler
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Email validation regex pattern
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Password validation checks (example: min 6 characters)
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  // Handle login success
  const handleLoginSuccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: "", password: "", message: "" });

    // Client-side validation
    let valid = true;
    if (!isValidEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email." }));
      valid = false;
    }
    if (!isValidPassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters.",
      }));
      valid = false;
    }

    if (!valid) return;

    // Client-side validation passed, now process the form
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      // Server-side login call
      const result = await signIn(null, formData);
      console.log(result);
      if (result) {
        if ("data" in result && result.data?.enable_2fa) {
          onSuccess(result);
        } else if ("data" in result && result.data) {
          setIsLoading(false);
          Cookies.set("token", result?.data?.token || "");
          Cookies.set("userId", result?.data?.userUID);
          dispatch(authenticateUser(result.data));
          onSuccess(result);
          router.push("/dashboard/profile");
        } else if ("message" in result) {
          const error = JSON.parse(JSON.stringify(result)).message[0];
          setIsLoading(false);
          setErrors({ ...errors, message: error });
        }
      } else {
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(`Login error: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLoginSuccess} className="space-y-[26px]">
      {errors.message && (
        <div className="mt-2 text-red-500">{errors.message}</div>
      )}
      <div className="mb-6 flex flex-col gap-y-2">
        <TextInput
          label="Email"
          name="email"
          id="loginemailId"
          placeholder="Enter your Email"
          onChange={handleEmailChange}
          type="text"
          className="rounded-full bg-white text-gray-700"
        />
        {errors.email && (
          <span className="mt-1 pl-4 text-red-500">{errors.email}</span>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <TextInput
          label="Password"
          name="password"
          type="password"
          id="loginpasswordId"
          onChange={handlePasswordChange}
          placeholder="Enter your Password"
          className="rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.password && (
          <span className="mt-1 pl-4 text-red-500">{errors.password}</span>
        )}
      </div>
      <div className="mt-3 flex justify-between text-sm">
        <div className="flex gap-x-1">
          <input type="checkbox" id="recall" />
          <label htmlFor="recall" className="text-sm font-light text-[#151B54]">
            Remember Me
          </label>
        </div>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm font-light text-[#151B54]"
        >
          Forgot Password?
        </button>
      </div>
      <div className="mt-6 flex flex-col justify-start">
        <SubmitButton
          pendingText="Signing in"
          text="Sign In"
          className="w-full"
        />
        <div className="mt-4 text-center text-base">
          <p onClick={() => setActiveForm("register")}>
            Don&apos;t have an account?{" "}
            <span className="cursor-pointer text-[#2A56EB]">Sign Up</span>
          </p>
        </div>
        {isLoading && (
          <div className="flex w-full place-items-center justify-center">
            <Image
              alt="loader"
              src={loadingIcon}
              className="h-[80px] w-[80px] animate-spin-circle"
            />
          </div>
        )}
      </div>
    </form>
  );
}
