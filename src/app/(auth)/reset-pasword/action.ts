"use server";

import { env } from "../../../../config/env";

interface updatePasswordParams {
  newPassword: string;
  email: string;
}

export async function updatePassword({
  newPassword,
  email,
}: updatePasswordParams): Promise<any> {
  try {
    // Make a server-side request or check your database for OTP validation
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/user/reset-password/new-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      },
    );
    console.log("before");
    if (!response.ok) {
      throw new Error(
        `Failed to verify OTP: ${response.status} - ${response.statusText}`,
      );
    }

    console.log("solved");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Verification error:", error);
    return false;
  }
}
