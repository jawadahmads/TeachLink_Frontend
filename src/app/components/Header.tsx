import { Link, useNavigate } from "react-router";
import {
  BookOpen,
  Bell,
  MessageSquare,
  User,
  LogOut,
  Settings,
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
  const { user, token } = useAppSelector((state) => state.auth);

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
    return `/${userType}/dashboard`; // Fallback to dashboard for admin
  };

  return (
    <header className="bg-background/95 backdrop-blur border-b border-border sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to={token ? `/${userType}/dashboard` : "/"}
            className="flex items-center gap-2 shrink-0"
          >
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">TeachLink</span>
          </Link>

          {token ? (
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-6 mr-4">
                <Link
                  to="/search"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Find Teachers
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </nav>

              {/* Messages */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                asChild
              >
                <Link to="/chat">
                  <MessageSquare className="h-5 w-5" />
                  {unreadMessages > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                      {unreadMessages}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                asChild
              >
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2 h-9 focus-visible:ring-0"
                  >
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block text-sm font-medium truncate max-w-[100px]">
                      {userName.split(" ")[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1">
                  <div className="flex items-center gap-2 p-2 px-3 mb-1 sm:hidden">
                    <p className="text-sm font-medium truncate">{userName}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      to={`/${userType}/dashboard`}
                      className="flex items-center gap-2 cursor-pointer w-full"
                    >
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  {/* Profile Link */}
                  <DropdownMenuItem asChild>
                    <Link
                      to={getProfileRoute()}
                      className="flex items-center gap-2 cursor-pointer w-full"
                    >
                      <User className="h-4 w-4 text-muted-foreground" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      to="/search"
                      className="flex items-center gap-2 cursor-pointer w-full"
                    >
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      {userType === "student" ? "Find Teachers" : "Browse"}
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onSelect={handleLogout}
                    className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-8 mr-4">
                <a
                  href="#features"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </a>
                <Link
                  to="/search"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Find Teachers
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </nav>
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
