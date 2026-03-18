import axiosInstance from './axiosInstance';

export interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  type: 'sick' | 'personal' | 'academic' | 'other';
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  reviewedBy?: string;
  reviewNote?: string;
}

export interface LeaveBalance {
  total: number;
  used: number;
  remaining: number;
}

export const getLeaveRequests = async (): Promise<LeaveRequest[]> => {
  const { data } = await axiosInstance.get<LeaveRequest[]>('/leave');
  return data;
};

export const getLeaveBalance = async (): Promise<LeaveBalance> => {
  const { data } = await axiosInstance.get<LeaveBalance>('/leave/balance');
  return data;
};

export const applyLeave = async (
  payload: Pick<LeaveRequest, 'startDate' | 'endDate' | 'reason' | 'type'>
): Promise<LeaveRequest> => {
  const { data } = await axiosInstance.post<LeaveRequest>('/leave/apply', payload);
  return data;
};
