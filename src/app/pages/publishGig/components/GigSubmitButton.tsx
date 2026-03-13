import { Send } from "lucide-react";
import { Button } from "../../../components/ui/button";
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

interface GigSubmitButtonProps {
  isPublished: boolean;
  onNavigate: () => void;
}

export function GigSubmitButton({
  isPublished,
  onNavigate,
}: GigSubmitButtonProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col sm:flex-row gap-4 pt-4"
    >
      <Button
        type="submit"
        className="flex-1 h-16 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
      >
        <Send className="mr-2 h-5 w-5" />
        {isPublished ? "Update Gig" : "Publish Gig"}
      </Button>
      {isPublished && (
        <Button
          type="button"
          variant="outline"
          className="h-16 px-8 rounded-2xl font-black text-lg border-2"
          onClick={onNavigate}
        >
          View Dashboard
        </Button>
      )}
    </motion.div>
  );
}
