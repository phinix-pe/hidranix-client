export type LessonType = "video" | "text" | "assignment";

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  isCompleted: boolean;
  startDate: string;
  endDate: string;
  totalModules: number;
  image: string;
  description: string;
  modules: Module[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
}

export interface Submission {
  file: string;
  date: string;
  status: "submitted" | "graded" | "pending";
}

export interface EditProfileForm {
  name: string;
  email: string;
  bio: string;
}
