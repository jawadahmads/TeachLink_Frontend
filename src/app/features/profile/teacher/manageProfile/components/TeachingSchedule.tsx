import { useState } from "react";
import { Calendar, Trash2, Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Badge } from "../../../../../components/ui/badge";
import { Input } from "../../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { AddAvailabilityDialog } from "./AddAvailabilityDialog";

interface DayAvailability {
  day: string;
  slots: string[];
}

interface TeachingScheduleProps {
  availabilityData: DayAvailability[];
  setAvailabilityData: React.Dispatch<React.SetStateAction<DayAvailability[]>>;
}

const DAYS = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
  { value: "SUNDAY", label: "Sunday" },
];

export function TeachingSchedule({
  availabilityData,
  setAvailabilityData,
}: TeachingScheduleProps) {
  const handleDayChange = (index: number, newDay: string) => {
    const newData = [...availabilityData];
    newData[index].day = newDay;
    setAvailabilityData(newData);
  };

  const handleRemoveDay = (index: number) => {
    setAvailabilityData(availabilityData.filter((_, i) => i !== index));
  };

  const handleAddTimeSlot = (index: number, time: string) => {
    const newData = [...availabilityData];
    if (time && !newData[index].slots.includes(time)) {
      newData[index].slots = [...newData[index].slots, time];
      setAvailabilityData(newData);
    }
  };

  const handleRemoveTimeSlot = (index: number, timeIndex: number) => {
    const newData = [...availabilityData];
    newData[index].slots = newData[index].slots.filter(
      (_, i) => i !== timeIndex,
    );
    setAvailabilityData(newData);
  };

  return (
    <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden relative group/card">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover/card:scale-110 transition-transform duration-1000">
        <Calendar className="w-48 h-48 rotate-12 text-primary" />
      </div>
      <CardHeader className="p-10 md:p-14 pb-0">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-1 w-8 bg-primary/30 rounded-full" />
          <CardTitle className="text-3xl font-black tracking-tighter">
            Temporal Horizon
          </CardTitle>
        </div>
        <CardDescription className="text-lg font-medium text-muted-foreground/60 ml-12">
          Synchronize your professional rhythm with world-class talent.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-10 md:p-14 space-y-6 pt-8">
        <div className="grid sm:grid-cols-2 gap-6">
          {availabilityData.map((dayData, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[32px] border border-border/10 bg-background/20 backdrop-blur-sm hover:border-primary/40 hover:bg-primary/5 transition-all duration-500 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Select
                    value={dayData.day}
                    onValueChange={(value) => handleDayChange(idx, value)}
                  >
                    <SelectTrigger className="w-36 h-10 font-black text-sm uppercase tracking-widest bg-transparent border-none focus:ring-0 px-0 text-foreground hover:text-primary transition-all">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-border/10 shadow-2xl">
                      {DAYS.map((day) => (
                        <SelectItem
                          key={day.value}
                          value={day.value}
                          className="font-bold"
                        >
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-xl text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
                  onClick={() => handleRemoveDay(idx)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {dayData.slots.map((slot, sIdx) => (
                  <Badge
                    key={sIdx}
                    variant="secondary"
                    className="px-4 py-1.5 font-black text-[10px] uppercase tracking-widest rounded-full border border-primary/10 bg-primary/5 text-primary hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all cursor-pointer group/slot shadow-sm"
                    onClick={() => handleRemoveTimeSlot(idx, sIdx)}
                  >
                    {slot}
                    <X className="ml-2 h-3 w-3 opacity-40 group-hover/slot:opacity-100 transition-opacity" />
                  </Badge>
                ))}
                <AddTimeSlotButton index={idx} onAddTime={handleAddTimeSlot} />
              </div>
            </div>
          ))}
          <AddAvailabilityDialog
            availabilityData={availabilityData}
            setAvailabilityData={setAvailabilityData}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface AddTimeSlotButtonProps {
  index: number;
  onAddTime: (index: number, time: string) => void;
}

function AddTimeSlotButton({ index, onAddTime }: AddTimeSlotButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (time) {
      onAddTime(index, time);
      setTime("");
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 px-4 rounded-full font-black text-[9px] uppercase tracking-[0.2em] border-dashed border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-3 w-3 mr-2" /> Add Slot
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-background/40 backdrop-blur-md border border-border/10 p-1 rounded-xl shadow-lg ring-1 ring-primary/10">
      <Input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="h-8 w-24 text-[10px] font-black tracking-widest border-none bg-transparent focus-visible:ring-0 p-2"
        autoFocus
      />
      <div className="flex gap-1 pr-1">
        <Button
          type="button"
          size="icon"
          className="h-7 w-7 rounded-lg bg-primary shadow-sm hover:scale-110 active:scale-95 transition-all"
          onClick={handleAdd}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-7 w-7 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-muted/20 transition-all"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
