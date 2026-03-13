import { DollarSign, GraduationCap, Award } from "lucide-react";
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
import { motion } from "motion/react";

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

interface GigFormProps {
  form: any;
  isPublished: boolean;
}

export function GigForm({ form, isPublished }: GigFormProps) {
  return (
    <Form {...form}>
      <form className="space-y-8">
        <motion.div
          variants={itemVariants}
          className="grid sm:grid-cols-2 gap-6"
        >
          <FormField
            control={form.control}
            name="hourlyRate"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Hourly Rate ($)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="h-14 rounded-2xl border-2 font-bold focus-visible:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Education
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
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Experience
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
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
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
        </motion.div>
      </form>
    </Form>
  );
}
