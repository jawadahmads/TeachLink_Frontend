import { motion } from "motion/react";
import { BookOpen } from "lucide-react";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative">
        {/* Pulsing Background Rings */}
        <motion.div
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.3, 0.1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-full bg-primary/20"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1.8],
            opacity: [0.4, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
          className="absolute inset-0 rounded-full bg-primary/30"
        />

        {/* Main Logo Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.6,
          }}
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl bg-card shadow-xl ring-1 ring-border"
        >
          <BookOpen className="h-12 w-12 text-primary" />
        </motion.div>
      </div>

      {/* Brand Name Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-8 flex items-center gap-2"
      >
        <span className="text-3xl font-bold tracking-tight text-primary">
          TeachLink
        </span>
      </motion.div>

      {/* Loading Bar */}
      <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-full w-full bg-primary"
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-4 text-sm font-medium text-muted-foreground"
      >
        Empowering Minds, Anywhere.
      </motion.p>
    </motion.div>
  );
}
