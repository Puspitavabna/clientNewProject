import { env } from "../../../../config/env";
import { cookies } from "next/headers";

interface VerifyTokenParams {
  email?: string;
  otp?: string;
}

interface ResponseFormat {
  isSuccessfull: boolean;
  userData: {} | null;
  message: string;
  error?: any;
}
export async function verifyToken({
  email,
  otp,
}: VerifyTokenParams): Promise<ResponseFormat> {
  // Example server-side verification logic:
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/user/verify-otp-and-sign-up`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      },
    );
    const result = await response.json();

    if (!response.ok) {
      console.log("OTP result", response);
      return {
        isSuccessfull: false,
        userData: {},
        message: result.message,
      };
    }

    return {
      isSuccessfull: true,
      userData: result.user,
      message: "",
    };
  } catch (error: any) {
    console.error("Verification error:", error);

    return {
      isSuccessfull: false,
      userData: {},
      message: error.message,
      error: error,
    };
  }
}
