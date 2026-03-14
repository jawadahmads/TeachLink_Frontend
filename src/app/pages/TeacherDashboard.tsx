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
import { mockTeachers, mockSessions } from "../data/mockData";
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
    <div className="flex-1 min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px]" />
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
                Welcome back, {teacher.name.split(" ")[1]}!
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                You have{" "}
                <span className="text-primary font-semibold">
                  {upcomingSessions.length} sessions
                </span>{" "}
                lined up for today and tomorrow.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/teacher/manage-profile">
                <Button
                  variant="outline"
                  className="rounded-full px-6 font-bold border-2 hover:bg-primary/5 transition-all"
                >
                  Manage Profile
                </Button>
              </Link>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full relative"
                >
                  <Link to={"/notifications"}>
                    <Bell className="h-5 w-5" />
                  </Link>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                </Button>
                <Link to={`/teacher/${teacher.id}`}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Users className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >
            {[
              {
                label: "Monthly Earnings",
                value: `$${monthlyEarnings}`,
                icon: DollarSign,
                trend: "+15% vs last month",
                color: "text-green-500",
                bg: "bg-green-500/10",
              },
              {
                label: "Total Students",
                value: teacher.totalStudents,
                icon: Users,
                trend: "+12 new this month",
                color: "text-blue-500",
                bg: "bg-blue-500/10",
              },
              {
                label: "Avg. Rating",
                value: teacher.rating,
                icon: Star,
                trend: `From ${teacher.reviewCount} reviews`,
                color: "text-yellow-500",
                bg: "bg-yellow-500/10",
              },
              {
                label: "Teaching Hours",
                value: teacher.totalHours,
                icon: Clock,
                trend: "+24 this month",
                color: "text-primary",
                bg: "bg-primary/10",
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
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="pb-0 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <PlayCircle className="h-5 w-5 text-primary" />
                        Teaching Schedule
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="upcoming" className="w-full">
                      <div className="px-6 border-b border-border">
                        <TabsList className="bg-transparent h-12 p-0 gap-6">
                          <TabsTrigger
                            value="upcoming"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none font-bold px-0"
                          >
                            Upcoming ({upcomingSessions.length})
                          </TabsTrigger>
                          <TabsTrigger
                            value="completed"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none font-bold px-0"
                          >
                            Completed ({completedSessions.length})
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent
                        value="upcoming"
                        className="p-6 m-0 focus-visible:ring-0"
                      >
                        {upcomingSessions.length === 0 ? (
                          <div className="text-center py-12 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
                            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                            <h3 className="font-bold text-lg mb-2">
                              No sessions scheduled
                            </h3>
                            <p className="text-muted-foreground">
                              Your calendar is currently clear.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {upcomingSessions.map((session, i) => (
                              <motion.div
                                key={session.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex flex-col sm:flex-row sm:items-center gap-6 p-5 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all bg-card shadow-sm"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="relative">
                                    <Avatar className="h-14 w-14 border-2 border-background shadow-md">
                                      <AvatarImage
                                        src={session.studentAvatar}
                                      />
                                      <AvatarFallback>
                                        {session.studentName.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                                      {session.studentName}
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
                                      {new Date(
                                        session.date,
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                      <Clock className="h-4 w-4" />
                                    </div>
                                    <span>{session.time}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-6">
                                  <div className="text-right">
                                    <p className="text-xs text-muted-foreground font-bold">
                                      Earnings
                                    </p>
                                    <p className="text-lg font-black text-green-600">
                                      ${session.price}
                                    </p>
                                  </div>
                                  <Link to={`/video/${session.id}`}>
                                    <Button className="rounded-full px-6 font-bold shadow-md shadow-primary/10 group">
                                      <Video className="h-4 w-4 mr-2 " />
                                      <span className="pt-0.5">Start</span>
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
                        className="p-6 m-0 focus-visible:ring-0"
                      >
                        <div className="space-y-4">
                          {completedSessions.map((session, i) => (
                            <div
                              key={session.id}
                              className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors"
                            >
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={session.studentAvatar} />
                                <AvatarFallback>
                                  {session.studentName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h4 className="font-bold text-sm">
                                  {session.studentName}
                                </h4>
                                <p className="text-xs text-muted-foreground font-medium">
                                  {session.subject} •{" "}
                                  {new Date(session.date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-green-600">
                                  +${session.price}
                                </p>
                                {session.rating && (
                                  <div className="flex items-center gap-1 text-yellow-500 text-[10px] font-bold">
                                    <Star className="h-3 w-3 fill-current" />
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

              {/* Performance Insights */}
              <motion.div
                variants={itemVariants}
                className="grid sm:grid-cols-2 gap-6"
              >
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      Profile Visibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold">Search Impressions</span>
                        <span className="text-primary font-bold">2.4k</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold">Profile Clicks</span>
                        <span className="text-primary font-bold">482</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "45%" }}
                          transition={{ duration: 1 }}
                          className="h-full bg-primary/60 rounded-full"
                        />
                      </div>
                    </div>
                    <div className="pt-2 text-xs text-muted-foreground font-medium">
                      Your profile visibility increased by{" "}
                      <span className="text-green-600 font-bold">12%</span> this
                      week.
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Teaching Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center text-center py-6">
                    <div className="relative w-24 h-24 mb-4">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          className="stroke-muted"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <motion.path
                          initial={{ strokeDasharray: "0, 100" }}
                          animate={{ strokeDasharray: "98, 100" }}
                          transition={{ duration: 1.5 }}
                          className="stroke-primary"
                          strokeWidth="3"
                          strokeDashcap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-black">98</span>
                      </div>
                    </div>
                    <p className="text-sm font-bold mb-1">
                      Excellent Performance!
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      You are in the top 5% of tutors.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Availability Preview */}
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-bold">
                      Availability
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-bold text-primary"
                    >
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {teacher.availability.slice(0, 4).map((day, i) => (
                      <div key={i} className="space-y-2">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          {day.day}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {day.slots.map((slot, j) => (
                            <Badge
                              key={j}
                              variant="secondary"
                              className="bg-muted/50 font-bold border-none hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
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
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-bold">
                      New Messages
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
                    {teacherSessions.slice(0, 3).map((session, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-border"
                      >
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage src={session.studentAvatar} />
                          <AvatarFallback>
                            {session.studentName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                              {session.studentName}
                            </p>
                            <span className="text-[10px] text-muted-foreground">
                              Just now
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate font-medium">
                            I have a question about the assignment...
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full rounded-full text-sm font-bold mt-2 h-10"
                    >
                      Go to Inbox
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Teaching Tips Card */}
              <motion.div variants={itemVariants}>
                <Card className="border-none bg-primary text-primary-foreground shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-20">
                    <Award className="w-32 h-32 rotate-12" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold relative z-10">
                      Grow Your Bookings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sm opacity-90 mb-6 font-medium leading-relaxed">
                      Adding a short video introduction can increase your
                      booking rate by up to{" "}
                      <span className="font-bold underline">35%</span>.
                    </p>
                    <Button
                      variant="secondary"
                      className="w-full rounded-full font-bold shadow-lg"
                    >
                      Record Intro Video
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
