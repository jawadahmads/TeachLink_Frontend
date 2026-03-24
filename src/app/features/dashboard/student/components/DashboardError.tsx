import { AlertCircle } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

interface DashboardErrorProps {
  error: string;
  onRetry: () => void;
}

export function DashboardError({ error, onRetry }: DashboardErrorProps) {
  return (
    <div className="flex-1 min-h-screen bg-background flex items-center justify-center">
      <Card className="max-w-md border-destructive/20 bg-destructive/5">
        <CardContent className="p-10 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-black mb-3">Unable to Load</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={onRetry}>Try Again</Button>
        </CardContent>
      </Card>
    </div>
  );
}
