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
  Clock,
  Inbox,
  Wifi,
  Zap
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
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
} from "../data/mockData";
import { useAppSelector } from "../redux/store";
import { motion, AnimatePresence } from "motion/react";
import { Toaster, toast } from "sonner";

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

export default function NotificationsPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadNotifications = notifications.filter((n) => !n.read);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    toast.success("Transmission Received", {
      description: "Notification marked as read in the Nexus.",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success("Nexus Synchronized", {
      description: "All notifications have been processed.",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.error("Transmission Purged", {
      description: "Notification removed from your history.",
      icon: <Trash2 className="h-4 w-4 text-red-500" />,
    });
  };

  const clearAll = () => {
    setNotifications([]);
    toast.error("Nexus Cleared", {
      description: "All transmissions have been purged.",
      icon: <Trash2 className="h-4 w-4 text-red-500" />,
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "session":
        return (
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            <Calendar className="h-7 w-7" />
          </div>
        );
      case "message":
        return (
          <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
            <MessageSquare className="h-7 w-7" />
          </div>
        );
      case "payment":
        return (
          <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            <DollarSign className="h-7 w-7" />
          </div>
        );
      case "review":
        return (
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
            <Bell className="h-7 w-7" />
          </div>
        );
      default:
        return (
          <div className="w-14 h-14 rounded-2xl bg-muted/20 flex items-center justify-center text-muted-foreground shadow-inner group-hover:rotate-12 transition-all duration-500">
            <SettingsIcon className="h-7 w-7" />
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
      className={`group relative p-6 md:p-8 rounded-[40px] border transition-all duration-500 overflow-hidden ${
        !notification.read 
          ? "bg-card/40 border-primary/20 shadow-[0_32px_64px_-16px_rgba(var(--primary),0.1)] active:scale-[0.99]" 
          : "bg-background/20 border-border/10 hover:bg-background/40 hover:border-border/20 grayscale-[0.5] hover:grayscale-0"
      }`}
    >
      {/* Glow Effect for Unread */}
      {!notification.read && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full translate-x-16 -translate-y-16" />
      )}

      <div className="flex flex-col md:flex-row gap-6 md:items-center relative z-10">
        <div className="flex-shrink-0 relative">
          {getIcon(notification.type)}
          {!notification.read && (
            <div className="absolute -top-1 -right-1 flex">
               <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-background"></span>
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h4 className={`text-xl font-black tracking-tight ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
              {notification.title}
            </h4>
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 bg-muted/10 px-3 py-1 rounded-full border border-border/5">
              <Clock className="h-3 w-3" />
              {getTimeAgo(notification.timestamp)}
            </div>
            {!notification.read && (
               <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-lg">LIVE ALERT</Badge>
            )}
          </div>
          <p className="text-base font-medium text-muted-foreground leading-relaxed transition-all mb-4 md:mb-0">
            {notification.message}
          </p>
        </div>

        <div className="flex items-center gap-3 md:pl-6 border-l-0 md:border-l border-border/10">
          {notification.actionUrl && (
            <Link to={notification.actionUrl}>
              <Button variant="default" className="rounded-2xl h-12 px-6 font-black text-xs uppercase tracking-widest shadow-[0_15px_30px_-10px_rgba(var(--primary),0.3)] hover:shadow-primary/40 transition-all group/btn bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 slant" />
                <span className="relative z-10 flex items-center gap-2">
                  Launch <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </Link>
          )}
          
          <div className="flex items-center gap-2">
            {!notification.read && (
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                onClick={() => markAsRead(notification.id)}
              >
                <Check className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-2xl text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all md:opacity-0 group-hover:opacity-100"
              onClick={() => deleteNotification(notification.id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24">
      <Toaster richColors position="bottom-right" />
      
      {/* Majestic Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
           <div className="w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-border/10 pb-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-inner">
                <Wifi className="h-4 w-4 animate-pulse" />
                <span>Neural Stream Active</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground mb-6 leading-[0.9]">
                Nexus <span className="text-primary italic">Alerts</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                You have <span className="text-foreground font-black border-b-2 border-primary/40 inline-block px-1">{unreadNotifications.length} active transmissions</span> currently synchronized with your pedagogical nexus.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {unreadNotifications.length > 0 && (
                <Button 
                  onClick={markAllAsRead}
                  className="h-16 px-8 rounded-[28px] bg-background/40 hover:bg-background/60 border border-border/10 text-foreground font-black text-sm uppercase tracking-widest transition-all shadow-xl backdrop-blur-xl group"
                >
                  <CheckCircle2 className="mr-3 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  Clear All Waves
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={clearAll}
                className="h-16 w-16 rounded-[28px] bg-destructive/5 text-destructive hover:bg-destructive/10 border border-destructive/10 transition-all ml-2"
              >
                <Trash2 className="h-6 w-6" />
              </Button>
            </div>
          </motion.div>

          {/* Main List */}
          <motion.div variants={itemVariants} className="space-y-12">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <TabsList className="bg-background/20 backdrop-blur-3xl h-14 p-1.5 border border-border/10 rounded-[28px] w-full sm:w-auto shadow-inner">
                  <TabsTrigger 
                    value="all" 
                    className="rounded-2xl font-black text-[10px] uppercase tracking-widest px-8 h-11 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-[0_10px_20px_-5px_rgba(var(--primary),0.4)] transition-all"
                  >
                    All Waves
                    <span className="ml-3 opacity-60">{notifications.length}</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="unread" 
                    className="rounded-2xl font-black text-[10px] uppercase tracking-widest px-8 h-11 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-[0_10px_20px_-5px_rgba(var(--primary),0.4)] transition-all"
                  >
                    Unread
                    <span className="ml-3 opacity-60">{unreadNotifications.length}</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sessions" 
                    className="rounded-2xl font-black text-[10px] uppercase tracking-widest px-8 h-11 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-[0_10px_20px_-5px_rgba(var(--primary),0.4)] transition-all hidden sm:flex"
                  >
                    Sessions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="messages" 
                    className="rounded-2xl font-black text-[10px] uppercase tracking-widest px-8 h-11 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-[0_10px_20px_-5px_rgba(var(--primary),0.4)] transition-all hidden sm:flex"
                  >
                    Transmissions
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2 text-muted-foreground/40 font-black text-[10px] uppercase tracking-[0.3em]">
                   <Zap className="h-3.5 w-3.5 fill-current" />
                   <span>Real-time Sync Active</span>
                </div>
              </div>

              <div className="mt-0">
                <AnimatePresence mode="popLayout">
                  <TabsContent value="all" className="focus-visible:ring-0 mt-0">
                    {notifications.length === 0 ? (
                      <EmptyState 
                        icon={Inbox} 
                        title="Silence in the Nexus" 
                        description="No transmissions detected in your current frequency. Check back later for active pedagogical signals." 
                      />
                    ) : (
                      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 gap-6">
                        {notifications.map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            notification={notification}
                          />
                        ))}
                      </motion.div>
                    )}
                  </TabsContent>

                  <TabsContent value="unread" className="focus-visible:ring-0 mt-0">
                    {unreadNotifications.length === 0 ? (
                      <EmptyState 
                        icon={CheckCircle2} 
                        title="Nexus Optimized" 
                        description="You represent pure efficiency. All active transmissions have been processed and archived." 
                      />
                    ) : (
                      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 gap-6">
                        {unreadNotifications.map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            notification={notification}
                          />
                        ))}
                      </motion.div>
                    )}
                  </TabsContent>

                  <TabsContent value="sessions" className="focus-visible:ring-0 mt-0">
                    {notifications.filter((n) => n.type === "session").length === 0 ? (
                      <EmptyState 
                        icon={Calendar} 
                        title="Chronicles Empty" 
                        description="No session updates found in the logs. Your scheduled interactions will appear here." 
                      />
                    ) : (
                      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 gap-6">
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

                  <TabsContent value="messages" className="focus-visible:ring-0 mt-0">
                    {notifications.filter((n) => n.type === "message").length === 0 ? (
                      <EmptyState 
                        icon={MessageSquare} 
                        title="Frequency Silent" 
                        description="No incoming direct transmissions detected. Secure channels are standing by." 
                      />
                    ) : (
                      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 gap-6">
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
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="py-32 px-10 text-center flex flex-col items-center bg-card/20 backdrop-blur-3xl rounded-[60px] border border-border/10 shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center mb-8 shadow-inner relative z-10">
        <Icon className="h-12 w-12 text-primary animate-float" />
      </div>
      <h3 className="text-3xl font-black mb-4 tracking-tight text-foreground relative z-10">{title}</h3>
      <p className="text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed relative z-10 text-lg">
        {description}
      </p>
    </motion.div>
  );
}
