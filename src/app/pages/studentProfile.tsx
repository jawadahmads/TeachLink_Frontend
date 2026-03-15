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
import { studentInfo as fetchStudentInfo } from "../api/studentInfo";
import { updateStudentProfile } from "../api/updateStudentProfile";
import { subjects } from "../data/mockData";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  academicLevel: z.string().min(1, "Please select an academic level"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
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
  const studentId = id || user?.id;

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
  const selectedInterests = watch("interests") || [];

  useEffect(() => {
    const loadData = async () => {
      if (!studentId) return;
      try {
        const data = await fetchStudentInfo(studentId);
        if (data) {
          setProfileData(data);
          setValue("name", data.name || user?.name || "");
          setValue("email", data.email || user?.email || "");
          setValue("academicLevel", data.academicLevel || "Undergraduate");
          setValue("interests", data.interests || data.favoriteSubjects || []);
        }
      } catch (error) {
        console.error("Failed to fetch student info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [studentId, user, setValue]);

  // userId: string;
  // studentId: string;
  // name?: string;
  // avatar?: string;
  // academicLevel?: string;
  // interests?: string[];

  const onSubmit = async (data: ProfileFormValues) => {
    if (!isOwnProfile) return;
    try {
      const newData = {
        ...data,
        userId: user && user.id,
        studentId: id,
      };
      await updateStudentProfile(newData);
      setProfileData({ ...profileData, ...newData });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      // Error is handled in updateStudentProfile toast
      toast.error("Failed");
    }
  };

  const handleLevelSelect = (level: string) => {
    if (isEditing) {
      setValue("academicLevel", level);
    }
  };

  const addInterest = (interest: string) => {
    if (!selectedInterests.includes(interest)) {
      setValue("interests", [...selectedInterests, interest], {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const removeInterest = (interest: string) => {
    setValue(
      "interests",
      selectedInterests.filter((i) => i !== interest),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const handleCancel = () => {
    reset({
      name: profileData?.name || user?.name || "",
      email: profileData?.email || user?.email || "",
      academicLevel: profileData?.academicLevel || "Undergraduate",
      interests: profileData?.interests || profileData?.favoriteSubjects || [],
    });
    setIsEditing(false);
  };

  const inputClass = (hasError: boolean, isTouched: boolean | undefined) => {
    const baseClass =
      "h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary transition-all";
    if (!isTouched) return `${baseClass} bg-background/50 border-border/50`;
    if (hasError)
      return `${baseClass} bg-red-500/5 border-red-500/50 focus-visible:ring-red-500/20 focus-visible:border-red-500`;
    return `${baseClass} bg-green-500/5 border-green-500/50 focus-visible:ring-green-500/20 focus-visible:border-green-500`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20 font-medium text-foreground">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <Link
              to="/student/dashboard"
              className="inline-flex items-center text-primary font-black group hover:gap-3 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Student <span className="text-primary">Profile</span>
            </h1>
            <p className="text-muted-foreground font-semibold text-lg max-w-2xl">
              Manage your learning journey and keep your information up to date.
            </p>
          </div>

          {isOwnProfile && !isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="h-14 px-10 rounded-2xl font-black shadow-xl shadow-primary/20 text-lg flex items-center gap-2 group"
            >
              <Edit className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Edit Profile
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Profile Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4 space-y-8"
            >
              <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <UserIcon className="w-32 h-32 rotate-12" />
                </div>
                <CardContent className="pt-12 pb-10 px-8 text-center relative z-10">
                  <div className="relative inline-block mb-8 group">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Avatar className="h-36 w-36 border-4 border-background shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105">
                      <AvatarImage
                        src={profileData?.avatar || user?.avatar}
                        alt={profileData?.name || user?.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-4xl font-black bg-muted text-primary">
                        {(profileData?.name || user?.name || "U").charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isOwnProfile && (
                      <Button
                        type="button"
                        size="icon"
                        className="absolute bottom-1 right-1 z-20 h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-xl border-4 border-background hover:scale-110 transition-transform"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <h2 className="text-3xl font-black tracking-tight text-foreground mb-2">
                    {profileData?.name || user?.name}
                  </h2>
                  <p className="text-base font-semibold text-muted-foreground mb-8">
                    {profileData?.email || user?.email}
                  </p>

                  <div className="flex flex-col gap-3 px-4">
                    <Badge className="w-full justify-center py-2.5 rounded-xl bg-primary/10 text-primary border-none font-black text-xs uppercase tracking-widest">
                      <ShieldCheck className="h-3.5 w-3.5 mr-2" />
                      {user?.role === "student"
                        ? "Student Account"
                        : "User Account"}
                    </Badge>
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                      <Calendar className="h-4 w-4" />
                      Joined{" "}
                      {new Date(
                        profileData?.joinedDate || Date.now(),
                      ).toLocaleDateString(undefined, {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-4 pt-10 border-t border-border/50">
                    <div className="text-center">
                      <p className="text-3xl font-black text-primary">
                        {profileData?.totalSessions || 0}
                      </p>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-1">
                        Sessions
                      </p>
                    </div>
                    <div className="text-center border-l border-border/50">
                      <p className="text-3xl font-black text-primary">
                        {profileData?.interests?.length || 0}
                      </p>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-1">
                        Interests
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Learning Interests
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-6">
                  {selectedInterests.length === 0 ? (
                    <p className="text-muted-foreground text-sm font-medium">
                      No interests added yet.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2.5">
                      {selectedInterests.map((interest, index) => (
                        <Badge
                          key={index}
                          className="bg-background/80 hover:bg-primary/10 text-foreground border-border/50 px-4 py-2 rounded-xl text-xs font-bold transition-all group flex items-center gap-2"
                        >
                          {interest}
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => removeInterest(interest)}
                              className="text-muted-foreground hover:text-red-500 transition-colors"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {isEditing && (
                    <div className="pt-2">
                      <Select onValueChange={addInterest}>
                        <SelectTrigger className="w-full h-12 rounded-2xl bg-background/50 border-2 border-border/50 font-bold text-sm">
                          <SelectValue placeholder="Add more interests..." />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects
                            .filter((s) => !selectedInterests.includes(s))
                            .map((subject) => (
                              <SelectItem
                                key={subject}
                                value={subject}
                                className="text-sm font-bold"
                              >
                                {subject}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      {errors.interests && (
                        <p className="text-xs font-bold text-red-500 mt-2 ml-1">
                          {errors.interests.message}
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
              className="lg:col-span-8 space-y-8"
            >
              <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
                <CardHeader className="p-10 pb-6">
                  <CardTitle className="text-2xl font-black">
                    Personal Details
                  </CardTitle>
                  <CardDescription className="text-base font-semibold">
                    {isEditing
                      ? "Update your contact information and level."
                      : "Your identity and contact info."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-10">
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* NAME */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="name"
                          className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1"
                        >
                          Full Name
                        </Label>
                        <div className="relative group">
                          <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="name"
                            {...register("name")}
                            disabled={!isEditing}
                            className={`pl-12 ${inputClass(!!errors.name, touchedFields.name)}`}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-xs font-bold text-red-500 ml-1"
                            >
                              {errors.name.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* EMAIL */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="email"
                          className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1"
                        >
                          Email Address
                        </Label>
                        <div className="relative group">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            disabled={!isEditing}
                            className={`pl-12 ${inputClass(!!errors.email, touchedFields.email)}`}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-xs font-bold text-red-500 ml-1"
                            >
                              {errors.email.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Academic Level */}
                    <div className="pt-8 border-t border-border/50">
                      <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        Academic Level
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <button
                          type="button"
                          onClick={() => handleLevelSelect("Undergraduate")}
                          disabled={!isEditing}
                          className={`p-6 rounded-[24px] border-2 flex items-center justify-between group transition-all duration-300 ${
                            selectedLevel === "Undergraduate"
                              ? "border-primary bg-primary/5 shadow-inner"
                              : isEditing
                                ? "border-border/50 bg-background/50 hover:border-primary/30 cursor-pointer hover:bg-background"
                                : "border-border/50 bg-background/50"
                          }`}
                        >
                          <div className="text-left">
                            <p
                              className={`text-base font-black transition-colors ${selectedLevel === "Undergraduate" ? "text-primary" : "text-foreground group-hover:text-primary"}`}
                            >
                              Undergraduate
                            </p>
                            <p className="text-xs font-semibold text-muted-foreground mt-1">
                              Currently pursuing degree
                            </p>
                          </div>
                          {selectedLevel === "Undergraduate" && (
                            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg animate-in zoom-in duration-300">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleLevelSelect("Postgraduate")}
                          disabled={!isEditing}
                          className={`p-6 rounded-[24px] border-2 flex items-center justify-between group transition-all duration-300 ${
                            selectedLevel === "Postgraduate"
                              ? "border-primary bg-primary/5 shadow-inner"
                              : isEditing
                                ? "border-border/50 bg-background/50 hover:border-primary/30 cursor-pointer hover:bg-background"
                                : "border-border/50 bg-background/50"
                          }`}
                        >
                          <div className="text-left">
                            <p
                              className={`text-base font-black transition-colors ${selectedLevel === "Postgraduate" ? "text-primary" : "text-foreground group-hover:text-primary"}`}
                            >
                              Postgraduate
                            </p>
                            <p className="text-xs font-semibold text-muted-foreground mt-1">
                              Advanced studies
                            </p>
                          </div>
                          {selectedLevel === "Postgraduate" && (
                            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg animate-in zoom-in duration-300">
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
                        className="flex items-center justify-end gap-4 pt-10"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancel}
                          className="h-14 px-8 rounded-2xl font-black border-2 hover:bg-accent transition-all"
                        >
                          Discard
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-14 px-10 rounded-2xl font-black shadow-xl shadow-primary/20 text-lg group"
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
                            <div className="flex items-center gap-2">
                              <Save className="h-5 w-5 group-hover:scale-110 transition-transform" />
                              Update Profile
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Stats */}
              <div className="grid sm:grid-cols-2 gap-8">
                <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden group hover:scale-[1.02] transition-transform">
                  <CardContent className="p-8 flex items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                        Learning Streak
                      </p>
                      <p className="text-3xl font-black text-foreground">
                        {profileData?.learningStreak || 0} Days
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden group hover:scale-[1.02] transition-transform">
                  <CardContent className="p-8 flex items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                        Global Rank
                      </p>
                      <p className="text-3xl font-black text-foreground">
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
