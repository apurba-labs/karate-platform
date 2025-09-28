import { useState, useCallback } from 'react';
import { Notification, EmailTemplate } from '@/types/advanced.types';
import { useAuth } from '@/contexts/AuthContext';
//import { dummyNotifications } from '../data/dummyNotifications';


export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const { token } = useAuth();

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((n: Notification) => !n.isRead).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, [token]);

  const markAsRead = useCallback(async (notificationId: number) => {
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, [token]);

  const sendNotification = useCallback(async (userId: number, data: Partial<Notification>) => {
    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, ...data })
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }, [token]);

  const fetchEmailTemplates = useCallback(async () => {
    try {
      const response = await fetch('/api/email-templates', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error('Error fetching email templates:', error);
    }
  }, [token]);

  const sendEmail = useCallback(async (templateId: number, recipients: number[], variables?: Record<string, string>) => {
    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ templateId, recipients, variables })
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }, [token]);

  return {
    notifications,
    unreadCount,
    templates,
    fetchNotifications,
    markAsRead,
    sendNotification,
    fetchEmailTemplates,
    sendEmail
  };
};