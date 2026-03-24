import { Link } from "react-router";
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  Video,
  Star,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  MessageSquare,
  Bell,
  Award,
  Zap,
  Sparkles,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { mockTeachers, mockSessions } from "../../../data/mockData";
import { motion } from "motion/react";
import type { Session, Teacher } from "../../../types";

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

export default function TeacherDashboard() {
  const teacher = mockTeachers[0]; // Current teacher
  const teacherSessions = mockSessions.filter(
    (s) => s.teacherId === teacher.id,
  );
  const upcomingSessions = teacherSessions.filter(
    (s) => s.status === "upcoming",
  );
  const completedSessions = teacherSessions.filter(
    (s) => s.status === "completed",
  );

  const monthlyEarnings = teacherSessions
    .filter((s) => s.status === "completed")
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="flex-1 min-h-screen bg-background relative overflow-hidden font-medium text-foreground">
      {/* Premium Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute bottom-[5%] right-[-10%] w-[45%] h-[45%] bg-purple-500/10 rounded-full blur-[140px] animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 pb-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section: High-Impact Cinematic */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="h-4 w-4" />
                <span>Teacher Elite Portal</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-foreground">
                Welcome back, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-indigo-600">
                  {teacher.name.split(" ")[1]}!
                </span>
              </h1>
              <p className="text-2xl text-muted-foreground/80 leading-relaxed max-w-2xl font-medium">
                Your schedule is packed with potential. You have{" "}
                <span className="text-foreground font-black underline decoration-primary/30 decoration-4 underline-offset-8">
                  {upcomingSessions.length} sessions
                </span>{" "}
                hitting your calendar today and tomorrow.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/teacher/manage-profile">
                <Button className="h-18 px-10 rounded-[28px] font-black text-lg shadow-[0_20px_40px_-10px_theme(colors.primary.DEFAULT / 0.3)] hover:shadow-primary/50 transition-all active:scale-95 group">
                  Refine Profile
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-18 w-18 rounded-[28px] border-2 border-border/10 bg-card/40 backdrop-blur-xl hover:bg-muted/50 transition-all active:scale-95 relative"
                >
                  <Link
                    to={"/notifications"}
                    className="h-full w-full flex items-center justify-center"
                  >
                    <Bell className="h-7 w-7" />
                  </Link>
                  <span className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full border-4 border-card animate-pulse" />
                </Button>
                <Link to={`/teacher/${teacher.id}`}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-18 w-18 rounded-[28px] border-2 border-border/10 bg-card/40 backdrop-blur-xl hover:bg-muted/50 transition-all active:scale-95"
                  >
                    <Users className="h-7 w-7" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid: Glassmorphism Evolution */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {[
              {
                label: "Monthly Earnings",
                value: `$${monthlyEarnings}`,
                icon: DollarSign,
                trend: "+15% vs last month",
                color: "text-green-500",
                bg: "bg-green-500/10",
                border: "border-green-500/10",
              },
              {
                label: "Total Students",
                value: teacher.totalStudents,
                icon: Users,
                trend: "+12 new this month",
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                border: "border-blue-500/10",
              },
              {
                label: "Avg. Rating",
                value: teacher.rating,
                icon: Star,
                trend: `From ${teacher.reviewCount} reviews`,
                color: "text-yellow-500",
                bg: "bg-yellow-500/10",
                border: "border-yellow-500/10",
              },
              {
                label: "Teaching Hours",
                value: teacher.totalHours,
                icon: Clock,
                trend: "+24 this month",
                color: "text-primary",
                bg: "bg-primary/10",
                border: "border-primary/10",
              },
            ].map((stat, i) => (
              <Card
                key={i}
                className="border border-border/10 bg-card/40 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-700 group overflow-hidden relative rounded-[48px]"
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
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/60 mb-5">
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
                  <CardHeader className="p-10 pb-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-3xl font-black tracking-tighter flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <PlayCircle className="h-7 w-7 text-primary animate-pulse" />
                        </div>
                        Teaching Horizon
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="upcoming" className="w-full">
                      <div className="px-10 py-8">
                        <TabsList className="bg-background/20 backdrop-blur-md h-16 p-2 gap-2 rounded-[32px] border border-border/10 inline-flex shadow-inner">
                          <TabsTrigger
                            value="upcoming"
                            className="rounded-[24px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg shadow-none font-bold text-sm px-10 h-full transition-all duration-500"
                          >
                            Upcoming ({upcomingSessions.length})
                          </TabsTrigger>
                          <TabsTrigger
                            value="completed"
                            className="rounded-[24px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg shadow-none font-bold text-sm px-10 h-full transition-all duration-500"
                          >
                            Completed ({completedSessions.length})
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent
                        value="upcoming"
                        className="px-10 pb-10 m-0 focus-visible:ring-0"
                      >
                        {upcomingSessions.length === 0 ? (
                          <div className="text-center py-24 bg-background/30 rounded-[40px] border-2 border-dashed border-border/20">
                            <Calendar className="h-20 w-20 mx-auto mb-8 text-muted-foreground opacity-10" />
                            <h3 className="font-black text-3xl mb-4 tracking-tighter">
                              Zen Calendar
                            </h3>
                            <p className="text-muted-foreground/60 font-medium text-xl">
                              Your schedule is a blank canvas today.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            {upcomingSessions.map((session, i) => (
                              <motion.div
                                key={session.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: i * 0.1,
                                  ease: [0.22, 1, 0.36, 1] as any,
                                }}
                                className="group/item flex flex-col lg:flex-row lg:items-center gap-8 p-6 rounded-[36px] border border-border/10 hover:border-primary/40 hover:bg-primary/10 transition-all duration-700 bg-background/40 shadow-sm relative overflow-hidden"
                              >
                                <div className="flex items-center gap-5 relative z-10 shrink-0">
                                  <div className="relative">
                                    <Avatar className="h-16 w-16 border-4 border-background/50 shadow-xl group-hover/item:scale-105 transition-all duration-700">
                                      <AvatarImage
                                        src={session.studentAvatar}
                                        className="object-cover"
                                      />
                                      <AvatarFallback className="font-black text-lg">
                                        {session.studentName.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 border-4 border-background rounded-full pulse-green" />
                                  </div>
                                  <div>
                                    <h4 className="font-black text-xl tracking-tight group-hover/item:text-primary transition-colors">
                                      {session.studentName}
                                    </h4>
                                    <Badge className="mt-1 font-black text-[9px] uppercase tracking-[0.2em] bg-primary/10 text-primary border-none px-3 py-0.5 rounded-lg">
                                      {session.subject}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="flex-1 flex flex-wrap items-center gap-8 relative z-10 border-l border-border/10 pl-8 ml-2 lg:ml-0">
                                  <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground/60 group-hover/item:text-primary transition-colors" />
                                    <div className="flex flex-col">
                                      <span className="text-[9px] font-black text-muted-foreground/80 uppercase tracking-widest leading-none mb-1">
                                        Date
                                      </span>
                                      <span className="font-bold text-sm tracking-tight">
                                        {new Date(
                                          session.date,
                                        ).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          weekday: "short",
                                        })}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-muted-foreground/60 group-hover/item:text-primary transition-colors" />
                                    <div className="flex flex-col">
                                      <span className="text-[9px] font-black text-muted-foreground/80 uppercase tracking-widest leading-none mb-1">
                                        Time
                                      </span>
                                      <span className="font-bold text-sm tracking-tight">
                                        {session.time}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between lg:justify-end gap-10 relative z-10 shrink-0 border-l border-border/10 pl-8">
                                  <div className="text-right">
                                    <p className="text-[9px] font-black text-muted-foreground/80 uppercase tracking-widest mb-0.5">
                                      Yield
                                    </p>
                                    <p className="text-2xl font-black text-green-600 tracking-tighter">
                                      ${session.price}
                                    </p>
                                  </div>
                                  <Link to={`/video/${session.id}`}>
                                    <Button className="h-14 px-8 rounded-[20px] font-black text-base shadow-xl shadow-primary/10 hover:shadow-primary/30 transition-all active:scale-95 group/btn">
                                      <Video className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-500" />
                                      Launch
                                    </Button>
                                  </Link>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent
                        value="completed"
                        className="px-10 pb-10 m-0 focus-visible:ring-0"
                      >
                        <div className="space-y-4">
                          {completedSessions.map((session, i) => (
                            <div
                              key={session.id}
                              className="group flex items-center gap-6 p-5 rounded-[28px] border border-border/10 hover:bg-muted/20 transition-all duration-500 bg-background/20"
                            >
                              <Avatar className="h-12 w-12 border-2 border-background shadow-lg">
                                <AvatarImage
                                  src={session.studentAvatar}
                                  className="object-cover"
                                />
                                <AvatarFallback className="font-black">
                                  {session.studentName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h4 className="font-black text-base tracking-tight">
                                  {session.studentName}
                                </h4>
                                <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest mt-0.5">
                                  {session.subject}{" "}
                                  <span className="mx-2 opacity-30">•</span>{" "}
                                  {new Date(session.date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-black text-green-600 tracking-tighter leading-none">
                                  +${session.price}
                                </p>
                                {session.rating && (
                                  <div className="flex items-center gap-1 text-yellow-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1.5 backdrop-blur-sm bg-yellow-500/5 px-2.5 py-0.5 rounded-full border border-yellow-500/10">
                                    <Star className="h-2.5 w-2.5 fill-current" />
                                    {session.rating}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Performance Insights: High-Fidelity Data */}
              <motion.div
                variants={itemVariants}
                className="grid sm:grid-cols-2 gap-10"
              >
                <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden group">
                  <CardHeader className="p-10 pb-4">
                    <CardTitle className="text-2xl font-black tracking-tighter flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
                        <Zap className="h-7 w-7 text-yellow-500 animate-pulse" />
                      </div>
                      Market Reach
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 pt-4 space-y-10">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">
                          Global Impressions
                        </span>
                        <span className="text-primary font-black text-2xl tracking-tighter leading-none">
                          2.4k
                        </span>
                      </div>
                      <div className="h-4 w-full bg-background/50 rounded-full overflow-hidden p-1 shadow-inner group/progress">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{
                            duration: 1.5,
                            ease: [0.22, 1, 0.36, 1] as any,
                          }}
                          className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full shadow-[0_4px_12px_rgba(59,130,246,0.3)] group-hover/progress:shadow-[0_4px_24px_rgba(59,130,246,0.5)] transition-shadow duration-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">
                          Interests Conversion
                        </span>
                        <span className="text-primary font-black text-2xl tracking-tighter leading-none">
                          482
                        </span>
                      </div>
                      <div className="h-4 w-full bg-background/50 rounded-full overflow-hidden p-1 shadow-inner group/progress">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "45%" }}
                          transition={{
                            duration: 1.5,
                            ease: [0.22, 1, 0.36, 1] as any,
                          }}
                          className="h-full bg-gradient-to-r from-primary via-indigo-600 to-purple-600 rounded-full shadow-[0_4px_12px_rgba(59,130,246,0.2)] group-hover/progress:shadow-[0_4px_24px_rgba(59,130,246,0.4)] transition-shadow duration-500"
                        />
                      </div>
                    </div>
                    <div className="pt-6 border-t border-border/10">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                        <TrendingUp className="h-4 w-4" />
                        Peak Reach +12% this week
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden group">
                  <CardHeader className="p-10 pb-4">
                    <CardTitle className="text-2xl font-black tracking-tighter flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                        <Award className="h-7 w-7 text-indigo-500" />
                      </div>
                      Elite Mastery
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center text-center p-10 py-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative w-36 h-36 mb-8 group-hover:scale-110 transition-transform duration-1000">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <circle
                          className="stroke-muted/20"
                          strokeWidth="3"
                          fill="none"
                          cx="18"
                          cy="18"
                          r="16"
                        />
                        <motion.circle
                          initial={{ strokeDasharray: "0, 100" }}
                          animate={{ strokeDasharray: "98, 100" }}
                          transition={{
                            duration: 2,
                            ease: [0.22, 1, 0.36, 1] as any,
                          }}
                          className="stroke-primary"
                          strokeWidth="3"
                          strokeLinecap="round"
                          fill="none"
                          cx="18"
                          cy="18"
                          r="16"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-black tracking-tighter text-foreground">
                          98
                        </span>
                      </div>
                    </div>
                    <p className="text-xl font-black tracking-tight mb-2">
                      Lighthouse Performance
                    </p>
                    <p className="text-xs text-muted-foreground/60 font-black uppercase tracking-widest">
                      Top 5% of Global Tutors
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-16">
              {/* Availability Preview */}
              <motion.div variants={itemVariants}>
                <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden">
                  <CardHeader className="p-10 pb-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-black tracking-tighter">
                      Rhythm
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-black text-[10px] uppercase tracking-[0.2em] bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all rounded-xl px-4 h-9"
                    >
                      Refine
                    </Button>
                  </CardHeader>
                  <CardContent className="p-10 pt-4 space-y-10">
                    {teacher.availability.slice(0, 4).map((day, i) => (
                      <div key={i} className="space-y-4">
                        <div className="text-[10px] font-black text-foreground/60 uppercase tracking-widest flex items-center gap-2">
                          <div className="h-1 w-4 bg-primary/30 rounded-full" />
                          {day.day}
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {day.slots.map((slot, j) => (
                            <Badge
                              key={j}
                              className="bg-primary/5 font-black text-[10px] uppercase tracking-wider border border-primary/20 text-primary px-4 py-2 rounded-xl hover:bg-primary/20 hover:border-primary/40 transition-all cursor-default shadow-sm"
                            >
                              {slot}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Student Messages */}
              <motion.div variants={itemVariants}>
                <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden">
                  <CardHeader className="p-10 pb-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-black tracking-tighter">
                      Nexus
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all active:scale-95"
                    >
                      <MessageSquare className="h-6 w-6" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-10 pt-4 space-y-6">
                    {teacherSessions.slice(0, 3).map((session, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-5 p-4 hover:bg-background/40 rounded-[28px] transition-all cursor-pointer group border border-transparent hover:border-border/10"
                      >
                        <div className="relative">
                          <Avatar className="h-14 w-14 border-4 border-background/50 shadow-xl group-hover:scale-105 transition-all duration-700">
                            <AvatarImage
                              src={session.studentAvatar}
                              className="object-cover"
                            />
                            <AvatarFallback className="font-black">
                              {session.studentName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-4 border-background rounded-full pulse-green" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-base font-black tracking-tight group-hover:text-primary transition-colors">
                              {session.studentName}
                            </p>
                            <span className="text-[10px] font-black uppercase text-muted-foreground/30 tracking-widest">
                              NOW
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground/60 truncate font-medium group-hover:text-muted-foreground transition-colors">
                            I've reviewed the materials and...
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full h-14 rounded-[20px] font-black text-[10px] uppercase tracking-[0.2em] border border-border/10 bg-background/20 hover:bg-primary/10 hover:text-primary transition-all mt-6 shadow-sm"
                    >
                      Enter Inbox Hub
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Teaching Tips Card: High-Impact Gradient */}
              <motion.div variants={itemVariants}>
                <Card className="border-none bg-gradient-to-br from-primary via-purple-700 to-indigo-900 text-primary-foreground shadow-[0_40px_80px_-20px_rgba(139,92,246,0.4)] rounded-[48px] overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000">
                    <Award className="w-48 h-48" />
                  </div>
                  <CardHeader className="p-10 pb-4">
                    <CardTitle className="text-3xl font-black tracking-tighter relative z-10 leading-tight">
                      Elevate Your <br />
                      Bookings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 pt-4 relative z-10">
                    <p className="text-lg font-medium opacity-80 mb-10 leading-relaxed max-w-[220px]">
                      A short video intro can ignite your booking rate by{" "}
                      <span className="text-white font-black underline decoration-4 decoration-white/30 underline-offset-4">
                        35%
                      </span>
                      .
                    </p>
                    <Button
                      variant="secondary"
                      className="w-full h-16 rounded-[24px] font-black text-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all shadow-2xl group/rec"
                    >
                      Record Intro
                      <ArrowRight className="ml-3 h-6 w-6 group-hover/rec:translate-x-1.5 transition-transform" />
                    </Button>
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
