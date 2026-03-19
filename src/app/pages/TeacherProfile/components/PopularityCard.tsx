import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

interface PopularityCardProps {
  rebookingRate?: number;
  responseRate?: number;
  sessionCompletion?: number;
}

export function PopularityCard({
  rebookingRate = 95,
  responseRate = 99,
  sessionCompletion = 100,
}: PopularityCardProps) {
  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden group">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-2xl font-black flex items-center gap-3 tracking-tighter">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <TrendingUp className="h-5 w-5" />
          </div>
          Popularity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-4">
        {[
          { label: "Rebooking Rate", value: `${rebookingRate}%` },
          { label: "Response Rate", value: `${responseRate}%` },
          { label: "Completion", value: `${sessionCompletion}%` },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-5 rounded-[24px] bg-background/20 border border-border/10 hover:border-primary/20 hover:bg-primary/5 transition-all duration-500">
            <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
              {item.label}
            </span>
            <span className="font-black text-primary text-lg tracking-tighter">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
