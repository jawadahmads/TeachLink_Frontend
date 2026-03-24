import { Link } from "react-router";
import { BookOpen } from "lucide-react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  to?: string;
}

export default function Logo({ className = "", iconOnly = false, to = "/" }: LogoProps) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 group transition-transform hover:scale-105 ${className}`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
        <BookOpen className="h-8 w-8 text-primary relative z-10" />
      </div>
      {!iconOnly && (
        <span className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
          Teach<span className="text-primary">Link</span>
        </span>
      )}
    </Link>
  );
}
