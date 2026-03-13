import { useState } from "react";
import { Calendar, Trash2, Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
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
    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Calendar className="w-48 h-48 rotate-12" />
      </div>
      <CardHeader className="p-8 md:p-12 pb-0">
        <CardTitle className="text-2xl font-black">Teaching Schedule</CardTitle>
        <CardDescription className="text-base font-semibold">
          Set your weekly availability for student bookings.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 md:p-12 space-y-8">
        <div className="grid sm:grid-cols-2 gap-4">
          {availabilityData.map((dayData, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl border-2 border-border/50 bg-card hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Select
                    value={dayData.day}
                    onValueChange={(value) => handleDayChange(idx, value)}
                  >
                    <SelectTrigger className="w-36 h-8 font-black text-lg bg-transparent border-none focus-visible:ring-0 px-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
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
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveDay(idx)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {dayData.slots.map((slot, sIdx) => (
                  <Badge
                    key={sIdx}
                    variant="secondary"
                    className="px-3 py-1 font-bold rounded-lg border-none bg-muted hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer group/slot"
                    onClick={() => handleRemoveTimeSlot(idx, sIdx)}
                  >
                    {slot}
                    <X className="ml-2 h-3 w-3 opacity-0 group-hover/slot:opacity-100 transition-opacity" />
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
        className="h-7 rounded-lg font-black text-[10px] uppercase tracking-widest border-dashed"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-3 w-3 mr-1" /> Add
      </Button>
    );
  }

  return (
    <div className="flex gap-1">
      <Input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="h-7 w-28 text-xs rounded-lg"
        autoFocus
      />
      <Button
        type="button"
        size="sm"
        className="h-7 px-2 font-black"
        onClick={handleAdd}
      >
        <Plus className="h-3 w-3" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="h-7 px-1"
        onClick={() => setIsOpen(false)}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}
