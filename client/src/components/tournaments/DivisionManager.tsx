import React, { useState, useEffect } from 'react';
import { RulesetTemplate } from '@/types';

import '@/styles/components/DivisionManager.css';

interface DivisionManagerProps {
  eventId: number;
}

const mockRulesetTemplates: RulesetTemplate[] = [
  {
    id: 1,
    name: "Standard Kumite",
    description: "Standard WKF kumite rules",
    isActive: true,
    createdBy: 1,
    values: [],
    divisions: [],
    creator: {
      id: 1,
      isActive: true,
      email:"a@gmail.com",
      firstName: "System",
      lastName: "Admin",
      role: "ADMIN",
      createdAt: "2023-01-01",
    },
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01"
  },
  {
    id: 2,
    name: "Traditional Kata",
    description: "Traditional kata scoring rules",
    isActive: true,
    createdBy: 1,
    values: [],
    divisions: [],
    creator: {
      id: 1,
      isActive: true,
      email:"a@gmail.com",
      firstName: "System",
      lastName: "Admin",
      role: "ADMIN",
      createdAt: "2023-01-01",
    },
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01"
  }
];


// Enums
enum Discipline {
  KATA = "KATA",
  KUMITE = "KUMITE",
  KATA_TEAM = "KATA_TEAM",
  KUMITE_TEAM = "KUMITE_TEAM",
}

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  MIXED = "MIXED",
}

enum DivisionStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}

type Bracket = any;

// Mock Division type
interface Division {
  id: number;
  eventId: number;
  name: string;
  discipline: Discipline;
  gender: Gender;
  minAge?: number;
  maxAge?: number;
  minWeightKg?: number;
  maxWeightKg?: number;
  maxParticipants?: number;
  currentParticipants: number;
  status: DivisionStatus;
  rulesetTemplateId?: number;
  event: any;
  registrations: any[];
  matches: any[];
  bracket?: Bracket;
  ruleset?: any;
  teams: any[];
  ruleOverrides: any[];
}

// Mock data
const mockDivisions: Division[] = [
  {
    id: 1,
    eventId: 1,
    name: "Men's Kumite -67kg",
    discipline: Discipline.KUMITE,
    gender: Gender.MALE,
    minAge: 18,
    maxAge: 35,
    minWeightKg: 0,
    maxWeightKg: 67,
    maxParticipants: 16,
    currentParticipants: 12,
    status: DivisionStatus.OPEN,
    rulesetTemplateId: 1,
    event: {} as any,
    registrations: [],
    matches: [],
    bracket: undefined, // satisfy optional Bracket type
    ruleset: undefined,
    teams: [],
    ruleOverrides: [],
  },
  {
    id: 2,
    eventId: 1,
    name: "Women's Kumite -55kg",
    discipline: Discipline.KUMITE,
    gender: Gender.FEMALE,
    minAge: 18,
    maxAge: 35,
    minWeightKg: 0,
    maxWeightKg: 55,
    maxParticipants: 16,
    currentParticipants: 8,
    status: DivisionStatus.OPEN,
    rulesetTemplateId: 1,
    event: {} as any,
    registrations: [],
    matches: [],
    bracket: undefined,
    ruleset: undefined,
    teams: [],
    ruleOverrides: [],
  },
];


const DivisionManager: React.FC<DivisionManagerProps> = ({ eventId }) => {
 
  if (isLoading && divisions.length === 0) {
    return (
      <div className="division-manager-loading">
        <div className="spinner"></div>
        <p>Loading divisions...</p>
      </div>
    );
  }

  return (
    <div className="division-manager">
      <div className="division-header">
        <h2>Manage Divisions</h2>
        
      </div>
    </div>
  );
};

export default DivisionManager;