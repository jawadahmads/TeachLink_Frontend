import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

export function SafetyCard() {
  return (
    <Card className="border border-white/10 bg-primary text-primary-foreground shadow-[0_32px_64px_-16px_rgba(var(--primary),0.3)] rounded-[48px] overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000">
        <ShieldCheck className="w-40 h-40" />
      </div>
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      
      <CardContent className="p-10 relative z-10">
        <h3 className="text-3xl font-black mb-6 tracking-tighter">TeachLink Shield</h3>
        <p className="text-base font-medium opacity-90 leading-relaxed mb-8">
          Every mentor undergoes a multi-layered verification protocol to ensure architectural excellence and student safety.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-xs font-black bg-white/10 p-5 rounded-[24px] border border-white/10 backdrop-blur-md">
            <CheckCircle2 className="h-5 w-5 text-white" />
            <span className="uppercase tracking-[0.15em]">Identity Verified</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-black bg-white/10 p-5 rounded-[24px] border border-white/10 backdrop-blur-md">
            <CheckCircle2 className="h-5 w-5 text-white" />
            <span className="uppercase tracking-[0.15em]">Academic Vetted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
