import { Link } from "react-router";
import {
  Calendar,
  Clock,
  Star,
  TrendingUp,
  Video,
  Search,
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
    <div className="flex-1 min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[25%] h-[25%] bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
                Welcome back, {currentStudent.name.split(" ")[0]}!
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                You have{" "}
                <span className="text-primary font-semibold">
                  {upcomingSessions.length} sessions
                </span>{" "}
                scheduled for this week.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/search">
                <Button className="rounded-full px-6 shadow-lg shadow-primary/20 group">
                  Book a New Session
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="icon" className="rounded-full">
                <Link to={"/notifications"}>
                  <Bell className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
                className="border-none bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
              >
                <div
                  className={`absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity`}
                >
                  <stat.icon className="h-20 w-20" />
                </div>
                <CardContent className="p-6 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}
                  >
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold mb-1 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Sessions */}
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <PlayCircle className="h-5 w-5 text-primary" />
                      Upcoming Sessions
                    </CardTitle>
                    <Link
                      to="/student/sessions"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      View Calendar
                    </Link>
                  </CardHeader>
                  <CardContent>
                    {upcomingSessions.length === 0 ? (
                      <div className="text-center py-12 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                        <h3 className="font-bold text-lg mb-2">
                          No sessions scheduled
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Start your learning journey by finding a teacher.
                        </p>
                        <Link to="/search">
                          <Button className="rounded-full">
                            Browse Teachers
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {upcomingSessions.map((session, i) => (
                          <motion.div
                            key={session.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.5 }}
                            className="group flex flex-col sm:flex-row sm:items-center gap-6 p-5 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all bg-card shadow-sm"
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <Avatar className="h-14 w-14 border-2 border-background shadow-md">
                                  <AvatarImage src={session.teacherAvatar} />
                                  <AvatarFallback>
                                    {session.teacherName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                              </div>
                              <div>
                                <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                                  {session.teacherName}
                                </h4>
                                <Badge
                                  variant="secondary"
                                  className="font-semibold text-xs"
                                >
                                  {session.subject}
                                </Badge>
                              </div>
                            </div>

                            <div className="flex-1 grid grid-cols-2 gap-4">
                              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                  <Calendar className="h-4 w-4" />
                                </div>
                                <span>
                                  {new Date(session.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                  <Clock className="h-4 w-4" />
                                </div>
                                <span>{session.time}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Link
                                to={`/video/${session.id}`}
                                className="flex-1 sm:flex-none"
                              >
                                <Button
                                  size="sm"
                                  className="w-full sm:w-auto rounded-full px-6 font-bold shadow-md shadow-primary/10"
                                >
                                  <Video className="h-4 w-4 mr-2" />
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
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {completedSessions.map((session, i) => (
                        <div
                          key={session.id}
                          className="relative pl-8 pb-6 border-l-2 border-muted last:pb-0 last:border-l-0"
                        >
                          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-muted border-2 border-background" />
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={session.teacherAvatar} />
                                <AvatarFallback>
                                  {session.teacherName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-bold">
                                  Session with {session.teacherName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {session.subject} •{" "}
                                  {new Date(session.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {session.rating ? (
                                <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-full text-xs font-bold">
                                  <Star className="h-3 w-3 fill-current" />
                                  {session.rating}
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-xs font-bold h-7 px-3 rounded-full hover:bg-primary/10 hover:text-primary"
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
            <div className="space-y-8">
              {/* Learning Progress */}
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">
                      My Goals & Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {currentStudent.favoriteSubjects.map((subject, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-bold">{subject}</span>
                          <span className="text-primary font-bold">85%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "85%" }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Star className="h-5 w-5 fill-current" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">
                            Daily Streak: 5 Days!
                          </p>
                          <p className="text-xs text-muted-foreground font-medium">
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
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-bold">
                      Messages
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockTeachers.slice(0, 3).map((teacher) => (
                      <div
                        key={teacher.id}
                        className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer group"
                      >
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage src={teacher.avatar} />
                          <AvatarFallback>
                            {teacher.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                              {teacher.name}
                            </p>
                            <span className="text-[10px] text-muted-foreground">
                              2m ago
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate font-medium">
                            Great session today! Don't forget...
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full rounded-full text-sm font-bold mt-2"
                    >
                      Open All Messages
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Teacher Recommendations */}
              <motion.div variants={itemVariants}>
                <Card className="border-none bg-primary text-primary-foreground shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-20">
                    <Users className="w-32 h-32 rotate-12" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold relative z-10">
                      Expand Your Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sm opacity-90 mb-6 font-medium leading-relaxed">
                      Based on your interests, we recommend checking out these
                      top computer science tutors.
                    </p>
                    <Link to="/search">
                      <Button
                        variant="secondary"
                        className="w-full rounded-full font-bold"
                      >
                        Browse Recommendations
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
