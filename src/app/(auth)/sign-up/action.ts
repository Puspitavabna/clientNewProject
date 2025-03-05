"use server";

// Import necessary modules
import { signUpSchema } from "./validate";
import { env } from "../../../../config/env";
import { FormState } from "./definition";
import { SignUpSuccess } from "../../types/auth";

// Type definition for FormState

export async function signup(formData: FormData): Promise<FormState> {
  // Validate input fields
  const validateFields = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    cpassword: formData.get("cpassword"),
  });

  // If validation fails, return the validation errors as FormState
  if (!validateFields.success) {
    const errors = validateFields.error.flatten().fieldErrors;
    return {
      title: "Registration message.",
      status: 400,
      successful: false,
      message: "Validation failed",
      error: JSON.stringify(errors),
    };
  }

  const { email, password } = validateFields.data;

  try {
    // Make a POST request to the server
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/user/signup`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // If the response is not OK, return an error message
    if (!res.ok) {
      const errorResponse = await res.json(); 
      return {
        title: "Registration message.",
        status: errorResponse.status,
        successful: false,
        message: errorResponse.message,
        error: errorResponse.error || "An unknown error occurred.",
      };
    }

    // Parse the successful response
    const response: SignUpSuccess = await res.json();
    return response;
  } catch (error) {
    // Handle fetch/network errors
    return {
      title: "Registration message.",
      status: 500,
      successful: false,
      message: "Failed to connect to the server. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
