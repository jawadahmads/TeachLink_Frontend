import { Link } from 'react-router';
import { Calendar, Clock, DollarSign, Users, Video, Star, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockTeachers, mockSessions } from '../data/mockData';
import { useAppSelector } from '../redux/store';

export default function TeacherDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const teacher = mockTeachers[0]; // Current teacher
  const teacherSessions = mockSessions.filter(s => s.teacherId === teacher.id);
  const upcomingSessions = teacherSessions.filter(s => s.status === 'upcoming');
  const completedSessions = teacherSessions.filter(s => s.status === 'completed');

  const monthlyEarnings = teacherSessions
    .filter(s => s.status === 'completed')
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="min-h-screen bg-muted">
      <Header 
        userType={(user?.role?.toLowerCase() as "student" | "teacher" | "admin") || "teacher"} 
        userName={user?.name || teacher.name} 
        userAvatar={user?.avatar || teacher.avatar}
        unreadNotifications={3}
        unreadMessages={2}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
...
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome, {teacher.name.split(' ')[1]}! 👨‍🏫
          </h1>
          <p className="text-muted-foreground">Manage your sessions and track your teaching performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Students</span>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">{teacher.totalStudents}</div>
              <p className="text-xs text-green-600 mt-1">+12 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">This Month</span>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">${monthlyEarnings}</div>
              <p className="text-xs text-green-600 mt-1">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Rating</span>
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">{teacher.rating}</div>
              <p className="text-xs text-muted-foreground mt-1">{teacher.reviewCount} reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Hours</span>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">{teacher.totalHours}</div>
              <p className="text-xs text-green-600 mt-1">+24 this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="upcoming" className="flex-1">
                      Upcoming ({upcomingSessions.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="flex-1">
                      Completed ({completedSessions.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="mt-6">
                    {upcomingSessions.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No upcoming sessions</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {upcomingSessions.map((session) => (
                          <div
                            key={session.id}
                            className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                          >
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={session.studentAvatar} alt={session.studentName} />
                              <AvatarFallback>{session.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-semibold">{session.studentName}</h4>
                              <p className="text-sm text-muted-foreground">{session.subject}</p>
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(session.date).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric' 
                              })}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {session.time}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-green-600 mb-2">
                                ${session.price}
                              </div>
                              <Link to={`/video/${session.id}`}>
                                <Button size="sm">
                                  <Video className="h-4 w-4 mr-2" />
                                  Start
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="completed" className="mt-6">
                    <div className="space-y-4">
                      {completedSessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center gap-4 p-4 border border-border rounded-lg"
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={session.studentAvatar} alt={session.studentName} />
                            <AvatarFallback>{session.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold">{session.studentName}</h4>
                            <p className="text-sm text-muted-foreground">{session.subject}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(session.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-green-600 mb-1">
                              +${session.price}
                            </div>
                            {session.rating && (
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-sm">{session.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Availability */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Weekly Availability</CardTitle>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teacher.availability.map((day, index) => (
                    <div key={index}>
                      <div className="font-medium text-sm mb-1">{day.day}</div>
                      <div className="flex flex-wrap gap-1">
                        {day.slots.map((slot, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="text-sm font-medium">{teacher.responseTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                  <span className="text-sm font-medium">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rebooking Rate</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Verified</span>
                  <Badge variant="default">✓ Verified</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Profile Views */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Profile Views</span>
                      <span className="font-medium">234 this week</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Booking Rate</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                </div>
                <Link to={`/teacher/${teacher.id}`}>
                  <Button variant="outline" className="w-full mt-4">
                    View Public Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

