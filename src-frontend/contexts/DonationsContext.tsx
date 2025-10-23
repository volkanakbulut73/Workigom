
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { donationsAPI } from '../lib/apiClient';
import { Donation, CreateDonationRequest } from '../types/api';
import { toast } from 'sonner';

interface DonationsContextType {
  donations: Donation[];
  isLoading: boolean;
  fetchDonations: (params?: any) => Promise<void>;
  getDonationById: (id: string) => Promise<Donation>;
  createDonation: (data: CreateDonationRequest) => Promise<Donation>;
  updateDonation: (id: string, data: Partial<CreateDonationRequest>) => Promise<Donation>;
  deleteDonation: (id: string) => Promise<void>;
  updateDonationStatus: (
    id: string,
    status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  ) => Promise<void>;
}

const DonationsContext = createContext<DonationsContextType | undefined>(undefined);

export const useDonations = () => {
  const context = useContext(DonationsContext);
  if (!context) {
    throw new Error('useDonations must be used within a DonationsProvider');
  }
  return context;
};

interface DonationsProviderProps {
  children: ReactNode;
}

export const DonationsProvider: React.FC<DonationsProviderProps> = ({ children }) => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDonations = async (params?: any) => {
    try {
      setIsLoading(true);
      const data = await donationsAPI.getAllDonations(params);
      setDonations(data);
    } catch (error) {
      console.error('Failed to fetch donations:', error);
      toast.error('Bağışlar yüklenemedi');
    } finally {
      setIsLoading(false);
    }
  };

  const getDonationById = async (id: string): Promise<Donation> => {
    try {
      const donation = await donationsAPI.getDonationById(id);
      return donation;
    } catch (error) {
      console.error('Failed to fetch donation:', error);
      toast.error('Bağış yüklenemedi');
      throw error;
    }
  };

  const createDonation = async (data: CreateDonationRequest): Promise<Donation> => {
    try {
      const newDonation = await donationsAPI.createDonation(data);
      setDonations((prev) => [newDonation, ...prev]);
      toast.success('Bağış oluşturuldu');
      return newDonation;
    } catch (error) {
      console.error('Failed to create donation:', error);
      toast.error('Bağış oluşturulamadı');
      throw error;
    }
  };

  const updateDonation = async (
    id: string,
    data: Partial<CreateDonationRequest>
  ): Promise<Donation> => {
    try {
      const updatedDonation = await donationsAPI.updateDonation(id, data);
      setDonations((prev) => prev.map((donation) => (donation.id === id ? updatedDonation : donation)));
      toast.success('Bağış güncellendi');
      return updatedDonation;
    } catch (error) {
      console.error('Failed to update donation:', error);
      toast.error('Bağış güncellenemedi');
      throw error;
    }
  };

  const deleteDonation = async (id: string) => {
    try {
      await donationsAPI.deleteDonation(id);
      setDonations((prev) => prev.filter((donation) => donation.id !== id));
      toast.success('Bağış silindi');
    } catch (error) {
      console.error('Failed to delete donation:', error);
      toast.error('Bağış silinemedi');
      throw error;
    }
  };

  const updateDonationStatus = async (
    id: string,
    status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  ) => {
    try {
      const updatedDonation = await donationsAPI.updateDonationStatus(id, status);
      setDonations((prev) => prev.map((donation) => (donation.id === id ? updatedDonation : donation)));
      toast.success('Bağış durumu güncellendi');
    } catch (error) {
      console.error('Failed to update donation status:', error);
      toast.error('Bağış durumu güncellenemedi');
      throw error;
    }
  };

  const value = {
    donations,
    isLoading,
    fetchDonations,
    getDonationById,
    createDonation,
    updateDonation,
    deleteDonation,
    updateDonationStatus,
  };

  return <DonationsContext.Provider value={value}>{children}</DonationsContext.Provider>;
};
