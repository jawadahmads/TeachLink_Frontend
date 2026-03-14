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
    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px]">
      <CardHeader>
        <CardTitle className="text-xl font-black flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Popularity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border/50">
          <span className="text-sm font-bold text-muted-foreground">
            Rebooking Rate
          </span>
          <span className="font-black text-primary">{rebookingRate}%</span>
        </div>
        <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border/50">
          <span className="text-sm font-bold text-muted-foreground">
            Response Rate
          </span>
          <span className="font-black text-primary">{responseRate}%</span>
        </div>
        <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border/50">
          <span className="text-sm font-bold text-muted-foreground">
            Session Completion
          </span>
          <span className="font-black text-primary">{sessionCompletion}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
