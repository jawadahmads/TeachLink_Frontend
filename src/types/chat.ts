// Chat and Message Types

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  role: string;
  messages?: Message[];
}

export interface ChatState {
  conversations: Conversation[];
  activeConversation: string | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
}
