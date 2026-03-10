import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Filter,
  Star,
  Video,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Users,
  Award
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
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
import { mockTeachers, subjects } from "../data/mockData";
import { motion, AnimatePresence } from "motion/react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedDay, setSelectedDay] = useState("all");

  const filteredTeachers = mockTeachers
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
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">Subjects</h3>
        <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
          {subjects.map((subject) => (
            <div key={subject} className="flex items-center space-x-3 group">
              <Checkbox
                id={subject}
                checked={selectedSubjects.includes(subject)}
                onCheckedChange={() => toggleSubject(subject)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor={subject} className="text-sm font-semibold cursor-pointer group-hover:text-primary transition-colors">
                {subject}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">Price Range</h3>
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
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">Availability</h3>
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
          <motion.div variants={itemVariants} className="mb-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Expert Tutors</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
              Find Your Perfect Teacher
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Browse through our global network of <span className="text-primary font-black">{mockTeachers.length}+</span> verified expert teachers and start learning today.
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
                       <span className="text-sm font-bold text-muted-foreground mr-2">Sort by:</span>
                       <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="border-none bg-transparent h-auto p-0 focus:ring-0 font-black text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="students">Most Students</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Mobile Filter Trigger */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="md:hidden h-14 w-14 rounded-2xl border-2 flex-shrink-0">
                          <Filter className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <SheetHeader className="mb-8">
                          <SheetTitle className="text-2xl font-black">Filters</SheetTitle>
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
                  Found <span className="text-foreground">{filteredTeachers.length}</span> exceptional teachers
                </p>
                <div className="flex gap-1">
                   {/* Layout toggles could go here */}
                </div>
              </div>

              <div className="space-y-6">
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
                      <Card className="group border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all bg-card/50 backdrop-blur-sm overflow-hidden rounded-[32px]">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex flex-col md:flex-row gap-8">
                            {/* Left: Avatar and Quick Stats */}
                            <div className="flex flex-row md:flex-col items-center gap-6">
                              <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-background shadow-xl relative z-10 transition-transform duration-500 group-hover:scale-105">
                                  <AvatarImage src={teacher.avatar} alt={teacher.name} className="object-cover" />
                                  <AvatarFallback className="text-3xl font-black bg-primary/10 text-primary">
                                    {teacher.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                {teacher.verified && (
                                  <div className="absolute -bottom-1 right-2 z-20 bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg border-4 border-background">
                                    <CheckCircle2 className="h-5 w-5" />
                                  </div>
                                )}
                              </div>
                              
                              <div className="hidden md:flex flex-col gap-3 w-full">
                                <div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-xl">
                                   <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                      <Users className="h-3.5 w-3.5" />
                                      Students
                                   </div>
                                   <span className="text-sm font-black">{teacher.totalStudents}</span>
                                </div>
                                <div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-xl">
                                   <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                      <Award className="h-3.5 w-3.5" />
                                      Experience
                                   </div>
                                   <span className="text-sm font-black">{teacher.totalHours}h+</span>
                                </div>
                              </div>
                            </div>

                            {/* Right: Info and Actions */}
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                <div>
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
                                      {teacher.name}
                                    </h3>
                                    <Badge className="bg-yellow-500/10 text-yellow-600 border-none font-black flex items-center gap-1.5 px-3">
                                      <Star className="h-3.5 w-3.5 fill-current" />
                                      {teacher.rating}
                                    </Badge>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {teacher.subjects.slice(0, 4).map((subject, index) => (
                                      <Badge key={index} variant="secondary" className="bg-muted font-bold px-3 py-1 rounded-full text-xs">
                                        {subject}
                                      </Badge>
                                    ))}
                                    {teacher.subjects.length > 4 && (
                                      <Badge variant="ghost" className="text-xs font-bold px-2">+{teacher.subjects.length - 4} more</Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="text-left sm:text-right bg-primary/5 sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-none">
                                  <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Hourly Rate</div>
                                  <div className="text-3xl font-black text-primary">
                                    ${teacher.hourlyRate}
                                    <span className="text-sm font-bold text-muted-foreground ml-1">/hr</span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6 line-clamp-2 sm:line-clamp-none max-w-2xl">
                                {teacher.bio}
                              </p>

                              <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8 mb-8">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <Clock className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black uppercase text-muted-foreground">Response</p>
                                    <p className="text-xs font-bold">{teacher.responseTime}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                                    <Video className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black uppercase text-muted-foreground">Platform</p>
                                    <p className="text-xs font-bold">HD Video</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black uppercase text-muted-foreground">Vetted</p>
                                    <p className="text-xs font-bold">100% Verified</p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-4">
                                <Link to={`/teacher/${teacher.id}`} className="flex-1">
                                  <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-black group/btn">
                                    View Full Profile
                                    <ChevronDown className="ml-2 h-4 w-4 group-hover/btn:translate-y-0.5 transition-transform" />
                                  </Button>
                                </Link>
                                <Link to={`/booking/${teacher.id}`} className="flex-1">
                                  <Button className="w-full h-14 rounded-2xl font-black shadow-lg shadow-primary/20 group/btn">
                                    Book a Trial Session
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredTeachers.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center py-20 bg-card/50 backdrop-blur-sm rounded-[32px] border-2 border-dashed border-border"
                  >
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                       <Search className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">No teachers found</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                      We couldn't find any teachers matching your current filters. Try adjusting your search criteria.
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
