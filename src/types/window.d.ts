/**
 * Window type extensions for development debugging
 * These are only available in development mode
 */

import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../utils/supabase/types';

declare global {
  interface Window {
    // Supabase client (DEV only)
    supabase: SupabaseClient<Database>;
    
    // Auth helpers (DEV only)
    getAuthStorageKey: () => string;
    validateStorageData: () => {
      valid: boolean;
      reason: string;
      key: string;
      data?: {
        hasAccessToken: boolean;
        hasRefreshToken: boolean;
        hasUser: boolean;
        expiresAt: number;
      };
      error?: string;
    };
    getCurrentUser: () => Promise<any>;
    getUserProfile: (userId: string) => Promise<any>;
    
    // Debug tools (DEV only)
    debugAuth: () => Promise<void>;
    debugSession: () => Promise<void>;
    debugLocalStorage: () => void;
    clearAuthData: () => Promise<void>;
  }
}

export {};
