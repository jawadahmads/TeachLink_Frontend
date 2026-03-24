import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { motion } from "motion/react";
import type { Subject } from "../../../../redux/dashboardSlice";
import { itemVariants } from "../utils";

interface LearningProgressProps {
  favoriteSubjects: Subject[];
}

export function LearningProgress({ favoriteSubjects }: LearningProgressProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden">
        <CardHeader className="p-10 pb-4">
          <CardTitle className="text-2xl font-black tracking-tighter">
            Velocity & Mastery
          </CardTitle>
        </CardHeader>
        <CardContent className="p-10 pt-4 space-y-10">
          {favoriteSubjects.length > 0 ? (
            favoriteSubjects.map((subject, i) => (
              <div key={subject.id} className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">
                    {subject.name}
                  </span>
                  <span className="text-primary font-black text-xl tracking-tighter leading-none">
                    85%
                  </span>
                </div>
                <div className="h-4 w-full bg-background/50 rounded-full overflow-hidden p-1 shadow-inner group/progress">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full shadow-[0_4px_12px_rgba(59,130,246,0.3)] group-hover/progress:shadow-[0_4px_24px_rgba(59,130,246,0.5)] transition-shadow duration-500"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm text-center py-8">
              No favorite subjects yet. Book sessions to track progress!
            </p>
          )}
          <div className="pt-10 border-t border-border/10">
            <div className="flex items-center gap-5 p-6 rounded-[32px] bg-primary/5 border border-primary/10 group hover:bg-primary/10 transition-all duration-500 cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                <Star className="h-7 w-7 fill-current shadow-[0_0_20px_rgba(var(--primary),0.4)]" />
              </div>
              <div>
                <p className="text-lg font-black tracking-tight">
                  Keep Learning!
                </p>
                <p className="text-xs text-muted-foreground/60 font-black uppercase tracking-wider mt-1">
                  Book sessions to earn badges
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
