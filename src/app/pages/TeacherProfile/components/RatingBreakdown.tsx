import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { motion } from "motion/react";

interface Review {
  rating: number;
}

interface RatingBreakdownProps {
  reviews: Review[];
}

export function RatingBreakdown({ reviews }: RatingBreakdownProps) {
  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden group">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-2xl font-black tracking-tighter flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
            <Star className="h-5 w-5 fill-current" />
          </div>
          Performance Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-6">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = reviews.filter((r) => r.rating === rating).length;
          const total = reviews.length || 1;
          const percentage = (count / total) * 100;
          return (
            <div key={rating} className="space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground/60">{rating} Stars</span>
                  <div className="flex gap-0.5 opacity-40">
                    {[...Array(rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <span className="text-muted-foreground/40">{count}</span>
              </div>
              <div className="h-3 bg-background/20 rounded-full overflow-hidden border border-border/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as any }}
                  className="h-full bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.4)] relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </motion.div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
