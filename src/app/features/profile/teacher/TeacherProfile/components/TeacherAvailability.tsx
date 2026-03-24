import { Link } from "react-router";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Badge } from "../../../../../components/ui/badge";

interface Availability {
  day: string;
  slots: string[];
}

interface TeacherAvailabilityProps {
  availability: Availability[];
  teacherId: string;
  currentUserId?: string;
  currentUserRole?: string;
  currentUser?: Record<string, any> | null;
}

export function TeacherAvailability({
  availability,
  teacherId,
  currentUserId,
  currentUserRole,
  currentUser,
}: TeacherAvailabilityProps) {
  const userRole = currentUserRole || currentUser?.role || "";
  const isTeacher = userRole.toLowerCase() === "teacher";
  const isOwnProfile = currentUserId === teacherId;
  const canBook = !isTeacher && !isOwnProfile;

  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden group">
      <CardHeader className="p-10 md:p-12 pb-6 flex flex-row items-center justify-between">
        <CardTitle className="text-3xl font-black tracking-tighter flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Clock className="h-7 w-7" />
          </div>
          Temporal Horizon
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10 md:p-12 pt-0">
        <div className="grid sm:grid-cols-2 gap-8">
          {availability.map((day, index) => (
            <div
              key={index}
              className="p-8 rounded-[32px] border border-border/10 bg-background/20 hover:border-primary/20 transition-all duration-500 group/day"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover/day:scale-110 group-hover/day:rotate-3 transition-all duration-500 shadow-sm">
                  <Calendar className="h-6 w-6" />
                </div>
                <h4 className="font-black text-xl tracking-tight">{day.day}</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {day.slots.map((slot, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="px-4 py-2 font-black text-[10px] uppercase tracking-[0.1em] rounded-[14px] border border-primary/20 bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary/40 hover:shadow-lg transition-all cursor-default"
                  >
                    {slot}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        {canBook && (
          <Link to={`/booking/${teacherId}`}>
            <Button
              size="lg"
              className="w-full mt-12 h-16 rounded-[24px] font-black text-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 group"
            >
              Claim Your Strategic Slot
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
