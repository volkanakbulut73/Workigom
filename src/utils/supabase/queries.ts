import { supabase } from './client';
import { Database } from './types';

type Job = Database['public']['Tables']['jobs']['Row'];
type Application = Database['public']['Tables']['applications']['Row'];
type Donation = Database['public']['Tables']['donations']['Row'];
type Notification = Database['public']['Tables']['notifications']['Row'];
type Transaction = Database['public']['Tables']['transactions']['Row'];
type User = Database['public']['Tables']['users']['Row'];

// ================== JOBS ==================

export const getOpenJobs = async () => {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      corporate:users!jobs_corporate_id_fkey(*)
    `)
    .eq('status', 'open')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getJobById = async (jobId: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      corporate:users!jobs_corporate_id_fkey(*)
    `)
    .eq('id', jobId)
    .single();

  if (error) throw error;
  return data;
};

export const getCorporateJobs = async (corporateId: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('corporate_id', corporateId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createJob = async (jobData: Database['public']['Tables']['jobs']['Insert']) => {
  const { data, error } = await supabase
    .from('jobs')
    .insert(jobData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateJob = async (jobId: string, updates: Database['public']['Tables']['jobs']['Update']) => {
  const { data, error } = await supabase
    .from('jobs')
    .update(updates)
    .eq('id', jobId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ================== APPLICATIONS ==================

export const getApplicationsByIndividual = async (individualId: string) => {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      job:jobs(*),
      corporate:users!applications_corporate_id_fkey(*)
    `)
    .eq('individual_id', individualId)
    .order('applied_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getApplicationsByCorporate = async (corporateId: string) => {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      job:jobs(*),
      individual:users!applications_individual_id_fkey(*)
    `)
    .eq('corporate_id', corporateId)
    .order('applied_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getApplicationsByJob = async (jobId: string) => {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      individual:users!applications_individual_id_fkey(*)
    `)
    .eq('job_id', jobId)
    .order('applied_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createApplication = async (applicationData: Database['public']['Tables']['applications']['Insert']) => {
  const { data, error } = await supabase
    .from('applications')
    .insert(applicationData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateApplication = async (applicationId: string, updates: Database['public']['Tables']['applications']['Update']) => {
  const { data, error } = await supabase
    .from('applications')
    .update(updates)
    .eq('id', applicationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ================== DONATIONS ==================

export const getDonationsByDonor = async (donorId: string) => {
  const { data, error } = await supabase
    .from('donations')
    .select(`
      *,
      recipient:users!donations_recipient_id_fkey(*)
    `)
    .eq('donor_id', donorId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getDonationsByRecipient = async (recipientId: string) => {
  const { data, error } = await supabase
    .from('donations')
    .select(`
      *,
      donor:users!donations_donor_id_fkey(*)
    `)
    .eq('recipient_id', recipientId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getAvailableDonations = async () => {
  const { data, error } = await supabase
    .from('donations')
    .select(`
      *,
      donor:users!donations_donor_id_fkey(*)
    `)
    .eq('status', 'pending')
    .is('recipient_id', null)
    .gte('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createDonation = async (donationData: Database['public']['Tables']['donations']['Insert']) => {
  const { data, error } = await supabase
    .from('donations')
    .insert(donationData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateDonation = async (donationId: string, updates: Database['public']['Tables']['donations']['Update']) => {
  const { data, error } = await supabase
    .from('donations')
    .update(updates)
    .eq('id', donationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ================== NOTIFICATIONS ==================

export const getNotificationsByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createNotification = async (notificationData: Database['public']['Tables']['notifications']['Insert']) => {
  const { data, error } = await supabase
    .from('notifications')
    .insert(notificationData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const markNotificationAsRead = async (notificationId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const markAllNotificationsAsRead = async (userId: string) => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId)
    .eq('is_read', false);

  if (error) throw error;
};

// ================== TRANSACTIONS ==================

export const getTransactionsByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createTransaction = async (transactionData: Database['public']['Tables']['transactions']['Insert']) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transactionData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ================== USERS ==================

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateUserBalance = async (userId: string, amount: number, operation: 'add' | 'subtract') => {
  // Get current balance
  const { data: user, error: getUserError } = await supabase
    .from('users')
    .select('balance')
    .eq('id', userId)
    .single();

  if (getUserError) throw getUserError;

  const currentBalance = user.balance || 0;
  const newBalance = operation === 'add' 
    ? currentBalance + amount 
    : currentBalance - amount;

  // Update balance
  const { data, error } = await supabase
    .from('users')
    .update({ balance: newBalance })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ================== STORAGE ==================

export const uploadFile = async (bucket: string, path: string, file: File) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (error) throw error;
  return data;
};

export const getPublicUrl = async (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
};

export const deleteFile = async (bucket: string, path: string) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) throw error;
};

// ================== REAL-TIME SUBSCRIPTIONS ==================

export const subscribeToNotifications = (userId: string, callback: (notification: Notification) => void) => {
  return supabase
    .channel(`notifications:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as Notification);
      }
    )
    .subscribe();
};

export const subscribeToJobs = (callback: (job: Job) => void) => {
  return supabase
    .channel('jobs')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'jobs',
      },
      (payload) => {
        callback(payload.new as Job);
      }
    )
    .subscribe();
};
