import { Star, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { Badge } from "../../../../../components/ui/badge";
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

export function TeacherReviews({
  reviews,
  teacherRating,
}: TeacherReviewsProps) {
  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden">
      <CardHeader className="p-10 md:p-12 pb-6 flex flex-row items-center justify-between">
        <CardTitle className="text-3xl font-black tracking-tighter flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <MessageSquare className="h-7 w-7" />
          </div>
          Community Echoes
        </CardTitle>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-black text-2xl tracking-tighter">
              {teacherRating}
            </span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i <= Math.round(teacherRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                />
              ))}
            </div>
          </div>
          <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            Global Sentiment
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-10 md:p-12 pt-0">
        <div className="space-y-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as any }}
              className="p-8 rounded-[32px] border border-border/10 hover:border-primary/40 hover:bg-primary/10 transition-all duration-500 bg-background/20 shadow-sm group"
            >
              <div className="flex flex-col sm:flex-row items-start gap-8">
                <div className="relative shrink-0">
                  <Avatar className="h-16 w-16 border-4 border-background shadow-xl scale-100 group-hover:scale-110 transition-transform duration-500">
                    <AvatarImage
                      src={review.studentAvatar}
                      alt={review.studentName}
                      className="object-cover"
                    />
                    <AvatarFallback className="font-black text-xl">
                      {review.studentName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-background rounded-full" />
                </div>
                <div className="flex-1 space-y-4 w-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
                        {review.studentName}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`h-3.5 w-3.5 ${
                                idx < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted/40"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] ml-2">
                          Verified Learner
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/10 rounded-full" />
                    <p className="text-muted-foreground/80 font-medium leading-relaxed italic pl-4">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary/20"
                    >
                      {review.subject} Material
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
