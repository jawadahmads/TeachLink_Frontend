import { useEffect, useLayoutEffect, useState } from "react";
import { Search, Filter, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { subjects } from "../data/mockData";
import { motion, AnimatePresence } from "motion/react";
import TeacherGig from "../components/TeacherGig";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchGigs } from "../redux/gigSlice";
import { toast } from "sonner";

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

export default function SearchTeachers() {
  const dispatch = useAppDispatch();
  const { gigs, loading, error } = useAppSelector((state) => state.gig);
  const { user } = useAppSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedDay, setSelectedDay] = useState("all");

  useLayoutEffect(() => {
    dispatch(fetchGigs())
      .unwrap()
      .catch((err) => {
        toast.error("Failed to fetch gigs");
        console.error(err);
      });
  }, [dispatch]);

  const teachers =
    gigs &&
    gigs.map((gig) => ({
      id: gig.teacher.id,
      gigId: gig.id,
      gigTitle: gig.title,
      gigDescription: gig.description,
      name: gig.teacher.name,
      avatar: gig.teacher.avatar,
      subjects: gig.teacher.subjects && gig.teacher.subjects.map((s) => s.name),
      rating: gig.teacher.rating,
      reviewCount: gig.teacher.reviewCount,
      hourlyRate: gig.teacher.hourlyRate,
      bio: gig.teacher.bio,
      education: gig.teacher.education,
      experience: gig.teacher.experience,
      languages: gig.teacher.languages.map((l) => l.name),
      availability: gig.teacher.availability,
      totalStudents: gig.teacher.totalStudents,
      totalHours: gig.teacher.totalHours,
      responseTime: gig.teacher.responseTime?.toString() ?? "",
      verified: gig.teacher.verified,
    }));

  const filteredTeachers = teachers
    .filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subjects.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesSubjects =
        selectedSubjects.length === 0 ||
        teacher.subjects.some((s) => selectedSubjects.includes(s));

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "low" && teacher.hourlyRate < 40) ||
        (priceRange === "medium" &&
          teacher.hourlyRate >= 40 &&
          teacher.hourlyRate < 50) ||
        (priceRange === "high" && teacher.hourlyRate >= 50);

      const matchesDay =
        selectedDay === "all" ||
        teacher.availability.some((a) => a.day === selectedDay);

      return matchesSearch && matchesSubjects && matchesPrice && matchesDay;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.hourlyRate - b.hourlyRate;
      if (sortBy === "price-high") return b.hourlyRate - a.hourlyRate;
      if (sortBy === "students") return b.totalStudents - a.totalStudents;
      return 0;
    });

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject],
    );
  };

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">
          Subjects
        </h3>
        <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
          {subjects.map((subject) => (
            <div key={subject} className="flex items-center space-x-3 group">
              <Checkbox
                id={subject}
                checked={selectedSubjects.includes(subject)}
                onCheckedChange={() => toggleSubject(subject)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor={subject}
                className="text-sm font-semibold cursor-pointer group-hover:text-primary transition-colors"
              >
                {subject}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">
          Price Range
        </h3>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="w-full rounded-xl border-2 hover:border-primary/50 transition-all font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-2">
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="low">Under $40/hr</SelectItem>
            <SelectItem value="medium">$40-50/hr</SelectItem>
            <SelectItem value="high">$50+/hr</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">
          Availability
        </h3>
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="w-full rounded-xl border-2 hover:border-primary/50 transition-all font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-2">
            <SelectItem value="all">Any Day</SelectItem>
            <SelectItem value="Monday">Monday</SelectItem>
            <SelectItem value="Tuesday">Tuesday</SelectItem>
            <SelectItem value="Wednesday">Wednesday</SelectItem>
            <SelectItem value="Thursday">Thursday</SelectItem>
            <SelectItem value="Friday">Friday</SelectItem>
            <SelectItem value="Saturday">Saturday</SelectItem>
            <SelectItem value="Sunday">Sunday</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(selectedSubjects.length > 0 ||
        priceRange !== "all" ||
        selectedDay !== "all") && (
        <Button
          variant="ghost"
          className="w-full rounded-full font-bold text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => {
            setSelectedSubjects([]);
            setPriceRange("all");
            setSelectedDay("all");
          }}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div className="mb-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Expert Tutors</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
              Find Your Perfect Teacher
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Browse through our global network of{" "}
              <span className="text-primary font-black">
                {teachers.length}+
              </span>{" "}
              verified expert teachers and start learning today.
            </p>
          </motion.div>

          {/* Top Search Bar */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl overflow-hidden rounded-3xl">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="Search by teacher name, subject, or specialty..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 bg-background border-2 rounded-2xl focus-visible:ring-primary/20 focus-visible:border-primary transition-all font-medium text-lg"
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center bg-background rounded-2xl border-2 px-4 h-14 min-w-[200px]">
                      <span className="text-sm font-bold text-muted-foreground mr-2">
                        Sort by:
                      </span>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="border-none bg-transparent h-auto p-0 focus:ring-0 font-black text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="price-low">
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value="price-high">
                            Price: High to Low
                          </SelectItem>
                          <SelectItem value="students">
                            Most Students
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Mobile Filter Trigger */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="md:hidden h-14 w-14 rounded-2xl border-2 flex-shrink-0"
                        >
                          <Filter className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="left"
                        className="w-[300px] sm:w-[400px]"
                      >
                        <SheetHeader className="mb-8">
                          <SheetTitle className="text-2xl font-black">
                            Filters
                          </SheetTitle>
                        </SheetHeader>
                        <FilterContent />
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-10">
            {/* Sidebar Filters (Desktop) */}
            <motion.div variants={itemVariants} className="hidden md:block">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    Filters
                  </h2>
                </div>
                <div className="p-8 rounded-[32px] border-none bg-card/50 backdrop-blur-xl shadow-lg">
                  <FilterContent />
                </div>
              </div>
            </motion.div>

            {/* Teacher List */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between px-2">
                <p className="text-sm font-bold text-muted-foreground">
                  Found{" "}
                  <span className="text-foreground">
                    {filteredTeachers.length}
                  </span>{" "}
                  exceptional teachers
                </p>
                <div className="flex gap-1">
                  {/* Layout toggles could go here */}
                </div>
              </div>

              <div className="space-y-6">
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-card/50 backdrop-blur-sm rounded-[32px]"
                  >
                    <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                    <h3 className="text-2xl font-black mb-2">Loading...</h3>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-card/50 backdrop-blur-sm rounded-[32px] border-2 border-destructive"
                  >
                    <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="h-10 w-10 text-destructive" />
                    </div>
                    <h3 className="text-2xl font-black mb-2 text-destructive">
                      Error loading teachers
                    </h3>
                    <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                      {error}
                    </p>
                    <Button
                      variant="link"
                      className="mt-4 font-black text-primary"
                      onClick={() => dispatch(fetchGigs())}
                    >
                      Try again
                    </Button>
                  </motion.div>
                )}

                {!loading && !error && (
                  <AnimatePresence mode="popLayout">
                    {filteredTeachers.map((teacher, i) => (
                      <motion.div
                        key={teacher.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        layout
                      >
                        <TeacherGig teacher={teacher} currentUser={user} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}

                {filteredTeachers.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-card/50 backdrop-blur-sm rounded-[32px] border-2 border-dashed border-border"
                  >
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">
                      No teachers found
                    </h3>
                    <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                      We couldn't find any teachers matching your current
                      filters. Try adjusting your search criteria.
                    </p>
                    <Button
                      variant="link"
                      className="mt-4 font-black text-primary"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedSubjects([]);
                        setPriceRange("all");
                        setSelectedDay("all");
                      }}
                    >
                      Reset all filters
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
