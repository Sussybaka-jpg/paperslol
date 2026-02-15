
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface Exam {
  id: string;
  name: string;
  code: string;
  date: string;
}

export interface ExamPhoto {
  id: string;
  studentId: string; // This will store the User.id
  category: string; // e.g., '8th', '9th'
  imageUrl: string; 
  fileType: 'image' | 'pdf';
  fileName?: string;
  timestamp: string;
  analysis?: string;
  labels?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
