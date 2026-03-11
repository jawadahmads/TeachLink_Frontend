import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  DollarSign,
  Clock,
  BookOpen,
  Globe,
  Calendar,
  GraduationCap,
  Award,
  Send
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Badge } from "../components/ui/badge";
import { useAppSelector } from "../redux/store";
import { motion } from "motion/react";
import { z } from "zod";

const gigPublishSchema = z.object({
  isPublished: z.boolean(),
  hourlyRate: z.number().min(1, "Hourly rate must be at least $1"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  education: z.string().min(2, "Education is required"),
  experience: z.string().min(2, "Experience is required"),
});

type GigPublishFormValues = z.infer<typeof gigPublishSchema>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function PublishGig() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  
  const isProfileComplete = user && 
    user.name &&
    user.avatar &&
    user.subjects &&
    user.subjects.length > 0 &&
    user.hourlyRate &&
    user.bio &&
    user.education &&
    user.experience &&
    user.languages &&
    user.languages.length > 0 &&
    user.availability &&
    user.availability.length > 0;

  const form = useForm<GigPublishFormValues>({
    resolver: zodResolver(gigPublishSchema),
    defaultValues: {
      isPublished: user?.isPublished || false,
      hourlyRate: user?.hourlyRate || 0,
      bio: user?.bio || "",
      education: user?.education || "",
      experience: user?.experience || "",
    },
  });

  const onSubmit = (data: GigPublishFormValues) => {
    console.log("Publishing gig:", data);
  };

  if (!user || (user.role && user.role.toLowerCase() !== 'teacher')) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10"
        >
          <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-red-500/5 rounded-full blur-[100px]" />
        </motion.div>

        <div className="max-w-2xl mx-auto px-4 py-16">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants}
          >
            <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
              <CardContent className="p-12 text-center">
                <motion.div variants={itemVariants} className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="h-10 w-10 text-red-500" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h1 className="text-3xl font-black mb-4">Access Denied</h1>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <p className="text-muted-foreground text-lg mb-8">
                    This page is only available for teachers. Please log in as a teacher to publish your gig.
                  </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button 
                    onClick={() => navigate('/login')}
                    className="h-14 px-8 rounded-2xl font-black text-lg"
                  >
                    Go to Login
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!isProfileComplete) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10"
        >
          <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-yellow-500/5 rounded-full blur-[100px]" />
        </motion.div>

        <div className="max-w-2xl mx-auto px-4 py-16">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants}
          >
            <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Sparkles className="w-48 h-48" />
              </div>
              <CardContent className="p-12">
                <motion.div variants={itemVariants} className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="h-10 w-10 text-yellow-500" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h1 className="text-3xl font-black mb-4 text-center">Complete Your Profile</h1>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <p className="text-muted-foreground text-lg mb-8 text-center">
                    You need to complete your profile before publishing your gig. Please fill in all required fields.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-4 mb-8">
                  {[
                    { label: "Profile Photo", complete: !!user?.avatar },
                    { label: "Subjects", complete: !!(user?.subjects && user.subjects.length > 0) },
                    { label: "Hourly Rate", complete: !!user?.hourlyRate },
                    { label: "Bio", complete: !!user?.bio },
                    { label: "Education", complete: !!user?.education },
                    { label: "Experience", complete: !!user?.experience },
                    { label: "Languages", complete: !!(user?.languages && user.languages.length > 0) },
                    { label: "Availability", complete: !!(user?.availability && user.availability.length > 0) },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-card/50 border border-border/50">
                      <span className="font-medium">{item.label}</span>
                      {item.complete ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button 
                    asChild
                    className="w-full h-14 rounded-2xl font-black text-lg"
                  >
                    <Link to="/teacher/manage-profile">
                      Complete Profile
                      <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                    </Link>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10"
      >
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-green-500/5 rounded-full blur-[100px]" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-6 h-12 px-4 rounded-xl font-black hover:bg-primary/10"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Sparkles className="w-48 h-48 rotate-12" />
              </div>
              <CardHeader className="p-8 md:p-12 pb-0">
                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-2xl bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-none font-black px-4 py-1">
                    {user?.isPublished ? "Live" : "Draft"}
                  </Badge>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-3xl md:text-4xl font-black">
                    Publish Your Gig
                  </CardTitle>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardDescription className="text-base font-semibold text-muted-foreground">
                    Make your profile visible to students and start receiving bookings.
                  </CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent className="p-8 md:p-12">
                <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 mb-10">
                  <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center gap-4 p-6 rounded-3xl bg-card/50 border-2 border-primary/20">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                        {user?.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
                        ) : (
                          <span className="text-2xl font-black text-primary">{user?.name?.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-black">{user?.name}</h3>
                        <p className="text-muted-foreground font-medium">{user?.subjects?.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 rounded-3xl bg-card/50 border border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-xs font-black uppercase tracking-widest">Hourly Rate</span>
                      </div>
                      <p className="text-3xl font-black text-primary">${user?.hourlyRate}/hr</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-card/50 border border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Globe className="h-4 w-4" />
                        <span className="text-xs font-black uppercase tracking-widest">Languages</span>
                      </div>
                      <p className="text-lg font-black">{user?.languages?.join(", ")}</p>
                    </div>
                  </div>
                </motion.div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="hourlyRate"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              Hourly Rate ($)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                className="h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="education"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                              <GraduationCap className="h-4 w-4" />
                              Education
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                              <Award className="h-4 w-4" />
                              Experience
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
                              Professional Bio
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                className="min-h-[160px] rounded-[24px] border-2 font-medium text-lg p-6 focus-visible:ring-primary leading-relaxed"
                                placeholder="Tell students about your teaching philosophy and background..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button 
                        type="submit"
                        className="flex-1 h-16 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        {user?.isPublished ? "Update Gig" : "Publish Gig"}
                      </Button>
                      {user?.isPublished && (
                        <Button 
                          type="button"
                          variant="outline"
                          className="h-16 px-8 rounded-2xl font-black text-lg border-2"
                          onClick={() => navigate('/teacher/dashboard')}
                        >
                          View Dashboard
                        </Button>
                      )}
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
