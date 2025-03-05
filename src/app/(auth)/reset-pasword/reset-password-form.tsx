"use client";
import { useState } from "react";
import TextInput from "../components/text-input";
import SubmitButton from "../components/submit-button";
import { updatePassword } from "./action";
import { resetPasswordSchema } from "./validate";
import { FormState } from "./definition";
import { toast } from "react-toastify"; // Import toast
import { useRouter } from "next/navigation";

const initialState: FormState = {
  email: [],
  password: [],
  //cpassword: [],
  //message: [],
};

interface ResetFormProps {
  token: string;
  userId: string;
  email: string;
}

const ResetForm: React.FC<ResetFormProps> = ({ token, userId, email }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [errors, setErrors] = useState({
    password: "",
    cpassword: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("password", password);
    // formData.append("cpassword", cpassword); // Include confirm password in the form data

    const validateFields = resetPasswordSchema.safeParse({
      password,
      cpassword,
    });

    // Check if validateFields is null or doesn't have the expected structure
    if (!validateFields || !validateFields.success) {
      setErrors({
        password:
          validateFields?.error?.flatten().fieldErrors.password?.[0] || "",
        cpassword:
          validateFields?.error?.flatten().fieldErrors.cpassword?.[0] || "",
        message: "There was an error with validation.",
      });
      return;
    }

    // Clear client-side errors if validation succeeds
    setErrors({ password: "", cpassword: "", message: "" });

    const email = localStorage.getItem("userForgotEmail") || "";

    const response = await updatePassword({ email, newPassword: password });
    console.log("s", response);
    if (response.successful) {
      //alert ("Changed");
      toast.success(
        <div>
          <h1 className="text-center font-bold text-white">Successful!</h1>
          <h3 className="text-center text-white">
            You have successfully changed the password and now you are ready to
            go.
          </h3>
        </div>,
        {
          style: {
            backgroundColor: "#4CAF50", // Green background
            color: "white", // White text
            padding: "10px", // Padding
            borderRadius: "8px", // Rounded corners
            fontSize: "16px", // Font size
          },
          autoClose: 5000, // Auto close in 5 seconds
        },
      );
      localStorage.removeItem("userForgotEmail");

      router.push("/sign-in");
    } else {
      setErrors((prev) => ({
        ...prev,
        message: "Failed to update the password. Please try again.",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {errors.message && (
        <div className="mt-2 text-red-500">{errors.message}</div>
      )}

      <div className="flex flex-col gap-y-0">
        <h1 className="mt-4 items-center justify-center text-center font-semibold">
          Enter new password..!
        </h1>
        <h2 className="mt-4 whitespace-nowrap text-center">
          Please enter a password for your security.
        </h2>
        <div className="mt-10 flex flex-col gap-y-2">
          <label className="mb-2 block rounded text-black" htmlFor="password">
            New Password
          </label>
          <TextInput
            label=""
            id="otp-password-id"
            name="password"
            type="password"
            placeholder="Enter the New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // errors={errors.password}
          />
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password}</span>
        )}{" "}
        {/* Display password error */}
        <div className="mt-6 flex flex-col gap-y-2">
          <label className="mb-2 block rounded text-black" htmlFor="cpassword">
            Confirm Password
          </label>
          <TextInput
            label=""
            id="change-password-id"
            name="cpassword"
            type="password"
            placeholder="Enter the Confirm Password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
            // error={errors.cpassword}
          />
        </div>
        {errors.cpassword && (
          <span className="text-red-500">{errors.cpassword}</span>
        )}{" "}
        {/* Display confirm password error */}
        {/* <h2 className="text-center mt-4 whitespace-nowrap">Password should be at least 8 characters long.</h2>
        <h2 className="text-center">You can use password {"\@#%8="} to increase account security.</h2> */}
      </div>

      <div className="mt-6 flex flex-col justify-start">
        <SubmitButton
          pendingText="Continue..."
          text="Continue"
          className="w-full"
        />
      </div>
    </form>
  );
};
export default ResetForm;
