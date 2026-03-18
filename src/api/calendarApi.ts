import axiosInstance from './axiosInstance';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  type: 'class' | 'exam' | 'assignment' | 'holiday' | 'event';
  color: string;
  description?: string;
  location?: string;
}

export const getCalendarEvents = async (
  month?: number,
  year?: number
): Promise<CalendarEvent[]> => {
  const params: Record<string, number> = {};
  if (month !== undefined) params.month = month;
  if (year !== undefined) params.year = year;

  const { data } = await axiosInstance.get<CalendarEvent[]>('/calendar/events', { params });
  return data;
};
