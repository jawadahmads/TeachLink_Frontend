import { Link } from "react-router";
import { BookOpen, Mail, Lock, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import { loginSchema } from "../schema/loginSchema";
import { setQueryParam, getQueryParam } from "../utils/queryParams";
import { useEffect, useState } from "react";
import { login } from "../api/login";

export type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  // compute initial role from query param once
  const initialRole =
    getQueryParam("role") === "teacher" ? "teacher" : "student";
  const [role, setRole] = useState<"student" | "teacher">(initialRole);
  const [token, setToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, touchedFields, isSubmitting, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      userType: initialRole, // <- ensure form starts with the correct role
      email: "",
      password: "",
      remember: false,
    },
  });

  // keep local role state and form value in sync
  useEffect(() => {
    setValue("userType", role, { shouldValidate: true, shouldDirty: true });
  }, [role, setValue]);

  const userType = watch("userType");

  const onSubmit = async (data: LoginForm) => {
    const response = await login(data);
    setToken(response.accessToken);
    console.log(response);
  };

  function testAUTH() {
    fetch("http://localhost:4002/v1/health", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Health check successful:", data);
      })
      .catch((error) => {
        console.error("Health check failed:", error);
      });
  }

  const handleGoogle = () => {
    // redirect to your OAuth endpoint; change to your backend route if different
    window.location.href = "/auth/google";
  };
  // No border when untouched, red on error, green when schema passes
  const inputClass = (hasError: boolean, isTouched: boolean) => {
    if (!isTouched) return "";
    if (hasError) return "border-red-600 focus-visible:ring-red-600";
    return "border-green-600 focus-visible:ring-green-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 flex-col">
      {/* Home icon fixed to top-left */}
      <Link
        to="/"
        aria-label="Home"
        className="fixed top-4 left-4 z-50 inline-flex items-center justify-center h-10 w-10 rounded-md bg-white border border-border shadow-sm text-primary hover:bg-primary/5 transition"
      >
        <Home className="h-5 w-5" />
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="flex items-center justify-center gap-2 mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">TeachLink</span>
          </Link>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-2 mb-6">
              {/* USER TYPonClick={testAUTH}E: update role state, form value, and query param on click */}
              <Button
                type="button"
                variant={userType === "student" ? "default" : "outline"}
                className="flex-1"
                onClick={() => {
                  setRole("student");
                  setQueryParam("role", "student");
                }}
              >
                Student
              </Button>
              <Button
                type="button"
                variant={userType === "teacher" ? "default" : "outline"}
                className="flex-1"
                onClick={() => {
                  setRole("teacher");
                  setQueryParam("role", "teacher");
                }}
              >
                Teacher
              </Button>
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`pl-10 ${inputClass(!!errors.email, !!touchedFields.email)}`}
                  aria-invalid={errors.email ? "true" : "false"}
                  autoComplete="email"
                />
              </div>
              {errors.email && !!touchedFields.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`pl-10 ${inputClass(!!errors.password, !!touchedFields.password)}`}
                  aria-invalid={errors.password ? "true" : "false"}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && !!touchedFields.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  {...register("remember")}
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {/* SUBMIT */}
            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

            {/* OR separator */}
            <div className="mt-1 flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Google OAuth */}
            <Button
              type="button"
              variant="default"
              className="w-full mt-3 flex items-center justify-center gap-3"
              onClick={testAUTH}
            >
              <FaGoogle />
              <span className="text-sm font-medium">Sign up with Google</span>
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
