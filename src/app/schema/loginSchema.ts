import { z } from "zod";

export const loginSchema = z.object({
  userType: z.enum(["student", "teacher"]),
  email: z.string().email("Invalid email address"),
  password: z.string({
    message: "Password is required",
  }),

  remember: z.boolean().default(false),
});

export type LoginForm = z.infer<typeof loginSchema>;
