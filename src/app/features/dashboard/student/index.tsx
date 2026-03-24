import { Toaster } from "sonner";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import {
  fetchStudentDashboard,
  selectDashboardData,
  selectDashboardLoading,
  selectDashboardError,
} from "../../../redux/dashboardSlice";
import { motion } from "motion/react";

import {
  DashboardHeader,
  StatsGrid,
  SessionsList,
  LearningProgress,
  NexusChat,
  RecommendationCard,
  DashboardLoading,
  DashboardError,
} from "./components";

import { containerVariants } from "./utils";

export default function StudentDashboard() {
  const dispatch = useAppDispatch();
  const dashboardData = useAppSelector(selectDashboardData);
  const loading = useAppSelector(selectDashboardLoading);
  const error = useAppSelector(selectDashboardError);

  useEffect(() => {
    dispatch(fetchStudentDashboard());
  }, [dispatch]);

  if (loading && !dashboardData) {
    return <DashboardLoading />;
  }

  if (error && !dashboardData) {
    return <DashboardError error={error} onRetry={() => dispatch(fetchStudentDashboard())} />;
  }

  const userName = dashboardData?.user?.name?.split(" ")[0] || "Student";

  const allBookings = [
    ...(dashboardData?.upcomingBookings || []),
    ...(dashboardData?.pastBookings || []),
  ];

  const upcomingBookings = allBookings
    .filter((b) => b.status === "PENDING")
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    );

  const pastBookings = allBookings
    .filter((b) => b.status !== "PENDING")
    .sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
    );

  const stats = dashboardData?.stats;
  const favoriteSubjects = dashboardData?.favoriteSubjects || [];
  const favoriteTeachers = dashboardData?.favoriteTeachers || [];

  return (
    <div className="flex-1 min-h-screen bg-background relative overflow-hidden font-medium text-foreground">
      <Toaster richColors />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] left-[-10%] w-[45%] h-[45%] bg-blue-500/10 rounded-full blur-[140px] animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 pb-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <DashboardHeader
            userName={userName}
            upcomingCount={upcomingBookings.length}
          />

          <StatsGrid
            stats={stats}
            upcomingCount={upcomingBookings.length}
            completedCount={pastBookings.length}
          />

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              <SessionsList
                upcomingBookings={upcomingBookings}
                pastBookings={pastBookings}
              />
            </div>

            <div className="space-y-16">
              <LearningProgress favoriteSubjects={favoriteSubjects} />
              <NexusChat favoriteTeachers={favoriteTeachers} />
              <RecommendationCard />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
