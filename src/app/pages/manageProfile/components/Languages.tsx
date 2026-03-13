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
    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px] overflow-hidden">
      <CardHeader className="p-8 pb-0">
        <CardTitle className="text-xl font-black flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Globe className="h-5 w-5" />
          </div>
          Languages
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <FormField
          control={control}
          name="languages"
          render={() => (
            <FormItem className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {languages?.map((lang: string) => (
                  <Badge
                    key={lang}
                    variant="secondary"
                    className="px-4 py-2 rounded-xl font-black text-sm bg-muted group"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(lang)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add language..."
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddLanguage())
                  }
                  className="h-12 rounded-xl border-2 font-bold focus-visible:ring-primary"
                />
                <Button
                  type="button"
                  onClick={handleAddLanguage}
                  className="h-12 w-12 rounded-xl bg-primary shadow-lg shadow-primary/20"
                >
                  <Plus className="h-5 w-5" />
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
