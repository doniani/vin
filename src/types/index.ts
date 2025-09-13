export type { User } from '../contexts/AuthContext';

export interface Student {
  id: string;
  userId: string;
  name: string;
  dateOfBirth: Date;
  sport: string;
  position?: string;
  academicYear: number;
  gpa: number;
  satScore?: number;
  actScore?: number;
  height: number;
  weight: number;
  parentIds: string[];
  coachIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AthleticStats {
  id: string;
  studentId: string;
  date: Date;
  sport: string;
  category: 'speed' | 'strength' | 'endurance' | 'skill' | 'game_performance';
  metric: string;
  value: number;
  unit: string;
  notes?: string;
}

export interface AcademicRecord {
  id: string;
  studentId: string;
  semester: string;
  year: number;
  subject: string;
  grade: number;
  credits: number;
  gpa: number;
}

export interface HealthRecord {
  id: string;
  studentId: string;
  date: Date;
  sleepHours: number;
  fatigueLevel: number;
  injuryStatus: 'healthy' | 'minor_injury' | 'major_injury' | 'recovering';
  injuryDescription?: string;
  notes?: string;
}

export interface Goal {
  id: string;
  studentId: string;
  title: string;
  description: string;
  category: 'academic' | 'athletic' | 'health' | 'personal';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: Date;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  createdAt: Date;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: 'recruitment' | 'showcase' | 'camp' | 'test' | 'deadline';
  sport: string;
  date: Date;
  deadline?: Date;
  location: string;
  requirements: string[];
  cost?: number;
  isActive: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface DashboardData {
  student: Student;
  recentStats: AthleticStats[];
  academicProgress: AcademicRecord[];
  healthTrends: HealthRecord[];
  upcomingOpportunities: Opportunity[];
  activeGoals: Goal[];
  notifications: Notification[];
}