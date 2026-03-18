import axiosInstance from './axiosInstance';

export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  schedule: string;
  progress: number;
  credits: number;
  color: string;
  totalClasses: number;
  attendedClasses: number;
}

export interface CourseDetail extends Course {
  description: string;
  syllabus: string[];
  assignments: Assignment[];
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
}

export const getCourses = async (): Promise<Course[]> => {
  const { data } = await axiosInstance.get<Course[]>('/courses');
  return data;
};

export const getCourseById = async (id: string): Promise<CourseDetail> => {
  const { data } = await axiosInstance.get<CourseDetail>(`/courses/${id}`);
  return data;
};
