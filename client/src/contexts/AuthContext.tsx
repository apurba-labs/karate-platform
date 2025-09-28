import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from '../types';
import { useAuthApi } from '@/hooks/useAuthApi';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    token: string | null;
    login: (username: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
    register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isCoach: boolean;
    isReferee: boolean;
    isOrganizer: boolean;
    hasPermission: (permission: string) => boolean; 
    updateUser: (userData: Partial<User>) => void;
    error: string | null;
}

interface RegisterData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  email?: string;
  phone?: string;
  dob?: string,
  country?: string;
  bio?: string;
  dojoId?: number;
  inviteCode?: string;
  internalBeltRank?: string;
  dateOfJoining?: string;
  emergencyContact?: string;
  notes?: string;
  parentId?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [error, setError] = useState<string | null>(null);
  
  // Use the auth API hook
  const authApi = useAuthApi();

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const userData = await authApi.getProfile();
      setUser(userData.data);
    } catch (error: any) {
      console.error('Failed to fetch user profile:', error);
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string, rememberMe: boolean = false): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await authApi.login({ username, password });
      const data = userData.data;
      if (data.token) {
        if (rememberMe) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
      
      return { success: false, error: 'No token received' };
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      setError(null);

      const apiData = {...userData};

      const responseData = await authApi.register(apiData);
      const data = responseData.data;
      console.log('Registration response:', data);

      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
      
      return { success: false, error: 'No token received' };
    } catch (error: any) {
        console.error('Registration error in AuthContext:', error); // Debug log
        let errorMessage = 'Registration failed';
    
        if (error.message) {
            errorMessage = error.message;
        } else if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }

        setError(errorMessage);
        return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    // Call the logout API
    authApi.logout().catch(error => {
      console.error('Logout API call failed:', error);
    });
    
    // Clear local state regardless of API call success
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setError(null);
  }, [authApi]);

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    const rolePermissions: Record<string, string[]> = {
      ADMIN: [
        'manage_users', 'manage_content', 'view_analytics', 
        'system_settings', 'approve_dojos', 'handle_disputes'
      ],
      COACH: [
        'manage_dojo', 'view_students', 'track_attendance',
        'manage_curriculum', 'promote_students', 'register_events'
      ],
      REFEREE: [
        'score_matches', 'manage_matches', 'verify_results',
        'view_referee_dashboard'
      ],
      ORGANIZER: [
        'create_events', 'manage_events', 'generate_brackets',
        'manage_registrations', 'view_reports'
      ],
      ATHLETE: [
        'view_profile', 'register_events', 'view_progress',
        'manage_license'
      ]
    };

    return rolePermissions[user.role]?.includes(permission) || false;
  };

  // Listen for storage events (e.g., logout from other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' && e.oldValue && !e.newValue) {
        // Token was removed from another tab
        logout();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [logout]);

  const value: AuthContextType = {
    user,
    loading,
    token,
    login,
    register,
    logout,
    hasPermission,
    updateUser,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isCoach: user?.role === 'COACH',
    isReferee: user?.role === 'REFEREE',
    isOrganizer: user?.role === 'ORGANIZER',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};