import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

export function SafetyCard() {
  return (
    <Card className="border-none bg-primary text-primary-foreground shadow-2xl rounded-[32px] overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
        <ShieldCheck className="w-32 h-32 rotate-12" />
      </div>
      <CardContent className="p-8 relative z-10">
        <h3 className="text-2xl font-black mb-4">TeachLink Shield</h3>
        <p className="text-sm font-semibold opacity-90 leading-relaxed mb-6">
          Every tutor undergoes background checks and rigorous vetting to ensure
          educational excellence and student safety.
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs font-black bg-white/10 p-3 rounded-xl border border-white/10">
            <CheckCircle2 className="h-4 w-4" />
            Identity Verified
          </div>
          <div className="flex items-center gap-3 text-xs font-black bg-white/10 p-3 rounded-xl border border-white/10">
            <CheckCircle2 className="h-4 w-4" />
            Academic Vetted
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
