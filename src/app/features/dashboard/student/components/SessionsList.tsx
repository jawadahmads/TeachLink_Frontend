import { Link } from "react-router";
import { Calendar, Clock, PlayCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { Button } from "../../../../components/ui/button";
import { motion } from "motion/react";
import type { Booking } from "../../../../redux/dashboardSlice";
import { UpcomingSessionCard } from "./UpcomingSessionCard";
import { HistorySessionCard } from "./HistorySessionCard";
import { itemVariants } from "../utils";

interface SessionsListProps {
  upcomingBookings: Booking[];
  pastBookings: Booking[];
}

export function SessionsList({
  upcomingBookings,
  pastBookings,
}: SessionsListProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden group">
        <CardHeader className="flex flex-row items-center justify-between p-10 pb-6">
          <CardTitle className="text-3xl font-black tracking-tighter flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <PlayCircle className="h-7 w-7 text-primary animate-pulse" />
            </div>
            Learning Horizon
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="px-10 py-8">
              <TabsList className="bg-background/20 backdrop-blur-md h-14 p-1.5 gap-2 rounded-[24px] border border-border/10 inline-flex shadow-inner">
                <TabsTrigger
                  value="upcoming"
                  className="rounded-[20px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg shadow-none font-bold text-xs px-8 h-full transition-all duration-500"
                >
                  Upcoming ({upcomingBookings.length})
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="rounded-[20px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg shadow-none font-bold text-xs px-8 h-full transition-all duration-500"
                >
                  History ({pastBookings.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="upcoming"
              className="px-10 pb-10 m-0 focus-visible:ring-0"
            >
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-24 bg-background/30 rounded-[40px] border-2 border-dashed border-border/20 group-hover:border-primary/20 transition-all duration-700">
                  <Calendar className="h-20 w-20 mx-auto mb-8 text-muted-foreground opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110" />
                  <h3 className="font-black text-3xl mb-4 tracking-tighter">
                    Clear Horizon
                  </h3>
                  <p className="text-muted-foreground/60 font-medium mb-10 text-xl max-w-xs mx-auto">
                    Ready to ignite your next learning breakthrough?
                  </p>
                  <Link to="/search">
                    <Button className="h-16 px-12 rounded-[24px] font-black text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">
                      Discover Mentors
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {upcomingBookings.map((booking, i) => (
                    <UpcomingSessionCard
                      key={booking.id}
                      booking={booking}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="history"
              className="px-10 pb-10 m-0 focus-visible:ring-0"
            >
              {pastBookings.length === 0 ? (
                <div className="text-center py-16 bg-background/30 rounded-[40px] border-2 border-dashed border-border/20">
                  <Clock className="h-16 w-16 mx-auto mb-6 text-muted-foreground/20" />
                  <h3 className="font-black text-2xl mb-3">No History Yet</h3>
                  <p className="text-muted-foreground/60 text-sm">
                    Your completed sessions will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <HistorySessionCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
