import { useState } from "react";
import { Link } from "react-router";
import {
  Bell,
  Calendar,
  MessageSquare,
  DollarSign,
  Settings as SettingsIcon,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Trash2,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  mockNotifications,
  currentStudent,
  mockTeachers,
} from "../data/mockData";
import { useAppSelector } from "../redux/store";
import { motion, AnimatePresence } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function NotificationsPage() {
  const { user } = useAppSelector((state) => state.auth);
  const currentUser = user || currentStudent;
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadNotifications = notifications.filter((n) => !n.read);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "session":
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
            <Calendar className="h-5 w-5" />
          </div>
        );
      case "message":
        return (
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
            <MessageSquare className="h-5 w-5" />
          </div>
        );
      case "payment":
        return (
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-600">
            <DollarSign className="h-5 w-5" />
          </div>
        );
      case "review":
        return (
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
            <Bell className="h-5 w-5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
            <SettingsIcon className="h-5 w-5" />
          </div>
        );
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

  const NotificationItem = ({
    notification,
  }: {
    notification: (typeof notifications)[0];
  }) => (
    <motion.div
      variants={itemVariants}
      layout
      className={`p-6 border-b border-border/50 transition-all duration-300 group ${
        !notification.read ? "bg-primary/[0.03]" : "hover:bg-muted/30"
      }`}
    >
      <div className="flex gap-5">
        <div className="flex-shrink-0 relative">
          {getIcon(notification.type)}
          {!notification.read && (
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full border-2 border-background" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h4 className={`font-bold text-lg truncate ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
              {notification.title}
            </h4>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 whitespace-nowrap bg-muted/50 px-2 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              {getTimeAgo(notification.timestamp)}
            </div>
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-4 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
            {notification.message}
          </p>
          <div className="flex items-center gap-3">
            {notification.actionUrl && (
              <Link to={notification.actionUrl}>
                <Button variant="default" size="sm" className="rounded-full h-9 px-5 font-bold shadow-lg shadow-primary/10">
                  Take Action
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            {!notification.read && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full h-9 px-4 font-bold text-primary hover:bg-primary/10 hover:text-primary transition-colors"
                onClick={() => markAsRead(notification.id)}
              >
                <Check className="h-4 w-4 mr-2" />
                Mark read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-9 w-9 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
              onClick={() => deleteNotification(notification.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                <Bell className="h-3.5 w-3.5" />
                <span>Inbox Activity</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-3">
                Notifications
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                You have <span className="text-primary font-black">{unreadNotifications.length} unread</span> messages requiring your attention.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {unreadNotifications.length > 0 && (
                <Button variant="outline" className="rounded-full px-6 font-black border-2 border-primary/20 hover:bg-primary/5 transition-all h-12" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
              <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={clearAll}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Main List */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[40px] overflow-hidden">
              <Tabs defaultValue="all" className="w-full">
                <div className="px-6 py-4 border-b border-border/50">
                  <TabsList className="bg-muted/50 h-12 p-1 gap-1 rounded-2xl w-full sm:w-auto">
                    <TabsTrigger 
                      value="all" 
                      className="rounded-xl font-black text-xs px-6 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
                    >
                      All
                      <Badge className="ml-2 bg-primary/10 text-primary border-none h-5 px-1.5 font-black">{notifications.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="unread" 
                      className="rounded-xl font-black text-xs px-6 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
                    >
                      Unread
                      <Badge className="ml-2 bg-primary text-primary-foreground border-none h-5 px-1.5 font-black">{unreadNotifications.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sessions" 
                      className="rounded-xl font-black text-xs px-6 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all hidden sm:flex"
                    >
                      Sessions
                    </TabsTrigger>
                    <TabsTrigger 
                      value="messages" 
                      className="rounded-xl font-black text-xs px-6 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all hidden sm:flex"
                    >
                      Messages
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-0">
                  <AnimatePresence mode="popLayout">
                    <TabsContent value="all" className="mt-0 focus-visible:ring-0">
                      {notifications.length === 0 ? (
                        <EmptyState icon={Bell} title="No notifications yet" description="Stay tuned! We'll notify you when something important happens." />
                      ) : (
                        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="divide-y divide-border/50">
                          {notifications.map((notification) => (
                            <NotificationItem
                              key={notification.id}
                              notification={notification}
                            />
                          ))}
                        </motion.div>
                      )}
                    </TabsContent>

                    <TabsContent value="unread" className="mt-0 focus-visible:ring-0">
                      {unreadNotifications.length === 0 ? (
                        <EmptyState icon={CheckCircle2} title="All caught up!" description="You've cleared all your unread notifications. Great job!" />
                      ) : (
                        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="divide-y divide-border/50">
                          {unreadNotifications.map((notification) => (
                            <NotificationItem
                              key={notification.id}
                              notification={notification}
                            />
                          ))}
                        </motion.div>
                      )}
                    </TabsContent>

                    <TabsContent value="sessions" className="mt-0 focus-visible:ring-0">
                      {notifications.filter((n) => n.type === "session").length === 0 ? (
                        <EmptyState icon={Calendar} title="No session updates" description="Your upcoming learning sessions will appear here." />
                      ) : (
                        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="divide-y divide-border/50">
                          {notifications
                            .filter((n) => n.type === "session")
                            .map((notification) => (
                              <NotificationItem
                                key={notification.id}
                                notification={notification}
                              />
                            ))}
                        </motion.div>
                      )}
                    </TabsContent>

                    <TabsContent value="messages" className="mt-0 focus-visible:ring-0">
                      {notifications.filter((n) => n.type === "message").length === 0 ? (
                        <EmptyState icon={MessageSquare} title="No new messages" description="When tutors or students message you, they'll show up here." />
                      ) : (
                        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="divide-y divide-border/50">
                          {notifications
                            .filter((n) => n.type === "message")
                            .map((notification) => (
                              <NotificationItem
                                key={notification.id}
                                notification={notification}
                              />
                            ))}
                        </motion.div>
                      )}
                    </TabsContent>
                  </AnimatePresence>
                </div>
              </Tabs>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-24 px-10 text-center flex flex-col items-center"
    >
      <div className="w-20 h-20 bg-muted/50 rounded-[32px] flex items-center justify-center mb-6">
        <Icon className="h-10 w-10 text-muted-foreground/40" />
      </div>
      <h3 className="text-2xl font-black mb-2 tracking-tight">{title}</h3>
      <p className="text-muted-foreground font-medium max-w-xs mx-auto leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
