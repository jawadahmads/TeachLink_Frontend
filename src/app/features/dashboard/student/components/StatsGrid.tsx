import { Calendar, BookOpen, Star, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import type { StudentStats } from "../../../../redux/dashboardSlice";

interface StatsGridProps {
  stats: StudentStats | undefined;
  upcomingCount: number;
  completedCount: number;
}

interface StatItem {
  label: string;
  value: number;
  icon: typeof Calendar;
  trend: string;
  color: string;
  bg: string;
  border: string;
}

export function StatsGrid({
  stats,
  upcomingCount,
  completedCount,
}: StatsGridProps) {
  const statItems: StatItem[] = [
    {
      label: "Total Sessions",
      value: stats?.totalSessions || 0,
      icon: BookOpen,
      trend: stats?.totalSessions
        ? `+${Math.min(3, stats.totalSessions)} this month`
        : "0 sessions",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/10",
    },
    {
      label: "Upcoming",
      value: upcomingCount,
      icon: Calendar,
      trend: upcomingCount > 0 ? "Next: Soon" : "No sessions",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/10",
    },
    {
      label: "Reviews Given",
      value: stats?.totalReviews || 0,
      icon: Star,
      trend: stats?.totalReviews
        ? `${stats.totalReviews} reviews`
        : "No reviews yet",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/10",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: Clock,
      trend: `${completedCount} completed`,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      {statItems.map((stat, i) => (
        <Card
          key={i}
          className="border border-border/10 bg-card/40 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-700 group overflow-hidden relative rounded-[48px]"
        >
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none duration-700">
            <stat.icon className="h-32 w-32 rotate-12 group-hover:rotate-[20deg] transition-transform duration-700" />
          </div>
          <CardContent className="p-10 relative z-10">
            <div
              className={`w-18 h-18 rounded-[24px] ${stat.bg} ${stat.border} border flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}
            >
              <stat.icon className={`h-9 w-9 ${stat.color}`} />
            </div>
            <div className="text-5xl font-black mb-3 tracking-tighter">
              {stat.value}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 mb-5">
              {stat.label}
            </div>
            <div
              className={`text-xs font-black inline-flex items-center gap-2 px-4 py-2 rounded-full ${stat.bg} ${stat.color} border ${stat.border} shadow-sm transition-all duration-500 group-hover:px-6`}
            >
              <TrendingUp className="h-4 w-4" />
              {stat.trend}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
