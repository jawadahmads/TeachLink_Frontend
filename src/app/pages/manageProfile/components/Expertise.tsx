import { BookOpen, Plus, X } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { subjects as availableSubjects } from "../../../data/mockData";
import { motion, AnimatePresence } from "motion/react";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";

interface ExpertiseProps {
  control: any;
  watch: any;
  newSubject: string;
  setNewSubject: (value: string) => void;
  handleAddSubject: () => void;
  handleRemoveSubject: (subject: string) => void;
}

export function Expertise({
  control,
  watch,
  newSubject,
  setNewSubject,
  handleAddSubject,
  handleRemoveSubject,
}: ExpertiseProps) {
  const subjects = watch("subjects");

  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden relative group/card">
      <CardHeader className="p-10 pb-0">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-1 w-8 bg-primary/30 rounded-full" />
          <CardTitle className="text-2xl font-black tracking-tighter">Mastery Domains</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-10 space-y-6 pt-6">
        <FormField
          control={control}
          name="subjects"
          render={() => (
            <FormItem className="space-y-6">
              <div className="flex flex-wrap gap-2.5">
                <AnimatePresence>
                  {subjects?.map((subject: string) => (
                    <motion.div
                      key={subject}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <Badge className="bg-primary/5 text-primary border-primary/20 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider group shadow-sm transition-all hover:bg-primary/10">
                        {subject}
                        <button
                          type="button"
                          onClick={() => handleRemoveSubject(subject)}
                          className="ml-2 hover:text-destructive transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="flex gap-3">
                <Select value={newSubject} onValueChange={setNewSubject}>
                  <SelectTrigger className="h-14 rounded-2xl border-border/10 bg-background/20 backdrop-blur-sm font-bold text-base focus:ring-0 px-6 transition-all hover:border-primary/40">
                    <SelectValue placeholder="Add domain..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-border/10 shadow-2xl">
                    {availableSubjects.map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        className="font-bold rounded-xl m-1 px-4"
                      >
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={handleAddSubject}
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
