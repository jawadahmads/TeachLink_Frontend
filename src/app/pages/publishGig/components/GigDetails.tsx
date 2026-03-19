import { GraduationCap, Award, FileText, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

interface GigDetailsProps {
  teacherInfo: {
    bio?: string;
    education?: string;
    experience?: string;
  } | null;
}

export function GigDetails({ teacherInfo }: GigDetailsProps) {
  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden relative group/card transition-all duration-700 hover:shadow-primary/5">
      <CardHeader className="p-10 md:p-14 pb-0 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary shadow-inner">
            <Info className="h-6 w-6" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight">Academic Pedigree</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-10 md:p-14 space-y-10 relative z-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[32px] bg-background/20 border border-border/10 flex items-center gap-6 transition-all group/item hover:bg-background/40 hover:-translate-y-1 duration-500">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0 shadow-inner group-hover/item:scale-110 transition-transform duration-500">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-1">
                Education
              </p>
              <p className="text-xl font-black leading-tight tracking-tight">
                {teacherInfo?.education || "Credentials Pending"}
              </p>
            </div>
          </div>

          <div className="p-8 rounded-[32px] bg-background/20 border border-border/10 flex items-center gap-6 transition-all group/item hover:bg-background/40 hover:-translate-y-1 duration-500">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 shadow-inner group-hover/item:scale-110 transition-transform duration-500">
              <Award className="h-7 w-7" />
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-1">
                Experience
              </p>
              <p className="text-xl font-black leading-tight tracking-tight">
                {teacherInfo?.experience || "Experience Pending"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Bio
          </p>
          <div className="p-10 rounded-[32px] bg-background/20 border border-border/10 transition-all hover:bg-background/40 duration-500 shadow-inner relative overflow-hidden group/bio">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover/bio:bg-primary transition-colors" />
            <p className="text-xl font-medium text-muted-foreground/80 leading-relaxed italic relative z-10">
              "{teacherInfo?.bio || "No biographical data provided in registry."}"
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
