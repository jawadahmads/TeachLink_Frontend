import { Link } from "react-router";
import {
  Calendar,
  Clock,
  Star,
  TrendingUp,
  Video,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  Bell,
  MessageSquare,
  Users,
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
import { currentStudent, mockSessions, mockTeachers } from "../data/mockData";
import { motion } from "motion/react";
import { Toaster } from "sonner";

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

export default function StudentDashboard() {
  const upcomingSessions = mockSessions.filter((s) => s.status === "upcoming");
  const completedSessions = mockSessions.filter(
    (s) => s.status === "completed",
  );

  return (
    <div className="flex-1 min-h-screen bg-background relative overflow-hidden font-medium text-foreground">
      <Toaster richColors />
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[35%] h-[35%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Welcome back, <span className="text-primary">{currentStudent.name.split(" ")[0]}!</span>
              </h1>
              <p className="text-xl text-muted-foreground font-semibold leading-relaxed max-w-2xl">
                You have{" "}
                <span className="text-primary font-black">
                  {upcomingSessions.length} sessions
                </span>{" "}
                scheduled for this week.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/search">
                <Button className="h-14 px-8 rounded-2xl font-black shadow-xl shadow-primary/20 group">
                  Book a New Session
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-2 hover:bg-accent transition-all">
                <Link to={"/notifications"}>
                  <Bell className="h-6 w-6" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                label: "Total Sessions",
                value: currentStudent.totalSessions,
                icon: BookOpen,
                trend: "+3 this month",
                color: "text-blue-500",
                bg: "bg-blue-500/10",
              },
              {
                label: "Upcoming",
                value: upcomingSessions.length,
                icon: Calendar,
                trend: "Next: Sunday",
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                label: "Learning Hours",
                value: "24.5",
                icon: Clock,
                trend: "+5.2 this week",
                color: "text-green-500",
                bg: "bg-green-500/10",
              },
              {
                label: "Avg. Rating",
                value: "4.9",
                icon: Star,
                trend: "From 12 reviews",
                color: "text-yellow-500",
                bg: "bg-yellow-500/10",
              },
            ].map((stat, i) => (
              <Card
                key={i}
                className="border-none bg-card/50 backdrop-blur-xl shadow-2xl hover:shadow-primary/5 transition-all group overflow-hidden relative rounded-[40px]"
              >
                <div
                  className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none`}
                >
                  <stat.icon className="h-24 w-24 rotate-12" />
                </div>
                <CardContent className="p-8 relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <stat.icon className={`h-7 w-7 ${stat.color}`} />
                  </div>
                  <div className="text-4xl font-black mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-black uppercase tracking-widest text-muted-foreground/80 mb-3">
                    {stat.label}
                  </div>
                  <div className="text-xs font-bold text-primary inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {stat.trend}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Upcoming Sessions */}
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-10 pb-6">
                    <CardTitle className="text-2xl font-black flex items-center gap-3">
                      <PlayCircle className="h-7 w-7 text-primary" />
                      Upcoming Sessions
                    </CardTitle>
                    <Link
                      to="/student/sessions"
                      className="text-sm font-black text-primary hover:underline uppercase tracking-widest"
                    >
                      View Calendar
                    </Link>
                  </CardHeader>
                  <CardContent className="p-10 pt-0">
                    {upcomingSessions.length === 0 ? (
                      <div className="text-center py-16 bg-muted/20 rounded-[32px] border-4 border-dashed border-border/50">
                        <Calendar className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-20" />
                        <h3 className="font-black text-2xl mb-3">
                          No sessions scheduled
                        </h3>
                        <p className="text-muted-foreground font-semibold mb-8 text-lg">
                          Start your learning journey by finding a teacher.
                        </p>
                        <Link to="/search">
                          <Button className="h-14 px-10 rounded-2xl font-black shadow-xl shadow-primary/20">
                            Browse Teachers
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {upcomingSessions.map((session, i) => (
                          <motion.div
                            key={session.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.5 }}
                            className="group flex flex-col sm:flex-row sm:items-center gap-8 p-6 rounded-[32px] border-2 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 bg-background/50 shadow-sm"
                          >
                            <div className="flex items-center gap-5">
                              <div className="relative group-hover:scale-105 transition-transform duration-500">
                                <Avatar className="h-16 w-16 border-4 border-background shadow-xl">
                                  <AvatarImage src={session.teacherAvatar} className="object-cover" />
                                  <AvatarFallback className="font-black">
                                    {session.teacherName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-background rounded-full shadow-lg" />
                              </div>
                              <div>
                                <h4 className="font-black text-xl group-hover:text-primary transition-colors">
                                  {session.teacherName}
                                </h4>
                                <Badge
                                  className="mt-1 font-black text-[10px] uppercase tracking-widest bg-primary/10 text-primary border-none"
                                >
                                  {session.subject}
                                </Badge>
                              </div>
                            </div>

                            <div className="flex-1 grid grid-cols-2 gap-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                  <Calendar className="h-5 w-5" />
                                </div>
                                <span className="font-bold text-sm">
                                  {new Date(session.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                  <Clock className="h-5 w-5" />
                                </div>
                                <span className="font-bold text-sm">{session.time}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Link
                                to={`/video/${session.id}`}
                                className="flex-1 sm:flex-none"
                              >
                                <Button
                                  className="w-full sm:w-auto h-12 px-8 rounded-xl font-black shadow-lg shadow-primary/10 group/btn"
                                >
                                  <Video className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                  Join Now
                                </Button>
                              </Link>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
                  <CardHeader className="p-10 pb-6">
                    <CardTitle className="text-2xl font-black flex items-center gap-3">
                      <CheckCircle2 className="h-7 w-7 text-green-500" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 pt-0">
                    <div className="space-y-10">
                      {completedSessions.map((session, i) => (
                        <div
                          key={session.id}
                          className="relative pl-10 pb-10 border-l-2 border-muted/50 last:pb-0 last:border-l-0"
                        >
                          <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-background border-4 border-muted shadow-sm" />
                          <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                                <AvatarImage src={session.teacherAvatar} className="object-cover" />
                                <AvatarFallback className="font-black">
                                  {session.teacherName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-base font-black">
                                  Session with {session.teacherName}
                                </p>
                                <p className="text-sm text-muted-foreground font-semibold mt-0.5">
                                  {session.subject} •{" "}
                                  {new Date(session.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {session.rating ? (
                                <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                  <Star className="h-3.5 w-3.5 fill-current" />
                                  {session.rating}
                                </div>
                              ) : (
                                <Button
                                  variant="ghost"
                                  className="h-10 px-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all"
                                >
                                  Rate Session
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-10">
              {/* Learning Progress */}
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-black">
                      Goals & Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-4 space-y-8">
                    {currentStudent.interests.map((interest, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-black text-sm uppercase tracking-wider">{interest}</span>
                          <span className="text-primary font-black text-sm">85%</span>
                        </div>
                        <div className="h-3 w-full bg-muted/50 rounded-full overflow-hidden p-0.5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "85%" }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className="h-full bg-primary rounded-full shadow-lg shadow-primary/20"
                          />
                        </div>
                      </div>
                    ))}
                    <div className="pt-6 border-t border-border/50">
                      <div className="flex items-center gap-4 p-5 rounded-[24px] bg-primary/5 border-2 border-primary/10 group hover:bg-primary/10 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                          <Star className="h-6 w-6 fill-current" />
                        </div>
                        <div>
                          <p className="text-base font-black">
                            Streak: 5 Days!
                          </p>
                          <p className="text-xs text-muted-foreground font-bold mt-0.5">
                            Keep it up to earn badges.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Messages */}
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
                  <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-black">
                      Messages
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 pt-4 space-y-5">
                    {mockTeachers.slice(0, 3).map((teacher) => (
                      <div
                        key={teacher.id}
                        className="flex items-center gap-4 p-3 hover:bg-background/80 rounded-[20px] transition-all cursor-pointer group border-2 border-transparent hover:border-border/50"
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12 border-2 border-background shadow-md group-hover:scale-105 transition-transform duration-500">
                            <AvatarImage src={teacher.avatar} className="object-cover" />
                            <AvatarFallback className="font-black">
                              {teacher.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-black truncate group-hover:text-primary transition-colors">
                              {teacher.name}
                            </p>
                            <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-tighter">
                              2m ago
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate font-bold mt-0.5">
                            Great session today! Don't forget...
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-xl font-black text-xs uppercase tracking-widest border-2 hover:bg-accent mt-4 transition-all"
                    >
                      Open All Messages
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Teacher Recommendations */}
              <motion.div variants={itemVariants}>
                <Card className="border-none bg-primary text-primary-foreground shadow-2xl rounded-[40px] overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-10 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                    <Users className="w-40 h-40 rotate-12" />
                  </div>
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-black relative z-10">
                      Expand Your Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-4 relative z-10">
                    <p className="text-base font-bold opacity-90 mb-8 leading-relaxed">
                      Based on your interests, we recommend checking out these
                      top computer science tutors.
                    </p>
                    <Link to="/search">
                      <Button
                        variant="secondary"
                        className="w-full h-14 rounded-2xl font-black shadow-lg shadow-black/10 hover:bg-white transition-all group/rec"
                      >
                        Browse Recommendations
                        <ArrowRight className="ml-2 h-5 w-5 group-hover/rec:translate-x-1 transition-transform" />
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
