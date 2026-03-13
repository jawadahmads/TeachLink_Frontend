import { z } from "zod";

export const loginSchema = z.object({
  userType: z.enum(["student", "teacher"]),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().default(false),
});

export type LoginForm = z.infer<typeof loginSchema>;
