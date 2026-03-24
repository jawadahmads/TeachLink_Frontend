import { Link } from "react-router";
import { AlertCircle, CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";
import { Card, CardContent } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { motion } from "motion/react";

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

interface TeacherInfo {
  subjects?: { name: string }[];
  hourlyRate?: number;
  bio?: string;
  education?: string;
  experience?: string;
  languages?: { name: string }[];
}

interface ProfileIncompleteProps {
  teacherInfo: TeacherInfo | null;
}

const checklistItems = [
  { label: "Profile Photo", key: "avatar", complete: true },
  { label: "Subjects", key: "subjects", complete: false },
  { label: "Hourly Rate", key: "hourlyRate", complete: false },
  { label: "Bio", key: "bio", complete: false },
  { label: "Education", key: "education", complete: false },
  { label: "Experience", key: "experience", complete: false },
  { label: "Languages", key: "languages", complete: false },
  { label: "Availability", key: "availability", complete: true },
];

export function ProfileIncomplete({ teacherInfo }: ProfileIncompleteProps) {
  const getCompletionStatus = (key: string): boolean => {
    switch (key) {
      case "subjects":
        return !!(
          teacherInfo?.subjects && teacherInfo.subjects.length > 0
        ) as boolean;
      case "hourlyRate":
        return !!teacherInfo?.hourlyRate;
      case "bio":
        return !!teacherInfo?.bio;
      case "education":
        return !!teacherInfo?.education;
      case "experience":
        return !!teacherInfo?.experience;
      case "languages":
        return !!(
          teacherInfo?.languages && teacherInfo.languages.length > 0
        ) as boolean;
      default:
        return true;
    }
  };

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
              <motion.div
                variants={itemVariants}
                className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <AlertCircle className="h-10 w-10 text-yellow-500" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-black mb-4 text-center">
                  Complete Your Profile
                </h1>
              </motion.div>
              <motion.div variants={itemVariants}>
                <p className="text-muted-foreground text-lg mb-8 text-center">
                  You need to complete your profile before publishing your gig.
                  Please fill in all required fields.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4 mb-8">
                {checklistItems.map((item, i) => {
                  const complete = getCompletionStatus(item.key);
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-2xl bg-card/50 border border-border/50"
                    >
                      <span className="font-medium">{item.label}</span>
                      {complete ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  );
                })}
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
