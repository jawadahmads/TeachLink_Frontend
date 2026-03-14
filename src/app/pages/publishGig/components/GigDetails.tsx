import { GraduationCap, Award, FileText, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { motion } from "motion/react";

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

interface TeacherInfo {
  bio?: string;
  education?: string;
  experience?: string;
}

interface GigDetailsProps {
  teacherInfo: TeacherInfo | null;
}

export function GigDetails({ teacherInfo }: GigDetailsProps) {
  return (
    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px] overflow-hidden">
      <CardHeader className="p-8 pb-0">
        <CardTitle className="text-xl font-black flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Info className="h-5 w-5" />
          </div>
          Professional Background
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-muted/30 border border-border/50 flex items-center gap-4 transition-all hover:bg-muted/50">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5">
                Education
              </p>
              <p className="font-bold leading-tight">
                {teacherInfo?.education || "Not specified"}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-muted/30 border border-border/50 flex items-center gap-4 transition-all hover:bg-muted/50">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5">
                Experience
              </p>
              <p className="font-bold leading-tight">
                {teacherInfo?.experience || "Not specified"}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
              <FileText className="h-3 w-3" />
              Teacher Bio
            </p>
            <div className="p-6 rounded-[32px] bg-muted/30 border border-border/50 transition-all hover:bg-muted/50">
              <p className="font-medium text-muted-foreground leading-relaxed italic">
                "{teacherInfo?.bio || "No bio provided"}"
              </p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
