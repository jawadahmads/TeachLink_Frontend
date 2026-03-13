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
      className="flex items-center gap-4 p-6 rounded-3xl bg-card/50 border-2 border-primary/20"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        {teacherInfo?.avatar ? (
          <img
            src={teacherInfo.avatar}
            alt={teacherInfo.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <span className="text-2xl font-black text-primary">
            {teacherInfo?.name?.charAt(0)}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-xl font-black">{teacherInfo?.name}</h3>
        <p className="text-muted-foreground font-medium">{subjects}</p>
      </div>
    </motion.div>
  );
}
