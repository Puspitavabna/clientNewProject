import { forgetPasswordSchema } from "./validate";
import { FormState } from "./definition";
import { ForgetPasswordSuccess } from "../../types/auth";
import { env } from "../../../../config/env";

//export async function updatePassword(
export async function resetPassword(
  prevState: any,
  formData: FormData,
): Promise<FormState | ForgetPasswordSuccess> {
  const validateFields = forgetPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validateFields.success) {
    return validateFields.error.flatten().fieldErrors;
  }

  try {
    //const res = await fetch(`${SERVER_URL}/user/forgot/password`, {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/user/reset-password/forgot-password`,
      {
        method: "POST",
        body: JSON.stringify(validateFields.data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );

    const data = await res.json();

    if (!data.ok) {
      return {
        successfull: true,
        message: data.message || "An unknown error occured",
      };
    }

    return {
      email: validateFields.data.email,
      message: "Password reset link sent to your email.",
      successfull: true,
    };
  } catch (error) {
    console.log("Error", error);
    return {
      message: "Failed to connect to the server. Please try again later.",
      error: error,
    };
  }
}