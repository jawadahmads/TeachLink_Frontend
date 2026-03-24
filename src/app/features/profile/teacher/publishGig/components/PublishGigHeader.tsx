import { Sparkles, ArrowLeft } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { motion } from "motion/react";

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

interface PublishGigHeaderProps {
  isPublished: boolean;
  onBack: () => void;
}

export function PublishGigHeader({
  isPublished,
  onBack,
}: PublishGigHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-4">
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-primary font-black text-xs uppercase tracking-[0.2em] group bg-primary/10 px-6 py-2 rounded-full border border-primary/20 hover:bg-primary/20 transition-all mb-4"
        >
          <ArrowLeft className="mr-3 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Elite Dashboard
        </button>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-foreground">
          Launch Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-indigo-600">
            Pedagogical Legacy
          </span>
        </h1>
        <p className="text-2xl text-muted-foreground/80 leading-relaxed max-w-2xl font-medium">
          Broadcast your authority to the global student network and 
          start receiving high-impact bookings today.
        </p>
      </div>

      <motion.div
        variants={itemVariants}
        className="hidden lg:block absolute -top-12 -right-8 opacity-10 pointer-events-none -z-10 rotate-12"
      >
        <Sparkles className="w-64 h-64 text-primary" />
      </motion.div>
    </div>
  );
}
