import axiosInstance from './axiosInstance';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export const getNotifications = async (): Promise<Notification[]> => {
  const { data } = await axiosInstance.get<Notification[]>('/notifications');
  return data;
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  await axiosInstance.patch(`/notifications/${id}/read`);
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  await axiosInstance.patch('/notifications/read-all');
};
