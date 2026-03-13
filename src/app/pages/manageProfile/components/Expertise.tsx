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
    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-[32px] overflow-hidden">
      <CardHeader className="p-8 pb-0">
        <CardTitle className="text-xl font-black flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <BookOpen className="h-5 w-5" />
          </div>
          Expertise
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <FormField
          control={control}
          name="subjects"
          render={() => (
            <FormItem className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {subjects?.map((subject: string) => (
                    <motion.div
                      key={subject}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 rounded-xl font-black text-sm group">
                        {subject}
                        <button
                          type="button"
                          onClick={() => handleRemoveSubject(subject)}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="flex gap-2">
                <Select value={newSubject} onValueChange={setNewSubject}>
                  <SelectTrigger className="h-12 rounded-xl border-2 font-bold">
                    <SelectValue placeholder="Add subject..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 shadow-2xl">
                    {availableSubjects.map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        className="font-bold rounded-lg m-1"
                      >
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={handleAddSubject}
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
