import { GraduationCap, Award } from "lucide-react";
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
    <Card className="border-none shadow-lg bg-card/50 backdrop-blur-xl rounded-[32px]">
      <CardHeader>
        <CardTitle className="text-2xl font-black">Biography</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <p className="text-lg text-muted-foreground leading-relaxed font-medium">
          {teacherBio}
        </p>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="font-black text-lg">Education</h3>
            </div>
            <p className="text-muted-foreground font-semibold">
              {teacherEducation}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-black text-lg">Certification</h3>
            </div>
            <p className="text-muted-foreground font-semibold">
              {teacherExperience}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black mb-6">
            Expertise & Specialties
          </h3>
          <div className="flex flex-wrap gap-3">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-5 py-3 bg-primary/5 rounded-2xl border border-primary/10 hover:border-primary/40 transition-colors group cursor-default"
              >
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-black text-sm">{subject}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
