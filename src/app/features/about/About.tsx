import {
  BookOpen,
  Users,
  Shield,
  Video,
  Search,
  Target,
  Heart,
  Globe,
  Award,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  TrendingUp,
  GraduationCap,
  History,
  Compass,
  Layers,
  ShieldCheck,
  Cpu
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-medium">
      {/* Cinematic Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none">
           <div className="w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
      </div>

      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
        className="space-y-32 pb-32"
      >
        {/* Cinematic Hero Section */}
        <section className="relative pt-32 md:pt-48 pb-20 px-6 text-center">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-inner">
              <History className="h-4 w-4 animate-pulse" />
              <span>Foundational Chronicle</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground mb-12 leading-[0.85] relative"
            >
              Nexus <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Foundations
              </span>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 blur-[100px] -z-10" />
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-bold mb-16"
            >
              TeachLink is more than a platform; it's a <span className="text-foreground">pedagogical transmission center</span>. 
              We're architecting the global infrastructure for the next generation of academic intelligence.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6">
              <Link to="/search">
                <Button size="lg" className="h-20 px-12 rounded-[28px] font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(var(--primary),0.3)] hover:shadow-primary/50 transition-all group bg-primary relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 slant" />
                  <span className="relative z-10 flex items-center gap-3">
                    Initiate Link <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link to="/signup?role=teacher">
                <Button size="lg" variant="outline" className="h-20 px-12 rounded-[28px] font-black text-xs uppercase tracking-widest border-2 border-border/10 bg-background/40 backdrop-blur-xl hover:bg-background/60 transition-all">
                  Broadcast Expertise
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Immersive Stats Matrix */}
        <section className="px-6 relative">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { label: "Neural Connections", value: "25k+", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
                 { label: "Elite Mentors", value: "1.2k+", icon: ShieldCheck, color: "text-primary", bg: "bg-primary/10" },
                 { label: "Subject Clusters", value: "85+", icon: Layers, color: "text-purple-500", bg: "bg-purple-500/10" },
                 { label: "Global Reach", value: "140+", icon: Globe, color: "text-green-500", bg: "bg-green-500/10" },
               ].map((stat, i) => (
                 <motion.div 
                  key={i} 
                  variants={itemVariants} 
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="p-10 rounded-[40px] bg-card/40 backdrop-blur-3xl border border-border/10 shadow-2xl group transition-all duration-500"
                 >
                    <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mb-8 border border-border/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                       <stat.icon className={`h-7 w-7 ${stat.color} group-hover:animate-pulse`} />
                    </div>
                    <h3 className="text-5xl font-black mb-2 tracking-tighter text-foreground">{stat.value}</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">{stat.label}</p>
                 </motion.div>
               ))}
             </div>
          </div>
        </section>

        {/* Narrative Shard Section */}
        <section className="py-24 px-6 relative overflow-hidden">
           <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[120px] rounded-full" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute -inset-4 bg-primary/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
              <div className="relative rounded-[60px] overflow-hidden border border-border/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-background">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=1200&fit=crop"
                  alt="Our Team"
                  className="w-full h-auto grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-10 -right-6 lg:-right-12 bg-card/60 backdrop-blur-3xl p-10 rounded-[48px] shadow-2xl border border-border/10 max-w-[320px] z-20"
              >
                 <Sparkles className="h-8 w-8 text-primary mb-6 animate-float" />
                 <p className="text-xl font-black mb-4 leading-snug italic text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/40 text-foreground">"The nexus link isn't just data; it's the transfer of pure human potential."</p>
                 <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Foundutional Directive 01</p>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-12">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]">
                <Compass className="h-4 w-4" />
                <span>Navigating the Future</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.85] text-foreground">
                Democratizing <br />
                The Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Cloud</span>
              </h2>
              <div className="space-y-8 text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                <p>
                  Every transmission on TeachLink is a bridge across geography. We believe your physical coordinates should never dictate your intellectual trajectory.
                </p>
                <p>
                  By leveraging real-time architectural standards, we've created a zero-latency ecosystem where mastery is distributed instantly from the nexus to the learner.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-border/10">
                 {[
                   { text: "Vetted Intelligence", icon: ShieldCheck },
                   { text: "Nexus Stream HD", icon: Video },
                   { text: "Universal Support", icon: Globe },
                   { text: "Encrypted Shards", icon: Lock }
                 ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-4 group/item">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500 shadow-inner">
                          <feat.icon className="h-5 w-5" />
                       </div>
                       <span className="font-black text-xs uppercase tracking-widest text-foreground/80 group-hover/item:text-primary transition-colors">{feat.text}</span>
                    </div>
                 ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Matrix Section */}
        <section className="py-32 px-6 relative bg-card/20 backdrop-blur-3xl border-y border-border/10">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
             <div className="w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          
          <div className="max-w-7xl mx-auto text-center mb-24 relative z-10">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-inner">
              <Heart className="h-4 w-4 fill-current" />
              <span>Core Directives</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.85]">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">Trust</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
              These directives guide our every transmission, ensuring the Nexus remains a sanctuary for pedagogical expansion.
            </motion.p>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 relative z-10">
            {[
              {
                title: "Pedagogical Flow",
                desc: "We prioritize educators who master the art of transmission, adapting high-level concepts into digestible neural packets.",
                icon: GraduationCap,
                color: "text-blue-500",
                bg: "bg-blue-500/10"
              },
              {
                title: "Nexus Integrity",
                desc: "Every node in our network undergoes a rigorous verification cycle to maintain the supreme quality of our signal.",
                icon: Shield,
                color: "text-primary",
                bg: "bg-primary/10"
              },
              {
                title: "Human Resonance",
                desc: "Beyond the code, we prioritize the frequency of human connection — where real intellectual transformation occurs.",
                icon: Zap,
                color: "text-purple-500",
                bg: "bg-purple-500/10"
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -20, scale: 1.02 }}
                className="group p-12 rounded-[60px] bg-background/40 backdrop-blur-2xl border border-border/10 hover:border-primary/20 hover:shadow-[0_40px_80px_-20px_rgba(var(--primary),0.1)] transition-all duration-700 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-1000" />
                <div className={`w-20 h-20 rounded-[32px] ${value.bg} flex items-center justify-center mb-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 shadow-inner border border-border/5`}>
                  <value.icon className={`h-10 w-10 ${value.color}`} />
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-tight text-foreground">{value.title}</h3>
                <p className="text-lg text-muted-foreground/80 font-medium leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Elite Team Gallery */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12 border-b border-border/10 pb-16">
              <div className="max-w-3xl">
                <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-inner">
                  <Cpu className="h-4 w-4" />
                  <span>The Nexus Architects</span>
                </motion.div>
                <motion.h2 variants={itemVariants} className="text-5xl md:text-8xl font-black tracking-tight leading-[0.85] text-foreground">
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">Intelligence</span> <br /> Behind
                </motion.h2>
              </div>
              <motion.p variants={itemVariants} className="text-2xl text-muted-foreground font-medium max-w-md leading-relaxed">
                A specialized unit of designers, engineers, and visionaries dedicated to the science of global knowledge transfer.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                { name: "Sarah Jenkins", role: "Chief Executive Agent", bio: "Architecting the pedagogical future with 15+ cycles of EdTech expertise.", img: "https://i.pravatar.cc/400?img=32" },
                { name: "David Chen", role: "Transmission Lead", bio: "Leading the core engineering team on zero-latency neural stream systems.", img: "https://i.pravatar.cc/400?img=12" },
                { name: "Marcus Thorne", role: "Pedagogical Scientist", bio: "PhD in Learning Sciences, specializing in remote hyper-mentorship.", img: "https://i.pravatar.cc/400?img=11" }
              ].map((member, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative"
                >
                   <div className="absolute inset-0 bg-primary/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="aspect-[4/5] rounded-[60px] overflow-hidden mb-10 border border-border/10 shadow-2xl relative z-10 bg-card active:scale-[0.98] transition-transform duration-500">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10 z-20">
                       <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-primary transition-colors">{member.name}</h3>
                       <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-inner">{member.role}</Badge>
                    </div>
                  </div>
                  <div className="px-6">
                    <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-xs">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Transmission Section */}
        <section className="px-6 relative pb-16">
          <div className="max-w-6xl mx-auto rounded-[80px] bg-card/40 backdrop-blur-3xl p-16 md:p-32 text-center border border-border/10 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)] overflow-hidden relative group">
             {/* Animated Pulses */}
             <div className="absolute top-0 right-0 p-32 opacity-10 group-hover:scale-125 transition-transform duration-[3000ms]">
                <Sparkles className="w-[800px] h-[800px] text-primary rotate-45 animate-pulse-slow" />
             </div>
             <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px]" />
             
             <motion.div variants={itemVariants} className="relative z-20">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-inner mx-auto">
                   <Zap className="h-4 w-4 fill-current" />
                   <span>Signal Active</span>
                </div>
                
                <h2 className="text-6xl md:text-9xl font-black mb-12 leading-[0.85] tracking-tighter text-foreground">
                  Initiate Your <br />
                  Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">Sync</span>
                </h2>
                
                <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto mb-16 font-bold leading-relaxed">
                  The nexus is waiting for your signature. Join the elite network of educators and visionaries today.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link to="/signup" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-64 h-24 rounded-[32px] bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-blue-500/60 transition-all relative overflow-hidden group/ctabtn border-none">
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/ctabtn:translate-x-[100%] transition-transform duration-700 slant" />
                      <span className="relative z-10">Sync Free</span>
                    </Button>
                  </Link>
                  <Link to="/" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-64 h-24 rounded-[32px] font-black text-xs uppercase tracking-[0.2em] border-2 border-border/10 hover:bg-background/40 transition-all text-muted-foreground hover:text-foreground">
                      Return to Home
                    </Button>
                  </Link>
                </div>
             </motion.div>
          </div>
        </section>

        {/* Footer Navigation Link */}
        <section className="text-center pt-8">
           <Link to="/" className="inline-flex items-center gap-4 group/back">
              <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center group-hover/back:bg-primary/10 transition-colors">
                 <ArrowRight className="h-5 w-5 text-muted-foreground group-hover/back:text-primary rotate-180 group-hover/back:-translate-x-1 transition-all" />
              </div>
              <span className="text-muted-foreground font-black text-[10px] uppercase tracking-[0.3em] group-hover/back:text-primary transition-colors">Back to Terminal</span>
           </Link>
        </section>
      </motion.div>
    </div>
  );
}

function Lock({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
