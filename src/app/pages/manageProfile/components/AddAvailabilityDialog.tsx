import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Calendar, Trash2 } from "lucide-react";

interface DayAvailability {
  day: string;
  slots: string[];
}

interface AddAvailabilityDialogProps {
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

export function AddAvailabilityDialog({
  availabilityData,
  setAvailabilityData,
}: AddAvailabilityDialogProps) {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [tempSlots, setTempSlots] = useState<string[]>([]);
  const [newTime, setNewTime] = useState("");
  const [open, setOpen] = useState(false);

  const existingDays = availabilityData.map((d) => d.day);
  const availableDays = DAYS.filter((d) => !existingDays.includes(d.value));

  const handleAddTime = () => {
    if (newTime && !tempSlots.includes(newTime)) {
      setTempSlots([...tempSlots, newTime]);
      setNewTime("");
    }
  };

  const handleRemoveTime = (time: string) => {
    setTempSlots(tempSlots.filter((t) => t !== time));
  };

  const handleSave = () => {
    if (selectedDay) {
      setAvailabilityData([
        ...availabilityData,
        { day: selectedDay, slots: tempSlots },
      ]);
      setSelectedDay("");
      setTempSlots([]);
      setOpen(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedDay("");
      setTempSlots([]);
      setNewTime("");
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-full min-h-[140px] rounded-3xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
            <Plus className="h-6 w-6" />
          </div>
          <span className="font-black text-sm uppercase tracking-widest text-muted-foreground group-hover:text-primary">
            Add Another Day
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-[32px] shadow-2xl bg-card/50 backdrop-blur-xl border-none">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <DialogTitle className="font-black text-xl">
              Add Availability
            </DialogTitle>
          </div>
          <DialogDescription className="text-base font-semibold ml-13">
            Select a day and add time slots for your availability.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Day Selection */}
          <div className="space-y-3">
            <label className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
              Select Day
            </label>
            <Select
              value={selectedDay}
              onValueChange={setSelectedDay}
              disabled={availableDays.length === 0}
            >
              <SelectTrigger className="w-full h-12 rounded-2xl border-2 font-bold">
                <SelectValue
                  placeholder={
                    availableDays.length === 0
                      ? "All days added"
                      : "Select a day"
                  }
                />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {availableDays.map((day) => (
                  <SelectItem
                    key={day.value}
                    value={day.value}
                    className="font-bold rounded-lg"
                  >
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Slots */}
          <div className="space-y-3">
            <label className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
              Time Slots
            </label>
            <div className="flex gap-2">
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTime()}
                className="h-12 rounded-2xl border-2 font-bold"
              />
              <Button
                type="button"
                onClick={handleAddTime}
                className="h-12 px-6 rounded-2xl font-black bg-primary shadow-lg"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            {/* Selected Slots */}
            {tempSlots.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tempSlots.map((slot) => (
                  <Badge
                    key={slot}
                    variant="secondary"
                    className="px-3 py-2 font-bold rounded-lg bg-muted group cursor-pointer"
                    onClick={() => handleRemoveTime(slot)}
                  >
                    {slot}
                    <X className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="sm:justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-12 px-6 rounded-2xl font-black border-2"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!selectedDay}
            className="h-12 px-6 rounded-2xl font-black bg-primary shadow-lg shadow-primary/20"
          >
            Save Day
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
