import { GraduationCap, Award } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

interface BackgroundCredentialsProps {
  control: any;
}

export function BackgroundCredentials({ control }: BackgroundCredentialsProps) {
  return (
    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <GraduationCap className="w-48 h-48 rotate-12" />
      </div>
      <CardHeader className="p-8 md:p-12 pb-0">
        <CardTitle className="text-2xl font-black">
          Background & Credentials
        </CardTitle>
        <CardDescription className="text-base font-semibold">
          Showcase your qualifications and professional journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 md:p-12 space-y-10">
        <div className="grid sm:grid-cols-2 gap-8">
          <FormField
            control={control}
            name="education"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <FormLabel className="font-black text-lg">
                    Education
                  </FormLabel>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., PhD in Mathematics, MIT"
                    className="h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary"
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
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Award className="h-5 w-5" />
                  </div>
                  <FormLabel className="font-black text-lg">
                    Experience
                  </FormLabel>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 10+ years teaching experience"
                    className="h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary"
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
