import React from 'react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  city: string;
  country: string;
  eventType: string;
  registrationOpen: boolean;
}

interface EventCarouselProps {
  events: Event[];
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="event-carousel">
        <div className="empty-events">
          <p>No upcoming events at the moment.</p>
          <Link to="/events" className="btn btn-outline">
            Browse All Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="event-carousel">
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <span className="event-type">{event.eventType}</span>
              {event.registrationOpen && (
                <span className="event-status open">Registration Open</span>
              )}
            </div>
            
            <h3 className="event-title">{event.name}</h3>
            
            <div className="event-details">
              <div className="event-date">
                <span className="date-icon">📅</span>
                {new Date(event.startDate).toLocaleDateString()}
                {event.endDate !== event.startDate && (
                  <> - {new Date(event.endDate).toLocaleDateString()}</>
                )}
              </div>
              
              <div className="event-location">
                <span className="location-icon">📍</span>
                {event.city}, {event.country}
              </div>
            </div>

            <div className="event-actions">
              <Link to={`/events/${event.id}`} className="btn btn-outline btn-small">
                View Details
              </Link>
              {event.registrationOpen && (
                <Link to={`/events/${event.id}/register`} className="btn btn-primary btn-small">
                  Register Now
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;