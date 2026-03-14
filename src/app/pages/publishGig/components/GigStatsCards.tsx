import { DollarSign, Globe } from "lucide-react";

interface GigStatsCardsProps {
  hourlyRate?: number;
  languages: string[];
}

export function GigStatsCards({ hourlyRate, languages }: GigStatsCardsProps) {
  return (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl bg-muted/30 border border-border/50 flex items-center gap-4 transition-all hover:bg-muted/50">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <DollarSign className="h-6 w-6" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5">
            Hourly Rate
          </p>
          <p className="text-2xl font-black text-primary leading-none">
            ${hourlyRate}<span className="text-sm font-bold text-muted-foreground ml-1">/hr</span>
          </p>
        </div>
      </div>

      <div className="p-5 rounded-3xl bg-muted/30 border border-border/50 flex items-center gap-4 transition-all hover:bg-muted/50">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <Globe className="h-6 w-6" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5">
            Languages
          </p>
          <p className="text-lg font-black leading-tight">
            {Array.isArray(languages) ? languages.join(", ") : languages}
          </p>
        </div>
      </div>
    </div>
  );
}
