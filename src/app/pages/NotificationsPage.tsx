import { useState } from 'react';
import { Link } from 'react-router';
import { Bell, Calendar, MessageSquare, DollarSign, Settings as SettingsIcon, Check, X } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockNotifications, currentStudent } from '../data/mockData';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'session':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-yellow-500" />;
      case 'review':
        return <Bell className="h-5 w-5 text-purple-500" />;
      default:
        return <SettingsIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000 / 60);

    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const NotificationItem = ({ notification }: { notification: typeof notifications[0] }) => (
    <div
      className={`p-4 border-b border-border hover:bg-muted transition-colors ${
        !notification.read ? 'bg-blue-50/50' : ''
      }`}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold">{notification.title}</h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {getTimeAgo(notification.timestamp)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
          <div className="flex items-center gap-2">
            {notification.actionUrl && (
              <Link to={notification.actionUrl}>
                <Button variant="outline" size="sm">View</Button>
              </Link>
            )}
            {!notification.read && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => markAsRead(notification.id)}
              >
                <Check className="h-4 w-4 mr-1" />
                Mark as read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteNotification(notification.id)}
            >
              <X className="h-4 w-4 mr-1" />
              Dismiss
            </Button>
          </div>
        </div>
        {!notification.read && (
          <div className="flex-shrink-0">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted">
      <Header 
        userType="student" 
        userName={currentStudent.name} 
        userAvatar={currentStudent.avatar}
        unreadNotifications={unreadNotifications.length}
        unreadMessages={1}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            {unreadNotifications.length > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
          <p className="text-muted-foreground">
            You have {unreadNotifications.length} unread notifications
          </p>
        </div>

        <Card>
          <Tabs defaultValue="all" className="w-full">
            <CardHeader className="pb-3">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all">
                  All ({notifications.length})
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread ({unreadNotifications.length})
                </TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>
            </CardHeader>

            <TabsContent value="all" className="mt-0">
              {notifications.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div>
                  {notifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="unread" className="mt-0">
              {unreadNotifications.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <Check className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>All caught up!</p>
                  <p className="text-sm mt-1">You have no unread notifications</p>
                </div>
              ) : (
                <div>
                  {unreadNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="sessions" className="mt-0">
              {notifications.filter(n => n.type === 'session').length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No session notifications</p>
                </div>
              ) : (
                <div>
                  {notifications
                    .filter(n => n.type === 'session')
                    .map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="messages" className="mt-0">
              {notifications.filter(n => n.type === 'message').length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No message notifications</p>
                </div>
              ) : (
                <div>
                  {notifications
                    .filter(n => n.type === 'message')
                    .map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
