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
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="space-y-4">
        <Link to="/" className="flex items-center gap-2.5 mb-6 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
            <BookOpen className="h-7 w-7 text-primary relative z-10" />
          </div>
          <span className="text-xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
            Teach<span className="text-primary">Link</span>
          </span>
        </Link>
        <Link
          to="/teacher/dashboard"
          className="inline-flex items-center text-primary font-black group hover:gap-3 transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Manage Your <span className="text-primary">Profile</span>
        </h1>
        <p className="text-muted-foreground font-semibold text-lg max-w-2xl">
          Keep your profile fresh and updated to attract more students and
          showcase your latest achievements.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          className="h-14 px-8 rounded-2xl font-black border-2"
          onClick={() => navigate("/teacher/dashboard")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="h-14 px-10 rounded-2xl font-black shadow-xl shadow-primary/20 text-lg group"
          disabled={isSubmitting}
        >
          <Save className="mr-2 h-5 w-5" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
