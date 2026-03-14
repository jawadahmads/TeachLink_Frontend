import { useNavigate } from "react-router";
import { Card, CardContent } from "../../components/ui/card";
import { motion } from "motion/react";
import { Form } from "../../components/ui/form";
import { usePublishGig } from "./hooks/usePublishGig";
import { AccessDenied } from "./components/AccessDenied";
import { ProfileIncomplete } from "./components/ProfileIncomplete";
import { PublishGigHeader } from "./components/PublishGigHeader";
import { TeacherInfoCard } from "./components/TeacherInfoCard";
import { GigStatsCards } from "./components/GigStatsCards";
import { GigForm } from "./components/GigForm";
import { GigDetails } from "./components/GigDetails";
import { GigSubmitButton } from "./components/GigSubmitButton";

const containerVariants = {
  type: "spring",
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
            <PublishGigHeader
              isPublished={teacherInfo?.isPublished || false}
              onBack={() => navigate(-1)}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
              <CardContent className="p-8 md:p-12 space-y-8">
                <motion.div
                  variants={itemVariants}
                  className="grid md:grid-cols-3 gap-8"
                >
                  <div className="md:col-span-2">
                    <TeacherInfoCard
                      teacherInfo={teacherInfo}
                      subjects={subjectsArray}
                    />
                  </div>
                  <GigStatsCards
                    hourlyRate={teacherInfo?.hourlyRate}
                    languages={languagesArray}
                  />
                </motion.div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <GigDetails teacherInfo={teacherInfo} />
                    <GigForm form={form} />
                    <GigSubmitButton
                      isPublished={teacherInfo?.isPublished || false}
                      onNavigate={() => navigate("/teacher/dashboard")}
                    />
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
