import { ShieldCheck, ShieldX } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

interface VerificationStatusCardProps {
  verified?: boolean;
}

export function VerificationStatusCard({
  verified,
}: VerificationStatusCardProps) {
  return (
    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px] overflow-hidden">
      <CardContent className="p-8 flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-2xl ${verified ? "bg-green-500/10" : "bg-red-500/10"} flex items-center justify-center ${verified ? "text-green-600" : "text-red-600"}`}
        >
          {verified ? (
            <ShieldCheck className="h-6 w-6" />
          ) : (
            <ShieldX className="h-6 w-6" />
          )}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Identity Status
          </p>
          <p
            className={`text-sm font-black ${verified ? "text-green-600" : "text-red-600"}`}
          >
            {verified ? "Verified Professional" : "Unverified Professional"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
