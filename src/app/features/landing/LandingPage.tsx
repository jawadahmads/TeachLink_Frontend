import {
  BookOpen,
  Users,
  Video,
  Star,
  Clock,
  Shield,
  Search,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PlayCircle,
  TrendingUp,
  Award,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Link } from "react-router";
import { motion } from "motion/react";
import { mockTeachers } from "../../data/mockData";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

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

export default function LandingPage() {
  const featuredTeachers = mockTeachers.slice(0, 3);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* High-Fidelity Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/15 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute top-[30%] right-[10%] w-[25%] h-[25%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section: The First Impression */}
      <section className="relative pt-32 pb-40 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="z-10"
            >
              <motion.div 
                variants={itemVariants} 
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8"
              >
                <Sparkles className="h-4 w-4" />
                <span>The Future of Online Learning</span>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-6xl lg:text-[90px] font-black tracking-tighter text-foreground mb-8 leading-[0.85]"
              >
                Learn from <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600 drop-shadow-sm">
                  Best Minds
                </span> <br />
                in the World
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-muted-foreground/80 mb-12 leading-relaxed max-w-xl font-medium"
              >
                Connect with verified expert tutors for high-impact 1-on-1 sessions. 
                Whether it's Calculus or Coding, we accelerate your path to mastery.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
                <Link to="/search">
                  <Button size="lg" className="text-lg px-10 h-16 rounded-[24px] shadow-[0_20px_40px_-10px_theme(colors.primary.DEFAULT / 0.3)] hover:shadow-primary/50 transition-all group font-black">
                    Find Your Teacher
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
                  </Button>
                </Link>
                <Link to="/signup?role=teacher">
                  <Button size="lg" variant="outline" className="text-lg px-10 h-16 rounded-[24px] border-2 bg-card/40 backdrop-blur-xl hover:bg-muted/50 font-black">
                    Apply to Teach
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-16 flex items-center gap-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-2xl border-4 border-background bg-muted overflow-hidden shadow-lg rotate-[5deg] first:rotate-[-5deg] even:rotate-[-3deg] transition-transform hover:rotate-0 hover:scale-110 cursor-pointer">
                      <img 
                        src={`https://i.pravatar.cc/100?img=${i + 20}`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-2xl border-4 border-background bg-primary flex items-center justify-center text-xs text-primary-foreground font-black shadow-lg">
                    2k+
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-yellow-500 font-black text-lg">
                    <Star className="h-5 w-5 fill-current" />
                    <span>4.9/5.0</span>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">Global Trust Score</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side Visual Component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[48px] overflow-hidden border border-border/20 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.3)] bg-card/20 backdrop-blur-2xl p-4">
                <div className="rounded-[36px] overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&h=900&auto=format&fit=crop"
                    alt="Students learning online"
                    className="w-full h-auto opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </div>
              </div>
              
              {/* Floating UI Elements: Precision Engineered */}
              <motion.div 
                animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 z-20 bg-card/60 backdrop-blur-3xl p-5 rounded-[28px] shadow-2xl border border-border/30 flex items-center gap-4 group hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-2xl bg-success/20 flex items-center justify-center shadow-lg shadow-success/10 group-hover:rotate-12 transition-transform">
                  <CheckCircle2 className="h-7 w-7 text-success" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider opacity-60">System Ready</p>
                  <p className="text-base font-black tracking-tight">Advanced React JS</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-12 -left-12 z-20 bg-card/60 backdrop-blur-3xl p-6 rounded-[32px] shadow-2xl border border-border/30 group hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-5 mb-4">
                  <Avatar className="h-14 w-14 rounded-2xl shadow-xl">
                    <AvatarImage src={mockTeachers[0].avatar} />
                    <AvatarFallback className="rounded-2xl">SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-black tracking-tight">{mockTeachers[0].name}</p>
                    <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Distinguished Educator</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3.5 w-3.5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-black ml-1 text-primary">ELITE STATUS</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section: Quantifying Success */}
      <section className="py-20 border-y border-border/10 bg-card/20 backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-blue-500/5" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Active Students", value: "10K+", icon: Users, color: "text-blue-500" },
              { label: "Expert Tutors", value: "500+", icon: Award, color: "text-primary" },
              { label: "Subjects", value: "50+", icon: BookOpen, color: "text-purple-500" },
              { label: "Success Rate", value: "98%", icon: TrendingUp, color: "text-success" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-border/20 shadow-xl">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-4xl font-black text-foreground tracking-tighter mb-2">{stat.value}</div>
                <div className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.25em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Teachers: Elite Tutors */}
      <section id="tutors" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
                  Meet Our <br />
                  <span className="text-primary italic">Top-Rated</span> Tutors
                </h2>
                <p className="text-xl text-muted-foreground/80 font-medium">
                  Learn from industry experts and experienced educators who are passionate about teaching and your success.
                </p>
              </motion.div>
            </div>
            <Link to="/search" className="group">
              <Button variant="ghost" className="h-14 px-8 rounded-2xl font-black text-sm uppercase tracking-widest border border-border/20 bg-card/40 backdrop-blur-xl">
                View all teachers
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {featuredTeachers.map((teacher, i) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border border-border/20 shadow-2xl hover:shadow-primary/10 transition-all duration-700 group bg-card/40 backdrop-blur-3xl rounded-[32px] group relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative h-64 overflow-hidden p-3 pb-0">
                    <img 
                      src={teacher.avatar} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover rounded-[24px] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 right-6">
                      <Badge className="bg-background/90 backdrop-blur-md text-foreground font-black px-3 py-1.5 rounded-xl border-none shadow-xl">
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-current mr-1.5" />
                        {teacher.rating}
                      </Badge>
                    </div>
                    {teacher.verified && (
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-primary text-primary-foreground font-black px-4 py-1.5 rounded-xl border-none shadow-xl shadow-primary/20 tracking-wider">
                          VERIFIED
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-8 relative">
                    <h3 className="text-2xl font-black tracking-tight mb-2 group-hover:text-primary transition-colors">{teacher.name}</h3>
                    <p className="text-sm font-bold text-muted-foreground/60 mb-6 uppercase tracking-widest line-clamp-1">{teacher.subjects.join(" • ")}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-border/10">
                      <div>
                        <span className="text-2xl font-black text-foreground tracking-tight">${teacher.hourlyRate}</span>
                        <span className="text-sm font-bold text-muted-foreground/40 ml-1">/HR</span>
                      </div>
                      <Link to={`/teacher/${teacher.id}`}>
                        <Button size="sm" className="h-12 px-6 rounded-xl font-black bg-foreground text-background hover:bg-primary transition-colors shadow-lg">View Profile</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid: The Tech Advantage */}
      <section id="features" className="py-32 px-4 bg-muted/20 backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black tracking-tighter text-foreground mb-6"
            >
              Designed for <br />
              <span className="text-primary italic">Better Learning</span>
            </motion.h2>
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto font-medium">
              We provide the high-end tools and elite platform you need to excel in your educational journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Live Video Interactive",
                desc: "Engage in high-definition video calls with screen sharing, drawing, and recording features.",
                icon: Video,
                color: "text-blue-500",
                bg: "bg-blue-500/10"
              },
              {
                title: "Flexible Scheduling",
                desc: "Book sessions that fit your time zone and lifestyle. Manage everything from your dashboard.",
                icon: Calendar,
                color: "text-purple-500",
                bg: "bg-purple-500/10"
              },
              {
                title: "Secure Payments",
                desc: "Hassle-free, encrypted payments. Pay only for the sessions you attend with our student protection.",
                icon: Shield,
                color: "text-green-500",
                bg: "bg-green-500/10"
              },
              {
                title: "Instant Messenger",
                desc: "Stay connected with your tutors between sessions. Share files and ask quick questions.",
                icon: Clock,
                color: "text-orange-500",
                bg: "bg-orange-500/10"
              },
              {
                title: "Expert Verification",
                desc: "Every teacher on our platform undergoes a rigorous background check and vetting process.",
                icon: CheckCircle2,
                color: "text-red-500",
                bg: "bg-red-500/10"
              },
              {
                title: "Rich Resources",
                desc: "Access a library of shared materials, notes, and session recordings to review later.",
                icon: BookOpen,
                color: "text-cyan-500",
                bg: "bg-cyan-500/10"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="group p-10 rounded-[40px] bg-card/40 backdrop-blur-3xl border border-border/20 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg shadow-black/5`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground/80 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works: The Seamless Path */}
      <section id="how-it-works" className="py-32 px-4 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="space-y-6">
                {[
                  { step: "01", title: "Find the perfect teacher", desc: "Filter by subject, price, and availability to find your match." },
                  { step: "02", title: "Book your session", desc: "Select a slot and secure your booking with our easy payment system." },
                  { step: "03", title: "Join the classroom", desc: "Connect via our built-in video platform and start learning." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex gap-8 p-8 rounded-[32px] bg-card/60 backdrop-blur-xl border border-border/20 hover:border-primary/40 transition-all duration-500 shadow-xl group"
                  >
                    <div className="text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors leading-none">{item.step}</div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight mb-2">{item.title}</h3>
                      <p className="text-muted-foreground/80 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="lg:pl-16 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
                  Start your <br />
                  <span className="text-primary italic">Journey</span> in Minutes
                </h2>
                <p className="text-xl text-muted-foreground/80 mb-10 font-medium leading-relaxed">
                  We've simplified the process of finding and working with elite tutors so you can focus on what matters most: your mastery.
                </p>
                <div className="space-y-5 mb-12">
                  {[
                    "No subscription required — pay as you learn",
                    "Verified elite professional tutors",
                    "24/7 Premium support for students"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-7 w-7 rounded-xl bg-success/20 flex items-center justify-center shadow-lg shadow-success/10">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </div>
                      <span className="font-black text-foreground/80 tracking-tight">{text}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" className="rounded-[20px] px-12 h-16 text-lg font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                  Get Started Now
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section: Impact Stories */}
      <section className="py-32 px-4 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
          <BookOpen className="w-[400px] h-[400px] rotate-[-15deg]" />
        </div>
        <div className="absolute bottom-0 left-0 p-20 opacity-10 pointer-events-none">
          <Sparkles className="w-[300px] h-[300px] rotate-[15deg]" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
          >
            <Star className="h-16 w-16 text-yellow-400 mx-auto mb-10 fill-current drop-shadow-xl" />
            <h2 className="text-4xl md:text-6xl font-black mb-12 italic leading-[1.1] tracking-tighter text-primary-foreground">
              "TeachLink transformed <br /> how I learn. I found an <br /> 
              <span className="text-yellow-400">elite mentor</span> in just days."
            </h2>
            <div className="flex flex-col items-center gap-6">
              <Avatar className="h-20 w-20 border-4 border-primary-foreground/30 shadow-2xl">
                <AvatarImage src="https://i.pravatar.cc/150?img=32" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-black text-2xl text-primary-foreground">Alex Thompson</p>
                <p className="font-bold text-primary-foreground/60 uppercase tracking-widest text-sm">Distinguished Undergraduate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA: The Call to Mastery */}
      <section className="py-40 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 -z-10" />
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
              Ready to <br />
              <span className="text-primary italic">Unlock</span> Potential?
            </h2>
            <p className="text-2xl text-muted-foreground/80 mb-16 max-w-2xl mx-auto font-medium">
              Join the elite league of students and teachers who are already learning and growing together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/signup">
                <Button size="lg" className="h-20 px-14 rounded-[28px] text-xl font-black w-full sm:w-auto shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all">
                  Join as Student
                </Button>
              </Link>
              <Link to="/signup?role=teacher">
                <Button size="lg" variant="outline" className="h-20 px-14 rounded-[28px] text-xl font-black w-full sm:w-auto border-2 bg-card/40 backdrop-blur-xl hover:bg-muted/50 transition-all">
                  Join as Teacher
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer: Redefined */}
      <footer className="bg-card/40 backdrop-blur-3xl border-t border-border/10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 rotate-[-5deg]">
                  <BookOpen className="h-7 w-7 text-primary-foreground" />
                </div>
                <span className="text-3xl font-black tracking-tighter text-foreground">TeachLink</span>
              </Link>
              <p className="text-muted-foreground/80 leading-relaxed mb-8 font-medium">
                The absolute leading platform for 1-on-1 personalized learning. Connect with experts and reach your goals.
              </p>
              <div className="flex gap-5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-2xl bg-muted/30 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500 cursor-pointer border border-border/10 shadow-lg">
                    <div className="w-6 h-6 bg-current opacity-20 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.2em] text-muted-foreground/60 mb-8">For Students</h4>
              <ul className="space-y-5 text-foreground font-black tracking-tight text-lg">
                <li><Link to="/search" className="hover:text-primary transition-colors">Find a Teacher</Link></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Resources</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Scholarships</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.2em] text-muted-foreground/60 mb-8">For Teachers</h4>
              <ul className="space-y-5 text-foreground font-black tracking-tight text-lg">
                <li><Link to="/signup?role=teacher" className="hover:text-primary transition-colors">Become a Tutor</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Teaching Tools</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Earnings</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.2em] text-muted-foreground/60 mb-8">Company</h4>
              <ul className="space-y-5 text-foreground font-black tracking-tight text-lg">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-8 text-muted-foreground/60 text-sm font-black uppercase tracking-[0.2em]">
            <p>&copy; 2026 TeachLink. All rights reserved.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
              <a href="#" className="hover:text-foreground transition-colors">FAQ</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

