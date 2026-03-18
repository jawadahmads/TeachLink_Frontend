import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
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
import { mockTeachers } from "../data/mockData";
import { motion, AnimatePresence } from "motion/react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchGigs } from "../redux/gigSlice";

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

export default function BookingPage() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gigs, loading, error } = useAppSelector((state) => state.gig);

  useEffect(() => {
    if (gigs.length === 0) {
      dispatch(fetchGigs());
    }
  }, [dispatch, gigs.length]);

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

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [subject, setSubject] = useState(teacher.subjects[0]);
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);

  const handleBooking = () => {
    // Mock booking
    navigate("/student/dashboard");
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-10"
        >
          {/* Header & Progress */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <Link
                to={`/teacher/${teacher.id}`}
                className="inline-flex items-center text-primary font-bold mb-4 hover:gap-2 transition-all"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Profile
              </Link>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Book Your <span className="text-primary">Session</span>
              </h1>
              <p className="text-muted-foreground font-medium mt-2">
                Experience world-class learning with {teacher.name}
              </p>
            </div>

            {/* Modern Stepper */}
            <div className="flex items-center bg-card/50 backdrop-blur-xl p-2 rounded-2xl border border-border/50 shadow-sm">
              {steps.map((s, idx) => (
                <div key={s.id} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      step === s.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : step > s.id
                          ? "text-success font-bold"
                          : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        step === s.id
                          ? "bg-white text-primary"
                          : step > s.id
                            ? "bg-success/20 text-success"
                            : "bg-muted"
                      }`}
                    >
                      {step > s.id ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        s.id
                      )}
                    </div>
                    <span className="text-sm font-black hidden sm:block">
                      {s.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-8 h-px bg-border mx-2 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[32px] overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <CalendarIcon className="w-32 h-32 rotate-12 text-primary" />
                      </div>
                      <CardHeader className="p-8 pb-0">
                        <CardTitle className="text-2xl font-black">
                          1. Select Date & Time
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-10">
                        <div className="space-y-6">
                          <Label className="text-lg font-black block">
                            Choose a Day
                          </Label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {teacher.availability.map((day, index) => (
                              <Button
                                key={index}
                                variant={
                                  selectedDay === day.day
                                    ? "default"
                                    : "outline"
                                }
                                className={`h-16 rounded-2xl font-bold border-2 transition-all ${
                                  selectedDay === day.day
                                    ? "shadow-lg shadow-primary/20 scale-[1.02]"
                                    : "hover:border-primary/50"
                                }`}
                                onClick={() => {
                                  setSelectedDay(day.day);
                                  setSelectedTime("");
                                }}
                              >
                                <CalendarIcon className="h-5 w-5 mr-3" />
                                {day.day}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {selectedDay && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6 pt-6 border-t border-border/50"
                          >
                            <Label className="text-lg font-black block">
                              Available Time Slots
                            </Label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {teacher.availability
                                .find((d) => d.day === selectedDay)
                                ?.slots.map((slot, index) => (
                                  <Button
                                    key={index}
                                    variant={
                                      selectedTime === slot
                                        ? "default"
                                        : "outline"
                                    }
                                    className={`h-12 rounded-xl font-bold border-2 transition-all ${
                                      selectedTime === slot
                                        ? "shadow-md shadow-primary/20"
                                        : "hover:border-primary/50"
                                    }`}
                                    onClick={() => setSelectedTime(slot)}
                                  >
                                    <Clock className="h-4 w-4 mr-2" />
                                    {slot}
                                  </Button>
                                ))}
                            </div>
                          </motion.div>
                        )}

                        <div className="p-6 rounded-2xl border-2 border-primary bg-primary/5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Clock className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <p className="font-black text-lg">
                                  60 min Session
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Standard session duration
                                </p>
                              </div>
                            </div>
                            <p className="text-2xl font-black text-primary">
                              ${teacher.hourlyRate}
                            </p>
                          </div>
                        </div>

                        <Button
                          className="w-full h-16 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.01]"
                          disabled={!selectedDay || !selectedTime}
                          onClick={() => setStep(2)}
                        >
                          Continue to Details
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[32px] overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <BookOpen className="w-32 h-32 rotate-12 text-primary" />
                      </div>
                      <CardHeader className="p-8 pb-0">
                        <CardTitle className="text-2xl font-black">
                          2. Session Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-10">
                        <div className="space-y-6">
                          <Label className="text-lg font-black block">
                            What subject are we focusing on?
                          </Label>
                          <div className="flex flex-wrap gap-3">
                            {teacher.subjects.map((s, index) => (
                              <Button
                                key={index}
                                variant={subject === s ? "default" : "outline"}
                                className={`h-14 px-6 rounded-2xl font-bold border-2 transition-all ${
                                  subject === s
                                    ? "shadow-md shadow-primary/20"
                                    : "hover:border-primary/50"
                                }`}
                                onClick={() => setSubject(s)}
                              >
                                {s}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-border/50">
                          <Label
                            htmlFor="notes"
                            className="text-lg font-black block"
                          >
                            Session Notes (Optional)
                          </Label>
                          <Textarea
                            id="notes"
                            placeholder="Tell the teacher what you'd like to focus on in this session, any specific questions or topics..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="min-h-[150px] rounded-2xl border-2 focus-visible:ring-primary p-4 font-medium text-lg"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            variant="outline"
                            className="h-16 rounded-2xl font-black text-lg border-2 flex-1"
                            onClick={() => setStep(1)}
                          >
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Back
                          </Button>
                          <Button
                            className="h-16 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 flex-[2] transition-all hover:scale-[1.01]"
                            onClick={() => setStep(3)}
                          >
                            Proceed to Payment
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[32px] overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <CreditCard className="w-32 h-32 rotate-12 text-primary" />
                      </div>
                      <CardHeader className="p-8 pb-0">
                        <CardTitle className="text-2xl font-black">
                          3. Confirm & Pay
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-10">
                        <div className="p-6 rounded-3xl bg-primary/10 border border-primary/20 relative overflow-hidden group">
                          <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <ShieldCheck className="w-24 h-24 rotate-12" />
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                              <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-black text-lg text-foreground mb-1">
                                Secure Payment Gateway
                              </h4>
                              <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
                                This is a demonstration environment. In
                                production, we use industry-standard encryption
                                to protect your transaction.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-border/50">
                          <h4 className="font-black text-lg mb-4">
                            Price Breakdown
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between font-bold">
                              <span className="text-muted-foreground">
                                Session fee (60 min)
                              </span>
                              <span className="text-foreground">
                                ${teacher.hourlyRate.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between font-bold">
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <span>Platform fee (10%)</span>
                                <Info className="h-3 w-3" />
                              </div>
                              <span className="text-foreground">
                                ${platformFee.toFixed(2)}
                              </span>
                            </div>
                            <div className="border-t-2 border-dashed border-border/50 pt-4 flex justify-between">
                              <span className="text-xl font-black">
                                Total Amount
                              </span>
                              <span className="text-2xl font-black text-primary">
                                ${grandTotal.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                          <Button
                            variant="outline"
                            className="h-16 rounded-2xl font-black text-lg border-2 flex-1"
                            onClick={() => setStep(2)}
                          >
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Back
                          </Button>
                          <Button
                            className="h-16 rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 flex-[2] transition-all hover:scale-[1.01] bg-primary"
                            onClick={handleBooking}
                          >
                            Confirm & Pay Now
                            <CreditCard className="ml-2 h-5 w-5" />
                          </Button>
                        </div>

                        <p className="text-center text-xs font-bold text-muted-foreground flex items-center justify-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-success" />
                          Money-back guarantee if you're not satisfied with your
                          first session.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px] sticky top-24 overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                  <CardHeader>
                    <CardTitle className="text-xl font-black">
                      Booking Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Teacher Info */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                      <Avatar className="h-16 w-16 border-4 border-background shadow-lg">
                        <AvatarImage
                          src={teacher.avatar}
                          alt={teacher.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="font-black bg-primary/10 text-primary">
                          {teacher.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-black text-foreground leading-tight">
                          {teacher.name}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-500 mt-1">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs font-black text-foreground">
                            {teacher.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-5">
                      {selectedDay && selectedTime ? (
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                            <CalendarIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                              Date & Time
                            </p>
                            <p className="text-sm font-bold text-foreground">
                              {selectedDay}, {selectedTime}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-4 opacity-50 italic">
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                            <CalendarIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                              Date & Time
                            </p>
                            <p className="text-sm font-bold text-muted-foreground">
                              Not selected yet
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                            Duration & Subject
                          </p>
                          <p className="text-sm font-bold text-foreground">
                            60 mins • {subject}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                            Investment
                          </p>
                          <p className="text-2xl font-black text-primary leading-none mt-1">
                            ${grandTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badge */}
                    <div className="pt-6 border-t border-border/50">
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-success/5 border border-success/20">
                        <ShieldCheck className="h-5 w-5 text-success" />
                        <span className="text-xs font-black text-success uppercase tracking-widest">
                          Protected Booking
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tips Sidebar */}
              <motion.div variants={itemVariants}>
                <Card className="border-none bg-muted/30 shadow-lg rounded-[32px] overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4 text-primary">
                      <Sparkles className="h-5 w-5" />
                      <h4 className="font-black">Pro Tip</h4>
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
                      Complete your profile to help {teacher.name.split(" ")[0]}{" "}
                      prepare better for your first session. You can share
                      documents in the classroom after booking.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
