import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Calendar as CalendarIcon,
  Clock,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Star,
  BookOpen,
  Info,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { mockTeachers } from "../data/mockData";
import { motion, AnimatePresence } from "motion/react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchGigs } from "../redux/gigSlice";
import { createCheckout } from "../api/checkout";
import { setBooking } from "../redux/bookingSlice";
import type { BookingFormData } from "../../types";

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
      ease: "circOut" as any,
    },
  },
};

export default function BookingPage() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gigs, loading, error } = useAppSelector((state) => state.gig);
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      selectedDate: "",
      selectedDay: "",
      selectedTime: "",
      subject: "",
      notes: "",
      studentName: "",
      studentEmail: "",
      agreeToTerms: false,
    },
  });

  const watchedData = watch();

  useEffect(() => {
    if (gigs.length === 0) {
      dispatch(fetchGigs());
    }
  }, [dispatch, gigs.length]);

  useEffect(() => {
    if (user) {
      reset({
        ...watchedData,
        studentName: user.name || user.fullName || user.username || "",
        studentEmail: user.email || user.emailAddress || "",
      });
    }
  }, [user, reset]);

  const gig = gigs.find((g) => g.teacher.id === teacherId);
  const fallbackTeacher =
    mockTeachers.find((t) => t.id === teacherId) || mockTeachers[0];

  const teacherFromGig = gig?.teacher;

  const teacher = teacherFromGig
    ? {
        id: teacherFromGig.id,
        name: teacherFromGig.name,
        avatar: teacherFromGig.avatar,
        subjects: teacherFromGig.subjects.map((s) => s.name),
        rating: teacherFromGig.rating,
        reviewCount: teacherFromGig.reviewCount,
        hourlyRate: teacherFromGig.hourlyRate,
        bio: teacherFromGig.bio,
        education: teacherFromGig.education,
        experience: teacherFromGig.experience,
        languages: teacherFromGig.languages.map((l) => l.name),
        availability: teacherFromGig.availability,
        totalStudents: teacherFromGig.totalStudents,
        totalHours: teacherFromGig.totalHours,
        responseTime: teacherFromGig.responseTime
          ? `${teacherFromGig.responseTime} hours`
          : "< 24 hours",
        verified: teacherFromGig.verified,
      }
    : fallbackTeacher;

  const [step, setStep] = useState(1);

  const selectedDate = watchedData.selectedDate;
  const selectedDay = watchedData.selectedDay;
  const selectedTime = watchedData.selectedTime;
  const subject = watchedData.subject || teacher.subjects[0];

  const onSubmit = async (data: BookingFormData) => {
    const errors: string[] = [];

    if (!data.selectedDate) errors.push("Please select a date");
    if (!data.selectedDay) errors.push("Please select a day");
    if (!data.selectedTime) errors.push("Please select a time slot");
    if (!data.subject) errors.push("Please select a subject");
    if (!data.studentName) errors.push("Name is required");
    if (!data.studentEmail) errors.push("Email is required");
    if (!data.agreeToTerms) errors.push("You must agree to the terms");

    if (errors.length > 0) {
      toast.error("Please fix the following errors:", {
        description: errors.join(", "),
        icon: <AlertCircle className="h-5 w-5" />,
      });
      return;
    }

    const bookingData = {
      studentId: user?.id || user?._id || user?.userId || "",
      ...data,
      teacherId: teacher.id,
      teacherName: teacher.name,
      hourlyRate: teacher.hourlyRate,
      platformFee: teacher.hourlyRate * 0.1,
      grandTotal: teacher.hourlyRate + teacher.hourlyRate * 0.1,
      sessionDuration: "60 minutes",
      bookingDate: new Date().toISOString(),
    };

    const res = await createCheckout<typeof bookingData>(bookingData);
    console.log(res);

    if (res?.url) {
      dispatch(setBooking(bookingData));
      window.location.href = res.url;
    }

    // toast.success("Booking Confirmed!", {
    //   description: `Your session with ${teacher.name} on ${data.selectedDay} at ${data.selectedTime} has been booked.`,
    //   icon: <CheckCircle2 className="h-5 w-5 text-success" />,
    // });
  };

  const totalPrice = teacher.hourlyRate;
  const platformFee = totalPrice * 0.1;
  const grandTotal = totalPrice + platformFee;

  const steps = [
    { id: 1, label: "Schedule", icon: CalendarIcon },
    { id: 2, label: "Details", icon: Info },
    { id: 3, label: "Payment", icon: CreditCard },
  ];

  if (loading && gigs.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">
            Loading teacher information...
          </p>
        </div>
      </div>
    );
  }

  if (error && gigs.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px] p-8 max-w-md">
          <CardContent className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
              <Info className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-black">Unable to Load</h2>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => dispatch(fetchGigs())} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Professional Header & Progress */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-10"
          >
            <div className="space-y-4">
              <Link
                to={`/teacher/${teacher.id}`}
                className="group inline-flex items-center text-primary/80 font-bold text-sm tracking-wider uppercase hover:text-primary transition-all duration-300"
              >
                <div className="mr-3 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                </div>
                Back to Profile
              </Link>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                Book Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  Premium Session
                </span>
              </h1>
              <p className="text-muted-foreground text-lg font-medium max-w-lg">
                Personalized mentorship with {teacher.name}. Tailored to your
                goals, pace, and schedule.
              </p>
            </div>

            {/* High-Fidelity Premium Tabs */}
            <div className="flex justify-center -mb-4">
              <nav className="inline-flex p-1.5 bg-card/40 backdrop-blur-3xl rounded-[32px] border border-border/20 shadow-2xl relative overflow-hidden">
                {steps.map((s, idx) => {
                  const isActive = step === s.id;
                  const isCompleted = step > s.id;
                  const isUpcoming = step < s.id;

                  return (
                    <button
                      key={s.id}
                      disabled={s.id > step + 1 && step < s.id}
                      onClick={() => s.id < step && setStep(s.id)}
                      className={`relative flex items-center gap-4 px-8 py-5 rounded-[24px] transition-all duration-700 group ${
                        isActive
                          ? "text-primary-foreground"
                          : isCompleted
                            ? "text-success/80"
                            : "text-muted-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary shadow-[0_12px_32px_-8px_theme(colors.primary.DEFAULT / 0.4)] rounded-[24px]"
                          transition={{
                            type: "spring",
                            bounce: 0.15,
                            duration: 0.6,
                          }}
                        />
                      )}

                      <div className="relative flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-500 ${
                            isActive
                              ? "bg-primary-foreground/20 rotate-[10deg] scale-110 shadow-lg shadow-black/5"
                              : isCompleted
                                ? "bg-success/15 rotate-0"
                                : "bg-muted/30 group-hover:bg-muted group-hover:scale-105"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <span className="relative z-10">{s.id}</span>
                          )}
                        </div>
                        <div className="flex flex-col items-start leading-none gap-1">
                          <span className="text-[9px] font-black uppercase tracking-[0.25em] opacity-40">
                            Step 0{s.id}
                          </span>
                          <span className="text-base font-black tracking-tight">
                            {s.label}
                          </span>
                        </div>
                      </div>

                      {idx < steps.length - 1 && (
                        <div className="ml-8 w-px h-6 bg-border/20 last:hidden" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, ease: "circOut" as any }}
                    className="space-y-8"
                  >
                    <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/70 backdrop-blur-3xl rounded-[40px] overflow-hidden border border-border/20">
                      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        <CalendarIcon className="w-48 h-48 rotate-12 text-primary" />
                      </div>
                      <CardHeader className="p-10 pb-0">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <CalendarIcon className="h-6 w-6" />
                          </div>
                          <CardTitle className="text-3xl font-black tracking-tight">
                            Select Date & Time
                          </CardTitle>
                        </div>
                        <p className="text-muted-foreground font-medium text-lg ml-16">
                          Choose a slot that works best for your schedule.
                        </p>
                      </CardHeader>
                      <CardContent className="p-10 space-y-12">
                        {/* Date Picker for Next 7 Days */}
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <Label className="text-xl font-black flex items-center gap-2">
                              Select Date
                              <Sparkles className="h-4 w-4 text-primary" />
                            </Label>
                            <span className="text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest">
                              Next 7 Days
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                            {Array.from({ length: 7 }, (_, i) => {
                              const date = new Date();
                              date.setDate(date.getDate() + i);
                              const dateStr = date.toISOString().split("T")[0];
                              const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                              const dayNum = date.getDate();
                              const monthName = date.toLocaleDateString("en-US", { month: "short" });
                              const isSelected = selectedDate === dateStr;
                              
                              return (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => {
                                    setValue("selectedDate", dateStr);
                                    setValue("selectedDay", dayName.toUpperCase());
                                    setValue("selectedTime", "");
                                  }}
                                  className={`group relative p-4 rounded-[20px] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                                    isSelected
                                      ? "bg-primary border-primary shadow-xl shadow-primary/20"
                                      : "bg-card/50 border-transparent hover:border-primary/30 hover:bg-card/80"
                                  }`}
                                >
                                  <p
                                    className={`text-[10px] font-black uppercase tracking-widest ${
                                      isSelected
                                        ? "text-primary-foreground/70"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {dayName}
                                  </p>
                                  <p
                                    className={`text-2xl font-black ${
                                      isSelected
                                        ? "text-primary-foreground"
                                        : "text-foreground"
                                    }`}
                                  >
                                    {dayNum}
                                  </p>
                                  <p
                                    className={`text-[10px] font-bold ${
                                      isSelected
                                        ? "text-primary-foreground/70"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {monthName}
                                  </p>
                                  {isSelected && (
                                    <motion.div
                                      layoutId="dateCheck"
                                      className="absolute -top-1 -right-1"
                                    >
                                      <CheckCircle2 className="h-5 w-5 text-primary-foreground bg-primary rounded-full" />
                                    </motion.div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* High-Fidelity Day Selection */}
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <Label className="text-xl font-black flex items-center gap-2">
                              Available Time Slots
                              <Sparkles className="h-4 w-4 text-primary" />
                            </Label>
                            <span className="text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest">
                              {selectedDate || "Select date first"}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {teacher.availability
                              .filter((day) => selectedDay && day.day.includes(selectedDay.substring(0, 3)))
                              .map((day, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => {
                                    setValue("selectedDay", day.day);
                                    setValue("selectedTime", "");
                                  }}
                                  className={`group relative p-6 rounded-[28px] border-2 transition-all duration-500 text-left ${
                                    selectedDay === day.day
                                      ? "bg-primary border-primary shadow-2xl shadow-primary/30 scale-105"
                                      : "bg-card/50 border-transparent hover:border-primary/30 hover:bg-card/80"
                                  }`}
                                >
                                  <p
                                    className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
                                      selectedDay === day.day
                                        ? "text-primary-foreground/70"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {day.day.substring(0, 3)}
                                  </p>
                                  <p
                                    className={`text-2xl font-black ${
                                      selectedDay === day.day
                                        ? "text-primary-foreground"
                                        : "text-foreground"
                                    }`}
                                  >
                                    {day.day.split(" ")[0]}
                                  </p>

                                  <div
                                    className={`mt-4 w-8 h-1 rounded-full transition-all duration-500 ${
                                      selectedDay === day.day
                                        ? "bg-white"
                                        : "bg-primary/20 group-hover:w-12 group-hover:bg-primary/40"
                                    }`}
                                  />

                                  {selectedDay === day.day && (
                                    <motion.div
                                      layoutId="dayCheck"
                                      className="absolute top-4 right-4 text-primary-foreground"
                                    >
                                      <CheckCircle2 className="h-5 w-5" />
                                    </motion.div>
                                  )}
                                </button>
                              ))}
                          </div>
                        </div>

                        {/* Modern Time Slot Selection */}
                        <AnimatePresence mode="wait">
                          {selectedDate && selectedDay ? (
                            <motion.div
                              key="timeSlots"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="space-y-8 pt-8 border-t border-black/5"
                            >
                              <div className="flex items-center gap-3">
                                <Label className="text-xl font-black">
                                  Select a Time Slot
                                </Label>
                                <div className="h-px flex-1 bg-black/5" />
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                                {teacher.availability
                                  .find((d) => d.day === selectedDay)
                                  ?.slots.map((slot, index) => (
                                    <button
                                      key={index}
                                      type="button"
                                      onClick={() =>
                                        setValue("selectedTime", slot)
                                      }
                                      className={`h-14 rounded-2xl font-bold border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                                        selectedTime === slot
                                          ? "bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20 scale-[1.02]"
                                          : "bg-card/50 border-transparent hover:border-primary/20 hover:bg-card/80 text-muted-foreground hover:text-primary"
                                      }`}
                                    >
                                      <Clock
                                        className={`h-4 w-4 ${selectedTime === slot ? "text-primary-foreground" : "text-primary/40"}`}
                                      />
                                      {slot}
                                    </button>
                                  ))}
                              </div>
                            </motion.div>
                          ) : (
                            <div className="p-16 text-center border-2 border-dashed border-black/5 rounded-[32px] bg-muted/10">
                              <CalendarIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                              <p className="text-muted-foreground font-bold italic">
                                Please select a day first to view available
                                times.
                              </p>
                            </div>
                          )}
                        </AnimatePresence>

                        {/* Summary Insight */}
                        <div className="p-8 rounded-[32px] bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/10 relative overflow-hidden group">
                          <div className="absolute -right-8 -bottom-8 opacity-[0.05] group-hover:scale-110 transition-transform duration-1000">
                            <Sparkles className="w-32 h-32" />
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative">
                            <div className="flex items-center gap-6">
                              <div className="w-16 h-16 rounded-[22px] bg-card shadow-xl flex items-center justify-center">
                                <Clock className="h-8 w-8 text-primary" />
                              </div>
                              <div>
                                <p className="font-black text-2xl tracking-tight">
                                  Standard Mentorship
                                </p>
                                <p className="text-muted-foreground font-medium">
                                  60-minute focused session with personalized
                                  feedback.
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                                Price Per Session
                              </p>
                              <p className="text-4xl font-black text-foreground">
                                ${teacher.hourlyRate}
                                <span className="text-xl text-muted-foreground">
                                  /hr
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <Button
                          type="button"
                          disabled={!selectedDate || !selectedDay || !selectedTime}
                          className="w-full h-20 rounded-[28px] font-black text-xl shadow-[0_20px_40px_-10px_theme(colors.primary.DEFAULT / 0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-95 group relative overflow-hidden"
                          onClick={() => setStep(2)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          Continue to Details
                          <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          icon: ShieldCheck,
                          title: "Verified Teacher",
                          desc: "Professionally vetted",
                        },
                        {
                          icon: Star,
                          title: "Highest Rated",
                          desc: "Top 1% in subject",
                        },
                        {
                          icon: BookOpen,
                          title: "Curated Material",
                          desc: "Free learning resources",
                        },
                      ].map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-6 rounded-[24px] bg-muted/30 border border-border/20"
                        >
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <feat.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-bold text-sm tracking-tight">
                              {feat.title}
                            </p>
                            <p className="text-xs text-muted-foreground font-medium">
                              {feat.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, ease: "circOut" as any }}
                  >
                    <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/70 backdrop-blur-3xl rounded-[40px] overflow-hidden border border-border/20">
                      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        <BookOpen className="w-48 h-48 rotate-12 text-primary" />
                      </div>
                      <CardHeader className="p-10 pb-0">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <BookOpen className="h-6 w-6" />
                          </div>
                          <CardTitle className="text-3xl font-black tracking-tight">
                            Mentorship Details
                          </CardTitle>
                        </div>
                        <p className="text-muted-foreground font-medium text-lg ml-16">
                          Help {teacher.name} prepare for your session.
                        </p>
                      </CardHeader>
                      <CardContent className="p-10 space-y-12">
                        {/* Section 1: Mentorship Focus */}
                        <div className="space-y-8">
                          <div className="flex items-center gap-3">
                            <h4 className="text-sm font-black uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full">
                              01. Session Focus
                            </h4>
                            <div className="h-px flex-1 bg-black/5" />
                          </div>

                          <div className="space-y-6">
                            <Label className="text-lg font-black block">
                              What subject would you like to focus on?
                            </Label>
                            <div className="flex flex-wrap gap-3">
                              {teacher.subjects.map((s, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => setValue("subject", s)}
                                  className={`h-14 px-8 rounded-2xl font-bold border-2 transition-all duration-300 ${
                                    subject === s
                                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                                      : "bg-card/50 border-transparent hover:border-primary/20 hover:bg-card/80 text-muted-foreground hover:text-primary"
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                            {errors.subject && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-destructive font-bold flex items-center gap-2"
                              >
                                <AlertCircle className="h-4 w-4" />
                                Please select a subject to proceed.
                              </motion.p>
                            )}
                          </div>

                          <div className="space-y-4">
                            <Label
                              htmlFor="notes"
                              className="text-lg font-black block"
                            >
                              Detailed Notes (Optional)
                            </Label>
                            <Textarea
                              id="notes"
                              placeholder="Describe your current challenges, specific topics, or any materials you'd like to review..."
                              {...register("notes")}
                              className="min-h-[160px] rounded-[28px] border-2 border-transparent bg-muted/50 focus:bg-card focus:border-primary/20 focus:ring-0 transition-all duration-300 p-6 font-medium text-lg placeholder:text-muted-foreground/40 shadow-inner"
                            />
                          </div>
                        </div>

                        {/* Section 2: Mentee Info */}
                        <div className="space-y-8">
                          <div className="flex items-center gap-3">
                            <h4 className="text-sm font-black uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full">
                              02. Mentee Information
                            </h4>
                            <div className="h-px flex-1 bg-black/5" />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <Label
                                htmlFor="studentName"
                                className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-2"
                              >
                                Full Name
                              </Label>
                              <Input
                                id="studentName"
                                placeholder="E.g. Alexander Pierce"
                                {...register("studentName", {
                                  required: "Name is required",
                                })}
                                className={`h-16 rounded-2xl border-2 transition-all duration-300 px-6 font-bold text-lg ${
                                  errors.studentName
                                    ? "border-destructive/30 bg-destructive/5"
                                    : "border-transparent bg-muted/50 focus:bg-card focus:border-primary/20"
                                }`}
                              />
                            </div>
                            <div className="space-y-3">
                              <Label
                                htmlFor="studentEmail"
                                className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-2"
                              >
                                Email Address
                              </Label>
                              <Input
                                id="studentEmail"
                                type="email"
                                placeholder="alex@example.com"
                                {...register("studentEmail", {
                                  required: "Email is required",
                                  pattern: {
                                    value:
                                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                  },
                                })}
                                className={`h-16 rounded-2xl border-2 transition-all duration-300 px-6 font-bold text-lg ${
                                  errors.studentEmail
                                    ? "border-destructive/30 bg-destructive/5"
                                    : "border-transparent bg-muted/50 focus:bg-card focus:border-primary/20"
                                }`}
                              />
                            </div>
                          </div>
                          {(errors.studentName || errors.studentEmail) && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-sm text-destructive font-bold flex items-center gap-2"
                            >
                              <AlertCircle className="h-4 w-4" />
                              Please ensure your contact details are correct.
                            </motion.p>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-20 rounded-[28px] font-black text-lg px-10 hover:bg-black/5"
                            onClick={() => setStep(1)}
                          >
                            <ArrowLeft className="mr-3 h-5 w-5" />
                            Return to Schedule
                          </Button>
                          <Button
                            type="button"
                            className="h-20 rounded-[28px] font-black text-xl shadow-[0_20px_40px_-10px_theme(colors.primary.DEFAULT / 0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex-1 group"
                            onClick={() => {
                              const mandatoryFields: (keyof BookingFormData)[] =
                                ["subject", "studentName", "studentEmail"];
                              const missing = mandatoryFields.filter(
                                (f) => !watchedData[f],
                              );

                              if (missing.length > 0) {
                                toast.error("Required Information Missing", {
                                  description:
                                    "Please complete all mandatory fields to proceed.",
                                  icon: (
                                    <AlertCircle className="h-5 w-5 text-destructive" />
                                  ),
                                });
                                return;
                              }
                              setStep(3);
                            }}
                          >
                            Finalize Booking
                            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, ease: "circOut" as any }}
                  >
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/70 backdrop-blur-3xl rounded-[40px] overflow-hidden border border-border/20">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                          <CreditCard className="w-48 h-48 rotate-12 text-primary" />
                        </div>
                        <CardHeader className="p-10 pb-0">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                              <CreditCard className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-3xl font-black tracking-tight">
                              Secure Checkout
                            </CardTitle>
                          </div>
                          <p className="text-muted-foreground font-medium text-lg ml-16">
                            Review and complete your booking securely.
                          </p>
                        </CardHeader>
                        <CardContent className="p-10 space-y-12">
                          {/* Trust Section */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <ShieldCheck className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-black text-sm uppercase tracking-wider mb-1">
                                  Encrypted Payment
                                </p>
                                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                  Your transaction is protected by
                                  industry-standard SSL encryption.
                                </p>
                              </div>
                            </div>
                            <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                                <CheckCircle2 className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-black text-sm uppercase tracking-wider mb-1">
                                  Satisfaction Guarantee
                                </p>
                                <p className="text-xs text-muted-foreground font-bold leading-relaxed">
                                  Full refund if you are not satisfied with your
                                  instructor.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Price Receipt */}
                          <div className="space-y-6">
                            <div className="flex items-center gap-3">
                              <h4 className="text-sm font-black uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full">
                                Final Summary
                              </h4>
                              <div className="h-px flex-1 bg-black/5" />
                            </div>

                            <div className="bg-muted/30 border border-border/20 rounded-[32px] p-8 space-y-6">
                              <div className="space-y-4">
                                <div className="flex justify-between items-center group">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                      <CalendarIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="font-bold text-muted-foreground">
                                      Session Fee
                                    </span>
                                  </div>
                                  <span className="font-black text-lg">
                                    ${teacher.hourlyRate.toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center group">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                      <Sparkles className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="font-bold text-muted-foreground">
                                      Service Fee (10%)
                                    </span>
                                  </div>
                                  <span className="font-black text-lg">
                                    ${platformFee.toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              <div className="pt-6 border-t-2 border-dashed border-black/5 flex justify-between items-end">
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">
                                    Total to Pay
                                  </p>
                                  <p className="text-4xl font-black tracking-tighter">
                                    Total Amount
                                  </p>
                                </div>
                                <p className="text-5xl font-black text-primary leading-none tracking-tighter">
                                  ${grandTotal.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Terms & CTA */}
                          <div className="space-y-8">
                            <div className="flex items-start gap-4 p-6 rounded-2xl bg-muted/20 border border-border/20 transition-all">
                              <input
                                type="checkbox"
                                id="agreeToTerms"
                                {...register("agreeToTerms", {
                                  required: "Agreement is required",
                                })}
                                className="mt-1 w-6 h-6 rounded-md accent-primary shrink-0 cursor-pointer shadow-sm"
                              />
                              <Label
                                htmlFor="agreeToTerms"
                                className="text-sm font-medium cursor-pointer leading-relaxed text-muted-foreground"
                              >
                                I verify that I have reviewed the appointment
                                details and agree to the{" "}
                                <Link
                                  to="/terms"
                                  className="text-primary font-bold hover:underline"
                                >
                                  Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                  to="/privacy"
                                  className="text-primary font-bold hover:underline"
                                >
                                  Privacy Policy
                                </Link>
                                .
                              </Label>
                            </div>

                            {errors.agreeToTerms && (
                              <motion.p
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-sm text-destructive font-black flex items-center gap-2 bg-destructive/5 p-4 rounded-xl"
                              >
                                <AlertCircle className="h-4 w-4" />
                                Please accept the terms to complete your
                                booking.
                              </motion.p>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                              <Button
                                type="button"
                                variant="ghost"
                                className="h-20 rounded-[28px] font-black text-lg px-10 hover:bg-black/5"
                                onClick={() => setStep(2)}
                              >
                                <ArrowLeft className="mr-3 h-5 w-5" />
                                Edit Details
                              </Button>
                              <Button
                                type="submit"
                                className="h-20 rounded-[28px] font-black text-xl shadow-[0_24px_48px_-12px_theme(colors.primary.DEFAULT / 0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex-1 group bg-primary relative overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                Complete Payment
                                <CreditCard className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky Professional Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                variants={itemVariants}
                className="sticky top-8 space-y-8"
              >
                <Card className="border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] bg-card/80 backdrop-blur-3xl rounded-[40px] overflow-hidden border border-border/30">
                  <div className="h-32 bg-gradient-to-br from-primary to-blue-600 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M0 0h100v100H0z" fill="url(#grid)" />
                        <defs>
                          <pattern
                            id="grid"
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M10 0v10M0 10h10"
                              stroke="currentColor"
                              strokeOpacity="0.2"
                              fill="none"
                            />
                          </pattern>
                        </defs>
                      </svg>
                    </div>
                    <div className="absolute -bottom-12 left-8">
                      <div className="p-1.5 bg-card rounded-[32px] shadow-2xl">
                        <Avatar className="h-24 w-24 rounded-[28px] border-4 border-card shadow-inner">
                          <AvatarImage
                            src={teacher.avatar}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-2xl font-black bg-primary/10 text-primary">
                            {teacher.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-10 pt-16 space-y-8">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-black tracking-tight">
                          {teacher.name}
                        </h3>
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                        </div>
                      </div>
                      <p className="text-muted-foreground font-bold text-sm tracking-wide uppercase">
                        {teacher.subjects[0]} Instructor
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-black uppercase tracking-widest text-muted-foreground/60">
                          Booking Overview
                        </span>
                        <div className="h-px flex-1 mx-4 bg-black/5" />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/10 hover:bg-card transition-colors group">
                          <div className="w-10 h-10 rounded-xl bg-card shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <CalendarIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">
                              Date & Time
                            </p>
                            <p className="font-bold text-sm">
                              {selectedDate 
                                ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { 
                                    weekday: "short", 
                                    month: "short", 
                                    day: "numeric" 
                                  }) + " at " + (selectedTime || "Select time")
                                : "Selecting..."}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/10 hover:bg-card transition-colors group">
                          <div className="w-10 h-10 rounded-xl bg-card shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">
                              Subject
                            </p>
                            <p className="font-bold text-sm">
                              {subject || "Not selected"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t-2 border-dashed border-border/30">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-black tracking-tight">
                          Investment
                        </span>
                        <span className="text-3xl font-black text-primary">
                          ${grandTotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-success/5 border border-success/10 flex items-center gap-3">
                        <ShieldCheck className="h-4 w-4 text-success" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-success">
                          Secure Enrollment
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Helpful Tip */}
                <div className="p-8 rounded-[32px] bg-primary text-primary-foreground shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                    <Sparkles className="w-24 h-24" />
                  </div>
                  <h4 className="font-black text-lg mb-2 relative">Pro Tip</h4>
                  <p className="text-primary-foreground/60 text-sm font-medium leading-relaxed relative">
                    Prepare a list of questions before your session to maximize
                    your learning time with {teacher.name.split(" ")[0]}.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
