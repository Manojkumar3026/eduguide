import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Student {
  id: string;
  email: string;
  name: string;
  phone?: string;
  education_level?: string;
  preferred_course?: string;
  preferred_location?: string;
  budget_min?: number;
  budget_max?: number;
  created_at: string;
  updated_at: string;
}

export interface College {
  id: string;
  name: string;
  type: string;
  location_city: string;
  location_state: string;
  fees_min: number;
  fees_max: number;
  description?: string;
  facilities?: string[];
  application_deadline?: string;
  website?: string;
}

export interface Course {
  id: string;
  name: string;
  category: string;
  duration_years: number;
  description?: string;
  career_options?: string[];
  average_salary_min?: number;
  average_salary_max?: number;
}

export interface Application {
  id: string;
  student_id: string;
  college_id: string;
  course_id: string;
  status: string;
  applied_at: string;
  updated_at: string;
  next_steps?: string;
  documents_submitted?: Record<string, boolean>;
}

export interface CounselingSession {
  id: string;
  student_id: string;
  counselor_name: string;
  session_date: string;
  session_time: string;
  mode: string;
  meeting_link?: string;
  status: string;
  notes?: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  student_id: string;
  message: string;
  sender: 'student' | 'ai';
  created_at: string;
}
