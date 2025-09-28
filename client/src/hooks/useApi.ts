import { useState, useCallback } from 'react';

interface ApiCallOptions extends RequestInit {
  skipAuth?: boolean;
}

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  ok:boolean;
}

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL;
  if (envUrl) {
    if (envUrl.endsWith('/api')) {
      return envUrl;
    }
    return `${envUrl}/api`;
  }
  return '';
};

export const useApi = <T>() => {
  const [apiState, setApiState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
    ok:false,
  });

  const callApi = useCallback(async (endpoint: string, options: ApiCallOptions = {}) => {
    setApiState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const baseUrl = getBaseUrl();
      const url = `${baseUrl}${endpoint}`;
      
      console.log('API call to:', url, 'with options:', options); // Debug log
      
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const defaultOptions: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...(!options.skipAuth && token && { 'Authorization': `Bearer ${token}` }),
          ...options.headers,
        },
      };

      const response = await fetch(url, { ...defaultOptions, ...options });
      
      console.log('API response status:', response.status); // Debug log
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText); // Debug log
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || `HTTP error! status: ${response.status}` };
        }
        
        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
        (error as any).status = response.status;
        (error as any).responseData = errorData;
        
        throw error;
      }
      
      const data = await response.json();
      console.log('API success response:', data); // Debug log
      
      setApiState({ ok: response.ok, data, loading: false, error: null });
      return { data, ok: response.ok, status: response.status };
    } catch (error: any) {
      console.error('API call failed:', error); // Debug log
      const errorMessage = error.message || 'An unexpected error occurred';
      setApiState({ ok: false, data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setApiState({ok:false, data: null, loading: false, error: null });
  }, []);

  return {
    data: apiState.data,
    loading: apiState.loading,
    error: apiState.error,
    ok: apiState.ok,
    callApi,
    reset,
  };
};