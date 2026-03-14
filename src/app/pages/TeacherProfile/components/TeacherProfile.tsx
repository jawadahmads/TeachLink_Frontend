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
      ease: "easeOut",
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
            studentId: r.studentId || r.student?.id || "",
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-10"
        >
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

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full h-16 bg-card/30 backdrop-blur-xl rounded-2xl p-2 border border-border/50">
                  <TabsTrigger
                    value="about"
                    className="flex-1 rounded-xl font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm"
                  >
                    About Me
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="flex-1 rounded-xl font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm"
                  >
                    Student Reviews ({teacherReviews.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="availability"
                    className="flex-1 rounded-xl font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm"
                  >
                    Availability
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <TabsContent
                    value="about"
                    className="mt-8 focus-visible:ring-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
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
                    className="mt-8 focus-visible:ring-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <TeacherReviews
                        reviews={teacherReviews}
                        teacherRating={teacherRating}
                      />
                    </motion.div>
                  </TabsContent>

                  <TabsContent
                    value="availability"
                    className="mt-8 focus-visible:ring-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
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

            <div className="space-y-8">
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
