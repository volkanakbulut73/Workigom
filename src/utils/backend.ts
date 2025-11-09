/**
 * Backend API Configuration
 * Handles API URL resolution and request helpers
 */

// Get backend URL from environment variable or use default
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// Log backend configuration in development
if (import.meta.env.DEV) {
  console.log('🔌 Backend API URL:', BACKEND_URL);
}

/**
 * Makes an authenticated API request to the backend
 * @param endpoint - API endpoint (e.g., '/api/users')
 * @param options - Fetch options
 * @returns Response data
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Ensure endpoint starts with /
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BACKEND_URL}${path}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request failed: ${url}`, error);
    throw error;
  }
}

/**
 * Makes an authenticated API request with Supabase auth token
 * @param endpoint - API endpoint
 * @param token - Supabase auth token
 * @param options - Fetch options
 * @returns Response data
 */
export async function authenticatedRequest<T = any>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * GET request helper
 */
export async function apiGet<T = any>(endpoint: string, token?: string): Promise<T> {
  if (token) {
    return authenticatedRequest<T>(endpoint, token, { method: 'GET' });
  }
  return apiRequest<T>(endpoint, { method: 'GET' });
}

/**
 * POST request helper
 */
export async function apiPost<T = any>(
  endpoint: string,
  data: any,
  token?: string
): Promise<T> {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(data),
  };

  if (token) {
    return authenticatedRequest<T>(endpoint, token, options);
  }
  return apiRequest<T>(endpoint, options);
}

/**
 * PUT request helper
 */
export async function apiPut<T = any>(
  endpoint: string,
  data: any,
  token?: string
): Promise<T> {
  const options: RequestInit = {
    method: 'PUT',
    body: JSON.stringify(data),
  };

  if (token) {
    return authenticatedRequest<T>(endpoint, token, options);
  }
  return apiRequest<T>(endpoint, options);
}

/**
 * DELETE request helper
 */
export async function apiDelete<T = any>(endpoint: string, token?: string): Promise<T> {
  if (token) {
    return authenticatedRequest<T>(endpoint, token, { method: 'DELETE' });
  }
  return apiRequest<T>(endpoint, { method: 'DELETE' });
}

/**
 * Check if backend is reachable
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}
