import { GraduationCap, Award, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

interface TeacherAboutProps {
  teacherBio: string;
  teacherEducation: string;
  teacherExperience: string;
  subjects: string[];
}

export function TeacherAbout({
  teacherBio,
  teacherEducation,
  teacherExperience,
  subjects,
}: TeacherAboutProps) {
  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden group">
      <CardHeader className="p-10 md:p-12 pb-6">
        <CardTitle className="text-3xl font-black tracking-tighter flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="h-7 w-7" />
          </div>
          Professional Genesis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10 md:p-12 pt-0 space-y-12">
        <p className="text-xl text-muted-foreground/80 leading-relaxed font-medium">
          {teacherBio}
        </p>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="p-8 rounded-[32px] bg-background/20 border border-border/10 hover:border-primary/20 transition-all duration-500 group/stat">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover/stat:scale-110 group-hover/stat:rotate-3 transition-all duration-500 shadow-sm">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h3 className="font-black text-xl tracking-tight">Academic Merit</h3>
            </div>
            <p className="text-foreground/90 font-bold text-lg leading-snug">
              {teacherEducation}
            </p>
          </div>

          <div className="p-8 rounded-[32px] bg-background/20 border border-border/10 hover:border-primary/20 transition-all duration-500 group/stat">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover/stat:scale-110 group-hover/stat:rotate-3 transition-all duration-500 shadow-sm">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="font-black text-xl tracking-tight">Accreditations</h3>
            </div>
            <p className="text-foreground/90 font-bold text-lg leading-snug">
              {teacherExperience}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-black tracking-tighter">
            Architectural Expertise
          </h3>
          <div className="flex flex-wrap gap-4">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-4 bg-primary/5 rounded-[24px] border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-500 group/subject cursor-default shadow-sm"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-primary/40 group-hover/subject:bg-primary group-hover/subject:scale-125 transition-all" />
                <span className="font-black text-sm uppercase tracking-[0.15em] text-primary">{subject}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
