export type UserRole = 'citizen' | 'department' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
  trustRating?: number;
  points?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role?: UserRole;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}