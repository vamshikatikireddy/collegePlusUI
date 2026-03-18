import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLeaveRequests, getLeaveBalance, applyLeave } from '../api/leaveApi';
import type { LeaveRequest } from '../api/leaveApi';

export const useLeaveRequests = () => {
  return useQuery({
    queryKey: ['leave', 'requests'],
    queryFn: getLeaveRequests,
    staleTime: 5 * 60 * 1000,     // 5 minutes
    gcTime: 10 * 60 * 1000,       // 10 minutes
  });
};

export const useLeaveBalance = () => {
  return useQuery({
    queryKey: ['leave', 'balance'],
    queryFn: getLeaveBalance,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useApplyLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Pick<LeaveRequest, 'startDate' | 'endDate' | 'reason' | 'type'>) =>
      applyLeave(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leave'] });
    },
  });
};
