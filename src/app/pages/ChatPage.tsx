import { useState } from "react";
import { Send, Search, MoreVertical, Paperclip, Image } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { mockMessages, mockTeachers, currentStudent } from "../data/mockData";

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Group messages by conversation
  const conversations = mockTeachers.slice(0, 3).map((teacher) => {
    const messages = mockMessages.filter(
      (m) => m.senderId === teacher.id || m.receiverId === teacher.id,
    );
    const lastMessage = messages[messages.length - 1];
    const unreadCount = messages.filter(
      (m) => !m.read && m.senderId === teacher.id,
    ).length;

    return {
      id: teacher.id,
      name: teacher.name,
      avatar: teacher.avatar,
      lastMessage: lastMessage?.content || "No messages yet",
      timestamp: lastMessage?.timestamp || "",
      unread: unreadCount,
      online: Math.random() > 0.5,
    };
  });

  const selectedConversation = conversations.find(
    (c) => c.id === selectedChatId,
  );
  const currentMessages = mockMessages.filter(
    (m) => m.senderId === selectedChatId || m.receiverId === selectedChatId,
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // Mock send message
    setNewMessage("");
  };

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header
        userType="student"
        userName={currentStudent.name}
        userAvatar={currentStudent.avatar}
        unreadNotifications={2}
        unreadMessages={1}
      />

      {/* Main chat layout: takes all remaining width/height below header */}
      <div className="flex-1 flex">
        {/* make the chat container fill the viewport height minus header (header is h-16 / 4rem) */}
        <Card className="flex flex-row gap-0 w-full h-[calc(100vh-4rem)] overflow-hidden shadow-none rounded-none border-0">
          {/* LEFT: Conversations list */}
          <div className="w-80 max-w-[320px] flex-shrink-0 border-r border-border flex flex-col bg-card">
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="divide-y divide-border">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedChatId(conversation.id)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-muted transition-colors ${
                      selectedChatId === conversation.id ? "bg-muted" : ""
                    }`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={conversation.avatar}
                          alt={conversation.name}
                        />
                        <AvatarFallback>
                          {conversation.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 text-left overflow-hidden">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">
                          {conversation.name}
                        </h3>
                        {conversation.timestamp && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(
                              conversation.timestamp,
                            ).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate pr-2">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* RIGHT: Chat area (header, messages, input) */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header (sticky) */}
                <div className="p-4 border-b border-border flex items-center justify-between bg-card z-10">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={selectedConversation.avatar}
                          alt={selectedConversation.name}
                        />
                        <AvatarFallback>
                          {selectedConversation.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {selectedConversation.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.online ? "Active now" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages area (scrollable) */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentMessages.map((message) => {
                      const isSent = message.senderId === currentStudent.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${isSent ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={message.senderAvatar}
                              alt={message.senderName}
                            />
                            <AvatarFallback>
                              {message.senderName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`flex flex-col ${isSent ? "items-end" : "items-start"} max-w-[70%]`}
                          >
                            <div
                              className={`rounded-2xl px-4 py-2 ${isSent ? "bg-primary text-white" : "bg-muted text-foreground"}`}
                            >
                              <p>{message.content}</p>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">
                              {new Date(message.timestamp).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                },
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>

                {/* Message input (sticky at bottom) */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Image className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
