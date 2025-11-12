import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../utils/supabase/client';
import { Database } from '../utils/supabase/types';
import { checkUserExists } from '../utils/checkUserExists';

type UserProfile = Database['public']['Tables']['users']['Row'];

interface AuthContextType {
  user: User | null;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSupabaseReady] = useState(isSupabaseConfigured());

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    if (!isSupabaseReady) {
      // Supabase not configured - just set loading to false
      console.log('🔧 Database schema kurulumu gerekli. Detaylar için: HIZLI_BASLANGIC.md');
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isSupabaseReady]);

  // Sign up
  const signUp = async (data: SignUpData): Promise<{ success: boolean; error?: any }> => {
    if (!isSupabaseReady) {
      return { 
        success: false, 
        error: new Error('Database bağlantısı kurulamadı. Lütfen Supabase schema kurulumunu tamamlayın.') 
      };
    }

    try {
      // 1. Create auth user with email auto-confirmation
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            user_type: data.userType,
          },
          // Auto-confirm email since email server is not configured
          emailRedirectTo: undefined,
        },
      });

      if (authError) {
        console.error('Auth signup error:', authError);
        throw authError;
      }
      
      if (!authData.user) {
        console.error('No user returned from signup');
        throw new Error('User creation failed');
      }

      console.log('User created successfully:', authData.user.id);

      // 2. Create user profile
      const { error: profileError } = await supabase.from('users').insert({
        id: authData.user.id,
        email: data.email,
        full_name: data.fullName,
        phone: data.phone,
        user_type: data.userType,
        company_name: data.companyName || null,
        tax_number: data.taxNumber || null,
        address: data.address || null,
      });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw profileError;
      }

      console.log('Profile created successfully');

      return { success: true };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { success: false, error };
    }
  };

  // Sign in
  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: any }> => {
    if (!isSupabaseReady) {
      return { 
        success: false, 
        error: new Error('Database bağlantısı kurulamadı. Lütfen Supabase schema kurulumunu tamamlayın.') 
      };
    }

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!authData.user) throw new Error('Sign in failed');

      // Profile will be fetched by onAuthStateChange
      return { success: true };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { success: false, error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Update profile
  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: any }> => {
    if (!user) return { success: false, error: new Error('No user logged in') };

    try {
      const { error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      // Refresh profile
      await fetchProfile(user.id);

      return { success: true };
    } catch (error: any) {
      console.error('Update profile error:', error);
      return { success: false, error };
    }
  };

  // Refresh profile manually
  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
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