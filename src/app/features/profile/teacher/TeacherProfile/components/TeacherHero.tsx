import { Link } from "react-router";
import {
  Star,
  Languages,
  Users,
  Video,
  Clock,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { Badge } from "../../../../../components/ui/badge";

interface TeacherHeroProps {
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  teacherVerified: boolean;
  teacherRating: number;
  teacherReviewCount: number;
  teacherHourlyRate: number;
  subjects: string[];
  languages: string[];
  teacherTotalStudents: number;
  teacherTotalHours: number;
  teacherResponseTime: string;
  currentUserId?: string;
  currentUserRole?: string;
  currentUser?: Record<string, any> | null;
}

export function TeacherHero({
  teacherId,
  teacherName,
  teacherAvatar,
  teacherVerified,
  teacherRating,
  teacherReviewCount,
  teacherHourlyRate,
  subjects,
  languages,
  teacherTotalStudents,
  teacherTotalHours,
  teacherResponseTime,
  currentUserId,
  currentUserRole,
  currentUser,
}: TeacherHeroProps) {
  const userRole = currentUserRole || currentUser?.role || "";
  const isTeacher = userRole.toLowerCase() === "teacher";
  const isOwnProfile = currentUserId === teacherId;
  const canBook = !isTeacher && !isOwnProfile;

  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-card/40 backdrop-blur-3xl overflow-hidden rounded-[48px] relative group">
      {/* Cinematic Decorative Elements */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000">
        <Sparkles className="w-64 h-64 text-primary" />
      </div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-50" />

      <CardContent className="p-10 md:p-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start text-center lg:text-left">
          {/* Avatar Section: Elite Framing */}
          <div className="relative group/avatar">
            <div className="absolute inset-[-8px] bg-gradient-to-br from-primary/30 to-blue-600/30 blur-2xl rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-700" />
            <div className="relative">
              <Avatar className="h-44 w-44 sm:h-56 sm:w-56 border-[8px] border-background/50 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] relative z-10 transition-all duration-700 group-hover/avatar:scale-105 group-hover/avatar:rotate-1">
                <AvatarImage
                  src={teacherAvatar}
                  alt={teacherName}
                  className="object-cover"
                />
                <AvatarFallback className="text-6xl font-black bg-primary/10 text-primary">
                  {teacherName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {teacherVerified && (
                <div className="absolute -bottom-1 right-6 z-20 bg-primary text-primary-foreground p-2.5 rounded-full shadow-2xl border-4 border-background animate-in zoom-in duration-500">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8 mb-10">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-none">
                    {teacherName}
                  </h1>
                  <Badge className="bg-primary/10 text-primary border-none font-black px-5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] shadow-sm">
                    Elite Mentor
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i <= Math.round(teacherRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <span className="font-black text-2xl tracking-tighter ml-1">
                      {teacherRating}
                    </span>
                  </div>
                  <div className="h-1 w-1 rounded-full bg-muted-foreground/30 hidden sm:block" />
                  <span className="text-muted-foreground font-black text-xs uppercase tracking-widest bg-muted/20 px-4 py-1.5 rounded-full">
                    {teacherReviewCount} verified reviews
                  </span>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                  {subjects.map((subject, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-background/40 backdrop-blur-md border border-border/10 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider hover:bg-primary/20 hover:border-primary/40 transition-all cursor-default shadow-sm"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-6 min-w-[240px]">
                <div className="text-center lg:text-right space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">
                    Premium Rate
                  </p>
                  <div className="text-6xl font-black text-primary tracking-tighter flex items-end justify-center lg:justify-end">
                    ${teacherHourlyRate}
                    <span className="text-xl font-black text-muted-foreground/40 mb-2 ml-1">
                      /hr
                    </span>
                  </div>
                </div>

                {canBook && (
                  <div className="flex flex-col w-full gap-3">
                    <Link to={`/booking/${teacherId}`} className="w-full">
                      <Button
                        size="lg"
                        className="w-full h-16 rounded-[24px] font-black shadow-xl shadow-primary/20 text-lg group bg-primary hover:shadow-primary/40 transition-all active:scale-95"
                      >
                        Secure Lesson Slot
                        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/chat" className="w-full">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full h-16 rounded-[24px] font-black border border-border/10 bg-background/20 backdrop-blur-xl hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-all text-lg shadow-sm"
                      >
                        <MessageSquare className="mr-3 h-6 w-6" />
                        Private Nexus
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Matrix */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-border/10">
              {[
                {
                  label: "Community",
                  value: teacherTotalStudents,
                  icon: Users,
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  label: "Mastery",
                  value: `${teacherTotalHours}h`,
                  icon: Video,
                  color: "text-green-500",
                  bg: "bg-green-500/10",
                },
                {
                  label: "Response",
                  value: teacherResponseTime,
                  icon: Clock,
                  color: "text-purple-500",
                  bg: "bg-purple-500/10",
                },
                {
                  label: "Dialogue",
                  value: languages.length,
                  icon: Languages,
                  color: "text-orange-500",
                  bg: "bg-orange-500/10",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center lg:justify-start gap-4 group/stat"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover/stat:scale-110 group-hover/stat:rotate-3 transition-all duration-500 shadow-sm`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 leading-none mb-1.5">
                      {stat.label}
                    </p>
                    <p className="text-base font-black tracking-tight leading-none text-foreground/90">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
