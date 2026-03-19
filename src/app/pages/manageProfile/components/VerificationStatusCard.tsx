import { ShieldCheck, ShieldX } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

interface VerificationStatusCardProps {
  verified?: boolean;
}

export function VerificationStatusCard({
  verified,
}: VerificationStatusCardProps) {
  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden group">
      <CardContent className="p-10 flex items-center gap-6">
        <div
          className={`w-16 h-16 rounded-[24px] ${verified ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}
        >
          {verified ? (
            <ShieldCheck className="h-8 w-8" />
          ) : (
            <ShieldX className="h-8 w-8" />
          )}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 mb-1">
            Identity Status
          </p>
          <p
            className={`text-xl font-black tracking-tight ${verified ? "text-green-500" : "text-red-500"}`}
          >
            {verified ? "Verified Authority" : "Pending Credentials"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
