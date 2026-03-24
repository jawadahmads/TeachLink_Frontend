import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { usePublishGig } from "./hooks/usePublishGig";
import { AccessDenied } from "./components/AccessDenied";
import { ProfileIncomplete } from "./components/ProfileIncomplete";
import { PublishGigHeader } from "./components/PublishGigHeader";
import { TeacherInfoCard } from "./components/TeacherInfoCard";
import { GigStatsCards } from "./components/GigStatsCards";
import { GigForm } from "./components/GigForm";
import { GigDetails } from "./components/GigDetails";
import { GigSubmitButton } from "./components/GigSubmitButton";
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
      ease: [0.22, 1, 0.36, 1] as any,
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
  const {
    form,
    teacherInfo,
    subjectsArray,
    languagesArray,
    isProfileComplete,
    isTeacher,
    onSubmit,
  } = usePublishGig();

  // Access Denied
  if (!isTeacher) {
    return <AccessDenied onLoginClick={() => navigate("/login")} />;
  }

  // Profile Incomplete
  if (!isProfileComplete) {
    return <ProfileIncomplete teacherInfo={teacherInfo} />;
  }

  // Main Form
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20 font-medium">
      <Toaster richColors />
      {/* Premium Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute bottom-[5%] right-[-10%] w-[45%] h-[45%] bg-purple-500/10 rounded-full blur-[140px] animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit) as any}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-12"
            >
              {/* Header */}
              <motion.div variants={itemVariants}>
                <PublishGigHeader
                  isPublished={teacherInfo?.isPublished || false}
                  onBack={() => navigate("/teacher/dashboard")}
                />
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Left Column - Gig DNA */}
                <div className="lg:col-span-2 space-y-8">
                  <motion.div variants={itemVariants}>
                    <GigDetails teacherInfo={teacherInfo} />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <GigForm form={form} />
                  </motion.div>
                </div>

                {/* Right Column - Identity Shards */}
                <div className="space-y-8">
                  <motion.div variants={itemVariants}>
                    <TeacherInfoCard
                      teacherInfo={teacherInfo as any}
                      subjects={subjectsArray}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <GigStatsCards
                      hourlyRate={teacherInfo?.hourlyRate}
                      languages={languagesArray}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <GigSubmitButton
                      isPublished={teacherInfo?.isPublished || false}
                      onNavigate={() => navigate("/teacher/dashboard")}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </form>
        </Form>
      </div>
    </div>
  );
}
