// src/components/tournaments/TournamentCard.tsx
import React from 'react';
import { TournamentEvent } from '@/types';
import '@/styles/components/TournamentCard.css';

interface TournamentCardProps {
  event: TournamentEvent;
  isSelected: boolean;
  onSelect: () => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ event, isSelected, onSelect }) => {
  // Map status to badge color
  const getStatusColor = () => {
    switch (event.status) {
      case 'DRAFT':
      case 'REGISTRATION_OPEN':
        return '#3498db';
      case 'ONGOING':
        return '#2ecc71';
      case 'COMPLETED':
        return '#7f8c8d';
      case 'CANCELLED':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div 
      className={`tournament-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-header">
        <h3>{event.name}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor() }}
        >
          {event.status.replace('_', ' ')}
        </span>
      </div>
      
      <div className="card-details">
        <p className="date">📅 {formatDate(event.startDate)} - {formatDate(event.endDate)}</p>
        <p className="location">📍 {event.venueName}, {event.city}, {event.country}</p>
        <p style={{ margin: '4px 0', color: '#666' }}>👥 {event.registrations.length} participants</p>
        <p style={{ margin: '4px 0', color: '#666' }}>⚖️ {event.divisions.length} divisions</p>
      </div>
      
      <div className="card-actions">
        <button className="action-btn">View Details</button>
      </div>
    </div>
  );
};

export default TournamentCard;
