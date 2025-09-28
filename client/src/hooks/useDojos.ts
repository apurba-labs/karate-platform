import { useState, useEffect } from 'react';
import { Dojo, DojoMembership } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useDojos = () => {
  const [dojos, setDojos] = useState<Dojo[]>([]);
  const [currentDojo, setCurrentDojo] = useState<Dojo | null>(null);
  const [members, setMembers] = useState<DojoMembership[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const fetchDojos = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/dojos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setDojos(data);
    } catch (error) {
      console.error('Error fetching dojos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDojoDetails = async (dojoId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/dojos/${dojoId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setCurrentDojo(data);
    } catch (error) {
      console.error('Error fetching dojo details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDojoMembers = async (dojoId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dojos/${dojoId}/members`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching dojo members:', error);
    }
  };

  const createDojo = async (dojoData: Omit<Dojo, 'id' | 'createdAt' | 'updatedAt' | 'headCoach' | 'members'>) => {
    try {
      const response = await fetch('http://localhost:5000/api/dojos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dojoData)
      });
      const newDojo = await response.json();
      setDojos(prev => [...prev, newDojo]);
      return newDojo;
    } catch (error) {
      console.error('Error creating dojo:', error);
      throw error;
    }
  };

  const joinDojo = async (dojoId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dojos/${dojoId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const membership = await response.json();
      return membership;
    } catch (error) {
      console.error('Error joining dojo:', error);
      throw error;
    }
  };

  return {
    dojos,
    currentDojo,
    members,
    loading,
    fetchDojos,
    fetchDojoDetails,
    fetchDojoMembers,
    createDojo,
    joinDojo
  };
};