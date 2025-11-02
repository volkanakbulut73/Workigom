
import axios, { AxiosInstance } from 'axios';
import { toast } from 'sonner';

// Get API URL from environment variable
const getApiUrl = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
  const baseUrl = backendUrl.endsWith('/api') ? backendUrl : `${backendUrl}/api`;
  
  // Debug logging in development
  if (import.meta.env.DEV) {
    console.log('🔧 API Configuration:', {
      VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
      finalApiUrl: baseUrl,
      mode: import.meta.env.MODE
    });
  }
  
  return baseUrl;
};

const API_URL = getApiUrl();

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config: any) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || 'An error occurred';

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentUser');
          toast.error('❌ Invalid or expired token. Please login again.');
          // Don't auto-redirect, let the user handle it
          break;
        case 403:
          toast.error('❌ You do not have permission to perform this action.');
          break;
        case 404:
          toast.error('❌ Resource not found.');
          break;
        case 422:
          // Validation errors
          const errors = error.response.data?.errors;
          if (errors && Array.isArray(errors)) {
            errors.forEach((err: any) => {
              toast.error(`❌ ${err.message || err.msg}`);
            });
          } else {
            toast.error(`❌ ${message}`);
          }
          break;
        case 500:
          toast.error('❌ Server error. Please try again later.');
          break;
        default:
          toast.error(`❌ ${message}`);
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network error:', error.request);
      toast.error('❌ Network error. Please check your connection and ensure the backend is running.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      toast.error('❌ An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (data: { email: string; password: string; name: string; phone: string; role: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Admin API functions
export const adminAPI = {
  sendNotification: async (data: {
    targetType: string;
    targetId?: string;
    title: string;
    message: string;
    link?: string;
  }) => {
    const response = await api.post('/admin/send-notification', data);
    return response.data;
  },
  
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
};

// Notification API functions
export const notificationAPI = {
  getAll: async (params?: { page?: number; limit?: number; isRead?: boolean }) => {
    const response = await api.get('/notifications', { params });
    return response.data;
  },
  
  markAsRead: async (id: string) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },
  
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  },
  
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  },
};

// Auth token management
export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
};

export default api;
