import { Link } from "react-router";
import { Calendar, Clock, Video } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { motion } from "motion/react";
import type { Booking } from "../../../../redux/dashboardSlice";
import { formatStartDate, formatStartTime } from "../utils";

interface UpcomingSessionCardProps {
  booking: Booking;
  index: number;
}

export function UpcomingSessionCard({
  booking,
  index,
}: UpcomingSessionCardProps) {
  const formattedDate = formatStartDate(booking.startTime);
  const formattedTime = formatStartTime(booking.startTime);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.1 + 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group/item flex flex-col lg:flex-row lg:items-center gap-8 p-6 rounded-[36px] border border-border/10 hover:border-primary/20 hover:bg-primary/5 transition-all duration-700 bg-background/40 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-700" />

      <div className="flex items-center gap-5 relative z-10 shrink-0">
        <div className="relative">
          <Avatar className="h-16 w-16 border-4 border-background/50 shadow-xl group-hover/item:scale-105 transition-all duration-700">
            <AvatarImage
              src={booking.teacher?.avatar || undefined}
              className="object-cover"
            />
            <AvatarFallback className="font-black text-lg">
              {booking.teacher?.name?.charAt(0) || "T"}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 border-4 border-background rounded-full shadow-lg" />
        </div>
        <div>
          <h4 className="font-black text-xl tracking-tighter group-hover/item:text-primary transition-colors">
            {booking.teacher?.name || "Teacher"}
          </h4>
          <Badge className="mt-1 font-black text-[9px] uppercase tracking-[0.2em] bg-primary/10 text-primary border-none px-3 py-0.5 rounded-lg">
            {booking.subject?.name || "Subject"}
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex flex-wrap items-center gap-8 relative z-10 border-l border-border/10 pl-8 ml-2 lg:ml-0">
        <div className="flex items-center gap-3 text-muted-foreground/60 group-hover/item:text-primary transition-colors">
          <Calendar className="h-5 w-5" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest leading-none mb-1">
              Start Date
            </span>
            <span className="font-bold text-sm tracking-tight">
              {formattedDate}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground/60 group-hover/item:text-primary transition-colors">
          <Clock className="h-5 w-5" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest leading-none mb-1">
              Start Time
            </span>
            <span className="font-bold text-sm tracking-tight">
              {formattedTime}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0 border-l border-border/10 pl-8 lg:block flex justify-end w-full lg:w-auto">
        <Link to={`/video/${booking.id}`}>
          <Button className="h-14 px-8 rounded-[20px] font-black text-base shadow-xl shadow-primary/10 hover:shadow-primary/30 transition-all active:scale-95 group/btn">
            <Video className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-500" />
            Enter Lounge
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
