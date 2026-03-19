import { Pencil, FileText, AlignLeft, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface GigFormProps {
  form: UseFormReturn<{
    title: string;
    description: string;
  }>;
}

export function GigForm({ form }: GigFormProps) {
  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden relative group/card transition-all duration-700 hover:shadow-primary/5">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover/card:scale-110 group-hover/card:opacity-10 transition-all duration-700">
        <Pencil className="w-64 h-64 rotate-12 text-primary" />
      </div>
      
      <CardHeader className="p-10 md:p-14 pb-0 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary shadow-inner">
            <Sparkles className="h-6 w-6" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight">Gig Architecture</CardTitle>
        </div>
        <p className="text-lg font-medium text-muted-foreground/60 max-w-xl leading-relaxed">
          Craft a compelling title and description to showcase your expertise and attract the right students.
        </p>
      </CardHeader>

      <CardContent className="p-10 md:p-14 space-y-12 relative z-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Gig Headline
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., Professional English Conversation with Native Speaker"
                  className="h-16 px-8 rounded-2xl border-border/10 bg-background/20 backdrop-blur-sm font-bold text-xl focus-visible:ring-0 focus:border-primary/50 transition-all shadow-inner"
                />
              </FormControl>
              <div className="flex justify-between items-center px-2">
                <FormMessage className="font-bold text-xs" />
                <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest tabular-nums italic">
                  {field.value?.length || 0} / 80 Characters
                </span>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                <AlignLeft className="h-4 w-4" />
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-[250px] rounded-[32px] border-border/10 bg-background/20 backdrop-blur-sm font-medium text-lg p-10 focus-visible:ring-0 focus:border-primary/50 leading-relaxed shadow-inner"
                  placeholder="Share your teaching philosophy, what makes your lessons unique, and the specific goals you'll help students achieve..."
                />
              </FormControl>
              <FormMessage className="font-bold text-xs" />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
