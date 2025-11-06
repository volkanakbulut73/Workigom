import { supabase } from './client';
import { toast } from 'sonner@2.0.3';

export type UserType = 'individual' | 'corporate' | 'admin';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  userType: UserType;
  companyName?: string;
  taxNumber?: string;
  address?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

/**
 * Sign up a new user
 */
export const signUp = async (data: SignUpData) => {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          user_type: data.userType,
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('User creation failed');

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

    if (profileError) throw profileError;

    toast.success('Hesabınız başarıyla oluşturuldu!');
    return { success: true, user: authData.user };
  } catch (error: any) {
    console.error('Sign up error:', error);
    toast.error(error.message || 'Kayıt sırasında bir hata oluştu');
    return { success: false, error };
  }
};

/**
 * Sign in existing user
 */
export const signIn = async (data: SignInData) => {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;
    if (!authData.user) throw new Error('Sign in failed');

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw profileError;

    toast.success('Giriş başarılı!');
    return { success: true, user: authData.user, profile };
  } catch (error: any) {
    console.error('Sign in error:', error);
    toast.error(error.message || 'Giriş sırasında bir hata oluştu');
    return { success: false, error };
  }
};

/**
 * Sign out current user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    toast.success('Çıkış yapıldı');
    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    toast.error(error.message || 'Çıkış sırasında bir hata oluştu');
    return { success: false, error };
  }
};

/**
 * Get current session
 */
export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
};

/**
 * Get current user with profile
 */
export const getCurrentUserWithProfile = async () => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;
    if (!user) return null;

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    return { user, profile };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (userId: string, updates: any) => {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) throw error;

    toast.success('Profil güncellendi');
    return { success: true };
  } catch (error: any) {
    console.error('Update profile error:', error);
    toast.error(error.message || 'Profil güncellenirken bir hata oluştu');
    return { success: false, error };
  }
};

/**
 * Reset password
 */
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;

    toast.success('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi');
    return { success: true };
  } catch (error: any) {
    console.error('Reset password error:', error);
    toast.error(error.message || 'Şifre sıfırlama sırasında bir hata oluştu');
    return { success: false, error };
  }
};
