import { Link, useNavigate } from "react-router";
import { BookOpen, Bell, MessageSquare, User, LogOut } from "lucide-react";
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
  userType: "student" | "teacher" | "admin";
  userName: string;
  userAvatar: string;
  unreadNotifications?: number;
  unreadMessages?: number;
}

export default function Header({
  userName,
  userAvatar,
  unreadNotifications = 0,
  unreadMessages = 0,
}: HeaderProps) {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.auth);
  const userType = selector.user?.role.toLowerCase() as String;
  const navigate = useNavigate();

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

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/search" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">TeachLink</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Messages */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/chat">
                <MessageSquare className="h-5 w-5" />
                {unreadMessages > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadMessages}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/notifications">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadNotifications}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link
                    to={`/${userType}/dashboard`}
                    className="flex items-center gap-2 cursor-pointer w-full"
                  >
                    <User className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/search"
                    className="flex items-center gap-2 cursor-pointer w-full"
                  >
                    <BookOpen className="h-4 w-4" />
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
        </div>
      </div>
    </header>
  );
}
