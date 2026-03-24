import { CheckCircle2, Zap } from "lucide-react";
import { Card, CardContent } from "../../../../../components/ui/card";
import { motion } from "motion/react";

export function ProfileHealthCard() {
  return (
    <Card className="border-none bg-primary text-primary-foreground shadow-[0_32px_64px_-16px_theme(colors.primary.DEFAULT / 0.4)] rounded-[48px] overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000">
        <Zap className="w-48 h-48 rotate-12" />
      </div>
      <CardContent className="p-10 md:p-14 relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h3 className="text-3xl font-black tracking-tighter">
            Elite Standing
          </h3>
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.25em] opacity-80">
              <span>Optimized Level</span>
              <span>92%</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "92%" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
                className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
              />
            </div>
          </div>
          <p className="text-sm font-semibold opacity-90 leading-relaxed max-w-[240px]">
            Your pedagogical presence is elite. Refine your bio further to
            dominate the top search rankings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
