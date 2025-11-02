
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, setAuthToken, removeAuthToken, getAuthToken } from '../lib/api';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'ADMIN' | 'INDIVIDUAL' | 'CORPORATE';
  avatar?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await authAPI.getCurrentUser();
          if (response.success) {
            setUser(response.data);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          removeAuthToken();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        const { token, user } = response.data;
        setAuthToken(token);
        setUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast.success('✅ Login successful!');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      toast.error(`❌ ${message}`);
      throw error;
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    toast.success('✅ Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
