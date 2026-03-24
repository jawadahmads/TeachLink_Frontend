import {
  Teacher,
  Student,
  Session,
  Review,
  Message,
  Notification,
  AdminStats,
  SUBJECTS,
} from "../../types";

export const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    subjects: ["Mathematics", "Physics", "Calculus"],
    rating: 4.9,
    reviewCount: 234,
    hourlyRate: 45,
    bio: "PhD in Mathematics with 10+ years of teaching experience. Specialized in making complex concepts simple and engaging.",
    education: "PhD in Mathematics, MIT",
    experience: "10+ years teaching experience",
    languages: ["English", "Spanish"],
    availability: [
      { day: "Monday", slots: ["09:00", "10:00", "14:00", "15:00", "16:00"] },
      { day: "Tuesday", slots: ["09:00", "10:00", "11:00", "14:00"] },
      { day: "Wednesday", slots: ["10:00", "14:00", "15:00", "16:00"] },
      { day: "Thursday", slots: ["09:00", "10:00", "14:00", "15:00"] },
      { day: "Friday", slots: ["09:00", "10:00", "11:00"] },
    ],
    totalStudents: 156,
    totalHours: 1240,
    responseTime: "< 1 hour",
    verified: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    subjects: ["Computer Science", "Python", "Java", "Web Development"],
    rating: 4.8,
    reviewCount: 189,
    hourlyRate: 50,
    bio: "Senior Software Engineer and coding instructor. Passionate about teaching programming and software development.",
    education: "MS in Computer Science, Stanford",
    experience: "8 years in software development and teaching",
    languages: ["English", "Mandarin"],
    availability: [
      { day: "Monday", slots: ["18:00", "19:00", "20:00"] },
      { day: "Tuesday", slots: ["18:00", "19:00", "20:00"] },
      { day: "Wednesday", slots: ["18:00", "19:00", "20:00"] },
      { day: "Thursday", slots: ["18:00", "19:00", "20:00"] },
      { day: "Saturday", slots: ["10:00", "11:00", "14:00", "15:00"] },
    ],
    totalStudents: 142,
    totalHours: 980,
    responseTime: "< 2 hours",
    verified: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    subjects: ["English", "Literature", "Writing", "IELTS"],
    rating: 4.9,
    reviewCount: 312,
    hourlyRate: 40,
    bio: "Professional English teacher with expertise in exam preparation and creative writing. Helped 200+ students achieve their goals.",
    education: "MA in English Literature, Oxford",
    experience: "12 years teaching experience",
    languages: ["English", "French"],
    availability: [
      { day: "Monday", slots: ["08:00", "09:00", "10:00", "11:00"] },
      { day: "Tuesday", slots: ["08:00", "09:00", "10:00"] },
      { day: "Wednesday", slots: ["08:00", "09:00", "10:00", "11:00"] },
      { day: "Thursday", slots: ["08:00", "09:00", "10:00"] },
      { day: "Friday", slots: ["08:00", "09:00", "10:00", "11:00"] },
    ],
    totalStudents: 203,
    totalHours: 1560,
    responseTime: "< 30 minutes",
    verified: true,
  },
  {
    id: "4",
    name: "David Kim",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    subjects: ["Chemistry", "Biology", "Organic Chemistry"],
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 42,
    bio: "Chemistry professor with a passion for science education. Making chemistry fun and understandable.",
    education: "PhD in Chemistry, Berkeley",
    experience: "9 years university teaching",
    languages: ["English", "Korean"],
    availability: [
      { day: "Monday", slots: ["13:00", "14:00", "15:00"] },
      { day: "Wednesday", slots: ["13:00", "14:00", "15:00", "16:00"] },
      { day: "Friday", slots: ["13:00", "14:00", "15:00"] },
      { day: "Saturday", slots: ["09:00", "10:00", "11:00", "14:00"] },
    ],
    totalStudents: 98,
    totalHours: 750,
    responseTime: "< 3 hours",
    verified: true,
  },
  {
    id: "5",
    name: "Anna Martinez",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    subjects: ["Spanish", "French", "Languages"],
    rating: 4.9,
    reviewCount: 267,
    hourlyRate: 38,
    bio: "Native Spanish speaker and certified language instructor. Fluent in 5 languages with proven teaching methods.",
    education: "BA in Linguistics, Barcelona",
    experience: "11 years language teaching",
    languages: ["Spanish", "French", "English", "Italian", "Portuguese"],
    availability: [
      { day: "Monday", slots: ["10:00", "11:00", "12:00", "16:00", "17:00"] },
      { day: "Tuesday", slots: ["10:00", "11:00", "12:00", "16:00", "17:00"] },
      { day: "Wednesday", slots: ["10:00", "11:00", "12:00"] },
      { day: "Thursday", slots: ["10:00", "11:00", "12:00", "16:00", "17:00"] },
      { day: "Friday", slots: ["10:00", "11:00", "12:00"] },
    ],
    totalStudents: 187,
    totalHours: 1340,
    responseTime: "< 1 hour",
    verified: true,
  },
  {
    id: "6",
    name: "Robert Taylor",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    subjects: ["Economics", "Business", "Finance"],
    rating: 4.8,
    reviewCount: 198,
    hourlyRate: 55,
    bio: "MBA and former investment banker. Teaching economics, finance, and business strategy to students worldwide.",
    education: "MBA, Harvard Business School",
    experience: "15 years in finance and teaching",
    languages: ["English"],
    availability: [
      { day: "Tuesday", slots: ["14:00", "15:00", "16:00", "17:00"] },
      { day: "Thursday", slots: ["14:00", "15:00", "16:00", "17:00"] },
      { day: "Saturday", slots: ["10:00", "11:00", "12:00", "13:00", "14:00"] },
      { day: "Sunday", slots: ["10:00", "11:00", "12:00"] },
    ],
    totalStudents: 124,
    totalHours: 890,
    responseTime: "< 2 hours",
    verified: true,
  },
];

