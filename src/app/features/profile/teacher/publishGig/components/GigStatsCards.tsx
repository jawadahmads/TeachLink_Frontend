import { DollarSign, Globe } from "lucide-react";
import { motion } from "motion/react";

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

interface GigStatsCardsProps {
  hourlyRate?: number;
  languages: string[];
}

export function GigStatsCards({ hourlyRate, languages }: GigStatsCardsProps) {
  return (
    <div className="space-y-6">
      <motion.div
        variants={itemVariants}
        className="p-8 rounded-[32px] bg-card/40 backdrop-blur-3xl border border-border/10 flex items-center gap-6 transition-all group/stat hover:bg-background/20 duration-500"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0 shadow-inner group-hover/stat:scale-110 transition-transform duration-500">
          <DollarSign className="h-8 w-8" />
        </div>
        <div>
          <p className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-1">
            Hourly Mastery
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black tracking-tighter text-foreground">${hourlyRate}</span>
            <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">/hr</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="p-8 rounded-[32px] bg-card/40 backdrop-blur-3xl border border-border/10 flex items-center gap-6 transition-all group/stat hover:bg-background/20 duration-500"
      >
        <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 shadow-inner group-hover/stat:scale-110 transition-transform duration-500">
          <Globe className="h-8 w-8" />
        </div>
        <div>
          <p className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-1">
            Linguistic Range
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-foreground">
              {Array.isArray(languages) ? languages.slice(0, 2).join(", ") : languages}
            </span>
            {Array.isArray(languages) && languages.length > 2 && (
              <span className="text-[10px] font-black text-primary/60 bg-primary/10 px-2 py-0.5 rounded-lg">
                +{languages.length - 2}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
