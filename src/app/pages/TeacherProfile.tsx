import { useParams, Link } from 'react-router';
import { Star, MapPin, Languages, GraduationCap, Clock, Users, Video, Calendar, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockTeachers, mockReviews, currentStudent } from '../data/mockData';

export default function TeacherProfile() {
  const { id } = useParams();
  const teacher = mockTeachers.find(t => t.id === id) || mockTeachers[0];
  const teacherReviews = mockReviews.filter(r => r.teacherId === teacher.id);

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
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <Avatar className="h-32 w-32 mx-auto md:mx-0">
                <AvatarImage src={teacher.avatar} alt={teacher.name} />
                <AvatarFallback className="text-4xl">{teacher.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{teacher.name}</h1>
                      {teacher.verified && (
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-yellow-500 mb-3">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="font-semibold text-lg text-foreground">{teacher.rating}</span>
                      <span className="text-muted-foreground">({teacher.reviewCount} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {teacher.subjects.map((subject, index) => (
                        <Badge key={index} variant="secondary">{subject}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary mb-2">
                      ${teacher.hourlyRate}<span className="text-base font-normal text-muted-foreground">/hr</span>
                    </div>
                    <Link to={`/booking/${teacher.id}`}>
                      <Button size="lg" className="w-full">
                        Book Session
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{teacher.totalStudents} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Video className="h-4 w-4" />
                    <span className="text-sm">{teacher.totalHours} hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Responds in {teacher.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Languages className="h-4 w-4" />
                    <span className="text-sm">{teacher.languages.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">
                  Reviews ({teacherReviews.length})
                </TabsTrigger>
                <TabsTrigger value="availability" className="flex-1">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">{teacher.bio}</p>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Education</h3>
                      </div>
                      <p className="text-muted-foreground">{teacher.education}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Experience</h3>
                      </div>
                      <p className="text-muted-foreground">{teacher.experience}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Subjects I Teach</h3>
                      <div className="flex flex-wrap gap-2">
                        {teacher.subjects.map((subject, index) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {teacherReviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-6 last:border-0">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={review.studentAvatar} alt={review.studentName} />
                              <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{review.studentName}</h4>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <Badge variant="secondary" className="text-xs mb-2">
                                {review.subject}
                              </Badge>
                              <p className="text-muted-foreground">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teacher.availability.map((day, index) => (
                        <div key={index} className="border border-border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="h-4 w-4 text-primary" />
                            <h4 className="font-semibold">{day.day}</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {day.slots.map((slot, i) => (
                              <Badge key={i} variant="outline" className="text-sm">
                                {slot}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link to={`/booking/${teacher.id}`}>
                      <Button className="w-full mt-6">Book a Session</Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Rating Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = teacherReviews.filter(r => r.rating === rating).length;
                  const percentage = (count / teacherReviews.length) * 100;
                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <div className="flex items-center gap-1 w-12">
                        <span className="text-sm">{rating}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{count}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Teacher</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/chat">
                  <Button variant="outline" className="w-full">
                    Send Message
                  </Button>
                </Link>
                <Link to={`/booking/${teacher.id}`}>
                  <Button className="w-full">Book Session</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Teaching Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Teaching Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Students</span>
                  <span className="font-semibold">{teacher.totalStudents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Hours</span>
                  <span className="font-semibold">{teacher.totalHours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Response Rate</span>
                  <span className="font-semibold">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="font-semibold">{teacher.responseTime}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
