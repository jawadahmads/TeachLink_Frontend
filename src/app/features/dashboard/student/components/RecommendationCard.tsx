import { Link } from "react-router";
import { ArrowRight, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { motion } from "motion/react";
import { itemVariants } from "../utils";

export function RecommendationCard() {
  return (
    <motion.div variants={itemVariants}>
      <Card className="border-none bg-gradient-to-br from-primary via-blue-700 to-indigo-900 text-primary-foreground shadow-[0_40px_80px_-20px_rgba(59,130,246,0.4)] rounded-[48px] overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000">
          <Users className="w-48 h-48" />
        </div>
        <CardHeader className="p-10 pb-4">
          <CardTitle className="text-3xl font-black tracking-tighter relative z-10 leading-tight">
            Elevate Your <br />
            Network
          </CardTitle>
        </CardHeader>
        <CardContent className="p-10 pt-4 relative z-10">
          <p className="text-lg font-medium opacity-80 mb-10 leading-relaxed max-w-[200px]">
            Curated elite mentors based on your interests.
          </p>
          <Link to="/search">
            <Button
              variant="secondary"
              className="w-full h-16 rounded-[24px] font-black text-lg bg-white/10 hover:bg-white text-white hover:text-primary backdrop-blur-xl transition-all shadow-2xl group/rec"
            >
              Explore Elite
              <ArrowRight className="ml-3 h-6 w-6 group-hover/rec:translate-x-1.5 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
