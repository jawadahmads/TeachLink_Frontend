import { User, Camera, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Button } from "../../../../../components/ui/button";

interface PersonalOverviewProps {
  control: any;
  watch: any;
}

export function PersonalOverview({ control, watch }: PersonalOverviewProps) {
  const avatar = watch("avatar");
  const name = watch("name");

  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden relative group/card">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover/card:scale-110 transition-transform duration-1000">
        <User className="w-48 h-48 rotate-12 text-primary" />
      </div>
      <CardHeader className="p-10 md:p-14 pb-0">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-1 w-8 bg-primary/30 rounded-full" />
          <CardTitle className="text-3xl font-black tracking-tighter">
            Pedagogical Essence
          </CardTitle>
        </div>
        <CardDescription className="text-lg font-medium text-muted-foreground/60 ml-12">
          Your digital signature and foundational presence.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-10 md:p-14 space-y-6 pt-8">
        <div className="flex flex-col sm:flex-row items-center gap-10">
          <FormField
            control={control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="relative group/avatar">
                <div className="absolute inset-[-4px] bg-gradient-to-br from-primary/20 to-blue-600/20 blur-xl rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-700" />
                <Avatar className="h-40 w-40 border-[6px] border-background/50 shadow-2xl relative z-10 transition-all duration-700 group-hover/avatar:scale-105">
                  <AvatarImage src={field.value} className="object-cover" />
                  <AvatarFallback className="text-4xl font-black bg-primary/10 text-primary">
                    {name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="icon"
                  className="absolute bottom-2 right-2 z-20 h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-xl border-4 border-background hover:scale-110 active:scale-95 transition-all"
                >
                  <Camera className="h-5 w-5" />
                </Button>
                <FormMessage className="absolute -bottom-8 left-0 w-full text-center" />
              </FormItem>
            )}
          />
          <div className="flex-1 space-y-6 w-full">
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-14 rounded-2xl border-border/10 bg-background/20 backdrop-blur-sm font-bold text-base focus-visible:ring-0 focus:border-primary/50 transition-all px-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="hourlyRate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
                      Hourly Rate ($)
                    </FormLabel>
                    <FormControl>
                      <div className="relative group/input">
                        <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40 group-focus-within/input:text-primary transition-colors" />
                        <Input
                          type="number"
                          {...field}
                          className="h-14 rounded-2xl border-border/10 bg-background/20 backdrop-blur-sm font-bold text-base focus-visible:ring-0 focus:border-primary/50 transition-all pl-14 pr-6"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <FormField
          control={control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
                Professional Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-[140px] rounded-[32px] border-border/10 bg-background/20 backdrop-blur-sm font-medium text-lg p-8 focus-visible:ring-0 focus:border-primary/50 transition-all leading-relaxed"
                  placeholder="Illuminate your teaching journey and methodology..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
