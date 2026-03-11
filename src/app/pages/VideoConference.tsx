import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  Video, VideoOff, Mic, MicOff, Monitor, MessageSquare, 
  Users, Settings, Phone, Maximize, Volume2, VolumeX,
  ShieldCheck, Sparkles, Clock, Share2, MoreHorizontal,
  Send, Hand, Smile, Paperclip
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockSessions, currentStudent } from '../data/mockData';
import { motion, AnimatePresence } from 'motion/react';

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
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: session.teacherName, message: 'Welcome to the session! Today we will focus on advanced React patterns.', time: '2:00 PM', isTeacher: true },
    { id: '2', sender: 'You', message: 'Thanks! I have some questions about Higher-Order Components.', time: '2:01 PM', isTeacher: false },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
        isTeacher: false
      },
    ]);
    setChatMessage('');
  };

  return (
    <div className="h-screen bg-[#0a0a0c] flex flex-col overflow-hidden text-white font-sans selection:bg-primary/30">
      {/* Premium Gradient Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="h-20 bg-card/20 backdrop-blur-3xl border-b border-white/5 px-8 flex items-center justify-between z-50"
      >
        <div className="flex items-center gap-6">
          <div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/20">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight flex items-center gap-3">
              {session.subject} Session
              <Badge className="bg-red-500/10 text-red-500 border-red-500/20 px-2 py-0 text-[10px] uppercase font-black tracking-widest animate-pulse">
                Live
              </Badge>
            </h1>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
              Taught by <span className="text-white">{session.teacherName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 font-black text-sm">
            <Clock className="h-4 w-4 text-primary" />
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className={`rounded-2xl border-2 font-black transition-all ${isRecording ? 'border-red-500 text-red-500' : 'border-white/10'}`}
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? (
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                Recording
              </span>
            ) : 'Start Recording'}
          </Button>
          <div className="h-8 w-px bg-white/10 mx-2" />
          <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-white/10 text-muted-foreground hover:text-white">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden p-6 gap-6 relative">
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Main Video Stage */}
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative bg-card/10 backdrop-blur-md rounded-[40px] border border-white/10 overflow-hidden group shadow-2xl"
          >
            {/* Teacher View */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]">
              <img
                src={session.teacherAvatar}
                alt={session.teacherName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Video Overlays */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center gap-3">
                <Avatar className="h-8 w-8 border-2 border-primary shadow-lg">
                  <AvatarImage src={session.teacherAvatar} />
                  <AvatarFallback className="bg-primary/20 text-primary font-black">{session.teacherName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-wider">{session.teacherName}</span>
                  <span className="text-[10px] font-bold text-primary">Teacher • Presenting</span>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
              <Button variant="secondary" size="icon" className="rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl hover:bg-primary hover:text-white transition-all shadow-xl">
                <Maximize className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl hover:bg-primary hover:text-white transition-all shadow-xl">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

            {/* PIP Self View */}
            <motion.div 
              drag
              dragConstraints={{ left: -1000, right: 0, top: 0, bottom: 500 }}
              className="absolute bottom-8 right-8 w-72 h-48 bg-[#1a1a1e] rounded-[32px] overflow-hidden border-4 border-white/10 shadow-2xl cursor-move active:scale-95 transition-transform"
            >
              <AnimatePresence mode="wait">
                {videoEnabled ? (
                  <motion.img
                    key="video-on"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={currentStudent.avatar}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <motion.div 
                    key="video-off"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#1a1a1e] to-black"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                      <VideoOff className="h-8 w-8 text-red-500" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Camera Off</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5">
                <div className={`h-2 w-2 rounded-full ${audioEnabled ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest">You</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Control Bar */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-24 flex items-center justify-center gap-4 bg-card/10 backdrop-blur-2xl rounded-[32px] border border-white/10 px-8 relative"
          >
            <div className="absolute left-8 flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">Encrypted</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant={audioEnabled ? 'secondary' : 'destructive'}
                size="icon"
                className={`h-14 w-14 rounded-2xl transition-all hover:scale-110 shadow-lg ${audioEnabled ? 'bg-white/10 border-white/10' : 'bg-red-600 border-red-500'}`}
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                {audioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
              </Button>

              <Button
                variant={videoEnabled ? 'secondary' : 'destructive'}
                size="icon"
                className={`h-14 w-14 rounded-2xl transition-all hover:scale-110 shadow-lg ${videoEnabled ? 'bg-white/10 border-white/10' : 'bg-red-600 border-red-500'}`}
                onClick={() => setVideoEnabled(!videoEnabled)}
              >
                {videoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
              </Button>

              <Button
                variant={screenSharing ? 'default' : 'secondary'}
                size="icon"
                className={`h-14 w-14 rounded-2xl transition-all hover:scale-110 shadow-lg ${screenSharing ? 'bg-primary border-primary' : 'bg-white/10 border-white/10'}`}
                onClick={() => setScreenSharing(!screenSharing)}
              >
                <Monitor className="h-6 w-6" />
              </Button>

              <div className="w-px h-10 bg-white/10 mx-2" />

              <Button
                variant="secondary"
                size="icon"
                className={`h-14 w-14 rounded-2xl transition-all hover:scale-110 bg-white/10 border-white/10 shadow-lg ${showSidebar && sidebarTab === 'chat' ? 'text-primary' : ''}`}
                onClick={() => {
                  if (showSidebar && sidebarTab === 'chat') setShowSidebar(false);
                  else { setShowSidebar(true); setSidebarTab('chat'); }
                }}
              >
                <MessageSquare className="h-6 w-6" />
              </Button>

              <Button
                variant="secondary"
                size="icon"
                className={`h-14 w-14 rounded-2xl transition-all hover:scale-110 bg-white/10 border-white/10 shadow-lg ${showSidebar && sidebarTab === 'participants' ? 'text-primary' : ''}`}
                onClick={() => {
                  if (showSidebar && sidebarTab === 'participants') setShowSidebar(false);
                  else { setShowSidebar(true); setSidebarTab('participants'); }
                }}
              >
                <Users className="h-6 w-6" />
              </Button>

              <div className="w-px h-10 bg-white/10 mx-2" />

              <Button
                variant="destructive"
                className="h-14 px-8 rounded-2xl font-black transition-all hover:scale-110 bg-red-600 hover:bg-red-700 shadow-xl shadow-red-900/20 group"
                onClick={handleEndCall}
              >
                <Phone className="mr-3 h-5 w-5 rotate-135 group-hover:rotate-[225deg] transition-transform duration-500" />
                End Session
              </Button>
            </div>

            <div className="absolute right-8 flex items-center gap-2">
               <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-white/10 text-muted-foreground"><Hand className="h-5 w-5" /></Button>
               <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-white/10 text-muted-foreground"><Smile className="h-5 w-5" /></Button>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div 
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-[420px] bg-card/10 backdrop-blur-3xl rounded-[40px] border border-white/10 flex flex-col shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                {sidebarTab === 'chat' ? <MessageSquare className="w-48 h-48 rotate-12" /> : <Users className="w-48 h-48 rotate-12" />}
              </div>

              <Tabs value={sidebarTab} onValueChange={(v) => setSidebarTab(v as any)} className="flex-1 flex flex-col relative z-10">
                <div className="px-8 pt-8 pb-4">
                  <TabsList className="w-full h-14 bg-white/5 rounded-2xl p-1.5 border border-white/5">
                    <TabsTrigger value="chat" className="flex-1 rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Live Chat
                    </TabsTrigger>
                    <TabsTrigger value="participants" className="flex-1 rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">
                      <Users className="h-4 w-4 mr-2" />
                      Community
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="chat" className="flex-1 flex flex-col mt-0 overflow-hidden">
                  <ScrollArea className="flex-1 px-8">
                    <div className="space-y-8 py-6">
                      {chatMessages.map((msg, i) => (
                        <motion.div 
                          key={msg.id}
                          initial={{ opacity: 0, x: msg.isTeacher ? -10 : 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`flex flex-col ${msg.isTeacher ? 'items-start' : 'items-end'}`}
                        >
                          <div className={`flex items-baseline gap-2 mb-2 ${msg.isTeacher ? 'flex-row' : 'flex-row-reverse'}`}>
                            <span className="font-black text-[10px] uppercase tracking-widest text-primary">{msg.sender}</span>
                            <span className="text-[10px] font-bold text-muted-foreground">{msg.time}</span>
                          </div>
                          <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium leading-relaxed ${
                            msg.isTeacher 
                              ? 'bg-white/10 border border-white/10 rounded-tl-none' 
                              : 'bg-primary/20 border border-primary/20 text-white rounded-tr-none'
                          }`}>
                            {msg.message}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="p-8 border-t border-white/5 bg-black/20">
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground"><Paperclip className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground"><Smile className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground"><Share2 className="h-5 w-5" /></Button>
                      </div>
                      <div className="relative group">
                        <Input
                          placeholder="Type your message..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="h-14 rounded-2xl bg-white/5 border-2 border-white/10 focus-visible:border-primary/50 transition-all text-white px-6 pr-14 font-medium"
                        />
                        <Button 
                          onClick={handleSendMessage} 
                          disabled={!chatMessage.trim()}
                          size="icon"
                          className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-primary shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="participants" className="flex-1 mt-0 p-8 overflow-hidden">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Participants • 2</h3>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-3xl transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12 border-2 border-primary">
                            <AvatarImage src={session.teacherAvatar} />
                            <AvatarFallback className="bg-primary/20 text-primary font-black">{session.teacherName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-[#121214]" />
                        </div>
                        <div>
                          <div className="text-sm font-black tracking-tight">{session.teacherName}</div>
                          <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Master Educator</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500"><Mic className="h-4 w-4" /></div>
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500"><Video className="h-4 w-4" /></div>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-3xl transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12 border-2 border-white/10">
                            <AvatarImage src={currentStudent.avatar} />
                            <AvatarFallback className="bg-muted text-muted-foreground font-black">{currentStudent.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-[#121214]" />
                        </div>
                        <div>
                          <div className="text-sm font-black tracking-tight">{currentStudent.name} (You)</div>
                          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Scholar</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${audioEnabled ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        </div>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${videoEnabled ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="mt-12 p-8 rounded-[32px] bg-primary/5 border border-primary/10 relative group overflow-hidden">
                       <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                          <ShieldCheck className="w-24 h-24 rotate-12" />
                       </div>
                       <h4 className="font-black text-sm mb-2 flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-primary" />
                          Classroom Rules
                       </h4>
                       <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                          Be respectful, keep your microphone muted when not speaking, and use the 'Raise Hand' feature for questions.
                       </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
