import { Link } from "react-router";
import { Star, Languages, Users, Video, Clock, CheckCircle2, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";

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
    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl overflow-hidden rounded-[40px]">
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <Sparkles className="w-64 h-64 rotate-12" />
      </div>
      <CardContent className="p-8 md:p-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start text-center lg:text-left">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Avatar className="h-40 w-40 sm:h-48 sm:w-48 border-[6px] border-background shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105">
              <AvatarImage
                src={teacherAvatar}
                alt={teacherName}
                className="object-cover"
              />
              <AvatarFallback className="text-5xl font-black bg-primary/10 text-primary">
                {teacherName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {teacherVerified && (
              <div className="absolute -bottom-2 right-4 z-20 bg-primary text-primary-foreground p-2 rounded-full shadow-xl border-4 border-background">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            )}
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
              <div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
                    {teacherName}
                  </h1>
                  <Badge className="bg-primary/10 text-primary border-primary/20 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-widest">
                    Top Rated Teacher
                  </Badge>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                  <div className="flex items-center gap-1.5 text-yellow-500">
                    <Star className="h-6 w-6 fill-current" />
                    <span className="font-black text-xl text-foreground">
                      {teacherRating}
                    </span>
                  </div>
                  <span className="text-muted-foreground font-bold">
                    ({teacherReviewCount} verified reviews)
                  </span>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {subjects.map((subject, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-muted px-4 py-1.5 rounded-full text-sm font-bold"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-4 min-w-[200px]">
                <div className="text-center lg:text-right">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
                    Hourly Rate
                  </p>
                  <div className="text-5xl font-black text-primary leading-none">
                    ${teacherHourlyRate}
                    <span className="text-lg font-bold text-muted-foreground ml-1">
                      /hr
                    </span>
                  </div>
                </div>
                {canBook && (
                  <div className="flex flex-col w-full gap-2">
                    <Link to={`/booking/${teacherId}`} className="w-full">
                      <Button
                        size="lg"
                        className="w-full h-14 rounded-2xl font-black shadow-xl shadow-primary/20 text-lg group"
                      >
                        Book a Lesson
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/chat" className="w-full">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full h-14 rounded-2xl font-black border-2 text-lg"
                      >
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Send Message
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/50">
              <div className="flex items-center justify-center lg:justify-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                    Students
                  </p>
                  <p className="text-sm font-bold">{teacherTotalStudents}</p>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                  <Video className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                    Experience
                  </p>
                  <p className="text-sm font-bold">{teacherTotalHours}h taught</p>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                    Response
                  </p>
                  <p className="text-sm font-bold">{teacherResponseTime}</p>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                  <Languages className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                    Languages
                  </p>
                  <p className="text-sm font-bold truncate max-w-[100px]">
                    {languages.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
