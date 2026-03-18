import { useQuery } from '@tanstack/react-query';
import { getCalendarEvents } from '../api/calendarApi';

const useCalendar = (month?: number, year?: number) => {
  return useQuery({
    queryKey: ['calendar', month, year],
    queryFn: () => getCalendarEvents(month, year),
    staleTime: 5 * 60 * 1000,     // 5 minutes
    gcTime: 10 * 60 * 1000,       // 10 minutes
  });
};

export default useCalendar;
