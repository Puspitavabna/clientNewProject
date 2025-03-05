import { z } from "zod";

export const changePasswordSchema = z.object({
  currentpassword: z
    .string()
    .min(1, { message: "Please input your previous password" }),
  newpassword: z.string().min(1, { message: "Please input a new password" }),
});
