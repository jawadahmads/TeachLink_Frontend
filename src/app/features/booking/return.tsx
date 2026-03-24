import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { motion } from "motion/react";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { clearBooking } from "../../redux/bookingSlice";

interface BookingData {
  selectedDay: string;
  selectedTime: string;
  subject: string;
  notes?: string;
  studentName: string;
  studentEmail: string;
  teacherId: string;
  teacherName: string;
  hourlyRate: number;
  platformFee: number;
  grandTotal: number;
  sessionDuration: string;
  bookingDate: string;
  studentId: string;
}

const SuccessView = ({ bookingData }: { bookingData: BookingData | null }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Clear the booking from Redux (and localStorage via slice)
    dispatch(clearBooking());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full"
      >
        <Card className="border-none shadow-2xl bg-card/80 backdrop-blur-xl rounded-[32px] w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-success" />

          <CardHeader className="text-center p-8 pb-4">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <CardTitle className="text-3xl font-black">
              Booking Confirmed!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6 px-8 pb-8">
            {bookingData && (
              <p className="text-muted-foreground font-medium">
                Your session with{" "}
                <span className="font-bold text-foreground">
                  {bookingData.teacherName}
                </span>{" "}
                on{" "}
                <span className="font-bold text-foreground">
                  {bookingData.selectedDay}
                </span>{" "}
                at{" "}
                <span className="font-bold text-foreground">
                  {bookingData.selectedTime}
                </span>{" "}
                has been booked.
              </p>
            )}
            {bookingData && (
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 text-left space-y-2">
                <p className="text-sm font-medium">
                  <span className="text-muted-foreground">Subject:</span>{" "}
                  {bookingData.subject}
                </p>
                <p className="text-sm font-medium">
                  <span className="text-muted-foreground">Amount Paid:</span>{" "}
                  <span className="font-bold text-primary">
                    ${bookingData.grandTotal.toFixed(2)}
                  </span>
                </p>
                <p className="text-sm font-medium">
                  <span className="text-muted-foreground">
                    Confirmation sent to:
                  </span>{" "}
                  {bookingData.studentEmail}
                </p>
              </div>
            )}
            <Button
              onClick={() => navigate("/")}
              className="w-full h-14 rounded-2xl font-black text-lg"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

const ReturnPage = () => {
  const { pendingBooking } = useAppSelector((state) => state.booking);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small delay to ensure state hydration if needed, 
    // though the slice already initializes from localStorage.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">Processing...</p>
        </div>
      </div>
    );
  }

  return <SuccessView bookingData={pendingBooking} />;
};

export default ReturnPage;

