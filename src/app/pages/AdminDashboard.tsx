import { Link } from "react-router";
import {
  Users,
  GraduationCap,
  DollarSign,
  Star,
  TrendingUp,
  Video,
  Calendar,
  AlertCircle,
  ArrowRight,
  Bell,
  CheckCircle2,
  Activity,
  ShieldCheck,
  Briefcase,
  Layers,
  Sparkles,
  BarChart3,
  LineChart as LineChartIcon,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  adminStats,
  mockTeachers,
  mockSessions,
} from "../data/mockData";
import { motion, AnimatePresence } from "motion/react";

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

export default function AdminDashboard() {
  const revenueData = [
    { month: "Jan", revenue: 12000, students: 1800 },
    { month: "Feb", revenue: 15000, students: 1950 },
    { month: "Mar", revenue: 18000, students: 2100 },
    { month: "Apr", revenue: 21000, students: 2200 },
    { month: "May", revenue: 24000, students: 2350 },
    { month: "Jun", revenue: 28000, students: 2456 },
  ];

  const userGrowthData = [
    { month: "Jan", students: 1800, teachers: 180 },
    { month: "Feb", students: 1950, teachers: 195 },
    { month: "Mar", students: 2100, teachers: 210 },
    { month: "Apr", students: 2200, teachers: 220 },
    { month: "May", students: 2350, teachers: 228 },
    { month: "Jun", students: 2456, teachers: 234 },
  ];

  const recentSessions = mockSessions.slice(0, 5);
  const topTeachers = mockTeachers.slice(0, 5);

  return (
    <div className="flex-1 min-h-screen bg-background relative overflow-hidden pb-20">
      {/* Redesigned Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] left-[20%] w-[20%] h-[20%] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Enhanced Header Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Executive Command</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-none">
                Platform <span className="text-primary">Intelligence</span>
              </h1>
              <p className="text-lg text-muted-foreground font-medium max-w-xl">
                Global performance analytics and system orchestration for 
                <span className="text-foreground font-bold"> TeachLink Enterprise</span>.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="lg" className="h-14 px-6 rounded-2xl border-2 font-black text-xs uppercase tracking-widest hover:bg-muted/50 transition-all">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button size="lg" className="h-14 px-8 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all group">
                System Reports
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Premium Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              {
                label: "Global Revenue",
                value: `$${adminStats.totalRevenue.toLocaleString()}`,
                icon: DollarSign,
                trend: "+15.2%",
                color: "text-emerald-500",
                bg: "bg-emerald-500/10",
                description: "Real-time earnings"
              },
              {
                label: "Active Learners",
                value: adminStats.totalUsers.toLocaleString(),
                icon: Users,
                trend: "+12.4%",
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                description: "Global student base"
              },
              {
                label: "Verified Experts",
                value: adminStats.totalTeachers,
                icon: GraduationCap,
                trend: "+8.1%",
                color: "text-indigo-500",
                bg: "bg-indigo-500/10",
                description: "Approved educators"
              },
              {
                label: "Satisfaction",
                value: adminStats.averageRating,
                icon: Star,
                trend: "4.9/5.0",
                color: "text-amber-500",
                bg: "bg-amber-500/10",
                description: "Overall platform NPS"
              },
            ].map((stat, i) => (
              <Card
                key={i}
                className="border-none bg-card/60 backdrop-blur-xl shadow-xl hover:shadow-primary/5 transition-all group overflow-hidden rounded-[28px]"
              >
                <CardContent className="p-8 relative">
                  <div className={`absolute -top-6 -right-6 w-24 h-24 ${stat.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                      <stat.icon className={`h-7 w-7 ${stat.color}`} />
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="secondary" className="bg-muted/50 font-black text-[10px] px-2 py-0.5 rounded-lg border-none mb-1">
                        {stat.trend}
                      </Badge>
                      <span className="text-[9px] font-black uppercase tracking-tighter text-emerald-500 flex items-center gap-0.5">
                        <ArrowUpRight className="h-2.5 w-2.5" />
                        GROWTH
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                      {stat.label}
                    </p>
                    <h3 className="text-3xl font-black tracking-tight text-foreground">
                      {stat.value}
                    </h3>
                    <p className="text-[11px] font-bold text-muted-foreground/40 italic">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Redesigned Analytics Center */}
            <div className="lg:col-span-8 space-y-8">
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-2xl bg-card/40 backdrop-blur-3xl rounded-[40px] overflow-hidden border border-white/10">
                  <div className="p-8 pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h2 className="text-2xl font-black tracking-tight">Analytics Center</h2>
                      </div>
                      <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">Performance & Growth Metrics</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="icon" className="rounded-xl bg-muted/30 hover:bg-muted/50 h-10 w-10">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-xl bg-muted/30 hover:bg-muted/50 h-10 w-10">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <Tabs defaultValue="revenue" className="w-full">
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-10 bg-muted/20 p-6 rounded-[32px] border border-white/5">
                        <TabsList className="bg-background/50 p-1 rounded-2xl inline-flex shadow-inner">
                          <TabsTrigger value="revenue" className="rounded-xl font-black uppercase tracking-widest text-[10px] px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
                            Revenue
                          </TabsTrigger>
                          <TabsTrigger value="growth" className="rounded-xl font-black uppercase tracking-widest text-[10px] px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
                            Users
                          </TabsTrigger>
                        </TabsList>

                        <div className="grid grid-cols-2 md:flex items-center gap-8">
                          <div className="space-y-1 border-r border-white/10 pr-8">
                            <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">Current Volume</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-black">$42,850</span>
                              <span className="text-[10px] font-black text-emerald-500">+12%</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">Peak Load</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-black">2.4k</span>
                              <span className="text-[10px] font-black text-emerald-500">OPTIMAL</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-[420px] w-full px-2">
                        <TabsContent value="revenue" className="h-full mt-0 focus-visible:ring-0">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                  <feGaussianBlur stdDeviation="6" result="blur" />
                                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                              </defs>
                              <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="rgba(0,0,0,0.03)" />
                              <XAxis 
                                dataKey="month" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 11, fontWeight: 800, fill: 'hsl(var(--muted-foreground))' }}
                                dy={15}
                              />
                              <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 11, fontWeight: 800, fill: 'hsl(var(--muted-foreground))' }}
                                dx={-15}
                              />
                              <Tooltip 
                                cursor={{ stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5 5' }}
                                contentStyle={{ 
                                  borderRadius: '28px', 
                                  border: 'none', 
                                  boxShadow: '0 40px 60px -15px rgba(0,0,0,0.2)',
                                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                  backdropFilter: 'blur(20px)',
                                  padding: '20px 24px',
                                  border: '1px solid rgba(16, 185, 129, 0.1)'
                                }} 
                                itemStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '11px', color: '#10b981' }}
                                labelStyle={{ fontWeight: 900, marginBottom: '8px', color: '#064e3b', fontSize: '13px', letterSpacing: '0.05em' }}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="revenue" 
                                stroke="#10b981" 
                                strokeWidth={6}
                                fillOpacity={1} 
                                fill="url(#colorRevenue)" 
                                animationDuration={2500}
                                filter="url(#glow)"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </TabsContent>
                        
                        <TabsContent value="growth" className="h-full mt-0 focus-visible:ring-0">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userGrowthData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="rgba(0,0,0,0.03)" />
                              <XAxis 
                                dataKey="month" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 11, fontWeight: 800, fill: 'hsl(var(--muted-foreground))' }}
                                dy={15}
                              />
                              <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 11, fontWeight: 800, fill: 'hsl(var(--muted-foreground))' }}
                                dx={-15}
                              />
                              <Tooltip 
                                contentStyle={{ 
                                  borderRadius: '28px', 
                                  border: 'none', 
                                  boxShadow: '0 40px 60px -15px rgba(0,0,0,0.2)',
                                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                  backdropFilter: 'blur(20px)',
                                  padding: '20px 24px'
                                }} 
                                itemStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '11px' }}
                                labelStyle={{ fontWeight: 900, marginBottom: '8px', fontSize: '13px' }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="students" 
                                stroke="#3b82f6" 
                                strokeWidth={5} 
                                dot={{ r: 6, fill: "#3b82f6", strokeWidth: 4, stroke: "#fff" }} 
                                activeDot={{ r: 10, strokeWidth: 0, fill: "#3b82f6" }} 
                                animationDuration={2500}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="teachers" 
                                stroke="#6366f1" 
                                strokeWidth={5} 
                                dot={{ r: 6, fill: "#6366f1", strokeWidth: 4, stroke: "#fff" }} 
                                activeDot={{ r: 10, strokeWidth: 0, fill: "#6366f1" }} 
                                animationDuration={2500}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </TabsContent>
                      </div>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Management Tables */}
              <motion.div variants={itemVariants}>
                <Tabs defaultValue="teachers" className="w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <TabsList className="bg-muted/40 p-1 rounded-2xl inline-flex w-fit shadow-sm">
                      <TabsTrigger value="teachers" className="rounded-xl font-black uppercase tracking-widest text-[10px] px-6 py-3 data-[state=active]:bg-background transition-all duration-300">Top Teachers</TabsTrigger>
                      <TabsTrigger value="sessions" className="rounded-xl font-black uppercase tracking-widest text-[10px] px-6 py-3 data-[state=active]:bg-background transition-all duration-300">Recent Sessions</TabsTrigger>
                    </TabsList>
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input 
                        placeholder="Search records..." 
                        className="bg-muted/40 border-none h-11 pl-11 pr-6 rounded-2xl text-xs font-bold w-full sm:w-64 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <TabsContent value="teachers">
                    <Card className="border-none shadow-2xl bg-card/40 backdrop-blur-2xl rounded-[32px] overflow-hidden border border-white/5">
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-none bg-muted/20 hover:bg-muted/20">
                              <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 pl-8">Teacher Profile</TableHead>
                              <TableHead className="font-black uppercase tracking-widest text-[10px]">Stats</TableHead>
                              <TableHead className="font-black uppercase tracking-widest text-[10px]">Rating</TableHead>
                              <TableHead className="font-black uppercase tracking-widest text-[10px] text-right pr-12">Total Earnings</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {topTeachers.map((teacher) => (
                              <TableRow key={teacher.id} className="border-border/40 hover:bg-primary/5 transition-all group">
                                <TableCell className="py-6 pl-8">
                                  <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                                      <AvatarImage src={teacher.avatar} />
                                      <AvatarFallback className="font-black">{teacher.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-black text-sm group-hover:text-primary transition-colors">{teacher.name}</div>
                                      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{teacher.subjects[0]}</div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-col gap-1">
                                    <div className="text-xs font-black">{teacher.totalStudents} <span className="text-muted-foreground/40 text-[9px] font-bold">Students</span></div>
                                    <div className="text-xs font-black">{teacher.totalHours}h <span className="text-muted-foreground/40 text-[9px] font-bold">Total</span></div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest border border-amber-500/20">
                                    <Star className="h-3 w-3 fill-current" />
                                    {teacher.rating}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right pr-12">
                                  <div className="font-black text-sm text-emerald-600">
                                    ${(teacher.totalHours * teacher.hourlyRate).toLocaleString()}
                                  </div>
                                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Lifetime</div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="sessions">
                    <Card className="border-none shadow-2xl bg-card/40 backdrop-blur-2xl rounded-[32px] overflow-hidden border border-white/5">
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-none bg-muted/20 hover:bg-muted/20">
                              <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 pl-8">Session Details</TableHead>
                              <TableHead className="font-black uppercase tracking-widest text-[10px]">Date & Time</TableHead>
                              <TableHead className="font-black uppercase tracking-widest text-[10px]">Status</TableHead>
                              <TableHead className="font-black uppercase tracking-widest text-[10px] text-right pr-12">Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {recentSessions.map((session) => (
                              <TableRow key={session.id} className="border-border/40 hover:bg-primary/5 transition-all group">
                                <TableCell className="py-6 pl-8">
                                  <div className="flex flex-col">
                                    <span className="font-black text-sm group-hover:text-primary transition-colors">{session.subject}</span>
                                    <span className="text-[10px] font-bold text-muted-foreground/60">
                                      {session.teacherName} <ArrowRight className="inline h-2 w-2 mx-1" /> {session.studentName}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black">{new Date(session.date).toLocaleDateString()}</span>
                                    <span className="text-[10px] font-bold text-muted-foreground/40">{session.time}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={`rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-[0.2em] border-none shadow-sm ${
                                      session.status === "completed" 
                                      ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" 
                                      : "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
                                    }`}
                                  >
                                    {session.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right pr-12">
                                  <div className="font-black text-sm text-foreground">${session.price}</div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* System Health Card */}
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-2xl bg-card/40 backdrop-blur-2xl rounded-[32px] overflow-hidden border border-white/5">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-black tracking-tight flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      System Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    <div className="space-y-4">
                      {[
                        { label: "Verifications", value: "5 PENDING", color: "text-amber-500", bg: "bg-amber-500/10", icon: GraduationCap },
                        { label: "Payouts Ready", value: "$12,450", color: "text-emerald-500", bg: "bg-emerald-500/10", icon: DollarSign },
                        { label: "Security Logs", value: "ALL CLEAR", color: "text-blue-500", bg: "bg-blue-500/10", icon: Activity },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50 group hover:bg-muted/50 transition-all cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner`}>
                              <item.icon className={`h-5 w-5 ${item.color}`} />
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{item.label}</p>
                              <p className="text-sm font-black">{item.value}</p>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:translate-x-1 transition-transform" />
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-border/40">
                      <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground/60 mb-3 px-1">
                        <span>Global Server Load</span>
                        <span className="text-emerald-500 font-black">24%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '24%' }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Enhanced Quick Actions */}
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-2xl bg-card/40 backdrop-blur-2xl rounded-[32px] overflow-hidden border border-white/5">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-black tracking-tight">System Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 grid grid-cols-2 gap-4">
                    {[
                      { icon: Users, label: "Add User" },
                      { icon: Briefcase, label: "Payouts" },
                      { icon: Layers, label: "CMS Edit" },
                      { icon: Activity, label: "Security" },
                    ].map((action, i) => (
                      <Button 
                        key={i} 
                        variant="outline" 
                        className="h-auto py-6 flex-col gap-3 rounded-2xl border-2 border-border/50 bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all group shadow-sm hover:shadow-md"
                      >
                        <div className="w-10 h-10 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors shadow-inner border border-transparent group-hover:border-primary/20">
                          <action.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary">{action.label}</span>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Premium Special Card */}
              <motion.div variants={itemVariants}>
                <Card className="border-none bg-primary text-primary-foreground shadow-2xl shadow-primary/30 rounded-[32px] overflow-hidden relative group border border-white/10">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp className="w-32 h-32 rotate-12 scale-150" />
                  </div>
                  <CardHeader className="p-8 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 shadow-lg border border-white/20">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-black tracking-tight leading-tight">
                      Intelligence <br /> Reports Ready
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 relative z-10">
                    <p className="text-sm font-medium opacity-90 mb-8 leading-relaxed">
                      Comprehensive weekly audit and platform scalability projections are prepared for distribution.
                    </p>
                    <Button
                      variant="secondary"
                      className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-white hover:text-primary transition-all duration-300"
                    >
                      Download Intelligence PDF
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
