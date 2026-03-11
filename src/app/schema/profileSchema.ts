import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  avatar: z.string().url("Invalid avatar URL").optional().or(z.literal("")),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  hourlyRate: z.coerce.number().min(1, "Hourly rate must be at least 1"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  education: z.string().min(2, "Education is required"),
  experience: z.string().min(2, "Experience is required"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  availability: z.array(
    z.object({
      day: z.string(),
      slots: z.array(z.string()),
    })
  ),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
