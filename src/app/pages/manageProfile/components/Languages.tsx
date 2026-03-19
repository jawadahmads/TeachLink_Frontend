import { Globe, Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";

interface LanguagesProps {
  control: any;
  watch: any;
  newLanguage: string;
  setNewLanguage: (value: string) => void;
  handleAddLanguage: () => void;
  handleRemoveLanguage: (lang: string) => void;
}

export function Languages({
  control,
  watch,
  newLanguage,
  setNewLanguage,
  handleAddLanguage,
  handleRemoveLanguage,
}: LanguagesProps) {
  const languages = watch("languages");

  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden relative group/card">
      <CardHeader className="p-10 pb-0">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-1 w-8 bg-primary/30 rounded-full" />
          <CardTitle className="text-2xl font-black tracking-tighter">Linguistic Versatility</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-10 space-y-6 pt-6">
        <FormField
          control={control}
          name="languages"
          render={() => (
            <FormItem className="space-y-6">
              <div className="flex flex-wrap gap-2.5">
                {languages?.map((lang: string) => (
                  <Badge
                    key={lang}
                    variant="secondary"
                    className="px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider border border-primary/20 bg-primary/5 text-primary group shadow-sm transition-all hover:bg-primary/10"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(lang)}
                      className="ml-2 hover:text-destructive transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-3">
                <Input
                  placeholder="Add dialect..."
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddLanguage())
                  }
                  className="h-14 rounded-2xl border-border/10 bg-background/20 backdrop-blur-sm font-bold text-base focus-visible:ring-0 focus:border-primary/50 transition-all px-6 placeholder:text-muted-foreground/30 placeholder:font-medium"
                />
                <Button
                  type="button"
                  onClick={handleAddLanguage}
                  className="h-14 w-14 rounded-2xl bg-primary shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all shrink-0"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
