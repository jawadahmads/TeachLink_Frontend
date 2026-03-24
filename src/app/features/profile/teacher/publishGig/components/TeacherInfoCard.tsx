import { motion } from "motion/react";
import { Badge } from "../../../../../components/ui/badge";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

interface TeacherInfo {
  name?: string;
  avatar?: string;
}

interface TeacherInfoCardProps {
  teacherInfo: TeacherInfo | null;
  subjects: string[];
}

export function TeacherInfoCard({
  teacherInfo,
  subjects,
}: TeacherInfoCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="p-8 rounded-[40px] bg-card/40 backdrop-blur-3xl border border-border/10 shadow-2xl relative group/shard transition-all duration-700 hover:shadow-primary/5"
    >
      <div className="flex items-center gap-8">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 opacity-0 group-hover/shard:opacity-100 transition-opacity duration-700" />
          <div className="w-28 h-28 rounded-[28px] bg-background/50 flex items-center justify-center p-1.5 border-4 border-background/50 shadow-2xl overflow-hidden relative z-10 transition-transform duration-700 group-hover/shard:scale-105 group-hover/shard:rotate-3">
            {teacherInfo?.avatar ? (
              <img
                src={teacherInfo.avatar}
                alt={teacherInfo.name}
                className="w-full h-full object-cover rounded-[20px]"
              />
            ) : (
              <span className="text-4xl font-black text-primary">
                {teacherInfo?.name?.charAt(0)}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1">
          <p className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-2">
            Identity Status
          </p>
          <h3 className="text-3xl font-black text-foreground leading-none tracking-tighter mb-4">
            {teacherInfo?.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(subjects) ? (
              subjects.slice(0, 3).map((sub, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-primary/5 text-primary border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg"
                >
                  {sub}
                </Badge>
              ))
            ) : (
              <Badge
                variant="secondary"
                className="bg-primary/5 text-primary border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg"
              >
                {subjects}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
