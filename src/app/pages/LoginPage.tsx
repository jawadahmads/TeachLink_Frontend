import { Link, useNavigate } from "react-router";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import { loginSchema, type LoginForm } from "../schema/loginSchema";
import { setQueryParam, getQueryParam } from "../utils/queryParams";
import { login } from "../api/login";
import { useAppDispatch } from "../redux/store";
import { setStatus, setToken, setUser } from "../redux/authSlice";
import { useState } from "react";

export default function LoginPage() {
  const initialRole =
    getQueryParam("role") === "teacher" ? "teacher" : "student";

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [userType, setUserType] = useState<"student" | "teacher">(initialRole);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields, isSubmitting, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      userType: initialRole,
      email: "",
      password: "",
      remember: false,
    },
  });

  const handleRoleChange = (newRole: "student" | "teacher") => {
    setUserType(newRole);
    setQueryParam("role", newRole);
    setValue("userType", newRole);
  };

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data);

      dispatch(setToken(response.accessToken));
      dispatch(setUser(response.user));

      const dashboard = response.user.role.toLowerCase();
      navigate(`/${dashboard}/dashboard`);
    } catch (error) {
      dispatch(setStatus("unauthorized"));
    } finally {
      dispatch(setStatus("idle"));
    }
  };

  const handleGoogle = () => {
    window.location.href = "/auth/google";
  };

  const inputClass = (hasError: boolean, isTouched: boolean) => {
    if (!isTouched) return "";
    if (hasError) return "border-red-600 focus-visible:ring-red-600";
    return "border-green-600 focus-visible:ring-green-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background flex items-center justify-center px-4 flex-col">
      <Link
        to="/"
        aria-label="Home"
        className="fixed top-4 left-4 z-50 inline-flex items-center justify-center h-10 w-10 rounded-md bg-card border border-border shadow-sm text-primary hover:bg-primary/5 transition"
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
              <Button
                type="button"
                variant={userType === "student" ? "default" : "outline"}
                className="flex-1"
                onClick={() => handleRoleChange("student")}
              >
                Student
              </Button>

              <Button
                type="button"
                variant={userType === "teacher" ? "default" : "outline"}
                className="flex-1"
                onClick={() => handleRoleChange("teacher")}
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
              onClick={handleGoogle}
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
