"use server";

import { permanentRedirect, RedirectType } from "next/navigation";
import { changePasswordSchema } from "./validate";
//import { SERVER_URL } from "@/src/app/constants/api";
import { FormState } from "./definition";
import { env } from "../../../../config/env";

export async function createNewPassword(
  prevState: any,
  formData: FormData,
): Promise<FormState> {
  const validateFields = changePasswordSchema.safeParse({
    newpassword: formData.get("newpassword"),
    currentpassword: formData.get("currentpassword"),
  });

  if (!validateFields.success) {
    return validateFields.error.flatten().fieldErrors;
  }

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/user/reset/password`, {
      method: "POST",
      body: JSON.stringify(validateFields.data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const { data } = await res.json();


    if (!data.status) {
      return {
        message: [data.message || "An unknown error occurred."],
      };
    }
  } catch (error) {
    return {
      message: ["Failed to connect to the server. Please try again later."],
    };
  }

  permanentRedirect("/change-password-success", RedirectType.replace);
}
