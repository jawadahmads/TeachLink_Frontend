import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { BookOpen, Mail, Lock, User, Eye, EyeOff, Home } from "lucide-react";
import { useEffect, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupForm } from "../schema/signUpSchema";
import { getQueryParam, setQueryParam } from "../utils/queryParams";
import { FaGoogle } from "react-icons/fa";
import { signup } from "../api/signup";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // compute initial role once from the URL so useForm defaultValues are correct
  const [role, setRole] = useState<string>(() => {
    return getQueryParam("role") === "teacher" ? "teacher" : "student";
  });

  // add OAuth handler
  const handleGoogle = () => {
    // redirect to your OAuth endpoint; change to your backend route if different
    window.location.href = "/auth/google";
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, touchedFields, isSubmitting, isValid },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      userType: role as "student" | "teacher",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // watch for the state of the userType field
  let userType = watch("userType");

  // keep role state and form field in sync when the URL changes
  useEffect(() => {
    const q = getQueryParam("role");
    const newRole = q === "teacher" ? "teacher" : "student";
    setRole(newRole);
  }, [location.search, role]);

  const onSubmit = async (data: SignupForm) => {
    const response = await signup(data);
    console.log(response);
  };

  // FIX: touched is boolean | undefined — coerce explicitly.
  // Green only when touched AND no error; red only when touched AND has error.
  const inputClass = (hasError: boolean, isTouched: boolean | undefined) => {
    if (!isTouched) return "";
    if (hasError) return "border-red-600 focus-visible:ring-red-600";
    return "border-green-600 focus-visible:ring-green-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-8">
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
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Join TeachLink and start your learning journey
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* USER TYPE */}
            <div className="flex gap-2 mb-6">
              <Button
                type="button"
                variant={userType === "student" ? "default" : "outline"}
                className="flex-1"
                onClick={() => {
                  // change query param on click
                  setQueryParam("role", "student");
                  setValue("userType", "student", { shouldValidate: true });
                }}
              >
                Student
              </Button>
              <Button
                type="button"
                variant={userType === "teacher" ? "default" : "outline"}
                className="flex-1"
                onClick={() => {
                  setQueryParam("role", "teacher");
                  setValue("userType", "teacher", { shouldValidate: true });
                }}
              >
                Teacher
              </Button>
            </div>

            {/* NAME */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
                  className={`pl-10 ${inputClass(!!errors.name, touchedFields.name)}`}
                  autoComplete="username"
                />
              </div>
              {errors.name && touchedFields.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className={`pl-10 ${inputClass(!!errors.email, touchedFields.email)}`}
                  autoComplete="email"
                />
              </div>
              {errors.email && touchedFields.email && (
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
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 ${inputClass(!!errors.password, touchedFields.password)}`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-2.5 inline-flex items-center justify-center h-6 w-6 text-muted-foreground hover:text-primary"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && touchedFields.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 ${inputClass(!!errors.confirmPassword, touchedFields.confirmPassword)}`}
                  autoComplete="confirm-password"
                />
                <button
                  type="button"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-2.5 inline-flex items-center justify-center h-6 w-6 text-muted-foreground hover:text-primary"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && touchedFields.confirmPassword && (
                <p className="text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* TERMS */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register("terms")}
                className="mt-1 rounded border-gray-300"
              />
              <label className="text-sm text-muted-foreground">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms.message}</p>
            )}

            {/* SUBMIT */}
            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
