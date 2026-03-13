import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
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

interface AccessDeniedProps {
  onLoginClick: () => void;
}

export function AccessDenied({ onLoginClick }: AccessDeniedProps) {
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
              <motion.div
                variants={itemVariants}
                className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <AlertCircle className="h-10 w-10 text-red-500" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-black mb-4">Access Denied</h1>
              </motion.div>
              <motion.div variants={itemVariants}>
                <p className="text-muted-foreground text-lg mb-8">
                  This page is only available for teachers. Please log in as a
                  teacher to publish your gig.
                </p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  onClick={onLoginClick}
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
