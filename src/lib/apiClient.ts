
import api, { setAuthToken, removeAuthToken } from './api';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  Job,
  CreateJobRequest,
  Application,
  CreateApplicationRequest,
  Donation,
  CreateDonationRequest,
  Message,
  SendMessageRequest,
  Notification,
  ApiResponse,
} from '../types/api';

// ============= AUTH API =============
export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<{ success: boolean; data: AuthResponse }>('/auth/login', data);
    const authData = response.data.data;
    if (authData.token) {
      setAuthToken(authData.token);
      localStorage.setItem('currentUser', JSON.stringify(authData.user));
    }
    return authData;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<{ success: boolean; data: AuthResponse }>('/auth/register', data);
    const authData = response.data.data;
    if (authData.token) {
      setAuthToken(authData.token);
      localStorage.setItem('currentUser', JSON.stringify(authData.user));
    }
    return authData;
  },

  logout: () => {
    removeAuthToken();
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<{ success: boolean; data: User }>('/auth/me');
    return response.data.data;
  },

  verifyEmail: async (token: string): Promise<User> => {
    const response = await api.post<{ success: boolean; data: User }>('/auth/verify-email', { token });
    return response.data.data;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await api.post('/auth/reset-password', { token, newPassword });
  },
};

// ============= USERS API =============
export const usersAPI = {
  getProfile: async (): Promise<User> => {
    const response = await api.get<{ success: boolean; data: User }>('/users/profile');
    return response.data.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put<{ success: boolean; data: User }>('/users/profile', data);
    return response.data.data;
  },

  uploadAvatar: async (file: File): Promise<User> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post<{ success: boolean; data: User }>('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  deleteAccount: async (): Promise<void> => {
    await api.delete('/users/profile');
  },
};

// ============= JOBS API =============
export const jobsAPI = {
  getAllJobs: async (params?: {
    status?: string;
    type?: string;
    location?: string;
    isUrgent?: boolean;
  }): Promise<Job[]> => {
    const response = await api.get<{ success: boolean; data: Job[] }>('/jobs', { params });
    return response.data.data;
  },

  getJobById: async (id: string): Promise<Job> => {
    const response = await api.get<{ success: boolean; data: Job }>(`/jobs/${id}`);
    return response.data.data;
  },

  createJob: async (data: CreateJobRequest): Promise<Job> => {
    const response = await api.post<{ success: boolean; data: Job }>('/jobs', data);
    return response.data.data;
  },

  updateJob: async (id: string, data: Partial<CreateJobRequest>): Promise<Job> => {
    const response = await api.put<{ success: boolean; data: Job }>(`/jobs/${id}`, data);
    return response.data.data;
  },

  deleteJob: async (id: string): Promise<void> => {
    await api.delete(`/jobs/${id}`);
  },

  approveJob: async (id: string): Promise<Job> => {
    const response = await api.put<{ success: boolean; data: Job }>(`/jobs/${id}/approve`);
    return response.data.data;
  },

  rejectJob: async (id: string, reason?: string): Promise<Job> => {
    const response = await api.put<{ success: boolean; data: Job }>(`/jobs/${id}/reject`, { reason });
    return response.data.data;
  },
};

// ============= APPLICATIONS API =============
export const applicationsAPI = {
  getAllApplications: async (params?: {
    jobId?: string;
    userId?: string;
    status?: string;
  }): Promise<Application[]> => {
    const response = await api.get<{ success: boolean; data: Application[] }>('/applications', { params });
    return response.data.data;
  },

  getApplicationById: async (id: string): Promise<Application> => {
    const response = await api.get<{ success: boolean; data: Application }>(`/applications/${id}`);
    return response.data.data;
  },

  createApplication: async (data: CreateApplicationRequest): Promise<Application> => {
    const formData = new FormData();
    formData.append('jobId', data.jobId);
    if (data.resume) {
      formData.append('resume', data.resume);
    }

    const response = await api.post<{ success: boolean; data: Application }>('/applications', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  updateApplicationStatus: async (
    id: string,
    status: 'PENDING' | 'ASSIGNED' | 'COMPLETED' | 'REJECTED'
  ): Promise<Application> => {
    const response = await api.put<{ success: boolean; data: Application }>(`/applications/${id}/status`, { status });
    return response.data.data;
  },

  deleteApplication: async (id: string): Promise<void> => {
    await api.delete(`/applications/${id}`);
  },
};

// ============= DONATIONS API =============
export const donationsAPI = {
  getAllDonations: async (params?: {
    type?: string;
    status?: string;
    userId?: string;
  }): Promise<Donation[]> => {
    const response = await api.get<{ success: boolean; data: Donation[] }>('/donations', { params });
    return response.data.data;
  },

  getDonationById: async (id: string): Promise<Donation> => {
    const response = await api.get<{ success: boolean; data: Donation }>(`/donations/${id}`);
    return response.data.data;
  },

  createDonation: async (data: CreateDonationRequest): Promise<Donation> => {
    const response = await api.post<{ success: boolean; data: Donation }>('/donations', data);
    return response.data.data;
  },

  updateDonation: async (id: string, data: Partial<CreateDonationRequest>): Promise<Donation> => {
    const response = await api.put<{ success: boolean; data: Donation }>(`/donations/${id}`, data);
    return response.data.data;
  },

  deleteDonation: async (id: string): Promise<void> => {
    await api.delete(`/donations/${id}`);
  },

  updateDonationStatus: async (
    id: string,
    status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  ): Promise<Donation> => {
    const response = await api.put<{ success: boolean; data: Donation }>(`/donations/${id}/status`, { status });
    return response.data.data;
  },
};

// ============= MESSAGES API =============
export const messagesAPI = {
  getConversations: async (): Promise<Message[]> => {
    const response = await api.get<{ success: boolean; data: Message[] }>('/messages/conversations');
    return response.data.data;
  },

  getMessages: async (userId: string): Promise<Message[]> => {
    const response = await api.get<{ success: boolean; data: Message[] }>(`/messages/${userId}`);
    return response.data.data;
  },

  sendMessage: async (data: SendMessageRequest): Promise<Message> => {
    const response = await api.post<{ success: boolean; data: Message }>('/messages', data);
    return response.data.data;
  },

  markAsRead: async (messageId: string): Promise<Message> => {
    const response = await api.put<{ success: boolean; data: Message }>(`/messages/${messageId}/read`);
    return response.data.data;
  },
};

// ============= NOTIFICATIONS API =============
export const notificationsAPI = {
  getAllNotifications: async (): Promise<Notification[]> => {
    const response = await api.get<{ success: boolean; data: Notification[] }>('/notifications');
    return response.data.data;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const response = await api.put<{ success: boolean; data: Notification }>(`/notifications/${id}/read`);
    return response.data.data;
  },

  markAllAsRead: async (): Promise<void> => {
    await api.put('/notifications/read-all');
  },

  deleteNotification: async (id: string): Promise<void> => {
    await api.delete(`/notifications/${id}`);
  },
};
