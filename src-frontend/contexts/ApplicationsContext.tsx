
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { applicationsAPI } from '../lib/apiClient';
import { Application, CreateApplicationRequest } from '../types/api';
import { toast } from 'sonner';

interface ApplicationsContextType {
  applications: Application[];
  isLoading: boolean;
  fetchApplications: (params?: any) => Promise<void>;
  getApplicationById: (id: string) => Promise<Application>;
  createApplication: (data: CreateApplicationRequest) => Promise<Application>;
  updateApplicationStatus: (
    id: string,
    status: 'PENDING' | 'ASSIGNED' | 'COMPLETED' | 'REJECTED'
  ) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
};

interface ApplicationsProviderProps {
  children: ReactNode;
}

export const ApplicationsProvider: React.FC<ApplicationsProviderProps> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApplications = async (params?: any) => {
    try {
      setIsLoading(true);
      const data = await applicationsAPI.getAllApplications(params);
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      toast.error('Başvurular yüklenemedi');
    } finally {
      setIsLoading(false);
    }
  };

  const getApplicationById = async (id: string): Promise<Application> => {
    try {
      const application = await applicationsAPI.getApplicationById(id);
      return application;
    } catch (error) {
      console.error('Failed to fetch application:', error);
      toast.error('Başvuru yüklenemedi');
      throw error;
    }
  };

  const createApplication = async (data: CreateApplicationRequest): Promise<Application> => {
    try {
      const newApplication = await applicationsAPI.createApplication(data);
      setApplications((prev) => [newApplication, ...prev]);
      toast.success('Başvuru yapıldı');
      return newApplication;
    } catch (error) {
      console.error('Failed to create application:', error);
      toast.error('Başvuru yapılamadı');
      throw error;
    }
  };

  const updateApplicationStatus = async (
    id: string,
    status: 'PENDING' | 'ASSIGNED' | 'COMPLETED' | 'REJECTED'
  ) => {
    try {
      const updatedApplication = await applicationsAPI.updateApplicationStatus(id, status);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? updatedApplication : app))
      );
      toast.success('Başvuru durumu güncellendi');
    } catch (error) {
      console.error('Failed to update application status:', error);
      toast.error('Başvuru durumu güncellenemedi');
      throw error;
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      await applicationsAPI.deleteApplication(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
      toast.success('Başvuru silindi');
    } catch (error) {
      console.error('Failed to delete application:', error);
      toast.error('Başvuru silinemedi');
      throw error;
    }
  };

  const value = {
    applications,
    isLoading,
    fetchApplications,
    getApplicationById,
    createApplication,
    updateApplicationStatus,
    deleteApplication,
  };

  return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
};
