import { User, Camera, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";

interface PersonalOverviewProps {
  control: any;
  watch: any;
}

export function PersonalOverview({ control, watch }: PersonalOverviewProps) {
  const avatar = watch("avatar");
  const name = watch("name");

  return (
    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <User className="w-48 h-48 rotate-12" />
      </div>
      <CardHeader className="p-8 md:p-12 pb-0">
        <CardTitle className="text-2xl font-black">Personal Overview</CardTitle>
        <CardDescription className="text-base font-semibold">
          Update your basic information and profile picture.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 md:p-12 space-y-10">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <FormField
            control={control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="relative group">
                <Avatar className="h-32 w-32 border-4 border-background shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <AvatarImage src={field.value} className="object-cover" />
                  <AvatarFallback className="text-3xl font-black">
                    {name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="icon"
                  className="absolute -bottom-2 -right-2 rounded-xl bg-primary shadow-xl border-4 border-background group-hover:scale-110 transition-transform"
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <FormMessage className="absolute -bottom-6 left-0 w-full text-center" />
              </FormItem>
            )}
          />
          <div className="flex-1 space-y-6 w-full">
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary"
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
                  <FormItem className="space-y-3">
                    <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
                      Hourly Rate ($)
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                        <Input
                          type="number"
                          {...field}
                          className="h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary pl-12"
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
            <FormItem className="space-y-3">
              <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
                Professional Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-[160px] rounded-[24px] border-2 font-medium text-lg p-6 focus-visible:ring-primary leading-relaxed"
                  placeholder="Tell students about your teaching philosophy and background..."
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
