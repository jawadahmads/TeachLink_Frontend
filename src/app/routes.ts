import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherProfile from "./pages/TeacherProfile";
import SearchTeachers from "./pages/SearchTeachers";
import BookingPage from "./pages/BookingPage";
import ChatPage from "./pages/ChatPage";
import VideoConference from "./pages/VideoConference";
import NotificationsPage from "./pages/NotificationsPage";
import AdminDashboard from "./pages/AdminDashboard";
import AboutPage from "./pages/About";
import IsAuthenticated from "./components/helper/Authenticated";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    // All protected routes go under this parent
    path: "/",
    Component: IsAuthenticated, // wrapper component
    children: [
      { path: "student/dashboard", Component: StudentDashboard },
      { path: "teacher/dashboard", Component: TeacherDashboard },
      { path: "teacher/:id", Component: TeacherProfile },
      { path: "search", Component: SearchTeachers },
      { path: "booking/:teacherId", Component: BookingPage },
      { path: "chat", Component: ChatPage },
      { path: "video/:sessionId", Component: VideoConference },
      { path: "notifications", Component: NotificationsPage },
      { path: "admin", Component: AdminDashboard },
      { path: "about", Component: AboutPage },
    ],
  },
]);
