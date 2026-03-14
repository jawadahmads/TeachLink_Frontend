import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { motion } from "motion/react";

interface Review {
  id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
  subject: string;
}

interface TeacherReviewsProps {
  reviews: Review[];
  teacherRating: number;
}

export function TeacherReviews({ reviews, teacherRating }: TeacherReviewsProps) {
  return (
    <Card className="border-none shadow-lg bg-card/50 backdrop-blur-xl rounded-[32px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-black">
          Community Feedback
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="font-black text-lg">{teacherRating}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i <= Math.round(teacherRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl border border-border/50 hover:border-primary/50 transition-all bg-card shadow-sm group"
            >
              <div className="flex items-start gap-5">
                <Avatar className="h-14 w-14 border-2 border-background shadow-md">
                  <AvatarImage
                    src={review.studentAvatar}
                    alt={review.studentName}
                  />
                  <AvatarFallback className="font-bold">
                    {review.studentName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-black group-hover:text-primary transition-colors">
                      {review.studentName}
                    </h4>
                    <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                    <Badge
                      variant="secondary"
                      className="ml-2 h-6 font-bold text-[10px] rounded-full"
                    >
                      {review.subject}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
