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
      className="flex items-center gap-6 p-5 rounded-[32px] bg-muted/30 border border-border/50 h-full transition-all hover:bg-muted/50"
    >
      <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center p-1 border-4 border-background shadow-inner">
        {teacherInfo?.avatar ? (
          <img
            src={teacherInfo.avatar}
            alt={teacherInfo.name}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <span className="text-3xl font-black text-primary">
            {teacherInfo?.name?.charAt(0)}
          </span>
        )}
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
          Teacher Profile
        </p>
        <h3 className="text-2xl font-black text-foreground leading-tight mb-1">
          {teacherInfo?.name}
        </h3>
        <p className="text-muted-foreground font-bold text-sm bg-background/50 inline-block px-3 py-1 rounded-full border border-border/50">
          {Array.isArray(subjects) ? subjects.join(" • ") : subjects}
        </p>
      </div>
    </motion.div>
  );
}
