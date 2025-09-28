export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
  dob?: string
  avatarUrl?: string
  country?: string
  bio?: string
  isActive: boolean
  createdAt?: string
  dojos?: DojoMembership[]
}

export interface Dojo {
  id: number
  name: string
  description?: string
  country: string
  city?: string
  website?: string
  logoUrl?: string
  isApproved: boolean
  headCoach: User
  members: DojoMembership[]
  createdAt: string
  updatedAt: string
}

export interface DojoMembership {
  id: number
  userId: number
  dojoId: number
  role: 'STUDENT' | 'COACH' | 'OWNER'
  since?: string
  isPrimary: boolean
  internalBeltRank?: string
  dateOfJoining?: string
  emergencyContact?: string
  notes?: string
  isActiveInternal: boolean
  user: User
  dojo: Dojo
}


export type Role = 'ATHLETE' | 'COACH' | 'ORGANIZER' | 'REFEREE' | 'ADMIN';