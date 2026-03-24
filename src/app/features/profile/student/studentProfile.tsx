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
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { useAppSelector } from "../../../redux/store";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { studentInfo as fetchStudentInfo } from "../../../api/studentInfo";
import { updateStudentProfile } from "../../../api/updateStudentProfile";
import { subjects } from "../../../data/mockData";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  academicLevel: z.string().min(1, "Please select an academic level"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
  },
};

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

  const onSubmit = async (data: ProfileFormValues) => {
    if (!isOwnProfile) return;
    try {
      const newData = { ...data, userId: user && user.id, studentId: id };
      await updateStudentProfile(newData);
      setProfileData({ ...profileData, ...newData });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed");
    }
  };

  const handleLevelSelect = (level: string) => {
    if (isEditing) setValue("academicLevel", level);
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
    const base =
      "h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary transition-all";
    if (!isTouched) return `${base} bg-background/50 border-border/50`;
    if (hasError)
      return `${base} bg-red-500/5 border-red-500/50 focus-visible:ring-red-500/20`;
    return `${base} bg-green-500/5 border-green-500/50 focus-visible:ring-green-500/20`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-background relative overflow-hidden font-medium text-foreground">
      {/* Background — identical to StudentDashboard */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] left-[-10%] w-[45%] h-[45%] bg-blue-500/10 rounded-full blur-[140px] animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 pb-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* ── PAGE HEADER ── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20"
          >
            <div className="space-y-6">
              {/* Pill badge — same as StudentDashboard */}
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="h-4 w-4" />
                <span>Identity & Learning Profile</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-foreground">
                Student <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">
                  Profile
                </span>
              </h1>

              <p className="text-2xl text-muted-foreground/80 leading-relaxed max-w-2xl font-medium">
                Manage your{" "}
                <span className="text-foreground font-black underline decoration-primary/30 decoration-4 underline-offset-8">
                  learning identity
                </span>{" "}
                and keep your information synced.
              </p>
            </div>

            {isOwnProfile && !isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="h-18 px-10 rounded-[28px] font-black text-lg shadow-[0_20px_40px_-10px_theme(colors.primary.DEFAULT/0.3)] hover:shadow-primary/50 transition-all active:scale-95 group"
              >
                <Edit className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Edit Profile
              </Button>
            )}
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              {/* ── SIDEBAR ── */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-4 space-y-6"
              >
                {/* Identity Card */}
                <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                    <UserIcon className="w-40 h-40 rotate-12" />
                  </div>
                  <CardContent className="pt-12 pb-10 px-8 text-center relative z-10">
                    {/* Avatar */}
                    <div className="relative inline-block mb-8 group/avatar">
                      <Avatar className="h-36 w-36 border-4 border-background shadow-xl relative z-10 transition-all duration-500 group-hover/avatar:scale-105">
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
                          className="absolute -bottom-1 -right-1 z-20 h-10 w-10 rounded-2xl bg-primary text-white shadow-xl border-4 border-background hover:scale-110 active:scale-95 transition-all"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <h2 className="text-3xl font-black tracking-tighter text-foreground mb-1">
                      {profileData?.name || user?.name}
                    </h2>
                    <p className="text-sm font-medium text-muted-foreground/70 mb-8">
                      {profileData?.email || user?.email}
                    </p>

                    <div className="flex flex-col gap-3 px-4">
                      <Badge className="w-full justify-center py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/10 font-black text-xs uppercase tracking-widest">
                        <ShieldCheck className="h-3.5 w-3.5 mr-2" />
                        {user?.role === "student"
                          ? "Student Account"
                          : "User Account"}
                      </Badge>
                      <div className="flex items-center justify-center gap-2 mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
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

                    {/* Mini stats */}
                    <div className="mt-10 grid grid-cols-2 gap-0 pt-8 border-t border-border/10">
                      <div className="text-center py-2">
                        <p className="text-4xl font-black tracking-tighter text-primary">
                          {profileData?.totalSessions || 0}
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/50 mt-1">
                          Sessions
                        </p>
                      </div>
                      <div className="text-center py-2 border-l border-border/10">
                        <p className="text-4xl font-black tracking-tighter text-primary">
                          {profileData?.interests?.length || 0}
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/50 mt-1">
                          Interests
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interests Card */}
                <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <div className="w-8 h-8 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      Learning Interests
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 space-y-4">
                    {selectedInterests.length === 0 ? (
                      <p className="text-muted-foreground/50 text-sm font-medium italic">
                        No interests added yet.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {selectedInterests.map((interest, index) => (
                          <Badge
                            key={index}
                            className="bg-background/60 hover:bg-primary/10 text-foreground border border-border/20 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                          >
                            {interest}
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() => removeInterest(interest)}
                                className="text-muted-foreground hover:text-red-500 transition-colors ml-1"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {isEditing && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-3 border-t border-border/10"
                      >
                        <Select onValueChange={addInterest}>
                          <SelectTrigger className="w-full h-12 rounded-2xl bg-background/40 border-2 border-border/20 font-bold text-sm">
                            <SelectValue placeholder="Add interest..." />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-border/10 bg-card/90 backdrop-blur-xl">
                            {subjects
                              .filter((s) => !selectedInterests.includes(s))
                              .map((subject) => (
                                <SelectItem
                                  key={subject}
                                  value={subject}
                                  className="text-sm font-bold py-2.5"
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
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* ── MAIN CONTENT ── */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-8 space-y-6"
              >
                {/* Personal Details Card */}
                <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden">
                  <CardHeader className="p-10 pb-6">
                    <CardTitle className="text-3xl font-black tracking-tighter flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-primary" />
                      </div>
                      Personal Details
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-muted-foreground/70 mt-2 ml-16">
                      {isEditing
                        ? "Update your contact information and academic level."
                        : "Your identity and contact information."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-10 pt-0 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* NAME */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="name"
                          className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1"
                        >
                          Full Name
                        </Label>
                        <div className="relative group">
                          <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
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
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
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
                    <div className="pt-8 border-t border-border/10">
                      <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        Academic Level
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          {
                            id: "Undergraduate",
                            label: "Undergraduate",
                            desc: "Currently pursuing degree",
                          },
                          {
                            id: "Postgraduate",
                            label: "Postgraduate",
                            desc: "Advanced studies",
                          },
                        ].map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => handleLevelSelect(tier.id)}
                            disabled={!isEditing}
                            className={`p-6 rounded-[28px] border-2 flex items-center justify-between group transition-all duration-300 ${
                              selectedLevel === tier.id
                                ? "border-primary bg-primary/5 shadow-inner"
                                : isEditing
                                  ? "border-border/20 bg-background/30 hover:border-primary/30 cursor-pointer hover:bg-background/50"
                                  : "border-border/10 bg-background/20"
                            }`}
                          >
                            <div className="text-left">
                              <p
                                className={`text-base font-black tracking-tight transition-colors ${selectedLevel === tier.id ? "text-primary" : "text-foreground group-hover:text-primary"}`}
                              >
                                {tier.label}
                              </p>
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mt-1">
                                {tier.desc}
                              </p>
                            </div>
                            {selectedLevel === tier.id && (
                              <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-white shadow-lg animate-in zoom-in duration-300">
                                <CheckCircle className="h-4 w-4" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-end gap-4 pt-8 border-t border-border/10"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancel}
                          className="h-14 px-8 rounded-[24px] font-black border-2 border-border/20 hover:bg-muted/50 transition-all active:scale-95"
                        >
                          Discard
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-14 px-10 rounded-[24px] font-black shadow-[0_20px_40px_-10px_theme(colors.primary.DEFAULT/0.3)] hover:shadow-primary/50 text-lg group transition-all active:scale-95"
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
                  </CardContent>
                </Card>

                {/* Back link */}
                <div className="flex items-center gap-3 pt-2">
                  <Link
                    to="/student/dashboard"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 hover:text-primary transition-colors group"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                  </Link>
                </div>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
