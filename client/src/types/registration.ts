import { User } from './user';
import { TournamentEvent } from './event';
import { Division } from './division';
import { OrderStub } from './stubs';
import { TeamStub } from './stubs'; // Import TeamStub

export interface Registration {
  id: number;
  userId?: number;
  eventId: number;
  divisionId: number;
  teamId?: number;
  partnerId?: number;
  status: 'PENDING' | 'CONFIRMED' | 'WAITLISTED' | 'CANCELLED' | 'DISQUALIFIED';
  weightKg?: number;
  orderId?: number;
  medicalNotes?: string;
  user?: User;
  event: TournamentEvent;
  division: Division;
  team?: TeamStub;
  partner?: User;
  order?: OrderStub;
}