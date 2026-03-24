// Notification Types

export type NotificationType = "session" | "message" | "review" | "payment" | "system" | "reminder" | "achievement";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority?: "low" | "normal" | "high";
  metadata?: Record<string, unknown>;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}
