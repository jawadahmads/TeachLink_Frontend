import { z } from "zod";
import { useAppDispatch } from "../redux/store";
import { setStatus, setToken, setUser } from "../redux/authSlice";
import { useEffect } from "react";

export const refreshResponseSchema = z.object({
  message: z.string(),

  user: z.object({
    id: z.string(),
    email: z.string(),
    role: z.enum(["STUDENT", "TEACHER"]),
    verified: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),

  accessToken: z.string(),
  refreshExpiresAt: z.string(),
  newRefreshToken: z.string(),
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
