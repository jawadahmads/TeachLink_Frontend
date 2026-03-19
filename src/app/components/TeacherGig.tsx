import { Link } from "react-router";
import { Star, Clock, Video, CheckCircle2, Users, Award } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Teacher } from "../data/mockData";
import { toast } from "sonner";

interface TeacherGigProps {
  teacher: Teacher & {
    gigId?: string;
    gigTitle?: string;
    gigDescription?: string;
  };
  currentUser?: {
    role?: string;
  } | null;
}

export default function TeacherGig({ teacher, currentUser }: TeacherGigProps) {
  const isTeacher = currentUser?.role?.toLowerCase() === "teacher";
  return (
    <Card className="group border border-border/10 shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-700 bg-card/40 backdrop-blur-3xl overflow-hidden rounded-[40px] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <CardContent className="p-8 sm:p-10 relative z-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex flex-row md:flex-col items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-8 border-background/50 shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2">
                <AvatarImage
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl font-black bg-primary/10 text-primary">
                  {teacher.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {teacher.verified && (
                <div className="absolute bottom-2 right-2 z-20 bg-primary text-primary-foreground p-2 rounded-2xl shadow-2xl border-4 border-background shadow-primary/40">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              )}
            </div>

            <div className="hidden md:flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between px-4 py-3 bg-muted/40 backdrop-blur-sm rounded-2xl border border-border/10 shadow-sm">
                <div className="flex items-center gap-2.5 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
                  <Users className="h-4 w-4" />
                  Students
                </div>
                <span className="text-sm font-black">
                  {teacher.totalStudents}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3 bg-muted/40 backdrop-blur-sm rounded-2xl border border-border/10 shadow-sm">
                <div className="flex items-center gap-2.5 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
                  <Award className="h-4 w-4" />
                  Exp
                </div>
                <span className="text-sm font-black">
                  {teacher.totalHours}h+
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-3xl font-black tracking-tighter group-hover:text-primary transition-colors duration-500">
                    {teacher.name}
                  </h3>
                  <Badge className="bg-yellow-500/10 text-yellow-600 border-none font-black flex items-center gap-2 px-4 py-1.5 rounded-xl shadow-lg shadow-yellow-500/5">
                    <Star className="h-4 w-4 fill-current" />
                    {teacher.rating}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {teacher.subjects &&
                    teacher.subjects.slice(0, 4).map((subject, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-muted/50 backdrop-blur-sm border border-border/20 font-black px-4 py-1.5 rounded-xl text-[10px] uppercase tracking-wider text-muted-foreground/80 hover:bg-primary hover:text-primary-foreground transition-all cursor-default"
                      >
                        {subject}
                      </Badge>
                    ))}
                  {teacher.subjects && teacher.subjects.length > 4 && (
                    <Badge variant="secondary" className="text-[10px] font-black px-3 text-primary/60 bg-primary/5 border-none">
                      +{teacher.subjects.length - 4} MORE
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-left sm:text-right bg-primary/5 sm:bg-transparent p-6 sm:p-0 rounded-3xl border border-primary/10 sm:border-none shadow-xl shadow-primary/5 sm:shadow-none">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">
                  Premium Rate
                </div>
                <div className="text-4xl font-black text-primary tracking-tighter">
                  ${teacher.hourlyRate}
                  <span className="text-sm font-bold text-muted-foreground/40 ml-1.5">
                    /HR
                  </span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground/80 text-base font-medium leading-relaxed mb-8 line-clamp-2 sm:line-clamp-3 max-w-2xl">
              {teacher.gigTitle && (
                <span className="font-black text-foreground block mb-2 text-lg tracking-tight leading-none">{teacher.gigTitle}</span>
              )}
              {teacher.gigDescription}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/10 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 leading-none mb-1">
                    Response
                  </p>
                  <p className="text-sm font-black tracking-tight">{teacher.responseTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/10 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 shadow-inner">
                  <Video className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 leading-none mb-1">
                    Platform
                  </p>
                  <p className="text-sm font-black tracking-tight">HD Video UI</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/10 shadow-sm hidden lg:flex">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shadow-inner">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 leading-none mb-1">
                    Verified
                  </p>
                  <p className="text-sm font-black tracking-tight">100% Elite Tutors</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to={`/teacher/${teacher.id}`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full h-16 rounded-[24px] border-2 font-black text-lg bg-card/40 backdrop-blur-xl hover:bg-muted/50 transition-all active:scale-[0.98]"
                >
                  View Full Profile
                </Button>
              </Link>
              <Link to={isTeacher ? "#" : `/booking/${teacher.id}`} className="flex-1">
                <Button 
                  className="w-full h-16 rounded-[24px] font-black text-lg shadow-[0_20px_40px_-10px_theme(colors.primary.DEFAULT / 0.3)] hover:shadow-primary/50 transition-all active:scale-[0.98]" 
                  onClick={() => isTeacher && toast.info("Students can only book tutoring sessions")}
                >
                  Book Session Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
