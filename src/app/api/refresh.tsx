import { z } from "zod";

const baseUser = {
  id: z.string(),
  email: z.string(),
  verified: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const teacherUser = z.object({
  ...baseUser,
  role: z.literal("TEACHER"),
  teacherId: z.string(),
  stripeId: z.string().nullable(),
});

const studentUser = z.object({
  ...baseUser,
  role: z.literal("STUDENT"),
  studentId: z.string(),
  stripeId: z.string().nullable(),
});

export const refreshResponseSchema = z.object({
  message: z.string(),
  user: z.union([teacherUser, studentUser]),
  accessToken: z.string(),
  refreshExpiresAt: z.string(),
  // optional because you only send it in development
  refreshToken: z.string(),
});

export type RefreshResponse = z.infer<typeof refreshResponseSchema>;

export async function refreshToken(): Promise<RefreshResponse> {
  const res = await fetch("http://localhost:4002/v1/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const json = await res.json();
  console.log(json);
  return refreshResponseSchema.parse(json); // ✅ runtime validation + type inference
}
