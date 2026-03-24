import { Link } from "react-router";
import { MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { motion } from "motion/react";
import type { Teacher } from "../../../../redux/dashboardSlice";
import { itemVariants } from "../utils";

interface NexusChatProps {
  favoriteTeachers: Teacher[];
}

export function NexusChat({ favoriteTeachers }: NexusChatProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="border border-border/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-card/40 backdrop-blur-3xl rounded-[48px] overflow-hidden">
        <CardHeader className="p-10 pb-4 flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-black tracking-tighter">
            Nexus
          </CardTitle>
          <Link to="/chat">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all active:scale-95"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-10 pt-4 space-y-6">
          {favoriteTeachers && favoriteTeachers.length > 0 ? (
            favoriteTeachers.slice(0, 3).map((teacher) => (
              <Link
                key={teacher.id}
                to="/chat"
                className="flex items-center gap-5 p-4 hover:bg-background/40 rounded-[28px] transition-all cursor-pointer group border border-transparent hover:border-border/10"
              >
                <Avatar className="h-14 w-14 border-4 border-background/50 shadow-xl group-hover:scale-105 transition-all duration-700">
                  <AvatarImage
                    src={teacher.avatar || undefined}
                    className="object-cover"
                  />
                  <AvatarFallback className="font-black">
                    {teacher.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-base font-black tracking-tight group-hover:text-primary transition-colors">
                      {teacher.name}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground/60 truncate font-medium group-hover:text-muted-foreground transition-colors">
                    Your favorite teacher
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-muted-foreground text-sm text-center py-6">
              No favorite teachers yet.
            </p>
          )}
          <Link to="/chat">
            <Button
              variant="outline"
              className="w-full h-14 rounded-[20px] font-black text-[10px] uppercase tracking-[0.2em] border-2 border-border/10 bg-background/20 hover:bg-muted/50 transition-all mt-6"
            >
              Access Inbox Hub
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
