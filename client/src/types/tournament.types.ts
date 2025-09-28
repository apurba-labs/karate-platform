

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
  organizer: User?null;
  divisions: Division[];
  registrations: Registration[];
  createdAt: string;
  updatedAt: string;
}

export interface Division {
  id: number;
  eventId: number;
  name: string;
  discipline: 'KATA' | 'KUMITE' | 'KATA_TEAM' | 'KUMITE_TEAM';
  gender: 'MALE' | 'FEMALE' | 'MIXED';
  minAge?: number;
  maxAge?: number;
  minWeightKg?: number;
  maxWeightKg?: number;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'OPEN' | 'CLOSED' | 'ONGOING' | 'COMPLETED';
  rulesetTemplateId?: number;
  event: TournamentEvent;
  registrations: Registration[];
  matches: Match[];
  bracket?: Bracket;
  ruleset?: RulesetTemplate;
}

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
  team?: Team;
  partner?: User;
  order?: Order;
}

export interface Bracket {
  id: number;
  divisionId: number;
  type: 'SINGLE_ELIMINATION' | 'DOUBLE_ELIMINATION' | 'ROUND_ROBIN' | 'POOL';
  data: JsonBracketData;
  createdAt: string;
  updatedAt: string;
}

export interface JsonBracketData {
  rounds: BracketRound[];
  matches: BracketMatch[];
  participants: BracketParticipant[];
}

export interface BracketRound {
  id: string;
  name: string;
  matches: string[];
}

export interface BracketMatch {
  id: string;
  roundId: string;
  matchNumber: number;
  participantIds: string[];
  scores: number[];
  winnerId?: string;
  status: 'PENDING' | 'LIVE' | 'COMPLETED';
}