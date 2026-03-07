import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Filter, Star, Video, Clock, DollarSign, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { mockTeachers, subjects, currentStudent } from '../data/mockData';

export default function SearchTeachers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedDay, setSelectedDay] = useState('all');

  const filteredTeachers = mockTeachers
    .filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSubjects = selectedSubjects.length === 0 ||
        teacher.subjects.some(s => selectedSubjects.includes(s));
      
      const matchesPrice = priceRange === 'all' ||
        (priceRange === 'low' && teacher.hourlyRate < 40) ||
        (priceRange === 'medium' && teacher.hourlyRate >= 40 && teacher.hourlyRate < 50) ||
        (priceRange === 'high' && teacher.hourlyRate >= 50);
      
      const matchesDay = selectedDay === 'all' ||
        teacher.availability.some(a => a.day === selectedDay);

      return matchesSearch && matchesSubjects && matchesPrice && matchesDay;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'students') return b.totalStudents - a.totalStudents;
      return 0;
    });

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Subjects</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {subjects.map((subject) => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox
                id={subject}
                checked={selectedSubjects.includes(subject)}
                onCheckedChange={() => toggleSubject(subject)}
              />
              <Label htmlFor={subject} className="cursor-pointer">{subject}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="low">Under $40/hr</SelectItem>
            <SelectItem value="medium">$40-50/hr</SelectItem>
            <SelectItem value="high">$50+/hr</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Availability</h3>
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
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

      {(selectedSubjects.length > 0 || priceRange !== 'all' || selectedDay !== 'all') && (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            setSelectedSubjects([]);
            setPriceRange('all');
            setSelectedDay('all');
          }}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-muted">
      <Header 
        userType="student" 
        userName={currentStudent.name} 
        userAvatar={currentStudent.avatar}
        unreadNotifications={2}
        unreadMessages={1}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Perfect Teacher</h1>
          <p className="text-muted-foreground">Browse through {mockTeachers.length}+ verified expert teachers</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by teacher name or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="students">Most Students</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden md:block">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Filters</h2>
                </div>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Teacher List */}
          <div className="lg:col-span-3">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredTeachers.length} teachers
            </div>
            <div className="space-y-4">
              {filteredTeachers.map((teacher) => (
                <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <Avatar className="h-24 w-24 mx-auto md:mx-0">
                        <AvatarImage src={teacher.avatar} alt={teacher.name} />
                        <AvatarFallback className="text-2xl">{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-semibold">{teacher.name}</h3>
                              {teacher.verified && (
                                <CheckCircle className="h-4 w-4 text-blue-600" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="font-semibold">{teacher.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                ({teacher.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              ${teacher.hourlyRate}
                              <span className="text-sm font-normal text-muted-foreground">/hr</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-3 line-clamp-2">{teacher.bio}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {teacher.subjects.map((subject, index) => (
                            <Badge key={index} variant="secondary">{subject}</Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Video className="h-3 w-3" />
                            {teacher.totalHours} hours taught
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {teacher.responseTime} response
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {teacher.totalStudents} students
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Link to={`/teacher/${teacher.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              View Profile
                            </Button>
                          </Link>
                          <Link to={`/booking/${teacher.id}`} className="flex-1">
                            <Button className="w-full">Book Session</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
