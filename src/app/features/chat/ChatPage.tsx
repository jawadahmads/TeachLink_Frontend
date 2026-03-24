import { useState, useRef, useEffect } from "react";
import {
  Send,
  Search,
  MoreVertical,
  Info,
  ChevronLeft,
  SearchIcon,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";
import { mockMessages, mockTeachers, currentStudent } from "../../data/mockData";
import { useAppSelector } from "../../redux/store";
import { motion, AnimatePresence } from "motion/react";
import type { Message, Conversation, Student } from "../../types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function ChatPage() {
  const { user } = useAppSelector((state) => state.auth);

  const currentUser = user || currentStudent;

  const [messages, setMessages] = useState(mockMessages);
  const [selectedChatId, setSelectedChatId] = useState("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // When messages change (new message sent/received), scroll smoothly to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const timer = setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  // When switching conversations, jump to bottom instantly
  useEffect(() => {
    if (scrollRef.current) {
      // Small delay to ensure the messages for the new chat are rendered
      const timer = setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedChatId]);

  // Group messages by conversation
  const conversations = mockTeachers.slice(0, 5).map((teacher) => {
    const teacherMessages = messages.filter(
      (m) => m.senderId === teacher.id || m.receiverId === teacher.id,
    );
    const lastMessage = teacherMessages[teacherMessages.length - 1];
    const unreadCount = teacherMessages.filter(
      (m) => !m.read && m.senderId === teacher.id,
    ).length;

    return {
      id: teacher.id,
      name: teacher.name,
      avatar: teacher.avatar,
      lastMessage: lastMessage?.content || "No messages yet",
      timestamp: lastMessage?.timestamp || "",
      unread: unreadCount,
      online: Math.random() > 0.3,
      role: "Teacher",
    };
  });

  const selectedConversation = conversations.find(
    (c) => c.id === selectedChatId,
  );

  const currentMessages = messages.filter(
    (m) => m.senderId === selectedChatId || m.receiverId === selectedChatId,
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId: selectedChatId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  const handleSelectConversation = (id: string) => {
    setSelectedChatId(id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[25%] h-[25%] bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full py-4 md:py-6">
        <Card className="flex flex-row w-full h-full overflow-hidden border-none shadow-2xl bg-card/50 backdrop-blur-xl rounded-[32px]">
          {/* LEFT: Conversations List */}
          <motion.div
            initial={false}
            animate={{
              width: isSidebarOpen
                ? window.innerWidth < 768
                  ? "100%"
                  : "360px"
                : "0%",
              opacity: isSidebarOpen ? 1 : 0,
              display:
                !isSidebarOpen && window.innerWidth < 768 ? "none" : "flex",
            }}
            className="flex-shrink-0 border-r border-border flex flex-col bg-card/30 min-h-0"
          >
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Chats
                </h2>
              </div>
              <div className="relative group">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 bg-background border-2 rounded-2xl focus-visible:ring-primary/20 focus-visible:border-primary transition-all font-medium"
                />
              </div>
            </div>

            <ScrollArea className="flex-1 px-3 py-4">
              <div className="space-y-2">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation.id)}
                    className={`w-full p-4 flex items-center gap-4 rounded-[24px] transition-all duration-300 group ${
                      selectedChatId === conversation.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "hover:bg-primary/5 text-foreground"
                    }`}
                  >
                    <div className="relative">
                      <Avatar
                        className={`h-12 w-12 border-2 ${selectedChatId === conversation.id ? "border-primary-foreground/20" : "border-background shadow-sm"}`}
                      >
                        <AvatarImage
                          src={conversation.avatar}
                          alt={conversation.name}
                        />
                        <AvatarFallback className="font-bold">
                          {conversation.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div
                          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 ${selectedChatId === conversation.id ? "bg-white border-primary" : "bg-green-500 border-background"}`}
                        />
                      )}
                    </div>
                    <div className="flex-1 text-left overflow-hidden">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3
                          className={`font-bold truncate ${selectedChatId === conversation.id ? "text-primary-foreground" : "text-foreground"}`}
                        >
                          {conversation.name}
                        </h3>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${selectedChatId === conversation.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                        >
                          {conversation.timestamp
                            ? new Date(
                                conversation.timestamp,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-xs truncate max-w-[140px] font-medium ${selectedChatId === conversation.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                        >
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 &&
                          selectedChatId !== conversation.id && (
                            <Badge className="bg-primary text-primary-foreground h-5 min-w-[20px] rounded-full flex items-center justify-center p-0 text-[10px] font-black border-2 border-background">
                              {conversation.unread}
                            </Badge>
                          )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </motion.div>

          {/* RIGHT: Chat Area */}
          <div className="flex-1 flex flex-col bg-background/20 relative min-h-0">
            <AnimatePresence mode="wait">
              {selectedConversation ? (
                <motion.div
                  key={selectedChatId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  {/* Chat Header */}
                  <div className="p-4 md:p-6 border-b border-border/50 flex items-center justify-between bg-card/30 backdrop-blur-md z-20">
                    <div className="flex items-center gap-4">
                      {window.innerWidth < 768 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsSidebarOpen(true)}
                          className="rounded-full"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                      )}
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                          <AvatarImage
                            src={selectedConversation.avatar}
                            alt={selectedConversation.name}
                          />
                          <AvatarFallback className="font-bold">
                            {selectedConversation.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-black tracking-tight">
                          {selectedConversation.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-[10px] font-black uppercase tracking-widest h-5 px-2 py-0 border-primary/20 text-primary bg-primary/5"
                          >
                            {selectedConversation.role}
                          </Badge>
                          <span className="text-[10px] font-bold text-muted-foreground">
                            {selectedConversation.online
                              ? "Online Now"
                              : "Last seen 2h ago"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Info className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <ScrollArea className="flex-1 px-6 py-8">
                    <div className="space-y-8 max-w-4xl mx-auto">
                      <div className="flex justify-center mb-8">
                        <Badge
                          variant="secondary"
                          className="bg-muted/50 text-muted-foreground font-bold px-4 rounded-full"
                        >
                          Today
                        </Badge>
                      </div>

                      {currentMessages.map((message, i) => {
                        const isSent = message.senderId === currentUser.id;
                        return (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`flex gap-4 ${isSent ? "flex-row-reverse" : "flex-row"}`}
                          >
                            {!isSent && (
                              <Avatar className="h-10 w-10 mt-1 shadow-sm flex-shrink-0">
                                <AvatarImage
                                  src={message.senderAvatar}
                                  alt={message.senderName}
                                />
                                <AvatarFallback className="font-bold">
                                  {message.senderName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div
                              className={`flex flex-col ${isSent ? "items-end" : "items-start"} max-w-[80%] sm:max-w-[65%]`}
                            >
                              <div
                                className={`px-5 py-3.5 shadow-sm relative ${
                                  isSent
                                    ? "bg-primary text-primary-foreground rounded-t-[24px] rounded-bl-[24px] rounded-br-[4px]"
                                    : "bg-card text-foreground border-border/50 border rounded-t-[24px] rounded-br-[24px] rounded-bl-[4px]"
                                }`}
                              >
                                <p className="text-sm font-medium leading-relaxed">
                                  {message.content}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 mt-2 px-1">
                                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">
                                  {new Date(
                                    message.timestamp,
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                                {isSent && (
                                  <div className="flex items-center">
                                    <CheckCircle2 className="h-3 w-3 text-primary" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                      <div ref={scrollRef} className="h-4" />
                    </div>
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="p-4 md:p-6 bg-card/80 backdrop-blur-xl border-t border-border/50">
                    <div className="max-w-4xl mx-auto relative">
                      <div className="flex items-center gap-3 bg-background border-2 border-border/50 focus-within:border-primary transition-all rounded-[28px] p-1.5 pl-5 shadow-sm group">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSendMessage()
                          }
                          className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 text-sm font-medium h-11"
                        />
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            className="h-10 w-10 rounded-full shadow-lg shadow-primary/20 flex items-center justify-center p-0"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-10 text-center">
                  <div className="w-24 h-24 bg-primary/5 rounded-[40px] flex items-center justify-center mb-8 animate-pulse">
                    <MessageSquare className="h-12 w-12 text-primary/40" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight">
                    Your Inbox Awaits
                  </h3>
                  <p className="max-w-xs font-medium text-muted-foreground/80 leading-relaxed">
                    Select a conversation from the left to start collaborating
                    with your expert tutors.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 rounded-full font-bold px-8 border-2"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    Browse Conversations
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  );
}
