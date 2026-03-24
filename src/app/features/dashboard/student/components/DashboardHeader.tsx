import { Link } from "react-router";
import { Bell, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../../../../components/ui/button";

interface DashboardHeaderProps {
  userName: string;
  upcomingCount: number;
}

export function DashboardHeader({
  userName,
  upcomingCount,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
          <Sparkles className="h-4 w-4" />
          <span>Student Portal</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-foreground">
          Welcome back, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">
            {userName}!
          </span>
        </h1>
        <p className="text-2xl text-muted-foreground/80 leading-relaxed max-w-2xl font-medium">
          Your learning momentum is peak. You have{" "}
          <span className="text-foreground font-black underline decoration-primary/30 decoration-4 underline-offset-8">
            {upcomingCount} sessions
          </span>{" "}
          locked in for this week.
        </p>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/search">
          <Button className="h-18 px-10 rounded-[28px] font-black text-lg shadow-[0_20px_40px_-10px_theme(colors.primary.DEFAULT / 0.3)] hover:shadow-primary/50 transition-all active:scale-95 group">
            Book New Session
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="h-18 w-18 rounded-[28px] border-2 border-border/10 bg-card/40 backdrop-blur-xl hover:bg-muted/50 transition-all active:scale-95"
        >
          <Link
            to="/notifications"
            className="h-full w-full flex items-center justify-center"
          >
            <Bell className="h-7 w-7" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
