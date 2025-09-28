import { Request } from 'express';


export interface TokenPayload {
  id: number;
  username: string;
  email?: string | null;
  role: string;
  iss: string;
  aud: string;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export type Role = 'ATHLETE' | 'COACH' | 'ORGANIZER' | 'REFEREE' | 'ADMIN';

export interface User {
  id: number;
  username: string;
  email?: string | null;
  firstName: string;
  lastName: string;
  role: Role;
  phone?: string | null;
  dob?: string | null;
  country?: string | null;
  bio?: string | null;
}

export type RegisterInput = {
  username: string;
  password: string;
  email?: string | null; // optional
  firstName: string;
  lastName: string;
  dob?: string | Date | null;
  phone?: string | null;
  role: string;
  country?: string| null;
  bio?: string | null;
  dojoId?: number | null;
  inviteCode?: string;
  since?: string;
  internalBeltRank?: string;
  dateOfJoining?: string;
  emergencyContact?: string;
  notes?: string;
  parentId?: number;
};


interface Dojo {
    dojoId: number;
    role: string;
    since?: string;
    isPrimary: boolean;
    internalBeltRank?: string;
    dateOfJoining?: string;
    emergencyContact?: string;
    notes?: string;
    parentId?: string;
}

export interface RegisterWithDojo {
    username: string;
    email: string | null;
    password: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    dob: string | null;
    role: string;
    country: string | null;
    bio: string | null;
    dojoId: number;
    dojos?: Dojo[];
    inviteCode?: string;
    since?: string;
    isPrimary: boolean;
    internalBeltRank?: string;
    dateOfJoining?: string;
    emergencyContact?: string;
    notes?: string;
    parentId?: string;
}

export interface LoginInput {
  identifier?: string;
  username?: string;
  email?: string;
  password: string;
}

export interface AuthRegistrationData {
    username: string;
    email: string;
    password: string;
    name: string;
    dob?: string; // Optional, depending on the use case
    role?: string; // Optional
    organizationId:string;
}