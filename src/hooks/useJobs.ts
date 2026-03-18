import { useQuery } from '@tanstack/react-query';
import { getJobs, getJobById } from '../api/jobsApi';

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
    staleTime: 10 * 60 * 1000,    // 10 minutes
    gcTime: 15 * 60 * 1000,       // 15 minutes
  });
};

export const useJobDetail = (id: string) => {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn: () => getJobById(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    enabled: !!id,
  });
};
