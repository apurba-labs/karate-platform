import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useApi } from '@/hooks/useApi';

interface Dojo {
  id: number;
  name: string;
  city: string;
  country: string;
  description?: string;
  logoUrl?: string;
  isApproved: boolean;
}

interface DojoContextType {
  currentDojo: Dojo | null;
  setCurrentDojo: (dojo: Dojo) => void;
  isLoading: boolean;
  error: string | null;
  refetchDojo: () => Promise<void>;
}

const DojoContext = createContext<DojoContextType | undefined>(undefined);

export const DojoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const api = useApi<any>();
  const [currentDojo, setCurrentDojo] = useState<Dojo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch coach's dojo on mount
  useEffect(() => {
    fetchCoachDojo();
  }, [user]);

  const fetchCoachDojo = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // API call to get dojo by current user (coach)
      const result = await api.callApi('/dojos/my-dojo');
      
      if (result.ok && result.data) {
        setCurrentDojo(result.data);
        
        // Store in sessionStorage for persistence
        sessionStorage.setItem('currentDojo', JSON.stringify(result.data));
      } else {
        setCurrentDojo(null);
        sessionStorage.removeItem('currentDojo');
      }
    } catch (error) {
      console.error('Error fetching dojo:', error);
      setError('Failed to load dojo information');
      setCurrentDojo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchDojo = async () => {
    await fetchCoachDojo();
  };

  // Check sessionStorage on initial load
  useEffect(() => {
    const storedDojo = sessionStorage.getItem('currentDojo');
    if (storedDojo) {
      setCurrentDojo(JSON.parse(storedDojo));
      setIsLoading(false);
    }
  }, []);

  const value = {
    currentDojo,
    setCurrentDojo,
    isLoading,
    error,
    refetchDojo
  };

  return (
    <DojoContext.Provider value={value}>
      {children}
    </DojoContext.Provider>
  );
};

export const useDojo = () => {
  const context = useContext(DojoContext);
  if (context === undefined) {
    throw new Error('useDojo must be used within a DojoProvider');
  }
  return context;
};