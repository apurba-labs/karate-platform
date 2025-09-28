
import { TournamentEvent } from './event';

//import { Match } from './match';
import { Bracket } from './bracket';
import { RegistrationStub, RulesetTemplateStub } from './stubs';

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
  registrations: RegistrationStub[];
  matches?: undefined;
  bracket?: Bracket;
  ruleset?: RulesetTemplateStub;
}