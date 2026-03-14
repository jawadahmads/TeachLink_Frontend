import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherProfile from "./pages/TeacherProfile/components/TeacherProfile";
import SearchTeachers from "./pages/SearchTeachers";
import BookingPage from "./pages/BookingPage";
import ChatPage from "./pages/ChatPage";
import VideoConference from "./pages/VideoConference";
import NotificationsPage from "./pages/NotificationsPage";
import AdminDashboard from "./pages/AdminDashboard";
import AboutPage from "./pages/About";
import StudentProfile from "./pages/studentProfile";
import ManageProfile from "./pages/manageProfile/index";
import PublishGig from "./pages/publishGig/index";
import IsAuthenticated from "./components/helper/Authenticated";
import IsNotAuthenticated from "./components/helper/IsNotAuthenticated";
import MainLayout from "./components/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: IsNotAuthenticated,
        children: [
          {
            path: "",
            Component: LandingPage,
          },
        ],
      },
      {
        // All protected routes go under this parent
        path: "/",
        Component: IsAuthenticated, // wrapper component
        children: [
          { path: "student/dashboard", Component: StudentDashboard },
          { path: "student/:id", Component: StudentProfile },
          { path: "teacher/dashboard", Component: TeacherDashboard },
          { path: "teacher/:userId", Component: TeacherProfile },
          { path: "teacher/manage-profile", Component: ManageProfile },
          { path: "teacher/publish-gig", Component: PublishGig },
          { path: "search", Component: SearchTeachers },
          { path: "booking/:teacherId", Component: BookingPage },
          { path: "chat", Component: ChatPage },
          { path: "video/:sessionId", Component: VideoConference },
          { path: "notifications", Component: NotificationsPage },
          { path: "admin", Component: AdminDashboard },
          { path: "about", Component: AboutPage },
        ],
      },
    ],
  },
]);
