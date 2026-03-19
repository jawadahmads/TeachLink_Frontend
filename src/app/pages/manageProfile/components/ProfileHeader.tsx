import { useNavigate, Link } from "react-router";
import { BookOpen, ArrowLeft, Save } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface ProfileHeaderProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

export function ProfileHeader({ onCancel, isSubmitting }: ProfileHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-4">
      <div className="space-y-6">
        <Link
          to="/teacher/dashboard"
          className="inline-flex items-center text-primary font-black text-xs uppercase tracking-[0.2em] group bg-primary/10 px-6 py-2 rounded-full border border-primary/20 hover:bg-primary/20 transition-all mb-4"
        >
          <ArrowLeft className="mr-3 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Elite Dashboard
        </Link>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-foreground">
          Architect Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-indigo-600">
            Professional Identity
          </span>
        </h1>
        <p className="text-2xl text-muted-foreground/80 leading-relaxed max-w-2xl font-medium">
          Refine your digital presence to resonate with high-intent students and 
          showcase your pedagogical mastery.
        </p>
      </div>
      <div className="flex items-center gap-6">
        <Button
          type="button"
          variant="outline"
          className="h-18 px-10 rounded-[28px] font-black text-lg border-2 border-border/10 bg-card/40 backdrop-blur-xl hover:bg-muted/50 transition-all active:scale-95 shadow-sm"
          onClick={() => navigate("/teacher/dashboard")}
        >
          Discard
        </Button>
        <Button
          type="submit"
          className="h-18 px-12 rounded-[28px] font-black text-xl shadow-[0_20px_40px_-10px_theme(colors.primary.DEFAULT / 0.3)] hover:shadow-primary/50 transition-all active:scale-95 group bg-primary"
          disabled={isSubmitting}
        >
          <Save className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
          {isSubmitting ? "Syncing..." : "Sync Profile"}
        </Button>
      </div>
    </div>
  );
}
