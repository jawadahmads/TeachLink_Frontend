import { useEffect, useLayoutEffect, useState } from "react";
import { Search, Filter, Sparkles, CheckCircle2 } from "lucide-react";
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
      ease: [0.22, 1, 0.36, 1] as any,
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

  const filteredTeachers = (teachers || [])
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
    <div className="space-y-12">
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-6">
          Subjects
        </h3>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
          {subjects.map((subject) => (
            <div key={subject} className="flex items-center gap-4 group cursor-pointer" onClick={() => toggleSubject(subject)}>
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${selectedSubjects.includes(subject) ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'border-border/40 group-hover:border-primary/40'}`}>
                {selectedSubjects.includes(subject) && <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />}
              </div>
              <Label
                htmlFor={subject}
                className="text-base font-black tracking-tight cursor-pointer group-hover:text-primary transition-colors select-none"
              >
                {subject}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-6">
          Investment Range
        </h3>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="w-full h-14 rounded-2xl border border-border/10 bg-background/50 backdrop-blur-sm hover:border-primary/20 transition-all font-black text-sm px-6 shadow-inner">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border border-border/10 bg-card/90 backdrop-blur-2xl p-2">
            <SelectItem value="all" className="rounded-xl font-bold py-3">Global Average</SelectItem>
            <SelectItem value="low" className="rounded-xl font-bold py-3">Economy (Under $40/hr)</SelectItem>
            <SelectItem value="medium" className="rounded-xl font-bold py-3">Professional ($40-50/hr)</SelectItem>
            <SelectItem value="high" className="rounded-xl font-bold py-3">Elite ($50+/hr)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-6">
          Preferred Schedule
        </h3>
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="w-full h-14 rounded-2xl border border-border/10 bg-background/50 backdrop-blur-sm hover:border-primary/20 transition-all font-black text-sm px-6 shadow-inner">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border border-border/10 bg-card/90 backdrop-blur-2xl p-2">
            <SelectItem value="all" className="rounded-xl font-bold py-3">Flexible Anytime</SelectItem>
            <SelectItem value="Monday" className="rounded-xl font-bold py-3">Monday Session</SelectItem>
            <SelectItem value="Tuesday" className="rounded-xl font-bold py-3">Tuesday Session</SelectItem>
            <SelectItem value="Wednesday" className="rounded-xl font-bold py-3">Wednesday Session</SelectItem>
            <SelectItem value="Thursday" className="rounded-xl font-bold py-3">Thursday Session</SelectItem>
            <SelectItem value="Friday" className="rounded-xl font-bold py-3">Friday Session</SelectItem>
            <SelectItem value="Saturday" className="rounded-xl font-bold py-3">Weekend: Saturday</SelectItem>
            <SelectItem value="Sunday" className="rounded-xl font-bold py-3">Weekend: Sunday</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(selectedSubjects.length > 0 ||
        priceRange !== "all" ||
        selectedDay !== "all") && (
        <Button
          variant="ghost"
          className="w-full h-14 rounded-2xl font-black text-destructive/60 hover:bg-destructive/10 hover:text-destructive transition-all group"
          onClick={() => {
            setSelectedSubjects([]);
            setPriceRange("all");
            setSelectedDay("all");
          }}
        >
          Reset All Selections
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Premium Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[140px] animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section: High-Impact */}
          <motion.div variants={itemVariants} className="mb-20 text-center md:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Sparkles className="h-4 w-4" />
              <span>Elite Mentorship</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-8 leading-[0.85]">
              Find Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">Perfect Teacher</span>
            </h1>
            <p className="text-2xl text-muted-foreground/80 leading-relaxed max-w-2xl font-medium">
              Browse through our global network of{" "}
              <span className="text-foreground font-black">
                {teachers.length}+
              </span>{" "}
              vetted expert mentors and accelerate your learning journey.
            </p>
          </motion.div>

          {/* Top Search Bar: Glassmorphism Evolution */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-card/40 backdrop-blur-3xl overflow-hidden rounded-[40px] p-2">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground/40 group-focus-within:text-primary transition-all duration-500" />
                    <Input
                      placeholder="Search by mentor name, subject, or specialty..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-16 h-18 bg-background/50 border-2 border-transparent focus:border-primary/20 rounded-[28px] focus-visible:ring-primary/10 transition-all font-black text-xl tracking-tight placeholder:text-muted-foreground/30 shadow-inner"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center bg-card/40 backdrop-blur-xl rounded-[28px] border border-border/10 px-6 h-18 min-w-[240px] shadow-sm">
                      <span className="text-[10px] font-black text-muted-foreground/40 mr-4 uppercase tracking-[0.2em]">
                        Sort
                      </span>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="border-none bg-transparent h-auto p-0 focus:ring-0 font-black text-base tracking-tight">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-[24px] border border-border/10 bg-card/90 backdrop-blur-2xl shadow-2xl p-2">
                          <SelectItem value="rating" className="rounded-xl font-bold py-3">Highest Rated</SelectItem>
                          <SelectItem value="price-low" className="rounded-xl font-bold py-3">Price: Low to High</SelectItem>
                          <SelectItem value="price-high" className="rounded-xl font-bold py-3">Price: High to Low</SelectItem>
                          <SelectItem value="students" className="rounded-xl font-bold py-3">Most Students</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Mobile Filter Trigger */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="md:hidden h-18 w-18 rounded-[28px] border-2 flex-shrink-0 bg-card/40 backdrop-blur-xl"
                        >
                          <Filter className="h-6 w-6" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="left"
                        className="w-[300px] sm:w-[400px] bg-card/90 backdrop-blur-3xl border-r border-border/10"
                      >
                        <SheetHeader className="mb-12">
                          <SheetTitle className="text-3xl font-black tracking-tighter">
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

          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar Filters (Desktop): Refined Glassmorphism */}
            <motion.div variants={itemVariants} className="hidden md:block">
              <div className="sticky top-28">
                <div className="flex items-center justify-between mb-8 px-4">
                  <h2 className="text-2xl font-black flex items-center gap-3 tracking-tighter uppercase text-[10px] tracking-[0.25em] text-muted-foreground/60">
                    <Filter className="h-4 w-4 text-primary" />
                    Advanced Filters
                  </h2>
                </div>
                <div className="p-10 rounded-[48px] border border-border/10 bg-card/40 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
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
