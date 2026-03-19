import { Toaster } from "sonner";
import { motion } from "motion/react";
import { Fingerprint } from "lucide-react";
import { Form } from "../../components/ui/form";
import { useManageProfile } from "./hooks/useManageProfile";
import { ProfileHeader } from "./components/ProfileHeader";
import { PersonalOverview } from "./components/PersonalOverview";
import { BackgroundCredentials } from "./components/BackgroundCredentials";
import { TeachingSchedule } from "./components/TeachingSchedule";
import { Expertise } from "./components/Expertise";
import { Languages } from "./components/Languages";
import { ProfileHealthCard } from "./components/ProfileHealthCard";
import { VerificationStatusCard } from "./components/VerificationStatusCard";

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

export default function ManageProfile() {
  const {
    form,
    watch,
    user,
    newSubject,
    setNewSubject,
    newLanguage,
    setNewLanguage,
    availabilityData,
    setAvailabilityData,
    isSubmitting,
    isLoading,
    handleAddSubject,
    handleRemoveSubject,
    handleAddLanguage,
    handleRemoveLanguage,
    onSubmit,
  } = useManageProfile();

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background flex items-center justify-center"
      >
        <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </motion.div>
    );
  }

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
              className="space-y-8"
            >
              {/* Header */}
              <motion.div variants={itemVariants}>
                <ProfileHeader
                  onCancel={() => {}}
                  isSubmitting={isSubmitting}
                />
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Left Column - Main Details */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Profile Overview */}
                  <motion.div variants={itemVariants}>
                    <PersonalOverview control={form.control} watch={watch} />
                  </motion.div>

                  {/* Education & Experience */}
                  <motion.div variants={itemVariants}>
                    <BackgroundCredentials control={form.control} />
                  </motion.div>

                  {/* Availability */}
                  <motion.div variants={itemVariants}>
                    <TeachingSchedule
                      availabilityData={availabilityData}
                      setAvailabilityData={setAvailabilityData}
                    />
                  </motion.div>
                </div>

                {/* Right Column - Secondary Controls */}
                <div className="space-y-8">
                  {/* Subjects */}
                  <motion.div variants={itemVariants}>
                    <Expertise
                      control={form.control}
                      watch={watch}
                      newSubject={newSubject}
                      setNewSubject={setNewSubject}
                      handleAddSubject={handleAddSubject}
                      handleRemoveSubject={handleRemoveSubject}
                    />
                  </motion.div>

                  {/* Languages */}
                  <motion.div variants={itemVariants}>
                    <Languages
                      control={form.control}
                      watch={watch}
                      newLanguage={newLanguage}
                      setNewLanguage={setNewLanguage}
                      handleAddLanguage={handleAddLanguage}
                      handleRemoveLanguage={handleRemoveLanguage}
                    />
                  </motion.div>

                  {/* Profile Health */}
                  <motion.div variants={itemVariants}>
                    <ProfileHealthCard />
                  </motion.div>

                  {/* Verification Status */}
                  <motion.div variants={itemVariants}>
                    <VerificationStatusCard verified={user?.verified} />
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
