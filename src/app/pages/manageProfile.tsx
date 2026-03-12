import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import {
  User,
  BookOpen,
  GraduationCap,
  Award,
  Globe,
  DollarSign,
  Calendar,
  Save,
  ArrowLeft,
  Camera,
  Plus,
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ShieldX,
  Zap,
  Trash2,
  Satellite,
  ArrowUpWideNarrow,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { subjects as availableSubjects } from "../data/mockData";
import { motion, AnimatePresence } from "motion/react";
import { toast, Toaster } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormValues } from "../schema/profileSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { updateProfile } from "../api/updateProfile";
import { setUser } from "../redux/authSlice";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function ManageProfile() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      avatar: user?.avatar || "",
      subjects: user?.subjects || [],
      hourlyRate: user?.hourlyRate || 0,
      bio: user?.bio || "",
      education: user?.education || "",
      experience: user?.experience || "",
      languages: user?.languages || [],
      availability: user?.availability || [],
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        avatar: user.avatar || "",
        subjects: user.subjects || [],
        hourlyRate: user.hourlyRate || 0,
        bio: user.bio || "",
        education: user.education || "",
        experience: user.experience || "",
        languages: user.languages || [],
        availability: user.availability || [],
      });
    }
  }, [user, form]);

  const {
    fields: availabilityFields,
    append: appendDay,
    remove: removeDay,
  } = useFieldArray({
    control: form.control,
    name: "availability",
  });

  const [newSubject, setNewSubject] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const dispatch = useAppDispatch();
  const handleAddSubject = () => {
    const currentSubjects = form.getValues("subjects");
    if (newSubject && !currentSubjects.includes(newSubject)) {
      form.setValue("subjects", [...currentSubjects, newSubject], {
        shouldValidate: true,
      });
      setNewSubject("");
    }
  };

  const handleRemoveSubject = (subject: string) => {
    const currentSubjects = form.getValues("subjects");
    form.setValue(
      "subjects",
      currentSubjects.filter((s) => s !== subject),
      { shouldValidate: true },
    );
  };

  const handleAddLanguage = () => {
    const currentLanguages = form.getValues("languages");
    if (newLanguage && !currentLanguages.includes(newLanguage)) {
      form.setValue("languages", [...currentLanguages, newLanguage], {
        shouldValidate: true,
      });
      setNewLanguage("");
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    const currentLanguages = form.getValues("languages");
    form.setValue(
      "languages",
      currentLanguages.filter((l) => l !== lang),
      { shouldValidate: true },
    );
  };

  const onSubmit = async (data: ProfileFormValues) => {
    const userId: string = user?.id || "unknown";
    const newProfileData = { userId, ...data };
    const response = await updateProfile(newProfileData);
    console.log(response);

    // update redux profile info
    dispatch(setUser<typeof response.data.user>(response.data.user));
    toast.success("Profile updated successfully!");
  };

  // Log validation errors to console for debugging
  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.log("Form Validation Errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  const subjects = form.watch("subjects");
  const languages = form.watch("languages");
  const avatar = form.watch("avatar");
  const name = form.watch("name");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      <Toaster richColors />
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-10"
            >
              {/* Header */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col md:flex-row md:items-end justify-between gap-8"
              >
                <div className="space-y-4">
                  <Link to="/" className="flex items-center gap-2.5 mb-6 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <BookOpen className="h-7 w-7 text-primary relative z-10" />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
                      Teach<span className="text-primary">Link</span>
                    </span>
                  </Link>
                  <Link
                    to="/teacher/dashboard"
                    className="inline-flex items-center text-primary font-black group hover:gap-3 transition-all"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Link>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                    Manage Your <span className="text-primary">Profile</span>
                  </h1>
                  <p className="text-muted-foreground font-semibold text-lg max-w-2xl">
                    Keep your profile fresh and updated to attract more students
                    and showcase your latest achievements.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-14 px-8 rounded-2xl font-black border-2"
                    onClick={() => navigate("/teacher/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-14 px-10 rounded-2xl font-black shadow-xl shadow-primary/20 text-lg group"
                  >
                    <Save className="mr-2 h-5 w-5" />
                    Save Changes
                  </Button>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-10">
                {/* Left Column - Main Details */}
                <div className="lg:col-span-2 space-y-10">
                  {/* Profile Overview */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <User className="w-48 h-48 rotate-12" />
                      </div>
                      <CardHeader className="p-8 md:p-12 pb-0">
                        <CardTitle className="text-2xl font-black">
                          Personal Overview
                        </CardTitle>
                        <CardDescription className="text-base font-semibold">
                          Update your basic information and profile picture.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-8 md:p-12 space-y-10">
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                          <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                              <FormItem className="relative group">
                                <Avatar className="h-32 w-32 border-4 border-background shadow-2xl transition-transform duration-500 group-hover:scale-105">
                                  <AvatarImage
                                    src={field.value}
                                    className="object-cover"
                                  />
                                  <AvatarFallback className="text-3xl font-black">
                                    {name?.charAt(0) || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <Button
                                  type="button"
                                  size="icon"
                                  className="absolute -bottom-2 -right-2 rounded-xl bg-primary shadow-xl border-4 border-background group-hover:scale-110 transition-transform"
                                >
                                  <Camera className="h-4 w-4" />
                                </Button>
                                <FormMessage className="absolute -bottom-6 left-0 w-full text-center" />
                              </FormItem>
                            )}
                          />
                          <div className="flex-1 space-y-6 w-full">
                            <div className="grid sm:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
                                      Full Name
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className="h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="hourlyRate"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
                                      Hourly Rate ($)
                                    </FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                                        <Input
                                          type="number"
                                          {...field}
                                          className="h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary pl-12"
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
                                Professional Bio
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  className="min-h-[160px] rounded-[24px] border-2 font-medium text-lg p-6 focus-visible:ring-primary leading-relaxed"
                                  placeholder="Tell students about your teaching philosophy and background..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Education & Experience */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <GraduationCap className="w-48 h-48 rotate-12" />
                      </div>
                      <CardHeader className="p-8 md:p-12 pb-0">
                        <CardTitle className="text-2xl font-black">
                          Background & Credentials
                        </CardTitle>
                        <CardDescription className="text-base font-semibold">
                          Showcase your qualifications and professional journey.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-8 md:p-12 space-y-10">
                        <div className="grid sm:grid-cols-2 gap-8">
                          <FormField
                            control={form.control}
                            name="education"
                            render={({ field }) => (
                              <FormItem className="space-y-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <GraduationCap className="h-5 w-5" />
                                  </div>
                                  <FormLabel className="font-black text-lg">
                                    Education
                                  </FormLabel>
                                </div>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="e.g., PhD in Mathematics, MIT"
                                    className="h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                              <FormItem className="space-y-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Award className="h-5 w-5" />
                                  </div>
                                  <FormLabel className="font-black text-lg">
                                    Experience
                                  </FormLabel>
                                </div>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="e.g., 10+ years teaching experience"
                                    className="h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Availability */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Calendar className="w-48 h-48 rotate-12" />
                      </div>
                      <CardHeader className="p-8 md:p-12 pb-0">
                        <CardTitle className="text-2xl font-black">
                          Teaching Schedule
                        </CardTitle>
                        <CardDescription className="text-base font-semibold">
                          Set your weekly availability for student bookings.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-8 md:p-12 space-y-8">
                        <div className="grid sm:grid-cols-2 gap-4">
                          {availabilityFields.map((field, idx) => (
                            <div
                              key={field.id}
                              className="p-6 rounded-3xl border-2 border-border/50 bg-card hover:border-primary/50 transition-all group"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                                    {field.day.charAt(0)}
                                  </div>
                                  <h4 className="font-black text-lg">
                                    {field.day}
                                  </h4>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  onClick={() => removeDay(idx)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {field.slots.map((slot, sIdx) => (
                                  <Badge
                                    key={sIdx}
                                    variant="secondary"
                                    className="px-3 py-1 font-bold rounded-lg border-none bg-muted hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer group/slot"
                                    onClick={() => {
                                      const newSlots = [...field.slots];
                                      newSlots.splice(sIdx, 1);
                                      form.setValue(
                                        `availability.${idx}.slots`,
                                        newSlots,
                                      );
                                    }}
                                  >
                                    {slot}
                                    <X className="ml-2 h-3 w-3 opacity-0 group-hover/slot:opacity-100 transition-opacity" />
                                  </Badge>
                                ))}
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="h-7 rounded-lg font-black text-[10px] uppercase tracking-widest border-dashed"
                                  onClick={() => {
                                    const newSlots = [...field.slots, "00:00"]; // Placeholder
                                    form.setValue(
                                      `availability.${idx}.slots`,
                                      newSlots,
                                    );
                                  }}
                                >
                                  <Plus className="h-3 w-3 mr-1" /> Add
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            className="h-full min-h-[140px] rounded-3xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 group"
                            onClick={() =>
                              appendDay({ day: "New Day", slots: [] })
                            }
                          >
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                              <Plus className="h-6 w-6" />
                            </div>
                            <span className="font-black text-sm uppercase tracking-widest text-muted-foreground group-hover:text-primary">
                              Add Another Day
                            </span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Right Column - Secondary Controls */}
                <div className="space-y-10">
                  {/* Subjects */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px] overflow-hidden">
                      <CardHeader className="p-8 pb-0">
                        <CardTitle className="text-xl font-black flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-primary/10 text-primary">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          Expertise
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-6">
                        <FormField
                          control={form.control}
                          name="subjects"
                          render={() => (
                            <FormItem className="space-y-6">
                              <div className="flex flex-wrap gap-2">
                                <AnimatePresence>
                                  {subjects.map((subject) => (
                                    <motion.div
                                      key={subject}
                                      initial={{ scale: 0.8, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      exit={{ scale: 0.8, opacity: 0 }}
                                    >
                                      <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 rounded-xl font-black text-sm group">
                                        {subject}
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleRemoveSubject(subject)
                                          }
                                          className="ml-2 hover:text-destructive"
                                        >
                                          <X className="h-3.5 w-3.5" />
                                        </button>
                                      </Badge>
                                    </motion.div>
                                  ))}
                                </AnimatePresence>
                              </div>
                              <div className="flex gap-2">
                                <Select
                                  value={newSubject}
                                  onValueChange={setNewSubject}
                                >
                                  <SelectTrigger className="h-12 rounded-xl border-2 font-bold">
                                    <SelectValue placeholder="Add subject..." />
                                  </SelectTrigger>
                                  <SelectContent className="rounded-xl border-2 shadow-2xl">
                                    {availableSubjects.map((s) => (
                                      <SelectItem
                                        key={s}
                                        value={s}
                                        className="font-bold rounded-lg m-1"
                                      >
                                        {s}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Button
                                  type="button"
                                  onClick={handleAddSubject}
                                  className="h-12 w-12 rounded-xl bg-primary shadow-lg shadow-primary/20"
                                >
                                  <Plus className="h-5 w-5" />
                                </Button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Languages */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px] overflow-hidden">
                      <CardHeader className="p-8 pb-0">
                        <CardTitle className="text-xl font-black flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-primary/10 text-primary">
                            <Globe className="h-5 w-5" />
                          </div>
                          Languages
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-6">
                        <FormField
                          control={form.control}
                          name="languages"
                          render={() => (
                            <FormItem className="space-y-6">
                              <div className="flex flex-wrap gap-2">
                                {languages.map((lang) => (
                                  <Badge
                                    key={lang}
                                    variant="secondary"
                                    className="px-4 py-2 rounded-xl font-black text-sm bg-muted group"
                                  >
                                    {lang}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveLanguage(lang)}
                                      className="ml-2 hover:text-destructive"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Add language..."
                                  value={newLanguage}
                                  onChange={(e) =>
                                    setNewLanguage(e.target.value)
                                  }
                                  onKeyDown={(e) =>
                                    e.key === "Enter" &&
                                    (e.preventDefault(), handleAddLanguage())
                                  }
                                  className="h-12 rounded-xl border-2 font-bold focus-visible:ring-primary"
                                />
                                <Button
                                  type="button"
                                  onClick={handleAddLanguage}
                                  className="h-12 w-12 rounded-xl bg-primary shadow-lg shadow-primary/20"
                                >
                                  <Plus className="h-5 w-5" />
                                </Button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Profile Health */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-none bg-primary text-primary-foreground shadow-2xl rounded-[32px] overflow-hidden relative group">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Zap className="w-32 h-32 rotate-12" />
                      </div>
                      <CardContent className="p-8 relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                            <CheckCircle2 className="h-6 w-6" />
                          </div>
                          <h3 className="text-2xl font-black tracking-tight">
                            Profile Health
                          </h3>
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-black uppercase tracking-widest opacity-80">
                              <span>Completion</span>
                              <span>92%</span>
                            </div>
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "92%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                              />
                            </div>
                          </div>
                          <p className="text-sm font-semibold opacity-90 leading-relaxed">
                            Excellent work! Your profile is almost complete.
                            Adding more specific details to your bio can boost
                            your ranking.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Verification Status */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px] overflow-hidden">
                      <CardContent className="p-8 flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl ${user && user.verified ? "bg-green-500/10" : "bg-red-500/10"} flex items-center justify-center ${user && user.verified ? "text-green-600" : "text-red-600"}`}
                        >
                          {user && user.verified ? (
                            <ShieldCheck className="h-6 w-6" />
                          ) : (
                            <ShieldX className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            Identity Status
                          </p>
                          <p
                            className={`text-sm font-black ${user && user.verified ? "text-green-600" : "text-red-600"}`}
                          >
                            {user && user.verified
                              ? "Verified Professional"
                              : "Unverified Professional"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </form>
        </Form>
      </div>
    </div>
  );
}
