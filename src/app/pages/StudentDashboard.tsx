import { Link } from 'react-router';
import { Calendar, Clock, Star, TrendingUp, Video, Search } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { currentStudent, mockSessions, mockTeachers } from '../data/mockData';
import { useAppSelector } from '../redux/store';

export default function StudentDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const upcomingSessions = mockSessions.filter(s => s.status === 'upcoming');
  const completedSessions = mockSessions.filter(s => s.status === 'completed');
  const favoriteTeachers = mockTeachers.slice(0, 3);

  return (
    <div className="min-h-screen bg-muted">
      <Header 
        userType={(user?.role?.toLowerCase() as "student" | "teacher" | "admin") || "student"} 
        userName={user?.name || currentStudent.name} 
        userAvatar={user?.avatar || currentStudent.avatar}
        unreadNotifications={2}
        unreadMessages={1}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
...
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {currentStudent.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your learning today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Sessions</span>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">{currentStudent.totalSessions}</div>
              <p className="text-xs text-green-600 mt-1">+3 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Upcoming</span>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">{upcomingSessions.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Next on Sunday</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Avg Rating Given</span>
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground mt-1">Based on {completedSessions.length} reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Learning Hours</span>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-green-600 mt-1">+5 this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <Link to="/search">
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      Book New Session
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No upcoming sessions</p>
                    <Link to="/search">
                      <Button className="mt-4">Find a Teacher</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={session.teacherAvatar} alt={session.teacherName} />
                          <AvatarFallback>{session.teacherName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{session.teacherName}</h4>
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
                          <Badge variant="secondary" className="mb-2">{session.duration} min</Badge>
                          <Link to={`/video/${session.id}`}>
                            <Button size="sm">
                              <Video className="h-4 w-4 mr-2" />
                              Join
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center gap-4 p-4 border border-border rounded-lg"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={session.teacherAvatar} alt={session.teacherName} />
                        <AvatarFallback>{session.teacherName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{session.teacherName}</h4>
                        <p className="text-sm text-muted-foreground">{session.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        {session.rating ? (
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">{session.rating}</span>
                          </div>
                        ) : (
                          <Button size="sm" variant="outline">Rate</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorite Teachers */}
            <Card>
              <CardHeader>
                <CardTitle>Favorite Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {favoriteTeachers.map((teacher) => (
                    <Link
                      key={teacher.id}
                      to={`/teacher/${teacher.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors"
                    >
                      <Avatar>
                        <AvatarImage src={teacher.avatar} alt={teacher.name} />
                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{teacher.name}</h4>
                        <p className="text-xs text-muted-foreground">{teacher.subjects[0]}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{teacher.rating}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link to="/search">
                  <Button variant="outline" className="w-full mt-4">
                    Find More Teachers
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentStudent.favoriteSubjects.map((subject, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{subject}</span>
                        <span className="text-muted-foreground">{Math.floor(Math.random() * 30 + 50)}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 30 + 50)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
