import { Link } from "react-router";
import { Star, Clock, Video, CheckCircle2, Users, Award } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Teacher } from "../data/mockData";

interface TeacherGigProps {
  teacher: Teacher & {
    gigId?: string;
    gigTitle?: string;
    gigDescription?: string;
  };
}

export default function TeacherGig({ teacher }: TeacherGigProps) {
  return (
    <Card className="group border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all bg-card/50 backdrop-blur-sm overflow-hidden rounded-[32px]">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-row md:flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-background shadow-xl relative z-10 transition-transform duration-500 group-hover:scale-105">
                <AvatarImage
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-3xl font-black bg-primary/10 text-primary">
                  {teacher.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {teacher.verified && (
                <div className="absolute -bottom-1 right-2 z-20 bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg border-4 border-background">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}
            </div>

            <div className="hidden md:flex flex-col gap-3 w-full">
              <div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  Students
                </div>
                <span className="text-sm font-black">
                  {teacher.totalStudents}
                </span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <Award className="h-3.5 w-3.5" />
                  Experience
                </div>
                <span className="text-sm font-black">
                  {teacher.totalHours}h+
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
                    {teacher.name}
                  </h3>
                  <Badge className="bg-yellow-500/10 text-yellow-600 border-none font-black flex items-center gap-1.5 px-3">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {teacher.rating}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects &&
                    teacher.subjects.slice(0, 4).map((subject, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-muted font-bold px-3 py-1 rounded-full text-xs"
                      >
                        {subject}
                      </Badge>
                    ))}
                  {teacher.subjects && teacher.subjects.length > 4 && (
                    <Badge variant="ghost" className="text-xs font-bold px-2">
                      +{teacher.subjects.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-left sm:text-right bg-primary/5 sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-none">
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
                  Hourly Rate
                </div>
                <div className="text-3xl font-black text-primary">
                  ${teacher.hourlyRate}
                  <span className="text-sm font-bold text-muted-foreground ml-1">
                    /hr
                  </span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6 line-clamp-2 sm:line-clamp-none max-w-2xl">
              {teacher.bio}
            </p>

            <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-muted-foreground">
                    Response
                  </p>
                  <p className="text-xs font-bold">{teacher.responseTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                  <Video className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-muted-foreground">
                    Platform
                  </p>
                  <p className="text-xs font-bold">HD Video</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-muted-foreground">
                    Vetted
                  </p>
                  <p className="text-xs font-bold">100% Verified</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={`/teacher/${teacher.id}`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-2xl border-2 font-black group/btn"
                >
                  View Full Profile
                </Button>
              </Link>
              <Link to={`/booking/${teacher.id}`} className="flex-1">
                <Button className="w-full h-14 rounded-2xl font-black shadow-lg shadow-primary/20">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
