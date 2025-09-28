// stubs.ts - Contains all stub interfaces
export interface RegistrationStub {
  id: number;
  status: 'PENDING' | 'CONFIRMED' | 'WAITLISTED' | 'CANCELLED' | 'DISQUALIFIED';
  divisionId: number;
  userId?: number;
}

export interface RulesetTemplateStub {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdBy: number;
}

export interface OrderStub {
  id: number;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  totalAmount: number;
  currency: string;
}

export interface UserStub {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

export interface EventStub {
  id: number;
  name: string;
  slug: string;
  startDate: string;
}

export interface DivisionStub {
  id: number;
  name: string;
  discipline: 'KATA' | 'KUMITE' | 'KATA_TEAM' | 'KUMITE_TEAM';
  gender: 'MALE' | 'FEMALE' | 'MIXED';
}

export interface TeamStub {
  id: number;
  name: string;
  captainId: number;
}

export interface TeamMemberStub {
  id: number;
  teamId: number;
  userId: number;
  position: string;
}