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
  CheckCircle,
  XCircle,
  Menu,
  X,
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
import { createStripeAccount } from "../api/stripeAccount";

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
  const { user, token, stripeAccountInfo } = useAppSelector(
    (state) => state.auth,
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  const userType = propUserType || (user?.role?.toLowerCase() as any) || "student";
  const userName = propUserName || user?.name || user?.email || "User";
  const userAvatar = propUserAvatar || user?.avatar || "";

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(setStatus("unauthenticated"));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCreateStripeAccount = async () => {
    setIsLoading(true);
    try {
      await createStripeAccount();
    } catch (error) {
      console.error("Failed to create Stripe account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProfileRoute = () => {
    if (userType === "teacher" && user?.id) return `/teacher/${user.teacherId}`;
    if (userType === "student" && user?.id) return `/student/${user.studentId}`;
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
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled ? "py-2" : "py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex items-center justify-between h-16 px-5 sm:px-7 rounded-[28px] border transition-all duration-500 ${
            isScrolled
              ? "bg-background/85 backdrop-blur-2xl border-border/30 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)]"
              : "bg-background/50 backdrop-blur-xl border-border/20 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)]"
          }`}
        >
          {/* ── LOGO ── */}
          <Link
            to={token ? `/${userType}/dashboard` : "/"}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="relative flex items-center justify-center h-9 w-9 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
              <BookOpen className="h-5 w-5 text-primary" />
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
              Teach<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Link</span>
            </span>
          </Link>

          {/* ── NAV LINKS (desktop) ── */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-primary/8 rounded-full border border-primary/15 -z-10"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT SIDE ── */}
          <div className="flex items-center gap-2">
            {token ? (
              <>
                {/* Action icons */}
                <div className="flex items-center gap-1 mr-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-10 w-10 rounded-2xl hover:bg-primary/8 hover:text-primary transition-all"
                    asChild
                  >
                    <Link to="/chat">
                      <MessageSquare className="h-[18px] w-[18px]" />
                      {unreadMessages > 0 && (
                        <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center p-0 text-[9px] font-black border-2 border-background">
                          {unreadMessages}
                        </Badge>
                      )}
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-10 w-10 rounded-2xl hover:bg-primary/8 hover:text-primary transition-all"
                    asChild
                  >
                    <Link to="/notifications">
                      <Bell className="h-[18px] w-[18px]" />
                      {unreadNotifications > 0 && (
                        <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center p-0 text-[9px] font-black border-2 border-background">
                          {unreadNotifications}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-border/40 mx-1 hidden sm:block" />

                {/* User dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger >
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2.5 pl-1.5 pr-3 h-11 rounded-2xl hover:bg-muted/60 border border-transparent hover:border-border/30 transition-all focus-visible:ring-0 group"
                    >
                      <div className="relative">
                        <div className="absolute inset-[-2px] rounded-full bg-gradient-to-br from-primary/40 to-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Avatar className="h-8 w-8 border-2 border-background shadow-md relative z-10">
                          <AvatarImage src={userAvatar} alt={userName} />
                          <AvatarFallback className="bg-primary/10 text-primary font-black text-sm">
                            {userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="hidden sm:flex flex-col items-start text-left">
                        <span className="text-[13px] font-black truncate max-w-[80px] leading-none mb-0.5">
                          {userName.split(" ")[0]}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-primary/70">
                          {userType}
                        </span>
                      </div>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/60 hidden sm:block group-hover:rotate-180 transition-transform duration-300" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-64 p-2 rounded-[24px] border border-border/20 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.25)] backdrop-blur-2xl bg-card/95"
                  >
                    {/* User header */}
                    <div className="flex items-center gap-3 p-3 mb-1 bg-muted/30 rounded-[18px] border border-border/10">
                      <Avatar className="h-11 w-11 border-2 border-background shadow-sm">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback className="bg-primary/10 text-primary font-black">
                          {userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden">
                        <p className="text-sm font-black truncate leading-snug">{userName}</p>
                        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                          {userType} account
                        </p>
                      </div>
                    </div>

                    <div className="space-y-0.5 mt-1">
                      <DropdownMenuItem asChild className="rounded-2xl h-11 cursor-pointer focus:bg-primary/8 focus:text-primary transition-colors">
                        <Link to={`/${userType}/dashboard`} className="flex items-center gap-3 w-full font-bold">
                          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                            <Settings className="h-4 w-4" />
                          </div>
                          Dashboard
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild className="rounded-2xl h-11 cursor-pointer focus:bg-blue-500/8 focus:text-blue-500 transition-colors">
                        <Link to={getProfileRoute()} className="flex items-center gap-3 w-full font-bold">
                          <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/10">
                            <User className="h-4 w-4" />
                          </div>
                          My Profile
                        </Link>
                      </DropdownMenuItem>

                      {userType === "teacher" && (
                        <>
                          <DropdownMenuItem asChild className="rounded-2xl h-11 cursor-pointer focus:bg-green-500/8 focus:text-green-500 transition-colors">
                            <Link to="/teacher/publish-gig" className="flex items-center gap-3 w-full font-bold">
                              <div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/10">
                                <Sparkles className="h-4 w-4" />
                              </div>
                              Publish Gig
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="my-2 bg-border/20" />

                          {/* Stripe Section */}
                          <div className="px-3 py-2.5 rounded-2xl bg-muted/20 border border-border/10 mb-1">
                            <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-2">
                              Stripe Account
                            </p>
                            {stripeAccountInfo ? (
                              <Badge className="bg-green-500/10 text-green-600 border border-green-500/20 font-bold text-xs">
                                <CheckCircle className="h-3 w-3 mr-1.5" />
                                Active
                              </Badge>
                            ) : (
                              <div className="space-y-2">
                                <Badge className="bg-red-500/10 text-red-500 border border-red-500/20 font-bold text-xs">
                                  <XCircle className="h-3 w-3 mr-1.5" />
                                  Inactive
                                </Badge>
                                <button
                                  onClick={handleCreateStripeAccount}
                                  disabled={isLoading}
                                  className="w-full mt-2 h-9 text-xs font-black uppercase tracking-wider text-primary bg-primary/8 border border-primary/20 rounded-xl hover:bg-primary/15 transition-all active:scale-95 disabled:opacity-50"
                                >
                                  {isLoading ? "Creating…" : "Create Account"}
                                </button>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    <DropdownMenuSeparator className="my-2 bg-border/20" />

                    <DropdownMenuItem
                      onSelect={handleLogout}
                      className="rounded-2xl h-11 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/8 transition-colors font-bold"
                    >
                      <div className="w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center mr-3 border border-destructive/10">
                        <LogOut className="h-4 w-4" />
                      </div>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="font-bold text-sm h-10 px-5 rounded-2xl hover:bg-muted/60 hover:text-primary transition-all"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="font-black text-sm h-10 px-6 rounded-2xl shadow-[0_8px_24px_-4px_theme(colors.primary.DEFAULT/0.35)] hover:shadow-primary/50 transition-all active:scale-95">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10 rounded-2xl hover:bg-muted/60 ml-1"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </motion.div>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden mt-2 p-4 rounded-[24px] border border-border/20 bg-background/90 backdrop-blur-2xl shadow-[0_16px_48px_-8px_rgba(0,0,0,0.2)]"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/15"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
