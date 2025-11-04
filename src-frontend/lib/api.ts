İşte güncellenmiş **src-frontend/lib/api.ts** dosyasının tam içeriği:
Action: file_editor view /app/src-frontend/lib/api.ts
Observation: /app/src-frontend/lib/api.ts:
1|
2|import axios, { AxiosInstance, AxiosError } from 'axios';
3|import { toast } from 'sonner';
4|
5|// Construct API URL - handle both with and without /api suffix
6|const getApiUrl = () => {
7|  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
8|  const baseUrl = backendUrl.endsWith('/api') ? backendUrl : `${backendUrl}/api`;
9|  
10|  // Debug logging in development
11|  if (import.meta.env.DEV) {
12|    console.log('🔧 API Configuration:', {
13|      VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
14|      finalApiUrl: baseUrl,
15|      mode: import.meta.env.MODE
16|    });
17|  }
18|  
19|  return baseUrl;
20|};
21|
22|const API_URL = getApiUrl();
23|
24|// Create axios instance
25|const api: AxiosInstance = axios.create({
26|  baseURL: API_URL,
27|  withCredentials: true, // Send cookies with requests
28|  headers: {
29|    'Content-Type': 'application/json',
30|  },
31|});
32|
33|// Request interceptor - Add auth token to requests
34|api.interceptors.request.use(
35|  (config: any) => {
36|    const token = localStorage.getItem('authToken');
37|    if (token) {
38|      config.headers.Authorization = `Bearer ${token}`;
39|    }
40|    return config;
41|  },
42|  (error: any) => {
43|    return Promise.reject(error);
44|  }
45|);
46|
47|// Response interceptor - Handle errors globally
48|api.interceptors.response.use(
49|  (response: any) => {
50|    return response;
51|  },
52|  (error: any) => {
53|    // Handle different error types
54|    if (error.response) {
55|      // Server responded with error
56|      const status = error.response.status;
57|      const message = error.response.data?.message || 'An error occurred';
58|
59|      switch (status) {
60|        case 401:
61|          // Unauthorized - handle token expiration
62|          const isAuthEndpoint = error.config?.url?.includes('/auth/');
63|          
64|          // Don't auto-clear token for auth endpoints (login, register, getCurrentUser)
65|          // Let AuthContext handle token management
66|          if (!isAuthEndpoint) {
67|            localStorage.removeItem('authToken');
68|            localStorage.removeItem('currentUser');
69|            toast.error('Session expired. Please login again.');
70|            // Redirect to login page
71|            window.location.href = '/';
72|          }
73|          break;
74|        case 403:
75|          toast.error('You do not have permission to perform this action.');
76|          break;
77|        case 404:
78|          toast.error('Resource not found.');
79|          break;
80|        case 422:
81|          // Validation errors
82|          const errors = error.response.data?.errors;
83|          if (errors && Array.isArray(errors)) {
84|            errors.forEach((err: any) => {
85|              toast.error(err.message || err.msg);
86|            });
87|          } else {
88|            toast.error(message);
89|          }
90|          break;
91|        case 500:
92|          toast.error('Server error. Please try again later.');
93|          break;
94|        default:
95|          toast.error(message);
96|      }
97|    } else if (error.request) {
98|      // Request made but no response
99|      toast.error('Network error. Please check your connection.');
100|    } else {
101|      // Something else happened
102|      toast.error('An unexpected error occurred.');
103|    }
104|
105|    return Promise.reject(error);
106|  }
107|);
108|
109|// Auth token management
110|export const setAuthToken = (token: string) => {
111|  localStorage.setItem('authToken', token);
112|};
113|
114|export const getAuthToken = () => {
115|  return localStorage.getItem('authToken');
116|};
117|
118|export const removeAuthToken = () => {
119|  localStorage.removeItem('authToken');
120|  localStorage.removeItem('currentUser');
121|};
122|
123|export default api;
124|
