import { RouterProvider } from "react-router";
import { router } from "./routes";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { AutoRefresh } from "./hooks/autoRefrest";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import LoadingScreen from "./components/ui/LoadingScreen";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <Toaster richColors />
        <AutoRefresh>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <motion.div
                key="router"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background text-foreground"
              >
                <RouterProvider router={router} />
              </motion.div>
            )}
          </AnimatePresence>
        </AutoRefresh>
        <Analytics />
      </ThemeProvider>
    </Provider>
  );
}
