import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  ProfileFormValues,
} from "../../../schema/profileSchema";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { updateProfile } from "../../../api/updateProfile";
import { setUser } from "../../../redux/authSlice";
import { userInfo } from "../../../api/userInfo";
import { setUserInfo } from "../../../redux/userInfoSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface DayAvailability {
  day: string;
  slots: string[];
}

export function useManageProfile() {
  const user = useAppSelector((state) => state.auth.user);
  const teacherInfo = useAppSelector((state) => state.info.userInfo);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [newSubject, setNewSubject] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [availabilityData, setAvailabilityData] = useState<DayAvailability[]>(
    [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjectsArray =
    teacherInfo && Array.isArray(teacherInfo.subjects)
      ? teacherInfo.subjects.map((s: { name: string }) => s.name)
      : [];
  const languagesArray =
    teacherInfo && Array.isArray(teacherInfo.languages)
      ? teacherInfo.languages.map((l: { name: string }) => l.name)
      : [];

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: teacherInfo?.name || "",
      avatar: teacherInfo?.avatar || "",
      subjects: subjectsArray || [],
      hourlyRate: teacherInfo?.hourlyRate || 0,
      bio: teacherInfo?.bio || "",
      education: teacherInfo?.education || "",
      experience: teacherInfo?.experience || "",
      languages: languagesArray || [],
      availability: teacherInfo?.availability || [],
    },
  });

  useEffect(() => {
    const fetchAndPopulate = async () => {
      let data = teacherInfo;

      if (!data) {
        data = await userInfo();
        if (data) {
          dispatch(setUserInfo(data));
        }
      }

      if (data) {
        const subjectsArray = Array.isArray(data.subjects)
          ? data.subjects.map((s: { name: string }) => s.name)
          : [];
        const languagesArray = Array.isArray(data.languages)
          ? data.languages.map((l: { name: string }) => l.name)
          : [];
        const availabilityArray = Array.isArray(data.availability)
          ? data.availability.map((a: { day: string; slots: string[] }) => ({
              day: a.day.toUpperCase(),
              slots: a.slots,
            }))
          : [];

        setAvailabilityData(availabilityArray);

        form.reset({
          name: data.name || "",
          avatar: data.avatar || "",
          subjects: subjectsArray,
          hourlyRate: data.hourlyRate || 0,
          bio: data.bio || "",
          education: data.education || "",
          experience: data.experience || "",
          languages: languagesArray,
          availability: availabilityArray,
        });
      }
    };

    fetchAndPopulate();
  }, []);

  const handleAddSubject = () => {
    const currentSubjects = form.getValues("subjects");
    if (newSubject && !currentSubjects.includes(newSubject)) {
      form.setValue("subjects", [...currentSubjects, newSubject], {
        shouldValidate: true,
      });
      setNewSubject("");
    }
  };

  const handleRemoveSubject = (subject: string) => {
    const currentSubjects = form.getValues("subjects");
    form.setValue(
      "subjects",
      currentSubjects.filter((s) => s !== subject),
      { shouldValidate: true },
    );
  };

  const handleAddLanguage = () => {
    const currentLanguages = form.getValues("languages");
    if (newLanguage && !currentLanguages.includes(newLanguage)) {
      form.setValue("languages", [...currentLanguages, newLanguage], {
        shouldValidate: true,
      });
      setNewLanguage("");
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    const currentLanguages = form.getValues("languages");
    form.setValue(
      "languages",
      currentLanguages.filter((l) => l !== lang),
      { shouldValidate: true },
    );
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      const userId: string = user?.id || "unknown";
      const newProfileData = {
        userId,
        ...data,
        availability: availabilityData,
      };
      const response = await updateProfile(newProfileData);
      console.log(response);

      dispatch(setUserInfo(response.data));
      toast.success("Profile updated successfully!");
      navigate("/teacher/publish-gig");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const watch = form.watch;

  return {
    form,
    watch,
    user,
    teacherInfo,
    newSubject,
    setNewSubject,
    newLanguage,
    setNewLanguage,
    availabilityData,
    setAvailabilityData,
    isSubmitting,
    handleAddSubject,
    handleRemoveSubject,
    handleAddLanguage,
    handleRemoveLanguage,
    onSubmit,
  };
}
