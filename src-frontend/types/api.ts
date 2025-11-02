
// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'INDIVIDUAL' | 'CORPORATE' | 'ADMIN';
  phone?: string;
  avatar?: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: 'INDIVIDUAL' | 'CORPORATE';
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  type: string;
  category?: string;
  salary?: number;
  hourlyRate?: number;
  duration?: string;
  startTime?: string;
  urgency?: 'HIGH' | 'MEDIUM' | 'LOW';
  requirements?: string[];
  status: 'PENDING' | 'ACTIVE' | 'REJECTED' | 'COMPLETED' | 'CLOSED';
  isUrgent?: boolean;
  employerId: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
  applicants?: number;
  applications?: Application[];
  employer?: User;
}

export interface CreateJobRequest {
  title: string;
  description: string;
  company: string;
  location: string;
  type: string;
  category?: string;
  salary?: number;
  hourlyRate?: number;
  duration?: string;
  startTime?: string;
  urgency?: 'HIGH' | 'MEDIUM' | 'LOW';
  requirements?: string[];
  isUrgent?: boolean;
}

// Application Types
export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'PENDING' | 'ASSIGNED' | 'COMPLETED' | 'REJECTED';
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
  job?: Job;
  user?: User;
}

export interface CreateApplicationRequest {
  jobId: string;
  resume?: File;
}

// Donation Types
export interface Donation {
  id: string;
  userId: string;
  type: 'FOOD' | 'MONEY' | 'MATERIAL';
  title: string;
  description: string;
  amount?: number;
  quantity?: number;
  location?: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface CreateDonationRequest {
  type: 'FOOD' | 'MONEY' | 'MATERIAL';
  title: string;
  description: string;
  amount?: number;
  quantity?: number;
  location?: string;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
  sender?: User;
  receiver?: User;
}

export interface SendMessageRequest {
  receiverId: string;
  content: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  data?: any;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
