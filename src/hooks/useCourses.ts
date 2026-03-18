import { useQuery } from '@tanstack/react-query';
import { getCourses, getCourseById } from '../api/coursesApi';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
    staleTime: 10 * 60 * 1000,    // 10 minutes
    gcTime: 15 * 60 * 1000,       // 15 minutes
  });
};

export const useCourseDetail = (id: string) => {
  return useQuery({
    queryKey: ['courses', id],
    queryFn: () => getCourseById(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    enabled: !!id,
  });
};
