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
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router";
import { motion } from "motion/react";
import { mockTeachers } from "../data/mockData";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

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

export default function LandingPage() {
  const featuredTeachers = mockTeachers.slice(0, 3);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[10%] w-[15%] h-[15%] bg-purple-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="z-10"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>The Future of Online Learning</span>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
              >
                Learn from the <span className="text-primary bg-clip-text">Best Minds</span> in the World
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl"
              >
                Connect with verified expert tutors for personalized 1-on-1 sessions. 
                Whether it's Calculus or Coding, we've got you covered.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Link to="/search">
                  <Button size="lg" className="text-lg px-8 h-14 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group">
                    Find Your Teacher
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/signup?role=teacher">
                  <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full border-2 hover:bg-muted/50">
                    Apply to Teach
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <img 
                        src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold">
                    2k+
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-yellow-500 font-bold">
                    <Star className="h-4 w-4 fill-current" />
                    <span>4.9/5.0</span>
                  </div>
                  <p className="text-muted-foreground">trusted by thousands of students</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden border border-border shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&h=900&auto=format&fit=crop"
                  alt="Students learning online"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 z-20 bg-card p-4 rounded-2xl shadow-xl border border-border flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Session Started</p>
                  <p className="text-sm font-bold">Advanced React JS</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 z-20 bg-card p-4 rounded-2xl shadow-xl border border-border"
              >
                <div className="flex items-center gap-4 mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={mockTeachers[0].avatar} />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold">{mockTeachers[0].name}</p>
                    <p className="text-xs text-muted-foreground">Expert Mathematics Tutor</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3 w-3 text-yellow-500 fill-current" />
                  ))}
                  <span className="text-xs font-bold ml-1">5.0</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Students", value: "10K+", icon: Users },
              { label: "Expert Tutors", value: "500+", icon: Award },
              { label: "Subjects", value: "50+", icon: BookOpen },
              { label: "Success Rate", value: "98%", icon: TrendingUp },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Top-Rated Tutors</h2>
              <p className="text-xl text-muted-foreground">
                Learn from industry experts and experienced educators who are passionate about teaching.
              </p>
            </div>
            <Link to="/search">
              <Button variant="ghost" className="group">
                View all teachers
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredTeachers.map((teacher, i) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all group bg-card">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={teacher.avatar} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background">
                        <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                        {teacher.rating}
                      </Badge>
                    </div>
                    {teacher.verified && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground border-none">
                          Verified
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{teacher.subjects.join(", ")}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-lg font-bold text-primary">${teacher.hourlyRate}</span>
                        <span className="text-sm text-muted-foreground">/hr</span>
                      </div>
                      <Link to={`/teacher/${teacher.id}`}>
                        <Button size="sm" variant="secondary">View Profile</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Designed for Better Learning
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the tools and platform you need to excel in your educational journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
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
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl bg-card border border-border hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[100px] -z-10 rounded-full" />
              <div className="space-y-4">
                {[
                  { step: "01", title: "Find the perfect teacher", desc: "Filter by subject, price, and availability to find your match." },
                  { step: "02", title: "Book your session", desc: "Select a slot and secure your booking with our easy payment system." },
                  { step: "03", title: "Join the classroom", desc: "Connect via our built-in video platform and start learning." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm"
                  >
                    <div className="text-4xl font-black text-primary/20">{item.step}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="lg:pl-12">
              <h2 className="text-4xl font-bold mb-6">Start your journey in minutes</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We've simplified the process of finding and working with expert tutors so you can focus on what matters most: learning.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="font-medium">No subscription required</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="font-medium">Verified professional tutors</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="font-medium">24/7 Support for students</span>
                </div>
              </div>
              <Button size="lg" className="rounded-full px-10 h-14 text-lg">
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials or Featured Review */}
      <section className="py-24 px-4 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <BookOpen className="w-64 h-64 rotate-12" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Star className="h-12 w-12 text-yellow-400 mx-auto mb-8 fill-current" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 italic leading-tight">
            "TeachLink transformed how I learn. I found an amazing calculus tutor who helped me go from a C to an A in just two months!"
          </h2>
          <div className="flex items-center justify-center gap-4">
            <Avatar className="h-14 w-14 border-2 border-primary-foreground">
              <AvatarImage src="https://i.pravatar.cc/150?img=32" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-bold text-xl">Alex Thompson</p>
              <p className="opacity-80">Undergraduate Student</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to unlock your full potential?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of students and teachers who are already learning and growing together on TeachLink.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="h-16 px-10 rounded-full text-xl w-full sm:w-auto shadow-xl shadow-primary/20">
                Join as Student
              </Button>
            </Link>
            <Link to="/signup?role=teacher">
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-full text-xl w-full sm:w-auto">
                Join as Teacher
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">TeachLink</span>
              </Link>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The world's leading platform for 1-on-1 personalized learning. Connect with experts and reach your goals.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    <div className="w-5 h-5 bg-current opacity-20" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">For Students</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link to="/search" className="hover:text-primary transition-colors">Find a Teacher</Link></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Learning Resources</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Scholarships</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">For Teachers</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link to="/signup?role=teacher" className="hover:text-primary transition-colors">Become a Tutor</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Teaching Tools</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Earnings & Payouts</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm font-medium">
            <p>&copy; 2026 TeachLink. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-foreground">Support</a>
              <a href="#" className="hover:text-foreground">FAQ</a>
              <a href="#" className="hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
