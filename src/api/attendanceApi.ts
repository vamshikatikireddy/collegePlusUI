import axiosInstance from './axiosInstance';

export interface AttendanceRecord {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  courseName: string;
  courseId: string;
  checkInTime?: string;
}

export interface AttendanceSummary {
  totalClasses: number;
  attended: number;
  percentage: number;
}

export const getAttendance = async (): Promise<AttendanceRecord[]> => {
  const { data } = await axiosInstance.get<AttendanceRecord[]>('/attendance');
  return data;
};

export const getAttendanceSummary = async (): Promise<AttendanceSummary> => {
  const { data } = await axiosInstance.get<AttendanceSummary>('/attendance/summary');
  return data;
};

export const markAttendance = async (courseId: string): Promise<AttendanceRecord> => {
  const { data } = await axiosInstance.post<AttendanceRecord>('/attendance/mark', { courseId });
  return data;
};
