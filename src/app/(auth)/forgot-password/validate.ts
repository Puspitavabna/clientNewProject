import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please input your email" })
    .email({ message: "Invalid Email" }),
});
