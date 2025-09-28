import { useCallback } from 'react';
import { useApi } from './useApi';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string;
    email?: string,
    phone?: string,
    dob?: string,
    country?: string,
    bio?: string,
    dojoId?: number;
    inviteCode?: string;
}

export interface AuthResponse {
  user: any;
  token: string;
}

export const useAuthApi = () => {
  const api = useApi<AuthResponse>();

  const register = useCallback(async (userData: RegisterData) => {
    try {
      const response = await api.callApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return response;
    } catch (error: any) {
      console.error('Registration API error:', error);
      throw error;
    }
  }, [api.callApi]);

  const login = useCallback((credentials: LoginCredentials) => 
    api.callApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }), [api.callApi]);

  const logout = useCallback(() => 
    api.callApi('/auth/logout', {
      method: 'POST',
    }), [api.callApi]);

  const getProfile = useCallback(() => 
    api.callApi('/auth/me'), [api.callApi]);

  const refreshToken = useCallback(() => 
    api.callApi('/auth/refresh', {
      method: 'POST',
    }), [api.callApi]);

  const requestPasswordReset = useCallback((email: string) => 
    api.callApi('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }), [api.callApi]);

  const resetPassword = useCallback((token: string, newPassword: string) => 
    api.callApi('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    }), [api.callApi]);

  return {
    data: api.data,
    loading: api.loading,
    error: api.error,
    register,
    login,
    logout,
    getProfile,
    refreshToken,
    requestPasswordReset,
    resetPassword,
    reset: api.reset,
  };
};