export interface User {
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  progress: number;
  badges: Badge[];
  appliedJobs: number[];
  savedJobs: number[];
  tasks: Task[];
  educationLevel: '12th Standard' | 'Diploma';
  institutionName: string;
  institutionLocation: string;
  skills: {
    technical: string[];
    soft: string[];
  };
  achievements: Achievement[];
  streak: number;
  lastLoginDate: string | null;
  certificates: CertificateFile[];
  // New comprehensive profile fields
  aboutMe: string; // Will store HTML content from rich text editor
  socialLinks: { id: string; platform: 'linkedin' | 'github' | 'twitter' | 'portfolio' | 'other'; url: string }[];
  interests: string[];
  hobbies: string[];
  internships: Internship[];
}

export interface Internship {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    date: string;
}

export interface Task {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  category: 'Learning' | 'Work' | 'Job Application' | 'Personal';
  completed: boolean;
}

export interface Badge {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface College {
  name:string;
  url: string;
}

export interface EvaluationResult {
  domain: string;
  reasoning: string;
  roadmap: { step: string; description: string }[];
  tools: string[];
  certifications: string[];
  colleges: College[];
}

export interface DomainDetails {
  overview: string;
  colleges: College[];
  certifications: string[];
  nptelResources: { name: string; url: string }[];
}

export interface CertificateFile {
    name: string;
    url: string;
    verified: boolean;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Part-time';
  description: string;
  postedDate: string;
  applyUrl: string;
  salary?: string;
}

export interface DailyQuizChallenge {
    id: number;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
    resourceLink: string;
    resourceText: string;
}

export interface Mentor {
  id: number;
  name: string;
  avatarUrl: string;
  domain: string;
  company: string;
  experience: string;
}

export interface ForumPost {
  id: number;
  title: string;
  author: string;
  avatarUrl:string;
  createdAt: string;
  tags: string[];
  replies: number;
  views: number;
}