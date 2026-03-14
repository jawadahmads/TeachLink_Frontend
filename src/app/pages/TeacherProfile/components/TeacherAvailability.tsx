import { Link } from "react-router";
import { Calendar, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

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
    <Card className="border-none shadow-lg bg-card/50 backdrop-blur-xl rounded-[32px]">
      <CardHeader>
        <CardTitle className="text-2xl font-black">Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-4">
          {availability.map((day, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl border border-border/50 bg-card hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Calendar className="h-5 w-5" />
                </div>
                <h4 className="font-black text-lg">{day.day}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {day.slots.map((slot, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="px-3 py-1 font-bold rounded-lg border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-default"
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
              className="w-full mt-10 h-16 rounded-[24px] font-black text-lg shadow-xl shadow-primary/20"
            >
              Secure Your Spot Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
