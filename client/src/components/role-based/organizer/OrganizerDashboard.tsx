// src/components/role-based/organizer/OrganizerDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import EventForm from '@/components/tournaments/EventForm';
import DivisionManager from '@/components/tournaments/DivisionManager';
import BracketGenerator from '@/components/tournaments/BracketGenerator';
import TournamentCard from '@/components/tournaments/TournamentCard';
import {User, Division} from '@/types';
import '@/styles/components/EventOrganizerView.css';
// Optional fallback mock events
const mockOrganizer: User = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  role: "organizer",
  isActive:true,
  // add other fields as needed
};

const mockDivisions: Division[] = [
  {
    id: 1,
    eventId: 1,
    name: "Men's Kumite -67kg",
    discipline: "KUMITE",
    gender: "MALE",
    minAge: 18,
    maxAge: 35,
    minWeightKg: 0,
    maxWeightKg: 67,
    maxParticipants: 12,
    currentParticipants: 0,
    status: "OPEN",
    rulesetTemplateId: 1,
    event: {} as any,
    registrations: [],
    matches: [],
    bracket: undefined,
    ruleset: undefined,
    teams: [],
    ruleOverrides: []
  },
  {
    id: 2,
    eventId: 1,
    name: "Women's Kumite -55kg",
    discipline: "KUMITE",
    gender: "FEMALE",
    minAge: 18,
    maxAge: 35,
    minWeightKg: 0,
    maxWeightKg: 55,
    maxParticipants: 8,
    currentParticipants: 0,
    status: "OPEN",
    rulesetTemplateId: 1,
    event: {} as any,
    registrations: [],
    matches: [],
    bracket: undefined,
    ruleset: undefined,
    teams: [],
    ruleOverrides: []
  }
];

const mockRegistrations = (count: number): Registration[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    userId: i + 1,
    divisionId: i % mockDivisions.length + 1,
    status: "REGISTERED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

export const mockEvents: TournamentEvent[] = [
  {
    id: 1,
    name: "Regional Karate Championship",
    slug: "regional-karate-championship",
    description: "Annual regional tournament",
    eventType: "KUMITE",
    country: "Japan",
    city: "Tokyo",
    venueName: "Tokyo Arena",
    startDate: "2023-11-15",
    endDate: "2023-11-17",
    status: "REGISTRATION_OPEN",
    isPublic: true,
    registrationOpen: true,
    maxParticipants: 150,
    registrationFee: 50,
    currency: "USD",
    stripePriceId: undefined,
    organizerId: mockOrganizer.id,
    organizer: mockOrganizer,
    divisions: mockDivisions,
    registrations: mockRegistrations(8), // generate 8 registrations
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "International Kumite Tournament",
    slug: "international-kumite-tournament",
    description: "International level kumite tournament",
    eventType: "KUMITE",
    country: "Japan",
    city: "Osaka",
    venueName: "Osaka Arena",
    startDate: "2023-12-01",
    endDate: "2023-12-03",
    status: "UPCOMING",
    isPublic: true,
    registrationOpen: false,
    maxParticipants: 100,
    registrationFee: 75,
    currency: "USD",
    stripePriceId: undefined,
    organizerId: mockOrganizer.id,
    organizer: mockOrganizer,
    divisions: mockDivisions,
    registrations: mockRegistrations(5), // 5 registrations
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

interface OrganizerDashboardProps {
  events?: any[]; // Passed from main dashboard
}

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ events: initialEvents = [] }) => {
  const { user, isOrganizer } = useAuth();

  const [events, setEvents] = useState(initialEvents.length ? initialEvents : mockEvents);
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [view, setView] = useState('events');
  const [isLoading, setIsLoading] = useState(false);

  // Sync events if initialEvents change
  useEffect(() => {
    if (initialEvents.length) {
      setEvents(initialEvents);
    }
  }, [initialEvents]);

  const handleCreateEvent = (eventData: any) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newEvent = {
        ...eventData,
        id: events.length ? Math.max(...events.map(e => e.id)) + 1 : 1,
        status: 'upcoming',
        participants: 0,
        divisions: 0,
        location: `${eventData.city || ''}, ${eventData.country || ''}`
      };
      setEvents([...events, newEvent]);
      setView('events');
      setIsLoading(false);
    }, 800);
  };
  
  if (!isOrganizer) {
    return (
      <div className="access-denied">
        <h2>Event Organizer Access Required</h2>
        <p>You need organizer privileges to access this area.</p>
      </div>
    );
  }

  return (
    <div className="organizer-dashboard">
      <div className="dashboard-header">
        <h1>Event Organizer Dashboard</h1>
        <p>Manage tournaments and competitions</p>
      </div>
      <div className="organizer-tabs">
        <button 
          className={view === 'events' ? 'active' : ''}
          onClick={() => setView('events')}
        >
          🏟️ My Events
        </button>
        <button 
          className={view === 'create' ? 'active' : ''}
          onClick={() => setView('create')}
        >
          ➕ Create Event
        </button>
        <button 
          className={view === 'divisions' ? 'active' : ''}
          onClick={() => setView('divisions')}
        >
          ⚖️ Manage Divisions
        </button>
        <button 
          className={view === 'brackets' ? 'active' : ''}
          onClick={() => setView('brackets')}
        >
          🏆 Generate Brackets
        </button>
      </div>
      <div className="organizer-content">
        {view === 'events' && (
          <div className="events-list">
            <h2>Your Organized Events</h2>
            <div className="events-grid">
              {events.map(event => (
                <TournamentCard 
                  key={event.id}
                  event={event}
                  isSelected={activeEvent?.id === event.id}
                  onSelect={() => setActiveEvent(event)}
                />
              ))}
            </div>
          </div>
        )}

        {!isLoading && view === 'create' && (
          <EventForm 
            onSubmit={handleCreateEvent}
            onCancel={() => setView('events')}
          />
        )}

        {view === 'divisions' && activeEvent && (
          <DivisionManager eventId={activeEvent.id} />
        )}

        {view === 'brackets' && activeEvent && (
          <BracketGenerator eventId={activeEvent.id} />
        )}
      </div>
    </div>
  );
  
};

export default OrganizerDashboard;
