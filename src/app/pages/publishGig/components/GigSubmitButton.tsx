import { Send, LayoutDashboard } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { motion } from "motion/react";

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

interface GigSubmitButtonProps {
  isPublished: boolean;
  onNavigate: () => void;
}

export function GigSubmitButton({
  isPublished,
  onNavigate,
}: GigSubmitButtonProps) {
  return (
    <div className="space-y-4">
      <motion.div variants={itemVariants}>
        <Button
          type="submit"
          className="w-full h-20 rounded-[28px] font-black text-xl shadow-[0_20px_40px_-10px_theme(colors.primary.DEFAULT / 0.3)] hover:shadow-primary/50 transition-all active:scale-95 group bg-primary"
        >
          <Send className="mr-3 h-6 w-6 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
          {isPublished ? "Sync to Nexus" : "Broadcast to Nexus"}
        </Button>
      </motion.div>

      {isPublished && (
        <motion.div variants={itemVariants}>
          <Button
            type="button"
            variant="outline"
            className="w-full h-18 rounded-[28px] font-black text-lg border-2 border-border/10 bg-card/40 backdrop-blur-xl hover:bg-muted/50 transition-all active:scale-95 shadow-sm flex items-center gap-3"
            onClick={onNavigate}
          >
            <LayoutDashboard className="h-5 w-5" />
            Nexus Dashboard
          </Button>
        </motion.div>
      )}
    </div>
  );
}
