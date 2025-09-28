import { useState, useCallback } from 'react';
import { TournamentEvent, Division, Registration, Bracket } from '@/types';
import { useAuth } from '../contexts/AuthContext';

export const useTournaments = () => {
  const [events, setEvents] = useState<TournamentEvent[]>([]);
  const [currentEvent, setCurrentEvent] = useState<TournamentEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const fetchEvents = useCallback(async (filters?: { status?: string; type?: string }) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.type) params.append('type', filters.type);

      const response = await fetch(`/api/events?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchEventDetails = useCallback(async (eventId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setCurrentEvent(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createEvent = useCallback(async (eventData: Partial<TournamentEvent>) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      });
      const newEvent = await response.json();
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }, [token]);

  const registerForEvent = useCallback(async (eventId: number, divisionId: number, data?: any) => {
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ eventId, divisionId, ...data })
      });
      return await response.json();
    } catch (error) {
      console.error('Error registering for event:', error);
      throw error;
    }
  }, [token]);

  const generateBracket = useCallback(async (divisionId: number, type: string) => {
    try {
      const response = await fetch('/api/brackets/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ divisionId, type })
      });
      return await response.json();
    } catch (error) {
      console.error('Error generating bracket:', error);
      throw error;
    }
  }, [token]);

  return {
    events,
    currentEvent,
    loading,
    fetchEvents,
    fetchEventDetails,
    createEvent,
    registerForEvent,
    generateBracket
  };
};