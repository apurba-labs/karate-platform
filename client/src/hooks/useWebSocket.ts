import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      connect();
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [token]);

  const connect = useCallback(() => {
    const ws = new WebSocket(`ws://localhost:5000?token=${token}`);
    
    ws.onopen = () => {
      setConnected(true);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setLastMessage(message);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      setConnected(false);
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnected(false);
    };
  }, [token]);

  const sendMessage = useCallback((message: any) => {
    if (socket && connected) {
      socket.send(JSON.stringify(message));
    }
  }, [socket, connected]);

  const subscribeToMatch = useCallback((matchId: number) => {
    sendMessage({
      type: 'SUBSCRIBE',
      data: { channel: `match-${matchId}` }
    });
  }, [sendMessage]);

  const unsubscribeFromMatch = useCallback((matchId: number) => {
    sendMessage({
      type: 'UNSUBSCRIBE',
      data: { channel: `match-${matchId}` }
    });
  }, [sendMessage]);

  return {
    connected,
    lastMessage,
    sendMessage,
    subscribeToMatch,
    unsubscribeFromMatch
  };
};