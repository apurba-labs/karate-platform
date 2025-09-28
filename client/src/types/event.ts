import { User } from './user';
import { Division } from './division';
import { Registration } from './registration';
export interface TournamentEvent {
  id: number;
  name: string;
  slug: string;
  description?: string;
  eventType: 'KATA' | 'KUMITE' | 'KATA_KUMITE' | 'SEMINAR' | 'CHAMPIONSHIP';
  country: string;
  city?: string;
  venueName?: string;
  startDate: string;
  endDate: string;
  status: 'DRAFT' | 'PUBLISHED' | 'REGISTRATION_OPEN' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  isPublic: boolean;
  registrationOpen: boolean;
  maxParticipants?: number;
  registrationFee?: number;
  currency: string;
  stripePriceId?: string;
  organizerId: number;
  organizer: User;
  divisions: Division[];
  registrations: Registration[];
  createdAt: string;
  updatedAt: string;
}