export interface Notification {
  id: number;
  userId: number;
  type: 'EVENT' | 'MATCH' | 'ATTENDANCE' | 'PROMOTION' | 'SYSTEM' | 'PAYMENT';
  title: string;
  message: string;
  isRead: boolean;
  relatedId?: number;
  actionUrl?: string;
  createdAt: string;
  user: User;
}

export interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  isActive: boolean;
  createdAt: string;
}

export interface MediaFile {
  id: number;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploaderId: number;
  dojoId?: number;
  eventId?: number;
  userId?: number;
  category: 'PROFILE' | 'DOJO' | 'EVENT' | 'TECHNIQUE' | 'DOCUMENT';
  metadata?: Record<string, any>;
  uploader: User;
  dojo?: Dojo;
  event?: TournamentEvent;
  createdAt: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  start: string;
  end: string;
  type: 'CLASS' | 'EVENT' | 'TEST' | 'COMPETITION' | 'HOLIDAY';
  dojoId?: number;
  eventId?: number;
  recurrence?: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  until?: string;
  createdBy: number;
  dojo?: Dojo;
  event?: TournamentEvent;
  creator: User;
  createdAt: string;
}

export interface SystemHealth {
  database: {
    status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
    responseTime: number;
    connections: number;
  };
  server: {
    cpu: number;
    memory: number;
    uptime: number;
  };
  services: {
    email: boolean;
    storage: boolean;
    websocket: boolean;
  };
  lastChecked: string;
}

export interface Analytics {
  users: {
    total: number;
    active: number;
    newToday: number;
    byRole: Record<string, number>;
  };
  dojos: {
    total: number;
    active: number;
    byCountry: Record<string, number>;
  };
  events: {
    total: number;
    upcoming: number;
    byType: Record<string, number>;
  };
  financials: {
    revenue: number;
    pending: number;
    byEvent: Array<{ event: string; amount: number }>;
  };
  period: {
    start: string;
    end: string;
  };
}