import { useState, useRef, useEffect } from "react";
import { Plus, X, Clock, ChevronDown, Sun, Sunset, Moon } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Badge } from "../../../../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { Calendar, Trash2 } from "lucide-react";

const TIME_PRESETS = {
  MORNING: {
    label: "Morning",
    icon: Sun,
    times: [
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
    ],
  },
  AFTERNOON: {
    label: "Afternoon",
    icon: Sunset,
    times: [
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ],
  },
  EVENING: {
    label: "Evening",
    icon: Moon,
    times: [
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
    ],
  },
};

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

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
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activePreset, setActivePreset] = useState<
    keyof typeof TIME_PRESETS | null
  >(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const existingDays = availabilityData.map((d) => d.day);
  const availableDays = DAYS.filter((d) => !existingDays.includes(d.value));

  const handleAddTime = (time?: string) => {
    const timeToAdd = time || newTime;
    if (timeToAdd && !tempSlots.includes(timeToAdd)) {
      setTempSlots([...tempSlots, timeToAdd].sort());
      if (!time) setNewTime("");
    }
  };

  const toggleTimeSlot = (time: string) => {
    if (tempSlots.includes(time)) {
      handleRemoveTime(time);
    } else {
      handleAddTime(time);
    }
  };

  useEffect(() => {
    if (showTimePicker && timeInputRef.current) {
      timeInputRef.current.showPicker?.();
    }
  }, [showTimePicker]);

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
      setShowTimePicker(false);
      setActivePreset(null);
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
          <div className="space-y-4">
            <label className="font-black text-sm uppercase tracking-widest text-muted-foreground ml-1">
              Time Slots
            </label>

            {/* Preset Time Buttons */}
            <div className="flex flex-wrap gap-2">
              {(
                Object.keys(TIME_PRESETS) as Array<keyof typeof TIME_PRESETS>
              ).map((presetKey) => {
                const preset = TIME_PRESETS[presetKey];
                const Icon = preset.icon;
                const isActive = activePreset === presetKey;
                return (
                  <Button
                    key={presetKey}
                    type="button"
                    variant={isActive ? "default" : "outline"}
                    onClick={() => setActivePreset(isActive ? null : presetKey)}
                    className={`h-10 px-4 rounded-xl font-bold transition-all ${
                      isActive
                        ? "bg-primary shadow-lg shadow-primary/20"
                        : "border-2"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {preset.label}
                    <ChevronDown
                      className={`h-4 w-4 ml-2 transition-transform ${isActive ? "rotate-180" : ""}`}
                    />
                  </Button>
                );
              })}
            </div>

            {/* Preset Time Grid */}
            {activePreset && (
              <div className="bg-muted/50 rounded-2xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Select times for {TIME_PRESETS[activePreset].label}
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {TIME_PRESETS[activePreset].times.map((time) => {
                    const isSelected = tempSlots.includes(time);
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => toggleTimeSlot(time)}
                        className={`h-10 px-3 rounded-xl font-bold text-sm transition-all ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-background border-2 border-border hover:border-primary hover:bg-primary/10"
                        }`}
                      >
                        {formatTime(time)}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {
                      tempSlots.filter((t) =>
                        TIME_PRESETS[activePreset].times.includes(t),
                      ).length
                    }{" "}
                    selected
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setActivePreset(null)}
                    className="h-8 px-3 text-sm font-bold"
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}

            {/* Custom Time Input */}
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Input
                  ref={timeInputRef}
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTime()}
                  className="h-12 rounded-2xl border-2 font-bold pr-10"
                />
              </div>
              <Button
                type="button"
                onClick={() => handleAddTime()}
                disabled={!newTime || tempSlots.includes(newTime)}
                className="h-12 px-6 rounded-2xl font-black bg-primary shadow-lg disabled:opacity-50"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground font-medium ml-1">
              Or select from presets above, or enter a custom time
            </p>

            {/* Selected Slots */}
            {tempSlots.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tempSlots.map((slot) => (
                  <Badge
                    key={slot}
                    variant="secondary"
                    className="px-3 py-2 font-bold rounded-lg bg-primary/10 text-primary group cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => handleRemoveTime(slot)}
                  >
                    {formatTime(slot)}
                    <X className="ml-2 h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </Badge>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            {tempSlots.length > 0 && (
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setTempSlots([])}
                  className="h-8 px-3 text-xs font-bold text-muted-foreground hover:text-destructive"
                >
                  Clear All
                </Button>
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
