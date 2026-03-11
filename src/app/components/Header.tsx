import { Link, useNavigate, useLocation } from "react-router";
import {
  BookOpen,
  Bell,
  MessageSquare,
  User,
  LogOut,
  Settings,
  Search,
  Info,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logout } from "../api/logout";
import { setToken, setUser, setStatus } from "../redux/authSlice";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface HeaderProps {
  userType?: "student" | "teacher" | "admin";
  userName?: string;
  userAvatar?: string;
  unreadNotifications?: number;
  unreadMessages?: number;
}

export default function Header({
  userType: propUserType,
  userName: propUserName,
  userAvatar: propUserAvatar,
  unreadNotifications = 0,
  unreadMessages = 0,
}: HeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useAppSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userType =
    propUserType || (user?.role?.toLowerCase() as any) || "student";
  const userName = propUserName || user?.name || user?.email || "User";
  const userAvatar = propUserAvatar || user?.avatar || "";

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(setStatus("idle"));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getProfileRoute = () => {
    if (userType === "teacher" && user?.id) {
      return `/teacher/${user.id}`;
    }
    if (userType === "student" && user?.id) {
      return `/student/${user.id}`;
    }
    return `/${userType}/dashboard`;
  };

  const navLinks = token
    ? [
        { name: "Find Teachers", path: "/search", icon: Search },
        { name: "Dashboard", path: `/${userType}/dashboard`, icon: Settings },
        { name: "About", path: "/about", icon: Info },
      ]
    : [
        { name: "Expert Tutors", path: "/#tutors" },
        { name: "Success Stories", path: "/#reviews" },
      ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`relative flex justify-between items-center h-16 px-6 sm:px-8 rounded-[24px] border border-border/40 shadow-xl transition-all duration-500 ${
            isScrolled
              ? "bg-background/80 backdrop-blur-2xl"
              : "bg-background/40 backdrop-blur-lg"
          }`}
        >
          {/* Logo Section */}
          <Link
            to={token ? `/${userType}/dashboard` : "/"}
            className="flex items-center gap-2.5 group transition-transform hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
              <BookOpen className="h-8 w-8 text-primary relative z-10" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
              Teach<span className="text-primary">Link</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full hover:text-primary ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {token ? (
              <>
                <div className="flex items-center gap-1 sm:gap-2 mr-2 border-r border-border/50 pr-2 sm:pr-4">
                  {/* Messages */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group"
                    asChild
                  >
                    <Link to="/chat">
                      <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      {unreadMessages > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-black border-2 border-background animate-pulse">
                          {unreadMessages}
                        </Badge>
                      )}
                    </Link>
                  </Button>

                  {/* Notifications */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group"
                    asChild
                  >
                    <Link to="/notifications">
                      <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      {unreadNotifications > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-black border-2 border-background animate-pulse">
                          {unreadNotifications}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                </div>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2.5 pl-1.5 pr-3 h-11 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-border/50 transition-all focus-visible:ring-0"
                    >
                      <Avatar className="h-8 w-8 border-2 border-background shadow-md">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-black">
                          {userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:flex flex-col items-start text-left">
                        <span className="text-xs font-black truncate max-w-[80px] leading-none mb-1">
                          {userName.split(" ")[0]}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[9px] h-3.5 px-1 py-0 font-black uppercase tracking-widest bg-primary/5 border-primary/20 text-primary"
                        >
                          {userType}
                        </Badge>
                      </div>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 p-2 mt-2 rounded-[24px] border-2 shadow-2xl backdrop-blur-xl bg-card/95"
                  >
                    <div className="flex items-center gap-3 p-3 mb-2 bg-muted/30 rounded-[18px]">
                      <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-black">
                          {userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden">
                        <p className="text-sm font-black truncate">
                          {userName}
                        </p>
                        <p className="text-[10px] font-bold text-muted-foreground truncate uppercase tracking-widest">
                          {userType} Account
                        </p>
                      </div>
                    </div>

                    <DropdownMenuItem
                      asChild
                      className="rounded-xl h-11 cursor-pointer focus:bg-primary/10 focus:text-primary transition-colors"
                    >
                      <Link
                        to={`/${userType}/dashboard`}
                        className="flex items-center gap-3 w-full font-bold"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Settings className="h-4 w-4" />
                        </div>
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      className="rounded-xl h-11 cursor-pointer focus:bg-primary/10 focus:text-primary transition-colors"
                    >
                      <Link
                        to={getProfileRoute()}
                        className="flex items-center gap-3 w-full font-bold"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <User className="h-4 w-4" />
                        </div>
                        My Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      className="rounded-xl h-11 cursor-pointer focus:bg-primary/10 focus:text-primary transition-colors"
                    >
                      <Link
                        to="/search"
                        className="flex items-center gap-3 w-full font-bold"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        Browse Experts
                      </Link>
                    </DropdownMenuItem>

                    {userType === "teacher" && (
                      <DropdownMenuItem
                        asChild
                        className="rounded-xl h-11 cursor-pointer focus:bg-primary/10 focus:text-primary transition-colors"
                      >
                        <Link
                          to="/teacher/publish-gig"
                          className="flex items-center gap-3 w-full font-bold"
                        >
                          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                            <Sparkles />
                          </div>
                          Publish Gig
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator className="my-2" />

                    <DropdownMenuItem
                      onSelect={handleLogout}
                      className="rounded-xl h-11 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 transition-colors font-bold"
                    >
                      <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center mr-3">
                        <LogOut className="h-4 w-4" />
                      </div>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="font-bold text-sm h-11 px-6 rounded-full hover:bg-primary/5 hover:text-primary transition-all"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="font-black text-sm h-11 px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </header>
  );
}
