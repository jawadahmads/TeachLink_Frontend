import { useLayoutEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { userInfo } from "../../../api/userInfo";
import { setUserInfo } from "../../../redux/userInfoSlice";
import { createGig } from "../../../api/createGig";

export const gigPublishSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

// to validate form
type GigPublishForm = z.infer<typeof gigPublishSchema>;

// to publish
export type GigPublishFormValues = {
  title: string;
  description: string;
  teacherId: string;
  price: number;
};

interface TeacherInfo {
  isPublished?: boolean;
  title?: string;
  description?: string;
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
  const navigate = useNavigate();
  const ROLE = useAppSelector((state) => state.auth.user);
  const teacherInfo = useAppSelector((state) => state.info.userInfo);
  const dispatch = useAppDispatch();

  const subjectsArray =
    teacherInfo && Array.isArray(teacherInfo.subjects)
      ? teacherInfo.subjects.map((s: { name: string }) => s.name)
      : [];
  const languagesArray =
    teacherInfo && Array.isArray(teacherInfo.languages)
      ? teacherInfo.languages.map((l: { name: string }) => l.name)
      : [];

  const isProfileComplete = checkProfileComplete(teacherInfo);

  const form = useForm<GigPublishForm>({
    resolver: zodResolver(gigPublishSchema),
    defaultValues: {},
  });

  useLayoutEffect(() => {
    const fetchUserInfo = async () => {
      if (!teacherInfo) {
        const data = await userInfo();
        console.log(data);
        if (data) {
          dispatch(setUserInfo(data));
        }
      }
    };
    fetchUserInfo();
  }, []);

  // useLayoutEffect(() => {
  //   if (teacherInfo) {
  //     form.reset({
  //       title: teacherInfo?.title || "",
  //       description: teacherInfo?.description || "",
  //     });
  //   }
  // }, [teacherInfo, form]);

  const onSubmit = async (data: GigPublishFormValues) => {
    const gigData: GigPublishFormValues = {
      ...data,
      teacherId: teacherInfo?.id ?? "",
    };

    const response = await createGig(gigData);
    console.log(response);
    if (response) {
      navigate("/search-teachers");
    }
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
