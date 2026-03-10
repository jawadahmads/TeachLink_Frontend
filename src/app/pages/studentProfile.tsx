import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams } from "react-router";
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  BookOpen, 
  Camera, 
  Save, 
  X, 
  CheckCircle,
  GraduationCap
} from "lucide-react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { useAppSelector } from "../redux/store";
import { currentStudent } from "../data/mockData";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function StudentProfile() {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState(currentStudent);

  // In a real app, you would fetch student data by ID
  // If id === user.id, it's the personal profile, otherwise it's someone else's
  const isOwnProfile = user?.id === id;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: isOwnProfile ? (user?.name || studentData.name) : studentData.name,
      email: isOwnProfile ? (user?.email || studentData.email) : studentData.email,
    },
  });

  // Update form if user data changes or we navigate to own profile
  useEffect(() => {
    if (isOwnProfile) {
      setValue("name", user?.name || studentData.name);
      setValue("email", user?.email || studentData.email);
    }
  }, [user, isOwnProfile, studentData, setValue]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!isOwnProfile) return;
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStudentData({ ...studentData, ...data });
    setIsEditing(false);
    // In a real app, you would dispatch a redux action to update the user in the store
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userType={(user?.role?.toLowerCase() as "student" | "teacher" | "admin") || "student"} 
        userName={user?.name || studentData.name} 
        userAvatar={user?.avatar || studentData.avatar}
        unreadNotifications={2}
        unreadMessages={1}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {isOwnProfile ? "My Profile" : `${studentData.name}'s Profile`}
          </h1>
          <p className="text-muted-foreground">
            {isOwnProfile 
              ? "Manage your personal information and preferences" 
              : "Viewing student information and learning interests"}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="h-32 w-32 border-4 border-card shadow-lg">
                      <AvatarImage src={studentData.avatar} alt={studentData.name} />
                      <AvatarFallback className="text-3xl text-foreground bg-muted">{studentData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isOwnProfile && (
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="absolute bottom-0 right-0 rounded-full shadow-md bg-secondary text-secondary-foreground"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{studentData.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{studentData.email}</p>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Student Account
                  </Badge>
                </div>

                <div className="mt-8 space-y-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined {new Date(studentData.joinedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{studentData.totalSessions} Sessions Completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Learning Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {studentData.favoriteSubjects.map((subject, index) => (
                    <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground">
                      {subject}
                    </Badge>
                  ))}
                  {isOwnProfile && (
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-primary hover:text-primary hover:bg-primary/10">
                      + Add More
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Form */}
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <div className="space-y-1">
                  <CardTitle className="text-foreground">Personal Details</CardTitle>
                  <CardDescription>
                    {isOwnProfile 
                      ? "Update your name and email address here" 
                      : "General information about this student"}
                  </CardDescription>
                </div>
                {isOwnProfile && !isEditing && (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    Edit Profile
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Full Name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          {...register("name")}
                          disabled={!isEditing}
                          className="pl-10 bg-background text-foreground disabled:opacity-50"
                          placeholder="Your Name"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          disabled={!isEditing}
                          className="pl-10 bg-background text-foreground disabled:opacity-50"
                          placeholder="you@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border mt-8">
                    <h3 className="text-sm font-medium mb-4 flex items-center gap-2 text-foreground">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Academic Level
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg border border-primary bg-primary/5 flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Undergraduate</span>
                        <CheckCircle className="h-4 w-4 text-primary fill-primary/10" />
                      </div>
                      <div className="p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors bg-card hover:bg-muted/50">
                        <span className="text-sm font-medium text-muted-foreground">Postgraduate</span>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-3 mt-8">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={handleCancel}
                        className="flex items-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          "Saving..."
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
