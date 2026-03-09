import z from "zod";

export const signupSchema = z
  .object({
    userType: z.enum(["student", "teacher"]),

    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name too long")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters"),

    email: z.string().email("Invalid email address").toLowerCase().trim(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100)
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain one special character"),

    confirmPassword: z.string(),

    terms: z.boolean().refine((v) => v === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupForm = z.infer<typeof signupSchema>;
