import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import type { Booking } from "../../../../redux/dashboardSlice";
import { formatStartDate, formatCurrency } from "../utils";

interface HistorySessionCardProps {
  booking: Booking;
}

export function HistorySessionCard({ booking }: HistorySessionCardProps) {
  const formattedDate = formatStartDate(booking.startTime);

  return (
    <div className="group flex items-center gap-5 p-5 rounded-[28px] border border-border/10 hover:bg-muted/20 transition-all duration-500 bg-background/20">
      <div className="relative">
        <Avatar className="h-12 w-12 border-2 border-background shadow-lg group-hover:scale-105 transition-transform">
          <AvatarImage
            src={booking.teacher?.avatar || undefined}
            className="object-cover"
          />
          <AvatarFallback className="font-black">
            {booking.teacher?.name?.charAt(0) || "T"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <h4 className="font-black text-base tracking-tight group-hover:text-primary transition-colors">
          {booking.teacher?.name || "Teacher"}
        </h4>
        <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest mt-0.5">
          {booking.subject?.name || "Subject"}{" "}
          <span className="mx-2 opacity-30">•</span> {formattedDate}
        </p>
      </div>
      <div className="text-right">
        <div className="text-xl font-black text-foreground tracking-tighter leading-none mb-1 capitalize">
          {booking.status.toLowerCase()}
        </div>
        <div className="flex items-center justify-end gap-1.5 text-green-500 text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-green-500/10 bg-green-500/5">
          ${formatCurrency(booking.payment?.amount || 0)}
        </div>
      </div>
    </div>
  );
}
