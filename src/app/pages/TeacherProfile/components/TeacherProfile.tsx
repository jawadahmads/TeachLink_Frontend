import { useParams } from "react-router";
import { useState, useLayoutEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { useAppSelector } from "../../../redux/store";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { getTeacherInfoById } from "../../../api/teacherInfo";
import {
  TeacherHero,
  TeacherAbout,
  TeacherReviews,
  TeacherAvailability,
  RatingBreakdown,
  SafetyCard,
  PopularityCard,
} from ".";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

export default function TeacherProfile() {
  const { userId } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [teacherData, setTeacherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    const fetchTeacherData = async () => {
      if (!userId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }
      try {
        const data = await getTeacherInfoById(userId);
        console.log(data);
        setTeacherData(data);
      } catch (err) {
        setError("Failed to fetch teacher data");
        toast.error("Failed to fetch teacher data");
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h3 className="text-2xl font-black">Loading...</h3>
        </div>
      </div>
    );
  }

  if (error || !teacherData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-black mb-2">Teacher Not Found</h3>
          <p className="text-muted-foreground">
            {error || "Unable to load teacher profile"}
          </p>
        </div>
      </div>
    );
  }

  const teacher = teacherData.teacher || teacherData;
  const gig = teacherData.gig || teacherData.gigs?.[0] || null;
  const teacherId = teacher?.id || userId || "";
  const teacherName = teacher?.name || "Teacher";
  const teacherAvatar = teacher?.avatar || teacher?.profileImage || "";
  const teacherVerified = teacher?.verified ?? false;
  const teacherRating = teacher?.rating ?? 0;
  const teacherReviewCount = teacher?.reviewCount ?? 0;
  const teacherHourlyRate = teacher?.hourlyRate ?? 0;
  const teacherBio = teacher?.bio || teacher?.about || "";
  const teacherEducation = teacher?.education || "";
  const teacherExperience = teacher?.experience || "";
  const teacherTotalStudents = teacher?.totalStudents ?? 0;
  const teacherTotalHours = teacher?.totalHours ?? 0;
  const teacherResponseTime = teacher?.responseTime || "";
  const subjects =
    teacher?.subjects?.map((s: { name: string }) => s.name) ||
    teacher?.subjects ||
    [];
  const availability = teacher?.availability || [];
  const languages =
    teacher?.languages?.map((l: { name: string }) => l.name) ||
    teacher?.languages ||
    [];
  const apiReviews = teacher?.reviews || teacher?.reviewsReceived || [];
  const teacherReviews =
    apiReviews.length > 0
      ? apiReviews.map(
          (r: {
            id: string;
            studentId?: string;
            comment: string;
            rating: number;
            student?: { name: string; avatar?: string };
          }) => ({
            id: r.id,
            studentId: r.studentId || (r.student as any)?.id || "",
            studentName: r.student?.name || "Student",
            studentAvatar: r.student?.avatar || "",
            teacherId: teacherId,
            rating: r.rating,
            comment: r.comment,
            date: new Date().toISOString(),
            subject: "General",
          }),
        )
      : [];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-medium text-foreground">
      {/* Premium Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 text-primary">
        <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-primary/10 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-blue-500/10 rounded-full blur-[140px] animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Main Hero Section */}
          <motion.div variants={itemVariants}>
            <TeacherHero
              teacherId={teacherId}
              teacherName={teacherName}
              teacherAvatar={teacherAvatar}
              teacherVerified={teacherVerified}
              teacherRating={teacherRating}
              teacherReviewCount={teacherReviewCount}
              teacherHourlyRate={teacherHourlyRate}
              subjects={subjects}
              languages={languages}
              teacherTotalStudents={teacherTotalStudents}
              teacherTotalHours={teacherTotalHours}
              teacherResponseTime={teacherResponseTime}
              currentUserId={user?.id}
              currentUserRole={user?.role}
              currentUser={user}
            />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-16">
            {/* Left Column: Interactive Content */}
            <div className="lg:col-span-2 space-y-16">
              <Tabs defaultValue="about" className="w-full">
                <div className="mb-10">
                  <TabsList className="bg-background/20 backdrop-blur-md h-16 p-2 gap-2 rounded-[32px] border border-border/10 inline-flex shadow-inner">
                    <TabsTrigger
                      value="about"
                      className="rounded-[24px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg shadow-none font-bold text-sm px-10 h-full transition-all duration-500"
                    >
                      Biography
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="rounded-[24px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg shadow-none font-bold text-sm px-10 h-full transition-all duration-500"
                    >
                      Student Echoes ({teacherReviews.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="availability"
                      className="rounded-[24px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg shadow-none font-bold text-sm px-10 h-full transition-all duration-500"
                    >
                      Availability
                    </TabsTrigger>
                  </TabsList>
                </div>

                <AnimatePresence mode="wait">
                  <TabsContent
                    value="about"
                    className="mt-0 focus-visible:ring-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }}
                    >
                      <TeacherAbout
                        teacherBio={teacherBio}
                        teacherEducation={teacherEducation}
                        teacherExperience={teacherExperience}
                        subjects={subjects}
                      />
                    </motion.div>
                  </TabsContent>

                  <TabsContent
                    value="reviews"
                    className="mt-0 focus-visible:ring-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }}
                    >
                      <TeacherReviews
                        reviews={teacherReviews}
                        teacherRating={teacherRating}
                      />
                    </motion.div>
                  </TabsContent>

                  <TabsContent
                    value="availability"
                    className="mt-0 focus-visible:ring-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }}
                    >
                      <TeacherAvailability
                        availability={availability}
                        teacherId={teacherId}
                        currentUserId={user?.id}
                        currentUserRole={user?.role}
                        currentUser={user}
                      />
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </div>

            {/* Right Column: Dynamic Data Insights */}
            <div className="space-y-12">
              <motion.div variants={itemVariants}>
                <RatingBreakdown reviews={teacherReviews} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <SafetyCard />
              </motion.div>

              <motion.div variants={itemVariants}>
                <PopularityCard />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
