import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";

async function refreshToken() {
  const res = await fetch("http://localhost:4002/v1/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // include cookies
  });

  console.log(await res.json());
}

export default function App() {
  useEffect(() => {
    refreshToken();
  }, []);
  return <RouterProvider router={router} />;
}