export const currentStudent: Student = {
  id: "student-1",
  name: "Alex Thompson",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
  email: "alex.thompson@email.com",
  joinedDate: "2024-09-15",
  totalSessions: 24,
  favoriteSubjects: ["Mathematics", "Computer Science"],
  interests: ["Machine Learning", "Data Science", "Web Development", "Physics"],
  academicLevel: "Undergraduate",
};

export const mockSessions: Session[] = [
  {
    id: "session-1",
    teacherId: "1",
    teacherName: "Dr. Sarah Johnson",
    teacherAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    studentId: "student-1",
    studentName: "Alex Thompson",
    studentAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    subject: "Calculus",
    date: "2026-03-08",
    time: "14:00",
    duration: 60,
    status: "upcoming",
    price: 45,
  },
  {
    id: "session-2",
    teacherId: "2",
    teacherName: "Michael Chen",
    teacherAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    studentId: "student-1",
    studentName: "Alex Thompson",
    studentAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    subject: "Python Programming",
    date: "2026-03-10",
    time: "18:00",
    duration: 60,
    status: "upcoming",
    price: 50,
  },
  {
    id: "session-3",
    teacherId: "1",
    teacherName: "Dr. Sarah Johnson",
    teacherAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    studentId: "student-1",
    studentName: "Alex Thompson",
    studentAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    subject: "Mathematics",
    date: "2026-03-01",
    time: "14:00",
    duration: 60,
    status: "completed",
    price: 45,
    rating: 5,
    review: "Excellent teaching! Sarah explained everything clearly.",
  },
  {
    id: "session-4",
    teacherId: "3",
    teacherName: "Emily Rodriguez",
    teacherAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    studentId: "student-1",
    studentName: "Alex Thompson",
    studentAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    subject: "English Writing",
    date: "2026-02-28",
    time: "10:00",
    duration: 60,
    status: "completed",
    price: 40,
    rating: 5,
    review: "Very helpful with essay writing techniques!",
  },
];

