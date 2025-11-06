export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          user_type: 'individual' | 'corporate' | 'admin'
          full_name: string
          phone: string | null
          company_name: string | null
          tax_number: string | null
          address: string | null
          iban: string | null
          golden_heart_count: number
          balance: number
          profile_photo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          user_type: 'individual' | 'corporate' | 'admin'
          full_name: string
          phone?: string | null
          company_name?: string | null
          tax_number?: string | null
          address?: string | null
          iban?: string | null
          golden_heart_count?: number
          balance?: number
          profile_photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          user_type?: 'individual' | 'corporate' | 'admin'
          full_name?: string
          phone?: string | null
          company_name?: string | null
          tax_number?: string | null
          address?: string | null
          iban?: string | null
          golden_heart_count?: number
          balance?: number
          profile_photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          corporate_id: string
          title: string
          description: string
          location: string
          date: string
          time: string
          hourly_rate: number
          positions: number
          filled_positions: number
          status: 'open' | 'in_progress' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          corporate_id: string
          title: string
          description: string
          location: string
          date: string
          time: string
          hourly_rate: number
          positions: number
          filled_positions?: number
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          corporate_id?: string
          title?: string
          description?: string
          location?: string
          date?: string
          time?: string
          hourly_rate?: number
          positions?: number
          filled_positions?: number
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          job_id: string
          individual_id: string
          corporate_id: string
          status: 'pending' | 'accepted' | 'rejected' | 'completed'
          applied_at: string
          accepted_at: string | null
          completed_at: string | null
          rating: number | null
          review: string | null
        }
        Insert: {
          id?: string
          job_id: string
          individual_id: string
          corporate_id: string
          status?: 'pending' | 'accepted' | 'rejected' | 'completed'
          applied_at?: string
          accepted_at?: string | null
          completed_at?: string | null
          rating?: number | null
          review?: string | null
        }
        Update: {
          id?: string
          job_id?: string
          individual_id?: string
          corporate_id?: string
          status?: 'pending' | 'accepted' | 'rejected' | 'completed'
          applied_at?: string
          accepted_at?: string | null
          completed_at?: string | null
          rating?: number | null
          review?: string | null
        }
      }
      donations: {
        Row: {
          id: string
          donor_id: string
          recipient_id: string | null
          amount: number
          donation_type: 'partial' | 'full'
          qr_code_url: string | null
          status: 'pending' | 'confirmed' | 'expired'
          expires_at: string
          confirmed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          donor_id: string
          recipient_id?: string | null
          amount: number
          donation_type: 'partial' | 'full'
          qr_code_url?: string | null
          status?: 'pending' | 'confirmed' | 'expired'
          expires_at: string
          confirmed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          donor_id?: string
          recipient_id?: string | null
          amount?: number
          donation_type?: 'partial' | 'full'
          qr_code_url?: string | null
          status?: 'pending' | 'confirmed' | 'expired'
          expires_at?: string
          confirmed_at?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'info' | 'success' | 'warning' | 'error'
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: 'info' | 'success' | 'warning' | 'error'
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: 'info' | 'success' | 'warning' | 'error'
          is_read?: boolean
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'credit' | 'debit'
          category: 'job_payment' | 'donation' | 'withdrawal' | 'admin_adjustment'
          description: string
          reference_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'credit' | 'debit'
          category: 'job_payment' | 'donation' | 'withdrawal' | 'admin_adjustment'
          description: string
          reference_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: 'credit' | 'debit'
          category?: 'job_payment' | 'donation' | 'withdrawal' | 'admin_adjustment'
          description?: string
          reference_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
