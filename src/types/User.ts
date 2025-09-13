export interface User {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'student' | 'coach' | 'recruiter';
  avatar?: string;
  createdAt: Date;
}
