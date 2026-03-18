import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export interface DashboardData {
  attendancePercentage: number;
  upcomingClasses: number;
  pendingAssignments: number;
  unreadNotifications: number;
  recentActivity: Array<{
    id: string;
    title: string;
    description: string;
    timestamp: string;
    type: 'assignment' | 'grade' | 'notification' | 'event';
  }>;
}

const fetchDashboard = async (): Promise<DashboardData> => {
  const { data } = await axiosInstance.get<DashboardData>('/dashboard');
  return data;
};

const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    staleTime: 5 * 60 * 1000,     // 5 minutes
    gcTime: 10 * 60 * 1000,       // 10 minutes
  });
};

export default useDashboard;
