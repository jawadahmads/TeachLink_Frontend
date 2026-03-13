import { Sparkles, ArrowLeft } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
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

interface PublishGigHeaderProps {
  isPublished: boolean;
  onBack: () => void;
}

export function PublishGigHeader({
  isPublished,
  onBack,
}: PublishGigHeaderProps) {
  return (
    <div>
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 h-12 px-4 rounded-xl font-black hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Sparkles className="w-48 h-48 rotate-12" />
          </div>

          <CardHeader className="p-8 md:p-12 pb-0">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-2"
            >
              <Badge
                variant="secondary"
                className="bg-green-500/10 text-green-600 border-none font-black px-4 py-1"
              >
                {isPublished ? "Live" : "Draft"}
              </Badge>
            </motion.div>

            <motion.div variants={itemVariants}>
              <CardTitle className="text-3xl md:text-4xl font-black">
                Publish Your Gig
              </CardTitle>
            </motion.div>

            <motion.div variants={itemVariants}>
              <CardDescription className="text-base font-semibold text-muted-foreground">
                Make your profile visible to students and start receiving
                bookings.
              </CardDescription>
            </motion.div>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
}
