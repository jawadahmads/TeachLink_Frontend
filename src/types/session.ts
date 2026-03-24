// Session Types

export type SessionStatus = "upcoming" | "completed" | "cancelled" | "in-progress" | "rescheduled";

export interface Session {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  status: SessionStatus;
  price: number;
  rating?: number;
  review?: string;
  meetingLink?: string;
  recordingUrl?: string;
  notes?: string;
}

export interface UpcomingSession extends Session {
  daysUntil: number;
  nextSessionDate: Date;
  teacherBio?: string;
  teacherResponseTime?: string;
}

export interface CompletedSession extends Session {
  completedAt: string;
  feedbackGiven: boolean;
  improvementAreas?: string[];
}

// Video Conference Types

export interface VideoConferenceState {
  sessionId: string | null;
  videoEnabled: boolean;
  audioEnabled: boolean;
  screenSharing: boolean;
  isRecording: boolean;
  participants: Participant[];
  chatMessages: ChatMessage[];
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  role: "teacher" | "student";
  isOnline: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isTeacher: boolean;
}
