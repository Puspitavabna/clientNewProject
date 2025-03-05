"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { ForgetPasswordSuccess } from "../../types/auth";
import SubmitButton from "../components/submit-button";
import TextInput from "../components/text-input";
import { resetPassword } from "./action";
import { FormState } from "./definition";
import { forgetPasswordSchema } from "./validate";
import { useRouter } from "next/navigation";

const initialState: FormState = {
  email: [],
  message: "",
};
//cc
interface ForgotPasswordFormProps {
  onClose: () => void; // Prop to close the Forgot Password modal
  onSuccess: (data: ForgetPasswordSuccess) => void; // Prop to trigger the OTP modal
}

export default function ForgotPasswordForm({
  onClose,
  onSuccess,
}: ForgotPasswordFormProps) {
  const [state, formAction] = useFormState(resetPassword, initialState);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const router = useRouter();
  const [errors, setErrors] = useState({
    email: "",
    message: "",
  });
  ///
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) {
      setErrors({ email: "Email is required", message: "" });
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    const validateFields = forgetPasswordSchema.safeParse({
      email: formData.get("email"),
    });

    if (!validateFields.success) {
      setErrors({
        email: validateFields.error.flatten().fieldErrors.email?.[0] || "",
        message: "",
      });
      return;
    }

    setErrors({ email: "", message: "" });

    try {
      const result = await resetPassword(null, formData);

      if (result.successfull) {
        onSuccess(result as ForgetPasswordSuccess);
        localStorage.setItem("userForgotEmail", email);
        // permanentRedirect("otp" + "?" + "reset-password", RedirectType.replace);
        // router.push("/otp?reset-password");
      } else if (result && "message" in result) {
        setErrors({
          ...errors,
          message: result?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error calling resetPassword:", JSON.stringify(error));
    }
  };

  return (
    // <form action={formAction} className="w-full">
    <form
      onSubmit={handleSubmit}
      className="m-auto h-[324px] w-[435px] space-y-[26px]"
    >
      {/* {state.message && state.message?.length > 0 && (
        <p aria-live="polite" className="mb-4 text-center text-sm text-red-500">
          {state.message[0]}
        </p>
      )} */}
      {errors.message && (
        <div className="mt-2 text-red-500">{errors.message}</div>
      )}
      <div>
        <h1 className="lex mb-[20px] items-center justify-center rounded-lg p-4 text-center text-3xl font-semibold text-[#151B54]">
          Forgot Password
        </h1>
        {/* <h2 className="mb-2 p-4 rounded-lg flex items-center justify-center text-center">
          Enter your valid email address where you will receive the OTP.
        </h2> */}
        {/* <h2 className="mb-2 font-semibold">Email Address</h2> */}
        <TextInput
          label="Email"
          id="fp-email"
          name="email"
          placeholder="Enter your Email"
          type="text"
          // errors={state}
          onChange={handleEmailChange}
          className="rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}{" "}
        {/* Display email error */}
        {/* <p className="flex justify-start text-sm mt-2 text-[#B51111]">Provide your account email</p> */}
      </div>
      <div className="mt-6 flex flex-col justify-start">
        <SubmitButton
          pendingText="Resetting..."
          text="Reset"
          className="w-full"
        />
      </div>
    </form>
  );
}
