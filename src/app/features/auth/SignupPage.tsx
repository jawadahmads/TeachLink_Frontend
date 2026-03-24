import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import {
  BookOpen,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Home,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupForm } from "../../schema/signUpSchema";
import { getQueryParam, setQueryParam } from "../../utils/queryParams";
import { FaGoogle } from "react-icons/fa";
import { signup } from "../../api/signup";
import { motion, AnimatePresence } from "motion/react";

export default function SignupPage() {
  const initialRole =
    getQueryParam("role") === "teacher" ? "teacher" : "student";
  const navigate = useNavigate();

  const [userType, setUserType] = useState<"student" | "teacher">(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields, isSubmitting, isValid },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      userType: initialRole,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const handleRoleChange = (newRole: "student" | "teacher") => {
    setUserType(newRole);
    setQueryParam("role", newRole);
    setValue("userType", newRole, { shouldValidate: true });
  };

  const onSubmit = async (data: SignupForm) => {
    try {
      const response = await signup(data);
      console.log(response);
      // On success, redirect to login or dashboard
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const handleGoogle = () => {
    window.location.href = "/auth/google";
  };

  const inputClass = (hasError: boolean, isTouched: boolean | undefined) => {
    if (!isTouched) return "bg-background/50 border-2 border-border/50";
    if (hasError)
      return "bg-red-500/5 border-2 border-red-500/50 focus-visible:ring-red-500/20 focus-visible:border-red-500";
    return "bg-green-500/5 border-2 border-green-500/50 focus-visible:ring-green-500/20 focus-visible:border-green-500";
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <Link
        to="/"
        className="fixed top-6 left-6 z-50 group flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-md border border-border/50 shadow-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      >
        <Home className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest">
          Home
        </span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-2xl bg-card/60 backdrop-blur-2xl rounded-[32px] overflow-hidden">
          <CardHeader className="text-center pt-10 pb-6 px-8">
            <Link
              to="/"
              className="flex items-center justify-center gap-2.5 mb-8 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                <BookOpen className="h-8 w-8 text-primary relative z-10" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
                Teach<span className="text-primary">Link</span>
              </span>
            </Link>
            <CardTitle className="text-3xl font-black tracking-tight text-foreground mb-2">
              Create Account
            </CardTitle>
            <CardDescription className="text-muted-foreground font-medium">
              Join our community of experts and learners today.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-10">
            <div className="flex p-1.5 bg-muted/50 rounded-[20px] mb-8 relative">
              <div
                className={`absolute inset-1.5 w-[calc(50%-6px)] bg-background rounded-[14px] shadow-sm transition-transform duration-500 ease-spring ${
                  userType === "teacher" ? "translate-x-full" : ""
                }`}
              />
              <button
                type="button"
                className={`relative flex-1 py-3 text-sm font-black uppercase tracking-widest transition-colors duration-300 z-10 ${
                  userType === "student"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => handleRoleChange("student")}
              >
                Student
              </button>
              <button
                type="button"
                className={`relative flex-1 py-3 text-sm font-black uppercase tracking-widest transition-colors duration-300 z-10 ${
                  userType === "teacher"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => handleRoleChange("teacher")}
              >
                Teacher
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* NAME */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                >
                  Full Name
                </Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                    className={`pl-11 h-13 rounded-2xl transition-all font-medium ${inputClass(!!errors.name, touchedFields.name)}`}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                </div>
                <AnimatePresence>
                  {errors.name && touchedFields.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-[11px] font-bold text-red-500 ml-1"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                >
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className={`pl-11 h-13 rounded-2xl transition-all font-medium ${inputClass(!!errors.email, touchedFields.email)}`}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && touchedFields.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-[11px] font-bold text-red-500 ml-1"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                >
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className={`pl-11 pr-11 h-13 rounded-2xl transition-all font-medium ${inputClass(!!errors.password, touchedFields.password)}`}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && touchedFields.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-[11px] font-bold text-red-500 ml-1"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                >
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className={`pl-11 pr-11 h-13 rounded-2xl transition-all font-medium ${inputClass(!!errors.confirmPassword, touchedFields.confirmPassword)}`}
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.confirmPassword && touchedFields.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-[11px] font-bold text-red-500 ml-1"
                    >
                      {errors.confirmPassword.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2 px-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 rounded-lg border-2 border-border/50 text-primary focus:ring-primary/20 bg-background/50 transition-all cursor-pointer"
                    {...register("terms")}
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs font-bold text-muted-foreground cursor-pointer select-none"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms
                    </a>{" "}
                    &{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy
                    </a>
                  </label>
                </div>
                <AnimatePresence>
                  {errors.terms && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-[11px] font-bold text-red-500"
                    >
                      {errors.terms.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 group mt-4"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Create My Account
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                  <span className="bg-transparent px-4">or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-14 rounded-2xl border-2 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 flex items-center justify-center gap-3 font-bold"
                onClick={handleGoogle}
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <FaGoogle className="text-[#DB4437] text-sm" />
                </div>
                Sign up with Google
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-black uppercase tracking-widest text-xs hover:underline ml-1"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex items-center justify-center gap-6"
        >
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
            <Sparkles className="h-3 w-3" />
            Expert Vetted
          </div>
          <div className="w-1 h-1 rounded-full bg-border/50" />
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
            <Lock className="h-3 w-3" />
            Bank-Level Security
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
