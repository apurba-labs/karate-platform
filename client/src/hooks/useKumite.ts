import { useState, useCallback, useEffect } from 'react';
import { Match, Mat, LiveScoreUpdate } from '@/types/kumite.types';
import { useWebSocket } from './useWebSocket';
import { useAuth } from '@/contexts/AuthContext';

export const useKumite = (eventId?: number) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [mats, setMats] = useState<Mat[]>([]);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();
  const { sendMessage, lastMessage, connected } = useWebSocket();

  useEffect(() => {
    if (eventId) {
      fetchMats(eventId);
      fetchMatches(eventId);
    }
  }, [eventId]);

  useEffect(() => {
    if (lastMessage) {
      handleWebSocketMessage(lastMessage);
    }
  }, [lastMessage]);

  const fetchMatches = useCallback(async (eventId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/events/${eventId}/matches`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchMats = useCallback(async (eventId: number) => {
    try {
      const response = await fetch(`/api/events/${eventId}/mats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setMats(data);
    } catch (error) {
      console.error('Error fetching mats:', error);
    }
  }, [token]);

  const handleWebSocketMessage = useCallback((message: any) => {
    if (message.type === 'SCORE_UPDATE') {
      setMatches(prev => prev.map(match => 
        match.id === message.data.matchId 
          ? { ...match, ...message.data }
          : match
      ));
      
      if (currentMatch?.id === message.data.matchId) {
        setCurrentMatch(prev => prev ? { ...prev, ...message.data } : null);
      }
    }
  }, [currentMatch]);

  const submitScore = useCallback((matchId: number, athleteId: number, actionType: string, actionKey: string) => {
    sendMessage({
      type: 'SCORE_ACTION',
      data: {
        matchId,
        athleteId,
        actionType,
        actionKey,
        refereeId: user?.id
      }
    });
  }, [sendMessage, user]);

  const startMatch = useCallback((matchId: number, matId: number) => {
    sendMessage({
      type: 'START_MATCH',
      data: { matchId, matId }
    });
  }, [sendMessage]);

  const endMatch = useCallback((matchId: number, winnerId?: number) => {
    sendMessage({
      type: 'END_MATCH',
      data: { matchId, winnerId }
    });
  }, [sendMessage]);

  return {
    matches,
    mats,
    currentMatch,
    loading,
    connected,
    submitScore,
    startMatch,
    endMatch,
    setCurrentMatch
  };
};