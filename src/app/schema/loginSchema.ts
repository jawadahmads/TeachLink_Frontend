import { z } from "zod";

export const loginSchema = z.object({
  userType: z.enum(["student", "teacher"]),
  email: z.email({ pattern: z.regexes.html5Email }),
  password: z.string({
    message: "Password is required",
  }),

  remember: z.boolean().default(false),
});
