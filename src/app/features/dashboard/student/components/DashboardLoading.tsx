import { Loader2 } from "lucide-react";

export function DashboardLoading() {
  return (
    <div className="flex-1 min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-2">
            Loading Dashboard
          </h2>
          <p className="text-muted-foreground font-medium">
            Fetching your learning data...
          </p>
        </div>
      </div>
    </div>
  );
}
