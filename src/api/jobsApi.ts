import axiosInstance from './axiosInstance';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'remote';
  salary?: string;
  postedDate: string;
  deadline: string;
  description: string;
  tags: string[];
  isApplied: boolean;
}

export interface JobDetail extends Job {
  requirements: string[];
  responsibilities: string[];
  companyLogo?: string;
  applicationCount: number;
}

export const getJobs = async (): Promise<Job[]> => {
  const { data } = await axiosInstance.get<Job[]>('/jobs');
  return data;
};

export const getJobById = async (id: string): Promise<JobDetail> => {
  const { data } = await axiosInstance.get<JobDetail>(`/jobs/${id}`);
  return data;
};

export const applyToJob = async (id: string): Promise<{ success: boolean; message: string }> => {
  const { data } = await axiosInstance.post(`/jobs/${id}/apply`);
  return data;
};
