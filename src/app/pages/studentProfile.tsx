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
  ShieldCheck,
  TrendingUp,
  Edit,
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
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { userInfo as fetchUserInfo } from "../api/userInfo";
import { updateProfile } from "../api/updateProfile";
import { subjects } from "../data/mockData";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  academicLevel: z.string().min(1, "Please select an academic level"),
  favoriteSubjects: z.array(z.string()).min(1, "Select at least one interest"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function StudentProfile() {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isOwnProfile =
    !id || user?.studentId === id || user?.role === "student";

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const selectedLevel = watch("academicLevel");
  const selectedSubjects = watch("favoriteSubjects") || [];

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserInfo();
        if (data) {
          setProfileData(data);
          setValue("name", data.name || user?.name || "");
          setValue("email", data.email || user?.email || "");
          setValue("academicLevel", data.academicLevel || "Undergraduate");
          setValue("favoriteSubjects", data.favoriteSubjects || []);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOwnProfile) {
      loadData();
    }
  }, [isOwnProfile, user, setValue]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!isOwnProfile) return;
    try {
      await updateProfile(data);
      setProfileData({ ...profileData, ...data });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      // Error is handled in updateProfile toast
    }
  };

  const handleLevelSelect = (level: string) => {
    if (isEditing) {
      setValue("academicLevel", level);
    }
  };

  const addSubject = (subject: string) => {
    if (!selectedSubjects.includes(subject)) {
      setValue("favoriteSubjects", [...selectedSubjects, subject]);
    }
  };

  const removeSubject = (subject: string) => {
    setValue(
      "favoriteSubjects",
      selectedSubjects.filter((s) => s !== subject),
    );
  };

  const handleCancel = () => {
    reset({
      name: profileData?.name || user?.name || "",
      email: profileData?.email || user?.email || "",
      academicLevel: profileData?.academicLevel || "Undergraduate",
      favoriteSubjects: profileData?.favoriteSubjects || [],
    });
    setIsEditing(false);
  };

  const inputClass = (hasError: boolean, isTouched: boolean | undefined) => {
    if (!isTouched) return "bg-background/50 border-2 border-border/50";
    if (hasError)
      return "bg-red-500/5 border-2 border-red-500/50 focus-visible:ring-red-500/20 focus-visible:border-red-500";
    return "bg-green-500/5 border-2 border-green-500/50 focus-visible:ring-green-500/20 focus-visible:border-green-500";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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

          {isOwnProfile && !isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="rounded-full px-6 bg-primary font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                        src={profileData?.avatar || user?.avatar}
                        alt={profileData?.name || user?.name}
                      />
                      <AvatarFallback className="text-3xl font-black bg-muted text-primary">
                        {(profileData?.name || user?.name || "U").charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isOwnProfile && (
                      <button
                        type="button"
                        className="absolute bottom-1 right-1 z-20 h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border-2 border-background hover:scale-110 transition-transform"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-foreground mb-1">
                    {profileData?.name || user?.name}
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground mb-6">
                    {profileData?.email || user?.email}
                  </p>

                  <div className="flex flex-col gap-2 px-4">
                    <Badge className="w-full justify-center py-2 rounded-xl bg-primary/10 text-primary border-none font-black text-[10px] uppercase tracking-widest">
                      <ShieldCheck className="h-3 w-3 mr-2" />
                      {user?.role === "student"
                        ? "Student Account"
                        : "User Account"}
                    </Badge>
                    <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <Calendar className="h-3.5 w-3.5" />
                      Joined{" "}
                      {new Date(
                        profileData?.joinedDate || Date.now(),
                      ).toLocaleDateString(undefined, {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3 pt-8 border-t border-border/50">
                    <div className="text-center">
                      <p className="text-2xl font-black text-primary">
                        {profileData?.totalSessions || 0}
                      </p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Sessions
                      </p>
                    </div>
                    <div className="text-center border-l border-border/50">
                      <p className="text-2xl font-black text-primary">
                        {profileData?.favoriteSubjects?.length || 0}
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
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedSubjects.map((subject, index) => (
                      <Badge
                        key={index}
                        className="bg-background/50 hover:bg-primary/10 text-foreground border-border/50 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors group flex items-center gap-2"
                      >
                        {subject}
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => removeSubject(subject)}
                            className="text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>

                  {isEditing && (
                    <div className="pt-2">
                      <Select onValueChange={addSubject}>
                        <SelectTrigger className="w-full h-10 rounded-xl bg-background/50 border-2 border-border/50 font-medium text-xs">
                          <SelectValue placeholder="Add more interests..." />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects
                            .filter((s) => !selectedSubjects.includes(s))
                            .map((subject) => (
                              <SelectItem
                                key={subject}
                                value={subject}
                                className="text-xs font-medium"
                              >
                                {subject}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      {errors.favoriteSubjects && (
                        <p className="text-[11px] font-bold text-red-500 mt-2 ml-1">
                          {errors.favoriteSubjects.message}
                        </p>
                      )}
                    </div>
                  )}
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
                      {isEditing
                        ? "Update your contact information and level."
                        : "Your identity and contact info."}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-10">
                  <div className="space-y-8">
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
                          onClick={() => handleLevelSelect("Undergraduate")}
                          disabled={!isEditing}
                          className={`p-5 rounded-2xl border-2 flex items-center justify-between group transition-all ${
                            selectedLevel === "Undergraduate"
                              ? "border-primary bg-primary/5"
                              : isEditing
                                ? "border-border/50 bg-background/50 hover:border-primary/30 cursor-pointer"
                                : "border-border/50 bg-background/50"
                          }`}
                        >
                          <div className="text-left">
                            <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">
                              Undergraduate
                            </p>
                            <p className="text-[10px] font-medium text-muted-foreground">
                              Currently pursuing degree
                            </p>
                          </div>
                          {selectedLevel === "Undergraduate" && (
                            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleLevelSelect("Postgraduate")}
                          disabled={!isEditing}
                          className={`p-5 rounded-2xl border-2 flex items-center justify-between group transition-all ${
                            selectedLevel === "Postgraduate"
                              ? "border-primary bg-primary/5"
                              : isEditing
                                ? "border-border/50 bg-background/50 hover:border-primary/30 cursor-pointer"
                                : "border-border/50 bg-background/50"
                          }`}
                        >
                          <div className="text-left">
                            <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">
                              Postgraduate
                            </p>
                            <p className="text-[10px] font-medium text-muted-foreground">
                              Advanced studies
                            </p>
                          </div>
                          {selectedLevel === "Postgraduate" && (
                            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                          )}
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
                  </div>
                </CardContent>
              </Card>

              {/* Learning Stats */}
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
                        {profileData?.learningStreak || 0} Days
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
                        {profileData?.globalRank || "Top 100"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
