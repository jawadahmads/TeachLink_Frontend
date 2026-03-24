// User and Authentication Types

export type UserRole = "student" | "teacher" | "admin";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface User {
  id: string;
  userId?: string;
  _id?: string;
  name: string;
  fullName?: string;
  username?: string;
  email: string;
  emailAddress?: string;
  role: UserRole;
  avatar: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  stripeAccountInfo: StripeAccountInfo | null;
  status: AuthStatus;
}

export interface StripeAccountInfo {
  id: string;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  email?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}
