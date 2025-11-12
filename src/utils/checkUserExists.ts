import { projectId, publicAnonKey } from './supabase/info';

/**
 * Check if a user with the given email exists in the database
 * Uses the backend check-user endpoint for security
 * 
 * @param email - User email to check
 * @returns Promise<boolean> - True if user exists, false otherwise
 */
export async function checkUserExists(email: string): Promise<boolean> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('Invalid email format:', email);
      return false;
    }

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-018e1998/check-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email: email.toLowerCase() }),
      }
    );

    if (!response.ok) {
      console.error('Failed to check user existence:', response.statusText);
      return false;
    }

    const data = await response.json();
    return data.exists || false;
  } catch (error) {
    console.error('Error checking user existence:', error);
    return false;
  }
}
