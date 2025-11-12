/**
 * Authentication Debug Utility
 * 
 * Helps debug Supabase authentication issues including:
 * - Session storage
 * - Token presence
 * - localStorage keys
 * - Auth state
 */

import { supabase } from './supabase/client';
import { getAuthStorageKey, validateStorageData, isDevelopmentMode } from './supabase/client';

/**
 * Debug localStorage to check what auth data is stored
 */
export const debugLocalStorage = () => {
  if (typeof window === 'undefined') {
    console.log('⚠️ Not in browser environment');
    return;
  }

  console.group('🔍 LocalStorage Debug');
  
  // Expected Supabase key (use exported helper)
  const expectedKey = getAuthStorageKey();
  console.log('Expected key:', expectedKey);
  
  // Validate storage data structure
  const validation = validateStorageData();
  console.log('\n📊 Storage validation:', validation);
  
  // List all localStorage keys
  console.log('\n📋 All localStorage keys:');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      console.log(`  - ${key}`);
      
      // If it's a Supabase auth key, show summary
      if (key.includes('sb-') && key.includes('-auth-token')) {
        try {
          const value = localStorage.getItem(key);
          if (value) {
            const parsed = JSON.parse(value);
            console.log(`    ✅ Found auth data:`, {
              hasAccessToken: !!parsed.access_token,
              hasRefreshToken: !!parsed.refresh_token,
              expiresAt: parsed.expires_at,
              user: parsed.user?.email || 'N/A'
            });
          }
        } catch (e) {
          console.log(`    ❌ Failed to parse`);
        }
      }
    }
  }
  
  console.groupEnd();
};

/**
 * Debug current session state
 */
export const debugSession = async () => {
  console.group('🔍 Session Debug');
  
  try {
    // Get current session
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('❌ Error getting session:', error);
    } else if (session) {
      console.log('✅ Active session found:');
      console.log('  User ID:', session.user.id);
      console.log('  Email:', session.user.email);
      console.log('  Token expires at:', new Date(session.expires_at! * 1000).toLocaleString());
      console.log('  Token expires in:', Math.round((session.expires_at! * 1000 - Date.now()) / 1000 / 60), 'minutes');
    } else {
      console.log('ℹ️ No active session');
    }
    
    // Get current user (verifies token with backend)
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('❌ Error getting user:', userError);
    } else if (user) {
      console.log('✅ User verified with backend:');
      console.log('  User ID:', user.id);
      console.log('  Email:', user.email);
    } else {
      console.log('ℹ️ No user verified');
    }
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  }
  
  console.groupEnd();
};

/**
 * Full auth debug - runs all checks
 */
export const debugAuth = async () => {
  console.log('🚀 Starting full auth debug...\n');
  
  // 1. Check localStorage
  debugLocalStorage();
  
  console.log('\n');
  
  // 2. Check session
  await debugSession();
  
  console.log('\n✅ Auth debug complete');
};

/**
 * Clear all auth data (useful for testing)
 */
export const clearAuthData = async () => {
  console.log('🧹 Clearing all auth data...');
  
  try {
    // Sign out via Supabase (clears session properly)
    await supabase.auth.signOut();
    console.log('  ✅ Supabase signOut complete');
    
    // Clear localStorage manually (in case signOut didn't work or for extra cleanup)
    if (typeof window !== 'undefined') {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.includes('sb-') && key.includes('-auth-token')) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log(`  Removed: ${key}`);
      });
    }
    
    console.log('✅ Auth data cleared');
  } catch (error) {
    console.error('❌ Error clearing auth data:', error);
  }
};

// Expose to window ONLY in development
if (typeof window !== 'undefined' && isDevelopmentMode()) {
  (window as any).debugAuth = debugAuth;
  (window as any).debugSession = debugSession;
  (window as any).debugLocalStorage = debugLocalStorage;
  (window as any).clearAuthData = clearAuthData;
  
  console.log('🔧 Auth debug tools available (DEV only):');
  console.log('  - window.debugAuth() - Full auth debug');
  console.log('  - window.debugSession() - Check session state');
  console.log('  - window.debugLocalStorage() - Check localStorage');
  console.log('  - window.clearAuthData() - Clear all auth data');
} else if (typeof window !== 'undefined' && !isDevelopmentMode()) {
  console.log('ℹ️ Auth debug tools disabled in production');
}