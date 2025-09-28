export interface Match {
  id: number;
  divisionId: number;
  matId?: number;
  round: string;
  matchNumber: number;
  athleteBlueId: number;
  athleteWhiteId: number;
  winnerSide?: 'BLUE' | 'WHITE' | 'DRAW' | 'HANSOKU';
  status: 'PENDING' | 'LIVE' | 'COMPLETED' | 'CANCELLED';
  scheduledTime?: string;
  startedAt?: string;
  endedAt?: string;
  blueScore: number;
  whiteScore: number;
  matchTimeRemaining?: number;
  division: Division;
  mat?: Mat;
  athleteBlue: User;
  athleteWhite: User;
  scores: MatchScore[];
}

export interface MatchScore {
  id: number;
  matchId: number;
  athleteId: number;
  actionType: 'SCORE' | 'PENALTY' | 'DECISION';
  actionKey: string;
  pointsAwarded: number;
  awardedBy: number;
  createdAt: string;
  match: Match;
  athlete: User;
  referee: User;
}

export interface Mat {
  id: number;
  eventId: number;
  name: string;
  currentMatchId?: number;
  status: 'ACTIVE' | 'INACTIVE';
  event: TournamentEvent;
  currentMatch?: Match;
  matches: Match[];
}

export interface LiveScoreUpdate {
  matchId: number;
  athleteId: number;
  actionType: string;
  actionKey: string;
  pointsAwarded: number;
  blueScore: number;
  whiteScore: number;
  matchTimeRemaining?: number;
}