import { createBrowserRouter } from "react-router";
import LandingPage from "./features/landing/LandingPage";
import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";
import StudentDashboard from "./features/dashboard/student/index";
import TeacherDashboard from "./features/dashboard/teacher/TeacherDashboard";
import TeacherProfile from "./features/profile/teacher/TeacherProfile/components/TeacherProfile";
import SearchTeachers from "./features/search/SearchTeachers";
import BookingPage from "./features/booking/BookingPage";
import ChatPage from "./features/chat/ChatPage";
import VideoConference from "./features/video/VideoConference";
import NotificationsPage from "./features/notifications/NotificationsPage";
import AdminDashboard from "./features/admin/AdminDashboard";
import AboutPage from "./features/about/About";
import StudentProfile from "./features/profile/student/studentProfile";
import ManageProfile from "./features/profile/teacher/manageProfile/index";
import PublishGig from "./features/profile/teacher/publishGig/index";
import IsAuthenticated from "./components/helper/Authenticated";
import IsNotAuthenticated from "./components/helper/IsNotAuthenticated";
import MainLayout from "./components/layout/MainLayout";
import ReturnPage from "./features/booking/return";


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
        path: "/",
        Component: IsAuthenticated,
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
          { path: "return", Component: ReturnPage },
        ],
      },
    ],
  },
]);
