import { DollarSign, Globe } from "lucide-react";

interface GigStatsCardsProps {
  hourlyRate?: number;
  languages: string[];
}

export function GigStatsCards({ hourlyRate, languages }: GigStatsCardsProps) {
  return (
    <div className="space-y-4">
      <div className="p-6 rounded-3xl bg-card/50 border border-border/50">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <DollarSign className="h-4 w-4" />
          <span className="text-xs font-black uppercase tracking-widest">
            Hourly Rate
          </span>
        </div>
        <p className="text-3xl font-black text-primary">${hourlyRate}/hr</p>
      </div>
      <div className="p-6 rounded-3xl bg-card/50 border border-border/50">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Globe className="h-4 w-4" />
          <span className="text-xs font-black uppercase tracking-widest">
            Languages
          </span>
        </div>
        <p className="text-lg font-black">{languages}</p>
      </div>
    </div>
  );
}
