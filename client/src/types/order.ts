import { User } from './user';
import { TournamentEvent } from './event';
import { RegistrationStub } from './stubs'; // Import from stubs

export interface Order {
  id: number;
  userId: number;
  eventId: number;
  totalAmount: number;
  currency: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  stripePaymentIntentId?: string;
  user: User;
  event: TournamentEvent;
  registrations: RegistrationStub[];
}