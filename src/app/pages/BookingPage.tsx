import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  Calendar as CalendarIcon,
  Clock,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { mockTeachers, currentStudent } from "../data/mockData";
import { useAppSelector } from "../redux/store";

export default function BookingPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const teacher =
    mockTeachers.find((t) => t.id === teacherId) || mockTeachers[0];

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [subject, setSubject] = useState(teacher.subjects[0]);
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);

  const handleBooking = () => {
    // Mock booking
    navigate("/student/dashboard");
  };

  const totalPrice = teacher.hourlyRate * (parseInt(duration) / 60);

  return (
    <div className="min-h-screen bg-muted">
      <Header
        userType={
          (user?.role?.toLowerCase() as "student" | "teacher" | "admin") ||
          "student"
        }
        userName={user?.name || currentStudent.name}
        userAvatar={user?.avatar || currentStudent.avatar}
        unreadNotifications={2}
        unreadMessages={1}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    s === step
                      ? "bg-primary text-white"
                      : s < step
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {s < step ? <CheckCircle className="h-6 w-6" /> : s}
                </div>
                {s < 3 && <div className="w-16 h-1 bg-gray-200 mx-2" />}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-32 mt-2 text-sm">
            <span
              className={
                step >= 1 ? "text-primary font-medium" : "text-muted-foreground"
              }
            >
              Select Time
            </span>
            <span
              className={
                step >= 2 ? "text-primary font-medium" : "text-muted-foreground"
              }
            >
              Details
            </span>
            <span
              className={
                step >= 3 ? "text-primary font-medium" : "text-muted-foreground"
              }
            >
              Payment
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Choose a Day</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {teacher.availability.map((day, index) => (
                        <Button
                          key={index}
                          variant={
                            selectedDay === day.day ? "default" : "outline"
                          }
                          className="justify-start"
                          onClick={() => {
                            setSelectedDay(day.day);
                            setSelectedTime("");
                          }}
                        >
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {day.day}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {selectedDay && (
                    <div>
                      <Label className="mb-3 block">Available Time Slots</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {teacher.availability
                          .find((d) => d.day === selectedDay)
                          ?.slots.map((slot, index) => (
                            <Button
                              key={index}
                              variant={
                                selectedTime === slot ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => setSelectedTime(slot)}
                            >
                              {slot}
                            </Button>
                          ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="mb-3 block">Session Duration</Label>
                    <RadioGroup value={duration} onValueChange={setDuration}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="30" id="30" />
                        <Label htmlFor="30" className="cursor-pointer">
                          30 minutes - ${teacher.hourlyRate / 2}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="60" id="60" />
                        <Label htmlFor="60" className="cursor-pointer">
                          60 minutes - ${teacher.hourlyRate}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="90" id="90" />
                        <Label htmlFor="90" className="cursor-pointer">
                          90 minutes - ${teacher.hourlyRate * 1.5}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    className="w-full"
                    disabled={!selectedDay || !selectedTime}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Session Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="subject" className="mb-3 block">
                      Subject
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {teacher.subjects.map((s, index) => (
                        <Button
                          key={index}
                          variant={subject === s ? "default" : "outline"}
                          onClick={() => setSubject(s)}
                        >
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Session Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Tell the teacher what you'd like to focus on in this session..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-2"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button className="flex-1" onClick={() => setStep(3)}>
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-900 mb-1">
                          Mock Payment
                        </h4>
                        <p className="text-sm text-blue-700">
                          This is a demo. In a real application, you would enter
                          your payment details here using a secure payment
                          processor like Stripe.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Session fee</span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Platform fee
                      </span>
                      <span>${(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-primary">
                        ${(totalPrice * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    <Button className="flex-1" onClick={handleBooking}>
                      Confirm Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Summary Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={teacher.avatar} alt={teacher.name} />
                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{teacher.name}</h3>
                    <Link
                      to={`/teacher/${teacher.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-border">
                  {selectedDay && selectedTime && (
                    <div className="flex items-start gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <div className="text-sm font-medium">{selectedDay}</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedTime}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <div className="text-sm font-medium">
                        {duration} minutes
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {subject}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <div className="text-sm font-medium">Total</div>
                      <div className="text-lg font-bold text-primary">
                        ${(totalPrice * 1.1).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <Badge
                    variant="secondary"
                    className="w-full justify-center py-2"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Protected by TeachLink
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
