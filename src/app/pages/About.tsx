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
  GraduationCap
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] right-[10%] w-[20%] h-[20%] bg-purple-500/5 rounded-full blur-[80px]" />
      </div>

      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
      >
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Pioneering Education</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-8 leading-[1.1]"
            >
              Reimagining How the <br />
              <span className="text-primary">World Learns</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium mb-12"
            >
              TeachLink was born from a simple belief: that quality education shouldn't be limited by geography. 
              We're building the infrastructure for the next generation of global knowledge sharing.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <Link to="/search">
                <Button size="lg" className="h-16 px-10 rounded-full font-black text-lg shadow-xl shadow-primary/20 group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/signup?role=teacher">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-full font-black text-lg border-2">
                  Join as an Expert
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto p-12 rounded-[40px] bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Globe className="w-64 h-64 rotate-12" />
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
               {[
                 { label: "Active Students", value: "25k+", icon: Users, color: "text-blue-500" },
                 { label: "Verified Tutors", value: "1.2k+", icon: Award, color: "text-primary" },
                 { label: "Subjects Taught", value: "85+", icon: BookOpen, color: "text-purple-500" },
                 { label: "Global Reach", value: "140+", icon: Globe, color: "text-green-500" },
               ].map((stat, i) => (
                 <motion.div key={i} variants={itemVariants} className="space-y-2">
                    <div className={`w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
                       <stat.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-4xl font-black">{stat.value}</h3>
                    <p className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
                 </motion.div>
               ))}
             </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative rounded-[48px] overflow-hidden border-8 border-background shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=1200&fit=crop"
                  alt="Our Team"
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-card p-8 rounded-3xl shadow-2xl border border-border max-w-[280px]">
                 <p className="text-lg font-black mb-2 italic">"Education is the most powerful weapon which you can use to change the world."</p>
                 <p className="text-xs font-black uppercase tracking-widest text-primary">— Nelson Mandela</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                <Target className="h-3.5 w-3.5" />
                <span>Our Vision</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Democratizing Access to <br />
                <span className="text-primary">Personalized Learning</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed">
                <p>
                  We believe every student deserves a mentor who understands their unique learning style, 
                  pace, and ambitions. Our platform is more than just a marketplace; it's a ecosystem 
                  built on trust and pedagogical excellence.
                </p>
                <p>
                  By leveraging cutting-edge real-time technology, we've removed the physical barriers 
                  to mentorship. A student in London can now learn data science from an expert in 
                  Singapore as seamlessly as if they were in the same room.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-4">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-bold">100% Vetted Tutors</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-bold">HD Video Conferencing</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-bold">24/7 Global Support</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-bold">Encrypted Payments</span>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 text-[10px] font-black uppercase tracking-widest mb-4">
              <Heart className="h-3.5 w-3.5" />
              <span>Core Values</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-6">Built on Foundation of Trust</motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              Our values guide every decision we make, from the features we build to the teachers we verify.
            </motion.p>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Pedagogical Excellence",
                desc: "We don't just find teachers; we find educators who know how to inspire and adapt to every learner's needs.",
                icon: GraduationCap,
                color: "text-blue-500",
                bg: "bg-blue-500/10"
              },
              {
                title: "Safety & Integrity",
                desc: "Our rigorous 5-step vetting process ensures that every mentor on our platform meets the highest standards.",
                icon: Shield,
                color: "text-primary",
                bg: "bg-primary/10"
              },
              {
                title: "Human Connection",
                desc: "Technology is just the bridge. The real magic happens in the meaningful connection between mentor and student.",
                icon: Zap,
                color: "text-purple-500",
                bg: "bg-purple-500/10"
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group p-10 rounded-[40px] bg-card border border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all"
              >
                <div className={`w-16 h-16 rounded-[24px] ${value.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <value.icon className={`h-8 w-8 ${value.color}`} />
                </div>
                <h3 className="text-2xl font-black mb-4">{value.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section (Modern Grid) */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-4">
                  <Users className="h-3.5 w-3.5" />
                  <span>The Minds Behind</span>
                </motion.div>
                <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black">Meet Our Founders</motion.h2>
              </div>
              <motion.p variants={itemVariants} className="text-xl text-muted-foreground font-medium max-w-md">
                A diverse team of educators, engineers, and designers working to change the future of learning.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { name: "Sarah Jenkins", role: "CEO & Co-founder", bio: "Former Educator with 15+ years in EdTech innovation.", img: "https://i.pravatar.cc/400?img=32" },
                { name: "David Chen", role: "CTO", bio: "Engineering veteran focused on real-time collaboration systems.", img: "https://i.pravatar.cc/400?img=12" },
                { name: "Marcus Thorne", role: "Head of Pedagogy", bio: "PhD in Learning Sciences, specializing in remote mentorship.", img: "https://i.pravatar.cc/400?img=11" }
              ].map((member, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="aspect-[4/5] rounded-[40px] overflow-hidden mb-6">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-black group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-sm font-black uppercase tracking-widest text-primary mb-3">{member.role}</p>
                  <p className="text-muted-foreground font-medium">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 relative">
          <div className="max-w-6xl mx-auto rounded-[48px] bg-primary p-12 md:p-20 text-center text-primary-foreground overflow-hidden relative shadow-2xl">
             <div className="absolute top-0 right-0 p-12 opacity-10">
                <Sparkles className="w-96 h-96 rotate-45" />
             </div>
             <motion.div variants={itemVariants} className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                  Join the Global Learning <br />Revolution Today
                </h2>
                <p className="text-xl opacity-90 max-w-2xl mx-auto mb-12 font-medium">
                  Whether you're looking to master a new skill or share your expertise with the world, 
                  there's a place for you at TeachLink.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/signup" className="w-full sm:w-auto">
                    <Button size="lg" variant="secondary" className="w-full h-16 px-12 rounded-full font-black text-xl shadow-xl">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/about" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full h-16 px-12 rounded-full font-black text-xl border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all">
                      Learn More
                    </Button>
                  </Link>
                </div>
             </motion.div>
          </div>
        </section>

        {/* Footer Link */}
        <section className="py-20 text-center">
           <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="text-muted-foreground font-bold group-hover:text-primary transition-colors">Back to Home</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
           </Link>
        </section>
      </motion.div>
    </div>
  );
}
