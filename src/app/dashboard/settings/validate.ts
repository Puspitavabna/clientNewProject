import { z } from "zod";
export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password should be a min of 8 characters" }),
    newpassword: z
      .string()
      .min(1, { message: "New Password is required" })
      .min(8, { message: "Password should be a min of 8 characters" }),
      cnewpassword: z
      .string()
      .min(1, { message: "Confirm New Password is required" })
      .min(8, { message: "Password should be a min of 8 characters" }),
  })
  .refine((data) => data.newpassword === data.cnewpassword, {
    path: ["cpassword"],
    message: "Passwords do not match",
  });

  export const deleteAccountSchema = z.object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
  });
  