export const mockReviews: Review[] = [
  {
    id: "review-1",
    studentId: "student-1",
    studentName: "Alex Thompson",
    studentAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    teacherId: "1",
    rating: 5,
    comment:
      "Dr. Johnson is an outstanding teacher! She made calculus so much easier to understand.",
    date: "2026-03-01",
    subject: "Calculus",
  },
  {
    id: "review-2",
    studentId: "student-2",
    studentName: "Jamie Lee",
    studentAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    teacherId: "1",
    rating: 5,
    comment: "Very patient and explains concepts clearly. Highly recommend!",
    date: "2026-02-28",
    subject: "Mathematics",
  },
  {
    id: "review-3",
    studentId: "student-3",
    studentName: "Chris Wilson",
    studentAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    teacherId: "1",
    rating: 4,
    comment: "Great teacher, learned a lot in each session.",
    date: "2026-02-25",
    subject: "Physics",
  },
  {
    id: "review-4",
    studentId: "student-4",
    studentName: "Morgan Davis",
    studentAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    teacherId: "1",
    rating: 5,
    comment: "Best math tutor I've ever had. Worth every penny!",
    date: "2026-02-20",
    subject: "Calculus",
  },
];

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    senderId: "1",
    senderName: "Dr. Sarah Johnson",
    senderAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    receiverId: "student-1",
    content:
      "Hi Alex! Looking forward to our session on Sunday. Do you have any specific topics you'd like to cover?",
    timestamp: "2026-03-06T10:30:00",
    read: true,
  },
  {
    id: "msg-2",
    senderId: "student-1",
    senderName: "Alex Thompson",
    senderAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    receiverId: "1",
    content:
      "Hi Dr. Johnson! Yes, I'd like to focus on integration techniques, especially by parts.",
    timestamp: "2026-03-06T11:15:00",
    read: true,
  },
  {
    id: "msg-3",
    senderId: "1",
    senderName: "Dr. Sarah Johnson",
    senderAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    receiverId: "student-1",
    content:
      "Perfect! I'll prepare some practice problems for you. See you Sunday!",
    timestamp: "2026-03-06T11:45:00",
    read: true,
  },
  {
    id: "msg-4",
    senderId: "2",
    senderName: "Michael Chen",
    senderAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    receiverId: "student-1",
    content:
      "Hey Alex! Don't forget to install Python 3.11 before our next session.",
    timestamp: "2026-03-06T14:20:00",
    read: false,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "student-1",
    type: "session",
    title: "Upcoming Session",
    message: "Your session with Dr. Sarah Johnson starts in 2 days",
    timestamp: "2026-03-06T09:00:00",
    read: false,
    actionUrl: "/student/sessions",
  },
  {
    id: "notif-2",
    userId: "student-1",
    type: "message",
    title: "New Message",
    message: "Michael Chen sent you a message",
    timestamp: "2026-03-06T14:20:00",
    read: false,
    actionUrl: "/chat",
  },
  {
    id: "notif-3",
    userId: "student-1",
    type: "payment",
    title: "Payment Successful",
    message:
      "Your payment of $50 for Python Programming session has been processed",
    timestamp: "2026-03-05T16:30:00",
    read: true,
  },
  {
    id: "notif-4",
    userId: "student-1",
    type: "system",
    title: "Profile Update",
    message: "Your profile has been successfully updated",
    timestamp: "2026-03-05T12:00:00",
    read: true,
  },
];

export const subjects = [...SUBJECTS];

export const adminStats: AdminStats = {
  totalUsers: 2456,
  totalTeachers: 234,
  totalStudents: 2222,
  activeSessions: 89,
  totalRevenue: 145680,
  averageRating: 4.8,
  completedSessions: 12345,
  upcomingSessions: 234,
};
