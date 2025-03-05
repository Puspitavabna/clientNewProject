import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password should be a min of 8 characters" }),
    cpassword: z
      .string()
      .min(1, { message: "Confirm Password is required" })
      .min(8, { message: "Password should be a min of 8 characters" }),
  })
  .refine((data) => data.password === data.cpassword, {
    path: ["cpassword"],
    message: "Passwords do not match",
  });
