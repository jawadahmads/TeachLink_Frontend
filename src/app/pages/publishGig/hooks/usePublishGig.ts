import { useLayoutEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { userInfo } from "../../../api/userInfo";
import { setUserInfo } from "../../../redux/userInfoSlice";

export const gigPublishSchema = z.object({
  isPublished: z.boolean(),
  hourlyRate: z.number().min(1, "Hourly rate must be at least $1"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  education: z.string().min(2, "Education is required"),
  experience: z.string().min(2, "Experience is required"),
});

export type GigPublishFormValues = z.infer<typeof gigPublishSchema>;

interface TeacherInfo {
  isPublished?: boolean;
  name?: string;
  avatar?: string;
  subjects?: { name: string }[];
  hourlyRate?: number;
  bio?: string;
  education?: string;
  experience?: string;
  languages?: { name: string }[];
}

export function usePublishGig() {
  const ROLE = useAppSelector((state) => state.auth.user);
  const teacherInfo = useAppSelector((state) => state.info.userInfo);

  const subjectsArray =
    teacherInfo && Array.isArray(teacherInfo.subjects)
      ? teacherInfo.subjects.map((s: { name: string }) => s.name)
      : [];
  const languagesArray =
    teacherInfo && Array.isArray(teacherInfo.languages)
      ? teacherInfo.languages.map((l: { name: string }) => l.name)
      : [];

  const isProfileComplete = checkProfileComplete(teacherInfo);

  const form = useForm<GigPublishFormValues>({
    resolver: zodResolver(gigPublishSchema),
    defaultValues: {
      isPublished: teacherInfo?.isPublished || false,
      hourlyRate: teacherInfo?.hourlyRate || 0,
      bio: teacherInfo?.bio || "",
      education: teacherInfo?.education || "",
      experience: teacherInfo?.experience || "",
    },
  });

  const onSubmit = (data: GigPublishFormValues) => {
    console.log("Publishing gig:", data);
  };

  const isTeacher = ROLE && ROLE.role && ROLE.role.toLowerCase() === "teacher";

  return {
    form,
    teacherInfo,
    subjectsArray,
    languagesArray,
    isProfileComplete,
    isTeacher,
    onSubmit,
  };
}

function checkProfileComplete(teacherInfo: TeacherInfo | null): boolean {
  return !!(
    teacherInfo &&
    teacherInfo.name &&
    teacherInfo.subjects &&
    teacherInfo.subjects.length > 0 &&
    teacherInfo.hourlyRate &&
    teacherInfo.bio &&
    teacherInfo.education &&
    teacherInfo.experience &&
    teacherInfo.languages &&
    teacherInfo.languages.length > 0
  );
}
