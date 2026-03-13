import { Toaster } from "sonner";
import { motion } from "motion/react";
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
      ease: "easeOut",
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
    handleAddSubject,
    handleRemoveSubject,
    handleAddLanguage,
    handleRemoveLanguage,
    onSubmit,
  } = useManageProfile();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      <Toaster richColors />
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-10"
            >
              {/* Header */}
              <motion.div variants={itemVariants}>
                <ProfileHeader
                  onCancel={() => {}}
                  isSubmitting={isSubmitting}
                />
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-10">
                {/* Left Column - Main Details */}
                <div className="lg:col-span-2 space-y-10">
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
                <div className="space-y-10">
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
