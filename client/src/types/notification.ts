// src/types/notification.ts
export interface Notification {
  id: number;
  userId: number;
  type: 'SYSTEM' | 'TOURNAMENT' | 'MESSAGE' | 'ANNOUNCEMENT' | 'REMINDER';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  relatedId?: number; // ID of related entity (tournament, message, etc.)
  actionUrl?: string; // URL for notification action
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  content: string;
  variables: string[];
  category: 'SYSTEM' | 'TOURNAMENT' | 'MARKETING' | 'REMINDER';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}