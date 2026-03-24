import { Link } from "react-router";
import {
  Calendar,
  Clock,
  Star,
  TrendingUp,
  Video,
  ArrowRight,
  PlayCircle,
  BookOpen,
  Bell,
  MessageSquare,
  Users,
  Sparkles,
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
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { motion } from "motion/react";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import {
  fetchStudentDashboard,
  selectDashboardData,
  selectDashboardLoading,
  selectDashboardError,
} from "../redux/dashboardSlice";

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
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

function formatDate(dateString: string): {
  month: string;
  day: string;
  weekday: string;
} {
  const date = new Date(dateString);
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }),
    day: date.toLocaleDateString("en-US", { day: "numeric" }),
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
  };
}

function formatStartTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatStartDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return (amount / 100).toFixed(2);
}

export default function StudentDashboard() {
  const dispatch = useAppDispatch();
  const dashboardData = useAppSelector(selectDashboardData);
  const loading = useAppSelector(selectDashboardLoading);
  const error = useAppSelector(selectDashboardError);

  useEffect(() => {
    dispatch(fetchStudentDashboard());
  }, [dispatch]);

  console.log(dashboardData);

  const userName = dashboardData?.user?.name?.split(" ")[0] || "Student";

  const allBookings = [
    ...(dashboardData?.upcomingBookings || []),
    ...(dashboardData?.pastBookings || []),
  ];

  const upcomingBookings = allBookings
    .filter((b) => b.status === "PENDING")
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    );

  const pastBookings = allBookings
    .filter((b) => b.status !== "PENDING")
    .sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
    );

  const stats = dashboardData?.stats;
  const favoriteSubjects = dashboardData?.favoriteSubjects || [];

  if (loading && !dashboardData) {
    return (
      <div className="flex-1 min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight mb-2">
              Loading Dashboard
            </h2>
            <p className="text-muted-foreground font-medium">
              Fetching your learning data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="flex-1 min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md border-destructive/20 bg-destructive/5">
          <CardContent className="p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-black mb-3">Unable to Load</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => dispatch(fetchStudentDashboard())}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-background relative overflow-hidden font-medium text-foreground">
      <Toaster richColors />
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
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="h-4 w-4" />
                <span>Student Portal</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-foreground">
                Welcome back, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">
                  {userName}!
                </span>
              </h1>
              <p className="text-2xl text-muted-foreground/80 leading-relaxed max-w-2xl font-medium">
                Your learning momentum is peak. You have{" "}
                <span className="text-foreground font-black underline decoration-primary/30 decoration-4 underline-offset-8">
                  {upcomingBookings.length} sessions
                </span>{" "}
                locked in for this week.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/search">
                <Button className="h-18 px-10 rounded-[28px] font-black text-lg shadow-[0_20px_40px_-10px_theme(colors.primary.DEFAULT / 0.3)] hover:shadow-primary/50 transition-all active:scale-95 group">
                  Book New Session
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="h-18 w-18 rounded-[28px] border-2 border-border/10 bg-card/40 backdrop-blur-xl hover:bg-muted/50 transition-all active:scale-95"
              >
                <Link
                  to="/notifications"
                  className="h-full w-full flex items-center justify-center"
                >
                  <Bell className="h-7 w-7" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {[
              {
                label: "Total Sessions",
                value: stats?.totalSessions || 0,
                icon: BookOpen,
                trend: stats?.totalSessions
                  ? `+${Math.min(3, stats.totalSessions)} this month`
                  : "0 sessions",
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                border: "border-blue-500/10",
              },
              {
                label: "Upcoming",
                value: upcomingBookings.length,
                icon: Calendar,
                trend:
                  upcomingBookings.length > 0 ? "Next: Soon" : "No sessions",
                color: "text-primary",
                bg: "bg-primary/10",
                border: "border-primary/10",
              },
              {
                label: "Reviews Given",
                value: stats?.totalReviews || 0,
                icon: Star,
                trend: stats?.totalReviews
                  ? `${stats.totalReviews} reviews`
                  : "No reviews yet",
                color: "text-yellow-500",
                bg: "bg-yellow-500/10",
                border: "border-yellow-500/10",
              },
              {
                label: "Total Sessions",
                value: stats?.totalSessions || 0,
                icon: Clock,
                trend: `${pastBookings.length} completed`,
                color: "text-green-500",
                bg: "bg-green-500/10",
                border: "border-green-500/10",
              },
            ].map((stat, i) => (
              <Card
                key={i}
                className={`border border-border/10 bg-card/40 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-700 group overflow-hidden relative rounded-[48px]`}
              >
                <div
                  className={`absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none duration-700`}
                >
                  <stat.icon className="h-32 w-32 rotate-12 group-hover:rotate-[20deg] transition-transform duration-700" />
                </div>
                <CardContent className="p-10 relative z-10">
                  <div
                    className={`w-18 h-18 rounded-[24px] ${stat.bg} ${stat.border} border flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}
                  >
                    <stat.icon className={`h-9 w-9 ${stat.color}`} />
                  </div>
                  <div className="text-5xl font-black mb-3 tracking-tighter">
                    {stat.isCurrency ? `$${stat.value}` : stat.value}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 mb-5">
                    {stat.label}
                  </div>
                  <div
                    className={`text-xs font-black inline-flex items-center gap-2 px-4 py-2 rounded-full ${stat.bg} ${stat.color} border ${stat.border} shadow-sm transition-all duration-500 group-hover:px-6`}
                  >
                    <TrendingUp className="h-4 w-4" />
                    {stat.trend}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-16">
              <motion.div variants={itemVariants}>
                <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden group">
                  <CardHeader className="flex flex-row items-center justify-between p-10 pb-6">
                    <CardTitle className="text-3xl font-black tracking-tighter flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <PlayCircle className="h-7 w-7 text-primary animate-pulse" />
                      </div>
                      Learning Horizon
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="upcoming" className="w-full">
                      <div className="px-10 py-8">
                        <TabsList className="bg-background/20 backdrop-blur-md h-14 p-1.5 gap-2 rounded-[24px] border border-border/10 inline-flex shadow-inner">
                          <TabsTrigger
                            value="upcoming"
                            className="rounded-[20px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg shadow-none font-bold text-xs px-8 h-full transition-all duration-500"
                          >
                            Upcoming ({upcomingBookings.length})
                          </TabsTrigger>
                          <TabsTrigger
                            value="history"
                            className="rounded-[20px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg shadow-none font-bold text-xs px-8 h-full transition-all duration-500"
                          >
                            History ({pastBookings.length})
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent
                        value="upcoming"
                        className="px-10 pb-10 m-0 focus-visible:ring-0"
                      >
                        {upcomingBookings.length === 0 ? (
                          <div className="text-center py-24 bg-background/30 rounded-[40px] border-2 border-dashed border-border/20 group-hover:border-primary/20 transition-all duration-700">
                            <Calendar className="h-20 w-20 mx-auto mb-8 text-muted-foreground opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110" />
                            <h3 className="font-black text-3xl mb-4 tracking-tighter">
                              Clear Horizon
                            </h3>
                            <p className="text-muted-foreground/60 font-medium mb-10 text-xl max-w-xs mx-auto">
                              Ready to ignite your next learning breakthrough?
                            </p>
                            <Link to="/search">
                              <Button className="h-16 px-12 rounded-[24px] font-black text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">
                                Discover Mentors
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            {upcomingBookings.map((booking, i) => {
                              const formattedDate = formatStartDate(booking.startTime);
                              const formattedTime = formatStartTime(booking.startTime);
                              return (
                                <motion.div
                                  key={booking.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: i * 0.1 + 0.5,
                                    ease: [0.22, 1, 0.36, 1] as any,
                                  }}
                                  className="group/item flex flex-col lg:flex-row lg:items-center gap-8 p-6 rounded-[36px] border border-border/10 hover:border-primary/20 hover:bg-primary/5 transition-all duration-700 bg-background/40 shadow-sm relative overflow-hidden"
                                >
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-700" />

                                  <div className="flex items-center gap-5 relative z-10 shrink-0">
                                    <div className="relative">
                                      <Avatar className="h-16 w-16 border-4 border-background/50 shadow-xl group-hover/item:scale-105 transition-all duration-700">
                                        <AvatarImage
                                          src={
                                            booking.teacher?.avatar || undefined
                                          }
                                          className="object-cover"
                                        />
                                        <AvatarFallback className="font-black text-lg">
                                          {booking.teacher?.name?.charAt(0) ||
                                            "T"}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 border-4 border-background rounded-full shadow-lg" />
                                    </div>
                                    <div>
                                      <h4 className="font-black text-xl tracking-tighter group-hover/item:text-primary transition-colors">
                                        {booking.teacher?.name || "Teacher"}
                                      </h4>
                                      <Badge className="mt-1 font-black text-[9px] uppercase tracking-[0.2em] bg-primary/10 text-primary border-none px-3 py-0.5 rounded-lg">
                                        {booking.subject?.name || "Subject"}
                                      </Badge>
                                    </div>
                                  </div>

                                  <div className="flex-1 flex flex-wrap items-center gap-8 relative z-10 border-l border-border/10 pl-8 ml-2 lg:ml-0">
                                    <div className="flex items-center gap-3 text-muted-foreground/60 group-hover/item:text-primary transition-colors">
                                      <Calendar className="h-5 w-5" />
                                      <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-widest leading-none mb-1">
                                          Start Date
                                        </span>
                                        <span className="font-bold text-sm tracking-tight">
                                          {formattedDate}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground/60 group-hover/item:text-primary transition-colors">
                                      <Clock className="h-5 w-5" />
                                      <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-widest leading-none mb-1">
                                          Start Time
                                        </span>
                                        <span className="font-bold text-sm tracking-tight">
                                          {formattedTime}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="relative z-10 shrink-0 border-l border-border/10 pl-8 lg:block flex justify-end w-full lg:w-auto">
                                    <Link to={`/video/${booking.id}`}>
                                      <Button className="h-14 px-8 rounded-[20px] font-black text-base shadow-xl shadow-primary/10 hover:shadow-primary/30 transition-all active:scale-95 group/btn">
                                        <Video className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-500" />
                                        Enter Lounge
                                      </Button>
                                    </Link>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent
                        value="history"
                        className="px-10 pb-10 m-0 focus-visible:ring-0"
                      >
                        {pastBookings.length === 0 ? (
                          <div className="text-center py-16 bg-background/30 rounded-[40px] border-2 border-dashed border-border/20">
                            <Clock className="h-16 w-16 mx-auto mb-6 text-muted-foreground/20" />
                            <h3 className="font-black text-2xl mb-3">
                              No History Yet
                            </h3>
                            <p className="text-muted-foreground/60 text-sm">
                              Your completed sessions will appear here.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {pastBookings.map((booking) => {
                              const formattedDate = formatStartDate(booking.startTime);
                              return (
                                <div
                                  key={booking.id}
                                  className="group flex items-center gap-5 p-5 rounded-[28px] border border-border/10 hover:bg-muted/20 transition-all duration-500 bg-background/20"
                                >
                                  <div className="relative">
                                    <Avatar className="h-12 w-12 border-2 border-background shadow-lg group-hover:scale-105 transition-transform">
                                      <AvatarImage
                                        src={
                                          booking.teacher?.avatar || undefined
                                        }
                                        className="object-cover"
                                      />
                                      <AvatarFallback className="font-black">
                                        {booking.teacher?.name?.charAt(0) ||
                                          "T"}
                                      </AvatarFallback>
                                    </Avatar>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-black text-base tracking-tight group-hover:text-primary transition-colors">
                                      {booking.teacher?.name || "Teacher"}
                                    </h4>
                                    <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest mt-0.5">
                                      {booking.subject?.name || "Subject"}{" "}
                                      <span className="mx-2 opacity-30">•</span>{" "}
                                      {formattedDate}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xl font-black text-foreground tracking-tighter leading-none mb-1 capitalize">
                                      {booking.status.toLowerCase()}
                                    </div>
                                    <div className="flex items-center justify-end gap-1.5 text-green-500 text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-green-500/10 bg-green-500/5">
                                      $
                                      {formatCurrency(
                                        booking.payment?.amount || 0,
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-16">
              {/* Learning Progress */}
              <motion.div variants={itemVariants}>
                <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden">
                  <CardHeader className="p-10 pb-4">
                    <CardTitle className="text-2xl font-black tracking-tighter">
                      Velocity & Mastery
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 pt-4 space-y-10">
                    {favoriteSubjects.length > 0 ? (
                      favoriteSubjects.map((subject, i) => (
                        <div key={subject.id} className="space-y-4">
                          <div className="flex justify-between items-end">
                            <span className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">
                              {subject.name}
                            </span>
                            <span className="text-primary font-black text-xl tracking-tighter leading-none">
                              85%
                            </span>
                          </div>
                          <div className="h-4 w-full bg-background/50 rounded-full overflow-hidden p-1 shadow-inner group/progress">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "85%" }}
                              transition={{
                                duration: 1.5,
                                delay: i * 0.2,
                                ease: [0.22, 1, 0.36, 1] as any,
                              }}
                              className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full shadow-[0_4px_12px_rgba(59,130,246,0.3)] group-hover/progress:shadow-[0_4px_24px_rgba(59,130,246,0.5)] transition-shadow duration-500"
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm text-center py-8">
                        No favorite subjects yet. Book sessions to track
                        progress!
                      </p>
                    )}
                    <div className="pt-10 border-t border-border/10">
                      <div className="flex items-center gap-5 p-6 rounded-[32px] bg-primary/5 border border-primary/10 group hover:bg-primary/10 transition-all duration-500 cursor-default">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                          <Star className="h-7 w-7 fill-current shadow-[0_0_20px_rgba(var(--primary),0.4)]" />
                        </div>
                        <div>
                          <p className="text-lg font-black tracking-tight">
                            Keep Learning!
                          </p>
                          <p className="text-xs text-muted-foreground/60 font-black uppercase tracking-wider mt-1">
                            Book sessions to earn badges
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Messages */}
              <motion.div variants={itemVariants}>
                <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden">
                  <CardHeader className="p-10 pb-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-black tracking-tighter">
                      Nexus
                    </CardTitle>
                    <Link to="/chat">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all active:scale-95"
                      >
                        <MessageSquare className="h-6 w-6" />
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="p-10 pt-4 space-y-6">
                    {dashboardData?.favoriteTeachers &&
                    dashboardData.favoriteTeachers.length > 0 ? (
                      dashboardData.favoriteTeachers
                        .slice(0, 3)
                        .map((teacher) => (
                          <Link
                            key={teacher.id}
                            to="/chat"
                            className="flex items-center gap-5 p-4 hover:bg-background/40 rounded-[28px] transition-all cursor-pointer group border border-transparent hover:border-border/10"
                          >
                            <Avatar className="h-14 w-14 border-4 border-background/50 shadow-xl group-hover:scale-105 transition-all duration-700">
                              <AvatarImage
                                src={teacher.avatar || undefined}
                                className="object-cover"
                              />
                              <AvatarFallback className="font-black">
                                {teacher.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                              <div className="flex justify-between items-center mb-1">
                                <p className="text-base font-black tracking-tight group-hover:text-primary transition-colors">
                                  {teacher.name}
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground/60 truncate font-medium group-hover:text-muted-foreground transition-colors">
                                Your favorite teacher
                              </p>
                            </div>
                          </Link>
                        ))
                    ) : (
                      <p className="text-muted-foreground text-sm text-center py-6">
                        No favorite teachers yet.
                      </p>
                    )}
                    <Link to="/chat">
                      <Button
                        variant="outline"
                        className="w-full h-14 rounded-[20px] font-black text-[10px] uppercase tracking-[0.2em] border-2 border-border/10 bg-background/20 hover:bg-muted/50 transition-all mt-6"
                      >
                        Access Inbox Hub
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recruitment/Recommendation */}
              <motion.div variants={itemVariants}>
                <Card className="border-none bg-gradient-to-br from-primary via-blue-700 to-indigo-900 text-primary-foreground shadow-[0_40px_80px_-20px_rgba(59,130,246,0.4)] rounded-[48px] overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000">
                    <Users className="w-48 h-48" />
                  </div>
                  <CardHeader className="p-10 pb-4">
                    <CardTitle className="text-3xl font-black tracking-tighter relative z-10 leading-tight">
                      Elevate Your <br />
                      Network
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 pt-4 relative z-10">
                    <p className="text-lg font-medium opacity-80 mb-10 leading-relaxed max-w-[200px]">
                      Curated elite mentors based on your interests.
                    </p>
                    <Link to="/search">
                      <Button
                        variant="secondary"
                        className="w-full h-16 rounded-[24px] font-black text-lg bg-white/10 hover:bg-white text-white hover:text-primary backdrop-blur-xl transition-all shadow-2xl group/rec"
                      >
                        Explore Elite
                        <ArrowRight className="ml-3 h-6 w-6 group-hover/rec:translate-x-1.5 transition-transform" />
                      </Button>
                    </Link>
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
