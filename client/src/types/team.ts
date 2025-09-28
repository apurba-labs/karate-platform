import { User } from './user';
import { TournamentEvent } from './event';
import { Division } from './division';
import { TeamMemberStub, TeamStub } from './stubs';

export interface Team {
  id: number;
  name: string;
  captainId: number;
  eventId: number;
  divisionId: number;
  members: TeamMemberStub[];
  captain: User;
  event: TournamentEvent;
  division: Division;
}

export interface TeamMember {
  id: number;
  teamId: number;
  userId: number;
  position: string;
  team: TeamStub;
  user: User;
}