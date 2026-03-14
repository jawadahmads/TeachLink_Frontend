import { FileText, AlignLeft, Pencil, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
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
}

export function GigForm({ form }: GigFormProps) {
  return (
    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Pencil className="w-48 h-48 rotate-12 text-primary" />
      </div>
      
      <CardHeader className="p-8 md:p-12 pb-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <CardTitle className="text-2xl font-black">Gig Details</CardTitle>
        </div>
        <CardDescription className="text-base font-semibold max-w-xl">
          Craft a compelling title and description to showcase your expertise and attract the right students.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8 md:p-12 space-y-10">
        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Gig Headline
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Professional English Conversation with Native Speaker"
                    className="h-16 px-6 rounded-2xl border-2 font-bold text-lg focus-visible:ring-primary shadow-sm"
                  />
                </FormControl>
                <div className="flex justify-between items-center px-2">
                  <FormMessage className="font-bold text-xs" />
                  <span className="text-[10px] font-black text-muted-foreground/50 tabular-nums">
                    {field.value?.length || 0} / 80
                  </span>
                </div>
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <AlignLeft className="h-4 w-4" />
                  Detailed Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[200px] rounded-[32px] border-2 font-medium text-lg p-8 focus-visible:ring-primary leading-relaxed shadow-sm"
                    placeholder="Share your teaching philosophy, what makes your lessons unique, and the specific goals you'll help students achieve..."
                  />
                </FormControl>
                <FormMessage className="font-bold text-xs" />
              </FormItem>
            )}
          />
        </motion.div>
      </CardContent>
    </Card>
  );
}
