import { GraduationCap, Award } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../../../components/ui/card";
import { Input } from "../../../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";

interface BackgroundCredentialsProps {
  control: any;
}

export function BackgroundCredentials({ control }: BackgroundCredentialsProps) {
  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden relative group/card">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover/card:scale-110 transition-transform duration-1000">
        <GraduationCap className="w-48 h-48 rotate-12 text-primary" />
      </div>
      <CardHeader className="p-10 md:p-14 pb-0">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-1 w-8 bg-primary/30 rounded-full" />
          <CardTitle className="text-3xl font-black tracking-tighter">
            Academic Lineage
          </CardTitle>
        </div>
        <CardDescription className="text-lg font-medium text-muted-foreground/60 ml-12">
          Your credentials and professional evolution.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-10 md:p-14 space-y-8 pt-8">
        <div className="grid sm:grid-cols-2 gap-8">
          <FormField
            control={control}
            name="education"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground">
                    Education
                  </FormLabel>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., PhD in Mathematics, MIT"
                    className="h-14 rounded-2xl border-border/10 bg-background/20 backdrop-blur-sm font-bold text-base focus-visible:ring-0 focus:border-primary/50 transition-all px-6 placeholder:text-muted-foreground/30 placeholder:font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="experience"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                    <Award className="h-6 w-6" />
                  </div>
                  <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground">
                    Experience
                  </FormLabel>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 10+ years teaching experience"
                    className="h-14 rounded-2xl border-border/10 bg-background/20 backdrop-blur-sm font-bold text-base focus-visible:ring-0 focus:border-primary/50 transition-all px-6 placeholder:text-muted-foreground/30 placeholder:font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
