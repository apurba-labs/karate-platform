import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useDojos } from '../../hooks/useDojos';
import { useTournaments } from '../../hooks/useTournaments';

const PersonalDashboard: React.FC = () => {
  const { user } = useAuth();
  const { dojos, fetchDojos } = useDojos();
  const { events, fetchEvents } = useTournaments();
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    fetchDojos();
    fetchEvents({ status: 'UPCOMING' });
  }, [fetchDojos, fetchEvents]);

  const upcomingEvents = events.filter(event => 
    new Date(event.startDate) > new Date()
  ).slice(0, 5);

  const recentAchievements = [
    { type: 'promotion', title: 'Yellow Belt', date: '2024-01-15' },
    { type: 'competition', title: '2nd Place Regional', date: '2024-01-10' },
    { type: 'attendance', title: 'Perfect Month', date: '2024-01-01' }
  ];

  return (
    <div className="personal-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.firstName}!</h1>
        <p>Here's your personalized overview</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={activeView === 'overview' ? 'active' : ''}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button 
          className={activeView === 'progress' ? 'active' : ''}
          onClick={() => setActiveView('progress')}
        >
          Progress
        </button>
        <button 
          className={activeView === 'schedule' ? 'active' : ''}
          onClick={() => setActiveView('schedule')}
        >
          Schedule
        </button>
        <button 
          className={activeView === 'achievements' ? 'active' : ''}
          onClick={() => setActiveView('achievements')}
        >
          Achievements
        </button>
      </div>

      <div className="dashboard-content">
        {activeView === 'overview' && (
          <div className="overview-grid">
            <div className="stats-card">
              <h3>Training Stats</h3>
              <div className="stat">
                <span className="value">12</span>
                <span className="label">Sessions this month</span>
              </div>
              <div className="stat">
                <span className="value">95%</span>
                <span className="label">Attendance rate</span>
              </div>
              <div className="stat">
                <span className="value">8</span>
                <span className="label">Skills mastered</span>
              </div>
            </div>

            <div className="upcoming-card">
              <h3>Upcoming Events</h3>
              {upcomingEvents.length === 0 ? (
                <p>No upcoming events</p>
              ) : (
                upcomingEvents.map(event => (
                  <div key={event.id} className="event-item">
                    <h4>{event.name}</h4>
                    <p>{new Date(event.startDate).toLocaleDateString()}</p>
                    <span className="event-type">{event.eventType}</span>
                  </div>
                ))
              )}
            </div>

            <div className="dojo-card">
              <h3>Your Dojos</h3>
              {dojos.length === 0 ? (
                <p>Not a member of any dojo</p>
              ) : (
                dojos.map(dojo => (
                  <div key={dojo.id} className="dojo-item">
                    <h4>{dojo.name}</h4>
                    <p>{dojo.city}, {dojo.country}</p>
                    <span className="role">{dojo.members.find(m => m.userId === user?.id)?.role}</span>
                  </div>
                ))
              )}
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <button className="action-btn">Book Class</button>
              <button className="action-btn">View Schedule</button>
              <button className="action-btn">Update Profile</button>
              <button className="action-btn">Register for Event</button>
            </div>
          </div>
        )}

        {activeView === 'progress' && (
          <div className="progress-view">
            <h3>Your Progress</h3>
            {/* Progress charts and graphs would go here */}
          </div>
        )}

        {activeView === 'schedule' && (
          <div className="schedule-view">
            <h3>Weekly Schedule</h3>
            {/* Calendar view would go here */}
          </div>
        )}

        {activeView === 'achievements' && (
          <div className="achievements-view">
            <h3>Your Achievements</h3>
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-icon">
                  {achievement.type === 'promotion' && '🥋'}
                  {achievement.type === 'competition' && '🏆'}
                  {achievement.type === 'attendance' && '✅'}
                </div>
                <div className="achievement-details">
                  <h4>{achievement.title}</h4>
                  <p>{new Date(achievement.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDashboard;