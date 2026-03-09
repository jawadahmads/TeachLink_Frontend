import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import { store, useAppDispatch, useAppSelector } from "./redux/store";
import { Provider } from "react-redux";
import { setStatus, setToken, setUser } from "./redux/authSlice";
import { z } from "zod";

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

async function refreshToken(): Promise<RefreshResponse> {
  const res = await fetch("http://localhost:4002/v1/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const json = await res.json();
  console.log(json);
  return refreshResponseSchema.parse(json); // ✅ runtime validation + type inference
}

function AutoRefresh() {
  const dispatch = useAppDispatch();

  const callForRefreshToken = async () => {
    try {
      const response = await refreshToken(); // TypeScript knows its type
      dispatch(setToken(response.accessToken));
      dispatch(setUser(response.user));
    } catch (error) {
      console.error("Refresh failed:", error);
      dispatch(setStatus("failed"));
    } finally {
      dispatch(setStatus("idle"));
    }
  };

  useEffect(() => {
    callForRefreshToken();
  }, []);
  return <></>;
}

export default function App() {
  return (
    <Provider store={store}>
      <AutoRefresh />
      <RouterProvider router={router} />
    </Provider>
  );
}
