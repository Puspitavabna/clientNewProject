import { SignUpSuccess } from "@/src/app/types/auth.d";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import OTPModal from "../otp/otp-form";
import SubmitButton from "../components/submit-button";
import TextInput from "../components/text-input";
import { signup } from "./action";
import { FormState } from "./definition";
import { signUpSchema } from "./validate";
import { useDispatch, useSelector } from "react-redux";
import loadingIcon from "../../../../public/icons/loading-bar-icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Verification from "../otp/page";

interface SignUpFormProps {
  onRegisterSuccess: (data: SignUpSuccess) => void;
}

interface SignUpProps {
  onClose: () => void;
}

export default function SignupForm({ onRegisterSuccess }: SignUpFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverMessage, setServerMessage] = useState<string>();
  const [isOtp, setIsOtp] = useState<boolean>(false);
  const savedEmail = localStorage.getItem("userEmail");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    cpassword: "",
    message: "",
  });

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.email || errors.cpassword || errors.password || errors.message) {
      setErrors({
        email: "",
        password: "",
        cpassword: "",
        message: "",
      });
    }
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formValues.password && formValues.cpassword) {
      if (formValues.password !== formValues.cpassword) {
        setErrors((prev) => ({
          ...prev,
          password: "Passwords do not match",
          cpassword: "Passwords do not match",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "", cpassword: "" }));
      }
    }
  }, [formValues.password, formValues.cpassword]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasUpperCase && hasNumber && hasSpecialChar;
  };

  const handleSignUpSuccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage("");

    // Client-side validation
    const validateFields = signUpSchema.safeParse(formValues);

    // Email Validation
    if (!formValues.email || !validateEmail(formValues.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return;
    }

    // Password Validation
    if (!validatePassword(formValues.password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      return;
    }

    if (formValues.password !== formValues.cpassword) {
      setErrors((prev) => ({
        ...prev,
        password: "Passwords do not match",
        cpassword: "Passwords do not match",
      }));
      return;
    }

    if (!validateFields.success) {
      setErrors({
        email: validateFields.error.flatten().fieldErrors.email?.[0] || "",
        password:
          validateFields.error.flatten().fieldErrors.password?.[0] || "",
        cpassword:
          validateFields.error.flatten().fieldErrors.cpassword?.[0] || "",
        message: "",
      });
      return;
    }

    // Clear errors
    setErrors({
      email: "",
      password: "",
      cpassword: "",
      message: "",
    });

    const formData = new FormData();
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    formData.append("cpassword", formValues.cpassword);

    localStorage.setItem("userEmail", formValues.email);

    setIsLoading(true);

    // Call the server-side signup function
    try {
      const result = await signup(formData);

      // Handle failure in signup
      if (result.successful === false) {
        console.log("Result in sign up with error:", result.message);
        setServerMessage(result.message);
        setIsLoading(false);
        return;
      }
      if (result && result.successful === true) {
        const successResult: SignUpSuccess = {
          ...result,
          email: formValues.email,
        };

        onRegisterSuccess(successResult);
        setIsOtp(true);
        setIsLoading(false);
        return;
      }
    } catch (error: any) {
      setServerMessage("");
      setIsLoading(false);
      alert(error.message);
      setErrors((prev) => ({
        ...prev,
        message: error.message,
      }));
    }
  };

  return (
    <div>
      {isOtp ? (
        <Verification
          email={savedEmail || formValues.email}
          onClose={() => {
            setIsOtp(false);
            router.push("/dashboard/profile");
          }}
          mode="register"
        />
      ) : (
        <form onSubmit={handleSignUpSuccess} className="w-full space-y-[26px]">
          <div className="flex flex-col gap-y-2">
            <TextInput
              label="Email"
              name="email"
              type="text"
              id="rfemail" // Unique ID for the email field
              onChange={handleChange}
            />
            {errors.email && (
              <span className="mt-1 text-red-500">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <TextInput
              label="Password"
              name="password"
              id="rfpassword"
              type="password"
              placeholder=""
              onChange={handleChange}
              required
            />
            {errors.password && (
              <span className="mt-1 text-red-500">{errors.password}</span>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <TextInput
              label="Confirm Password"
              name="cpassword"
              id="rfcpassword"
              type="password"
              placeholder="Confirm your password"
              onChange={handleChange}
              required
            />
            {errors.cpassword && (
              <span className="mt-1 text-red-500">{errors.cpassword}</span>
            )}
          </div>

          <SubmitButton
            pendingText="Signing up..."
            text="Sign Up"
            className="mt-6 w-full"
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

          {/* Display server messages or error messages */}
          {errors.message && (
            <p
              aria-live="polite"
              className="mb-4 text-center text-sm text-red-500"
            >
              {errors.message}
            </p>
          )}

          {serverMessage && (
            <p
              aria-live="polite"
              className="mb-4 text-center text-sm text-red-500"
            >
              {serverMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
