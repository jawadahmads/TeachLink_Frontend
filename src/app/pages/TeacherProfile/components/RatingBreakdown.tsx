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
    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-black">
          Performance Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = reviews.filter((r) => r.rating === rating).length;
          const total = reviews.length || 1;
          const percentage = (count / total) * 100;
          return (
            <div key={rating} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-black">
                <div className="flex items-center gap-1.5">
                  <span>{rating} Stars</span>
                  <div className="flex gap-0.5">
                    {[...Array(rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <span className="text-muted-foreground">{count}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
