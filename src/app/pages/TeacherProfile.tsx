import { useParams, Link } from "react-router";
import { useState, useLayoutEffect } from "react";
import {
  Star,
  MapPin,
  Languages,
  GraduationCap,
  Clock,
  Users,
  Video,
  Calendar,
  CheckCircle2,
  Award,
  BookOpen,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useAppSelector } from "../redux/store";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { getTeacherInfoById } from "../api/teacherInfo";

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

export default function TeacherProfile() {
  const { userId } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [teacherData, setTeacherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    const fetchTeacherData = async () => {
      if (!userId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }
      try {
        const data = await getTeacherInfoById(userId);
        console.log(data);
        setTeacherData(data);
      } catch (err) {
        setError("Failed to fetch teacher data");
        toast.error("Failed to fetch teacher data");
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h3 className="text-2xl font-black">Loading...</h3>
        </div>
      </div>
    );
  }

  if (error || !teacherData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-black mb-2">Teacher Not Found</h3>
          <p className="text-muted-foreground">
            {error || "Unable to load teacher profile"}
          </p>
        </div>
      </div>
    );
  }

  const teacher = teacherData.teacher || teacherData;
  const gig = teacherData.gig || teacherData.gigs?.[0] || null;
  const teacherId = teacher?.id || userId || "";
  const teacherName = teacher?.name || "Teacher";
  const teacherAvatar = teacher?.avatar || teacher?.profileImage || "";
  const teacherVerified = teacher?.verified ?? false;
  const teacherRating = teacher?.rating ?? 0;
  const teacherReviewCount = teacher?.reviewCount ?? 0;
  const teacherHourlyRate = teacher?.hourlyRate ?? 0;
  const teacherBio = teacher?.bio || teacher?.about || "";
  const teacherEducation = teacher?.education || "";
  const teacherExperience = teacher?.experience || "";
  const teacherTotalStudents = teacher?.totalStudents ?? 0;
  const teacherTotalHours = teacher?.totalHours ?? 0;
  const teacherResponseTime = teacher?.responseTime || "";
  const subjects =
    teacher?.subjects?.map((s: { name: string }) => s.name) ||
    teacher?.subjects ||
    [];
  const availability = teacher?.availability || [];
  const languages =
    teacher?.languages?.map((l: { name: string }) => l.name) ||
    teacher?.languages ||
    [];
  const apiReviews = teacher?.reviews || teacher?.reviewsReceived || [];
  const teacherReviews =
    apiReviews.length > 0
      ? apiReviews.map(
          (r: {
            id: string;
            studentId?: string;
            comment: string;
            rating: number;
            student?: { name: string; avatar?: string };
          }) => ({
            id: r.id,
            studentId: r.studentId || r.student?.id || "",
            studentName: r.student?.name || "Student",
            studentAvatar: r.student?.avatar || "",
            teacherId: teacherId,
            rating: r.rating,
            comment: r.comment,
            date: new Date().toISOString(),
            subject: "General",
          }),
        )
      : [];

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
          {/* Hero Header Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl overflow-hidden rounded-[40px]">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Sparkles className="w-64 h-64 rotate-12" />
              </div>
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start text-center lg:text-left">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Avatar className="h-40 w-40 sm:h-48 sm:w-48 border-[6px] border-background shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105">
                      <AvatarImage
                        src={teacherAvatar}
                        alt={teacherName}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-5xl font-black bg-primary/10 text-primary">
                        {teacherName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {teacherVerified && (
                      <div className="absolute -bottom-2 right-4 z-20 bg-primary text-primary-foreground p-2 rounded-full shadow-xl border-4 border-background">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                      <div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
                          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
                            {teacherName}
                          </h1>
                          <Badge className="bg-primary/10 text-primary border-primary/20 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-widest">
                            Top Rated Teacher
                          </Badge>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                          <div className="flex items-center gap-1.5 text-yellow-500">
                            <Star className="h-6 w-6 fill-current" />
                            <span className="font-black text-xl text-foreground">
                              {teacherRating}
                            </span>
                          </div>
                          <span className="text-muted-foreground font-bold">
                            ({teacherReviewCount} verified reviews)
                          </span>
                        </div>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                          {subjects ??
                            subjects.map((subject: string, index: number) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-muted px-4 py-1.5 rounded-full text-sm font-bold"
                              >
                                {subject}
                              </Badge>
                            ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-center lg:items-end gap-4 min-w-[200px]">
                        <div className="text-center lg:text-right">
                          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
                            Hourly Rate
                          </p>
                          <div className="text-5xl font-black text-primary leading-none">
                            ${teacherHourlyRate}
                            <span className="text-lg font-bold text-muted-foreground ml-1">
                              /hr
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                          {(!user ||
                            (user.role &&
                              user.role.toLowerCase() !== "teacher")) &&
                            user?.id !== teacherId && (
                              <>
                                <Link
                                  to={`/booking/${teacherId}`}
                                  className="w-full"
                                >
                                  <Button
                                    size="lg"
                                    className="w-full h-14 rounded-2xl font-black shadow-xl shadow-primary/20 text-lg group"
                                  >
                                    Book a Lesson
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                  </Button>
                                </Link>
                                <Link to="/chat" className="w-full">
                                  <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full h-14 rounded-2xl font-black border-2 text-lg"
                                  >
                                    <MessageSquare className="mr-2 h-5 w-5" />
                                    Send Message
                                  </Button>
                                </Link>
                              </>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/50">
                      <div className="flex items-center justify-center lg:justify-start gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                            Students
                          </p>
                          <p className="text-sm font-bold">
                            {teacherTotalStudents}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                          <Video className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                            Experience
                          </p>
                          <p className="text-sm font-bold">
                            {teacherTotalHours}h taught
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                            Response
                          </p>
                          <p className="text-sm font-bold">
                            {teacherResponseTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                          <Languages className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                            Languages
                          </p>
                          <p className="text-sm font-bold truncate max-w-[100px]">
                            {languages.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-10">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full h-16 bg-card/30 backdrop-blur-xl rounded-2xl p-2 border border-border/50">
                  <TabsTrigger
                    value="about"
                    className="flex-1 rounded-xl font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm"
                  >
                    About Me
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="flex-1 rounded-xl font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm"
                  >
                    Student Reviews ({teacherReviews.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="availability"
                    className="flex-1 rounded-xl font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm"
                  >
                    Availability
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <TabsContent
                    value="about"
                    className="mt-8 focus-visible:ring-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Card className="border-none shadow-lg bg-card/50 backdrop-blur-xl rounded-[32px]">
                        <CardHeader>
                          <CardTitle className="text-2xl font-black">
                            Biography
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                            {teacherBio}
                          </p>

                          <div className="grid sm:grid-cols-2 gap-8">
                            <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                  <GraduationCap className="h-6 w-6" />
                                </div>
                                <h3 className="font-black text-lg">
                                  Education
                                </h3>
                              </div>
                              <p className="text-muted-foreground font-semibold">
                                {teacherEducation}
                              </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                  <Award className="h-6 w-6" />
                                </div>
                                <h3 className="font-black text-lg">
                                  Certification
                                </h3>
                              </div>
                              <p className="text-muted-foreground font-semibold">
                                {teacherExperience}
                              </p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-black mb-6">
                              Expertise & Specialties
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              {subjects.map(
                                (subject: string, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 px-5 py-3 bg-primary/5 rounded-2xl border border-primary/10 hover:border-primary/40 transition-colors group cursor-default"
                                  >
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span className="font-black text-sm">
                                      {subject}
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent
                    value="reviews"
                    className="mt-8 focus-visible:ring-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="border-none shadow-lg bg-card/50 backdrop-blur-xl rounded-[32px]">
                        <CardHeader className="flex flex-row items-center justify-between">
                          <CardTitle className="text-2xl font-black">
                            Community Feedback
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-lg">
                              {teacherRating}
                            </span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i <= Math.round(teacherRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {teacherReviews.map((review, i) => (
                              <motion.div
                                key={review.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-3xl border border-border/50 hover:border-primary/50 transition-all bg-card shadow-sm group"
                              >
                                <div className="flex items-start gap-5">
                                  <Avatar className="h-14 w-14 border-2 border-background shadow-md">
                                    <AvatarImage
                                      src={review.studentAvatar}
                                      alt={review.studentName}
                                    />
                                    <AvatarFallback className="font-bold">
                                      {review.studentName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="text-lg font-black group-hover:text-primary transition-colors">
                                        {review.studentName}
                                      </h4>
                                      <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                                        {new Date(
                                          review.date,
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 mb-3">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < review.rating
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-muted"
                                          }`}
                                        />
                                      ))}
                                      <Badge
                                        variant="secondary"
                                        className="ml-2 h-6 font-bold text-[10px] rounded-full"
                                      >
                                        {review.subject}
                                      </Badge>
                                    </div>
                                    <p className="text-muted-foreground font-medium leading-relaxed">
                                      {review.comment}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent
                    value="availability"
                    className="mt-8 focus-visible:ring-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="border-none shadow-lg bg-card/50 backdrop-blur-xl rounded-[32px]">
                        <CardHeader>
                          <CardTitle className="text-2xl font-black">
                            Weekly Schedule
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {availability.map(
                              (
                                day: { day: string; slots: string[] },
                                index: number,
                              ) => (
                                <div
                                  key={index}
                                  className="p-6 rounded-3xl border border-border/50 bg-card hover:border-primary/50 transition-all group"
                                >
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                      <Calendar className="h-5 w-5" />
                                    </div>
                                    <h4 className="font-black text-lg">
                                      {day.day}
                                    </h4>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {day.slots.map((slot, i) => (
                                      <Badge
                                        key={i}
                                        variant="outline"
                                        className="px-3 py-1 font-bold rounded-lg border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-default"
                                      >
                                        {slot}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                          <Link to={`/booking/${teacherId}`}>
                            <Button
                              size="lg"
                              className="w-full mt-10 h-16 rounded-[24px] font-black text-lg shadow-xl shadow-primary/20"
                            >
                              Secure Your Spot Now
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </div>

            {/* Sidebar Columns */}
            <div className="space-y-8">
              {/* Rating Breakdown */}
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px] overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl font-black">
                      Performance Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = teacherReviews.filter(
                        (r) => r.rating === rating,
                      ).length;
                      const total = teacherReviews.length || 1;
                      const percentage = (count / total) * 100;
                      return (
                        <div key={rating} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-black">
                            <div className="flex items-center gap-1.5">
                              <span>{rating} Stars</span>
                              <div className="flex gap-0.5">
                                {[...Array(rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-muted-foreground">
                              {count}
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Safety & Vetting */}
              <motion.div variants={itemVariants}>
                <Card className="border-none bg-primary text-primary-foreground shadow-2xl rounded-[32px] overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <ShieldCheck className="w-32 h-32 rotate-12" />
                  </div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-2xl font-black mb-4">
                      TeachLink Shield
                    </h3>
                    <p className="text-sm font-semibold opacity-90 leading-relaxed mb-6">
                      Every tutor undergoes background checks and rigorous
                      vetting to ensure educational excellence and student
                      safety.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs font-black bg-white/10 p-3 rounded-xl border border-white/10">
                        <CheckCircle2 className="h-4 w-4" />
                        Identity Verified
                      </div>
                      <div className="flex items-center gap-3 text-xs font-black bg-white/10 p-3 rounded-xl border border-white/10">
                        <CheckCircle2 className="h-4 w-4" />
                        Academic Vetted
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Analytics */}
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px]">
                  <CardHeader>
                    <CardTitle className="text-xl font-black flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Popularity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border/50">
                      <span className="text-sm font-bold text-muted-foreground">
                        Rebooking Rate
                      </span>
                      <span className="font-black text-primary">95%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border/50">
                      <span className="text-sm font-bold text-muted-foreground">
                        Response Rate
                      </span>
                      <span className="font-black text-primary">99%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border/50">
                      <span className="text-sm font-bold text-muted-foreground">
                        Session Completion
                      </span>
                      <span className="font-black text-primary">100%</span>
                    </div>
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
