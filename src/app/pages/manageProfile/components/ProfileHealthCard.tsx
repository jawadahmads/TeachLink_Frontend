import { CheckCircle2, Zap } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { motion } from "motion/react";

export function ProfileHealthCard() {
  return (
    <Card className="border-none bg-primary text-primary-foreground shadow-2xl rounded-[32px] overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
        <Zap className="w-32 h-32 rotate-12" />
      </div>
      <CardContent className="p-8 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-black tracking-tight">Profile Health</h3>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black uppercase tracking-widest opacity-80">
              <span>Completion</span>
              <span>92%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "92%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </div>
          </div>
          <p className="text-sm font-semibold opacity-90 leading-relaxed">
            Excellent work! Your profile is almost complete. Adding more
            specific details to your bio can boost your ranking.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
