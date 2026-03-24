import { motion } from "motion/react";
import { BookOpen } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-purple-500/8 rounded-full blur-[80px]" />
      </div>

      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.8,
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-[32px] blur-xl animate-pulse" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-primary/20 bg-primary/10 backdrop-blur-xl shadow-2xl shadow-primary/20">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex items-center gap-2"
        >
          <span className="text-4xl font-black tracking-tight text-foreground">
            Teach
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              Link
            </span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 text-sm font-medium text-muted-foreground/60 tracking-wide"
        >
          Connecting minds, shaping futures
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 flex items-center gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              className="h-3 w-3 rounded-full bg-gradient-to-r from-primary to-blue-500 shadow-lg shadow-primary/40"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
