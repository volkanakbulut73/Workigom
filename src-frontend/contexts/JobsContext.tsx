
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jobsAPI } from '../lib/apiClient';
import { Job, CreateJobRequest } from '../types/api';
import { toast } from 'sonner';

interface JobsContextType {
  jobs: Job[];
  isLoading: boolean;
  fetchJobs: (params?: any) => Promise<void>;
  getJobById: (id: string) => Promise<Job>;
  createJob: (data: CreateJobRequest) => Promise<Job>;
  updateJob: (id: string, data: Partial<CreateJobRequest>) => Promise<Job>;
  deleteJob: (id: string) => Promise<void>;
  approveJob: (id: string) => Promise<void>;
  rejectJob: (id: string, reason?: string) => Promise<void>;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};

interface JobsProviderProps {
  children: ReactNode;
}

export const JobsProvider: React.FC<JobsProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobs = async (params?: any) => {
    try {
      setIsLoading(true);
      const data = await jobsAPI.getAllJobs(params);
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      toast.error('İş ilanları yüklenemedi');
    } finally {
      setIsLoading(false);
    }
  };

  const getJobById = async (id: string): Promise<Job> => {
    try {
      const job = await jobsAPI.getJobById(id);
      return job;
    } catch (error) {
      console.error('Failed to fetch job:', error);
      toast.error('İş ilanı yüklenemedi');
      throw error;
    }
  };

  const createJob = async (data: CreateJobRequest): Promise<Job> => {
    try {
      const newJob = await jobsAPI.createJob(data);
      setJobs((prev) => [newJob, ...prev]);
      toast.success('İş ilanı oluşturuldu');
      return newJob;
    } catch (error) {
      console.error('Failed to create job:', error);
      toast.error('İş ilanı oluşturulamadı');
      throw error;
    }
  };

  const updateJob = async (id: string, data: Partial<CreateJobRequest>): Promise<Job> => {
    try {
      const updatedJob = await jobsAPI.updateJob(id, data);
      setJobs((prev) => prev.map((job) => (job.id === id ? updatedJob : job)));
      toast.success('İş ilanı güncellendi');
      return updatedJob;
    } catch (error) {
      console.error('Failed to update job:', error);
      toast.error('İş ilanı güncellenemedi');
      throw error;
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await jobsAPI.deleteJob(id);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success('İş ilanı silindi');
    } catch (error) {
      console.error('Failed to delete job:', error);
      toast.error('İş ilanı silinemedi');
      throw error;
    }
  };

  const approveJob = async (id: string) => {
    try {
      const approvedJob = await jobsAPI.approveJob(id);
      setJobs((prev) => prev.map((job) => (job.id === id ? approvedJob : job)));
      toast.success('İş ilanı onaylandı');
    } catch (error) {
      console.error('Failed to approve job:', error);
      toast.error('İş ilanı onaylanamadı');
      throw error;
    }
  };

  const rejectJob = async (id: string, reason?: string) => {
    try {
      const rejectedJob = await jobsAPI.rejectJob(id, reason);
      setJobs((prev) => prev.map((job) => (job.id === id ? rejectedJob : job)));
      toast.success('İş ilanı reddedildi');
    } catch (error) {
      console.error('Failed to reject job:', error);
      toast.error('İş ilanı reddedilemedi');
      throw error;
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    jobs,
    isLoading,
    fetchJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    approveJob,
    rejectJob,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};
