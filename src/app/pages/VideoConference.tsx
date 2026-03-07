import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  Video, VideoOff, Mic, MicOff, Monitor, MessageSquare, 
  Users, Settings, Phone, Maximize, Volume2, VolumeX 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockSessions, currentStudent } from '../data/mockData';

export default function VideoConference() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const session = mockSessions.find(s => s.id === sessionId) || mockSessions[0];
  
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'chat' | 'participants'>('chat');
  const [showSidebar, setShowSidebar] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: session.teacherName, message: 'Welcome to the session!', time: '2:00 PM' },
    { id: '2', sender: 'You', message: 'Thanks! Ready to start.', time: '2:01 PM' },
  ]);

  const handleEndCall = () => {
    navigate('/student/dashboard');
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        id: Date.now().toString(),
        sender: 'You',
        message: chatMessage,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      },
    ]);
    setChatMessage('');
  };

  return (
    <div className="h-screen bg-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-semibold">{session.subject} Session</h1>
            <p className="text-sm text-slate-400">with {session.teacherName}</p>
          </div>
          <Badge variant="secondary" className="bg-red-500 text-white">
            ● Live
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className={`flex-1 p-4 ${showSidebar ? '' : 'pr-4'}`}>
          <div className="h-full grid grid-cols-1 gap-4">
            {/* Main Video (Teacher) */}
            <div className="relative bg-slate-800 rounded-lg overflow-hidden">
              <img
                src={session.teacherAvatar}
                alt={session.teacherName}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.teacherAvatar} alt={session.teacherName} />
                  <AvatarFallback>{session.teacherName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-white font-medium">{session.teacherName}</span>
                <Badge variant="secondary" className="bg-green-500 text-white ml-2">
                  <Mic className="h-3 w-3" />
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>

            {/* Self View (Student) */}
            <div className="absolute bottom-20 right-8 w-64 h-48 bg-slate-800 rounded-lg overflow-hidden border-2 border-slate-700">
              <img
                src={currentStudent.avatar}
                alt="You"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-sm">
                You
              </div>
              {!videoEnabled && (
                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                  <VideoOff className="h-12 w-12 text-slate-500" />
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-800 px-6 py-4 rounded-full shadow-xl border border-slate-700">
            <Button
              variant={audioEnabled ? 'ghost' : 'destructive'}
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={() => setAudioEnabled(!audioEnabled)}
            >
              {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={videoEnabled ? 'ghost' : 'destructive'}
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={() => setVideoEnabled(!videoEnabled)}
            >
              {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={screenSharing ? 'default' : 'ghost'}
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={() => setScreenSharing(!screenSharing)}
            >
              <Monitor className="h-5 w-5" />
            </Button>

            <div className="w-px h-8 bg-slate-700 mx-2" />

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={() => {
                setShowSidebar(!showSidebar);
                setSidebarTab('chat');
              }}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={() => {
                setShowSidebar(!showSidebar);
                setSidebarTab('participants');
              }}
            >
              <Users className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12"
            >
              <Settings className="h-5 w-5" />
            </Button>

            <div className="w-px h-8 bg-slate-700 mx-2" />

            <Button
              variant="destructive"
              size="icon"
              className="rounded-full h-12 w-12 bg-red-600 hover:bg-red-700"
              onClick={handleEndCall}
            >
              <Phone className="h-5 w-5 rotate-135" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div className="w-96 bg-slate-800 border-l border-slate-700 flex flex-col">
            <Tabs value={sidebarTab} onValueChange={(v) => setSidebarTab(v as any)} className="flex-1 flex flex-col">
              <TabsList className="w-full bg-slate-900 rounded-none border-b border-slate-700">
                <TabsTrigger value="chat" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="participants" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  Participants
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id}>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold text-sm text-white">{msg.sender}</span>
                          <span className="text-xs text-slate-400">{msg.time}</span>
                        </div>
                        <p className="text-sm text-slate-300">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t border-slate-700">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                    <Button onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                      Send
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="participants" className="flex-1 mt-0 p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={session.teacherAvatar} alt={session.teacherName} />
                        <AvatarFallback>{session.teacherName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-white font-medium">{session.teacherName}</div>
                        <div className="text-xs text-slate-400">Teacher</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Mic className="h-4 w-4 text-green-500" />
                      <Video className="h-4 w-4 text-green-500" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={currentStudent.avatar} alt="You" />
                        <AvatarFallback>{currentStudent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-white font-medium">{currentStudent.name} (You)</div>
                        <div className="text-xs text-slate-400">Student</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {audioEnabled ? (
                        <Mic className="h-4 w-4 text-green-500" />
                      ) : (
                        <MicOff className="h-4 w-4 text-red-500" />
                      )}
                      {videoEnabled ? (
                        <Video className="h-4 w-4 text-green-500" />
                      ) : (
                        <VideoOff className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
