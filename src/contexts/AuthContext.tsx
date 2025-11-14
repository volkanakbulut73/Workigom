import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  user_type: 'individual' | 'corporate' | 'admin';
  company_name?: string;
  tax_number?: string;
  address?: string;
  created_at: string;
}

interface AuthContextType {
  user: UserProfile | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: any }>;
  refreshProfile: () => Promise<void>;
  isSupabaseReady: boolean;
}

interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  userType: 'individual' | 'corporate' | 'admin';
  companyName?: string;
  taxNumber?: string;
  address?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Demo users - şifreler plain text (sadece demo için)
const DEMO_USERS: Array<UserProfile & { password: string }> = [
  {
    id: 'admin-001',
    email: 'cicicars.com@gmail.com',
    password: 'admin123',
    full_name: 'Admin User',
    phone: '+90 555 000 00 01',
    user_type: 'admin',
    created_at: new Date().toISOString(),
  },
  {
    id: 'admin-002',
    email: 'volkanakbulut73@gmail.com',
    password: 'admin123',
    full_name: 'Volkan Akbulut',
    phone: '+90 555 000 00 02',
    user_type: 'admin',
    created_at: new Date().toISOString(),
  },
  {
    id: 'individual-001',
    email: 'ahmet@example.com',
    password: 'demo123',
    full_name: 'Ahmet Yılmaz',
    phone: '+90 555 111 22 33',
    user_type: 'individual',
    created_at: new Date().toISOString(),
  },
  {
    id: 'corporate-001',
    email: 'sirket@example.com',
    password: 'demo123',
    full_name: 'Şirket Yetkili',
    phone: '+90 555 444 55 66',
    user_type: 'corporate',
    company_name: 'Demo Şirket A.Ş.',
    tax_number: '1234567890',
    address: 'İstanbul, Türkiye',
    created_at: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const isSupabaseReady = false; // Artık Supabase kullanmıyoruz

  // Load session from localStorage on mount
  useEffect(() => {
    const loadSession = () => {
      try {
        const savedUser = localStorage.getItem('workigom_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setProfile(userData);
          console.log('✅ Oturum yüklendi:', userData.email);
        }
      } catch (error) {
        console.error('Session yükleme hatası:', error);
        localStorage.removeItem('workigom_user');
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  // Load all users to localStorage (first time setup)
  useEffect(() => {
    const allUsers = localStorage.getItem('workigom_all_users');
    if (!allUsers) {
      // İlk kez çalışıyorsa demo kullanıcıları kaydet
      localStorage.setItem('workigom_all_users', JSON.stringify(DEMO_USERS));
      console.log('✅ Demo kullanıcılar yüklendi');
      console.log('📝 DEMO GİRİŞ BİLGİLERİ:');
      console.log('🔐 Admin: cicicars.com@gmail.com / admin123');
      console.log('🔐 Admin: volkanakbulut73@gmail.com / admin123');
      console.log('👤 Bireysel: ahmet@example.com / demo123');
      console.log('🏢 Kurumsal: sirket@example.com / demo123');
    }
  }, []);

  // Sign in
  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: any }> => {
    try {
      // Get all users from localStorage
      const allUsersStr = localStorage.getItem('workigom_all_users');
      const allUsers: Array<UserProfile & { password: string }> = allUsersStr 
        ? JSON.parse(allUsersStr) 
        : DEMO_USERS;

      // Find user
      const foundUser = allUsers.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        return { 
          success: false, 
          error: { message: 'E-posta veya şifre hatalı' } 
        };
      }

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = foundUser;

      // Save to localStorage
      localStorage.setItem('workigom_user', JSON.stringify(userWithoutPassword));
      
      // Update state
      setUser(userWithoutPassword);
      setProfile(userWithoutPassword);

      console.log('✅ Giriş başarılı:', foundUser.email, 'Rol:', foundUser.user_type);

      return { success: true };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { success: false, error };
    }
  };

  // Sign up
  const signUp = async (data: SignUpData): Promise<{ success: boolean; error?: any }> => {
    try {
      // Get all users
      const allUsersStr = localStorage.getItem('workigom_all_users');
      const allUsers: Array<UserProfile & { password: string }> = allUsersStr 
        ? JSON.parse(allUsersStr) 
        : DEMO_USERS;

      // Check if email already exists
      if (allUsers.some(u => u.email === data.email)) {
        return { 
          success: false, 
          error: { message: 'Bu e-posta adresi zaten kullanılıyor' } 
        };
      }

      // Create new user
      const newUser: UserProfile & { password: string } = {
        id: `${data.userType}-${Date.now()}`,
        email: data.email,
        password: data.password,
        full_name: data.fullName,
        phone: data.phone,
        user_type: data.userType,
        company_name: data.companyName || undefined,
        tax_number: data.taxNumber || undefined,
        address: data.address || undefined,
        created_at: new Date().toISOString(),
      };

      // Add to all users
      allUsers.push(newUser);
      localStorage.setItem('workigom_all_users', JSON.stringify(allUsers));

      console.log('✅ Yeni kullanıcı oluşturuldu:', newUser.email);

      return { success: true };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { success: false, error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      localStorage.removeItem('workigom_user');
      setUser(null);
      setProfile(null);
      console.log('✅ Çıkış yapıldı');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Update profile
  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: any }> => {
    if (!user) return { success: false, error: new Error('No user logged in') };

    try {
      // Update current user
      const updatedUser = { ...user, ...updates };
      
      // Save to localStorage
      localStorage.setItem('workigom_user', JSON.stringify(updatedUser));
      
      // Update in all users list
      const allUsersStr = localStorage.getItem('workigom_all_users');
      if (allUsersStr) {
        const allUsers = JSON.parse(allUsersStr);
        const userIndex = allUsers.findIndex((u: any) => u.id === user.id);
        if (userIndex !== -1) {
          allUsers[userIndex] = { ...allUsers[userIndex], ...updates };
          localStorage.setItem('workigom_all_users', JSON.stringify(allUsers));
        }
      }

      // Update state
      setUser(updatedUser);
      setProfile(updatedUser);

      console.log('✅ Profil güncellendi');
      return { success: true };
    } catch (error: any) {
      console.error('Update profile error:', error);
      return { success: false, error };
    }
  };

  // Refresh profile
  const refreshProfile = async () => {
    if (user) {
      // Reload from localStorage
      const savedUser = localStorage.getItem('workigom_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setProfile(userData);
      }
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile,
    isSupabaseReady,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};