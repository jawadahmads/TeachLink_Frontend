import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, Link } from "react-router";
import {
  User as UserIcon,
  Mail,
  Calendar,
  BookOpen,
  Camera,
  Save,
  X,
  CheckCircle,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  Settings,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { useAppSelector } from "../redux/store";
import { currentStudent } from "../data/mockData";
import { motion, AnimatePresence } from "motion/react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function StudentProfile() {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState(currentStudent);

  const isOwnProfile = user?.id === id || !id; // Assume own profile if no id provided

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    reset,
    setValue,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: isOwnProfile ? user?.name || studentData.name : studentData.name,
      email: isOwnProfile
        ? user?.email || studentData.email
        : studentData.email,
    },
  });

  useEffect(() => {
    if (isOwnProfile && user) {
      setValue("name", user.name || studentData.name);
      setValue("email", user.email || studentData.email);
    }
  }, [user, isOwnProfile, studentData, setValue]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!isOwnProfile) return;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStudentData({ ...studentData, ...data });
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const inputClass = (hasError: boolean, isTouched: boolean | undefined) => {
    if (!isTouched) return "bg-background/50 border-2 border-border/50";
    if (hasError)
      return "bg-red-500/5 border-2 border-red-500/50 focus-visible:ring-red-500/20 focus-visible:border-red-500";
    return "bg-green-500/5 border-2 border-green-500/50 focus-visible:ring-green-500/20 focus-visible:border-green-500";
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-12">
        {/* Navigation / Header */}
        <div className="flex items-center justify-between mb-12">
          <Link
            to="/student/dashboard"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-md border border-border/50 shadow-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">
              Dashboard
            </span>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Profile Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <Card className="border-none shadow-2xl bg-card/60 backdrop-blur-2xl rounded-[32px] overflow-hidden">
              <CardContent className="pt-10 pb-8 px-6 text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110" />
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl relative z-10">
                    <AvatarImage
                      src={studentData.avatar}
                      alt={studentData.name}
                    />
                    <AvatarFallback className="text-3xl font-black bg-muted text-primary">
                      {studentData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isOwnProfile && (
                    <button className="absolute bottom-1 right-1 z-20 h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border-2 border-background hover:scale-110 transition-transform">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <h2 className="text-2xl font-black tracking-tight text-foreground mb-1">
                  {studentData.name}
                </h2>
                <p className="text-sm font-medium text-muted-foreground mb-6">
                  {studentData.email}
                </p>

                <div className="flex flex-col gap-2 px-4">
                  <Badge className="w-full justify-center py-2 rounded-xl bg-primary/10 text-primary border-none font-black text-[10px] uppercase tracking-widest">
                    <ShieldCheck className="h-3 w-3 mr-2" />
                    Student Account
                  </Badge>
                  <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">
                    <Calendar className="h-3.5 w-3.5" />
                    Joined{" "}
                    {new Date(studentData.joinedDate).toLocaleDateString(
                      undefined,
                      { month: "long", year: "numeric" },
                    )}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 pt-8 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-2xl font-black text-primary">
                      {studentData.totalSessions}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Sessions
                    </p>
                  </div>
                  <div className="text-center border-l border-border/50">
                    <p className="text-2xl font-black text-primary">
                      {studentData.favoriteSubjects.length}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Interests
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-card/60 backdrop-blur-2xl rounded-[32px] overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Learning Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {studentData.favoriteSubjects.map((subject, index) => (
                    <Badge
                      key={index}
                      className="bg-background/50 hover:bg-primary/10 text-foreground border-border/50 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      {subject}
                    </Badge>
                  ))}
                  {isOwnProfile && (
                    <button className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                      <span className="text-lg font-bold">+</span>
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 space-y-6"
          >
            <Card className="border-none shadow-2xl bg-card/60 backdrop-blur-2xl rounded-[32px] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pt-10 px-8 pb-6">
                <div>
                  <CardTitle className="text-2xl font-black tracking-tight text-foreground mb-1">
                    Personal Details
                  </CardTitle>
                  <CardDescription className="text-sm font-medium">
                    {isOwnProfile
                      ? "Keep your identity and contact info updated."
                      : "Overview of this student's profile."}
                  </CardDescription>
                </div>
                {isOwnProfile && !isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="rounded-xl border-2 font-black text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-all"
                  >
                    Edit Profile
                  </Button>
                )}
              </CardHeader>
              <CardContent className="px-8 pb-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* NAME */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                      >
                        Full Name
                      </Label>
                      <div className="relative group">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="name"
                          {...register("name")}
                          disabled={!isEditing}
                          className={`pl-11 h-13 rounded-2xl transition-all font-medium ${inputClass(!!errors.name, touchedFields.name)}`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
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
                          {...register("email")}
                          disabled={!isEditing}
                          className={`pl-11 h-13 rounded-2xl transition-all font-medium ${inputClass(!!errors.email, touchedFields.email)}`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-[11px] font-bold text-red-500 ml-1"
                          >
                            {errors.email.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Academic Level */}
                  <div className="pt-6 border-t border-border/50">
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Academic Level
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        className="p-5 rounded-2xl border-2 border-primary bg-primary/5 flex items-center justify-between group transition-all"
                      >
                        <div className="text-left">
                          <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">
                            Undergraduate
                          </p>
                          <p className="text-[10px] font-medium text-muted-foreground">
                            Currently pursuing degree
                          </p>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      </button>

                      <button
                        type="button"
                        className="p-5 rounded-2xl border-2 border-border/50 bg-background/50 flex items-center justify-between group hover:border-primary/30 transition-all"
                      >
                        <div className="text-left">
                          <p className="text-sm font-black text-muted-foreground group-hover:text-primary transition-colors">
                            Postgraduate
                          </p>
                          <p className="text-[10px] font-medium text-muted-foreground/60">
                            Advanced studies
                          </p>
                        </div>
                        <div className="h-6 w-6 rounded-full border-2 border-border group-hover:border-primary/30 transition-colors" />
                      </button>
                    </div>
                  </div>

                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-end gap-3 pt-6"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleCancel}
                        className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Discard
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl px-8 h-12 bg-primary font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          />
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Update Profile
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Additional Sections could go here - e.g. Learning Stats */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-none shadow-xl bg-card/60 backdrop-blur-2xl rounded-[32px] overflow-hidden group hover:scale-[1.02] transition-transform">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <TrendingUp className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Learning Streak
                    </p>
                    <p className="text-2xl font-black text-foreground">
                      12 Days
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-card/60 backdrop-blur-2xl rounded-[32px] overflow-hidden group hover:scale-[1.02] transition-transform">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Global Rank
                    </p>
                    <p className="text-2xl font-black text-foreground">
                      Top 5%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
