// Review Types

export interface Review {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  teacherId: string;
  rating: number;
  comment: string;
  date: string;
  subject: string;
}

export interface ReviewWithTeacher extends Review {
  teacherName?: string;
  teacherAvatar?: string;
}

export interface RatingBreakdown {
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  breakdown: RatingBreakdown;
}
