import { useQuery } from '@tanstack/react-query';
import { getAttendance, getAttendanceSummary } from '../api/attendanceApi';

export const useAttendance = () => {
  return useQuery({
    queryKey: ['attendance'],
    queryFn: getAttendance,
    staleTime: 5 * 60 * 1000,     // 5 minutes
    gcTime: 10 * 60 * 1000,       // 10 minutes
  });
};

export const useAttendanceSummary = () => {
  return useQuery({
    queryKey: ['attendance', 'summary'],
    queryFn: getAttendanceSummary,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
