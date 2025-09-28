import React, { useState, useEffect } from 'react';
import { useKumite } from '@/hooks/useKumite';
import { useAuth } from '@/contexts/AuthContext';

const RefereeDashboard: React.FC = () => {
  const [assignedMatches, setAssignedMatches] = useState<any[]>([]);
  const [activeMatch, setActiveMatch] = useState<any>(null);
  const { user, isReferee } = useAuth();

  useEffect(() => {
    if (isReferee) {
      fetchAssignedMatches();
    }
  }, [isReferee]);

  const fetchAssignedMatches = async () => {
    try {
      const response = await fetch('/api/referee/assigned-matches');
      const data = await response.json();
      setAssignedMatches(data);
    } catch (error) {
      console.error('Error fetching assigned matches:', error);
    }
  };

  if (!isReferee) {
    return (
      <div className="access-denied">
        <h2>Referee Access Required</h2>
        <p>You need referee privileges to access this dashboard.</p>
      </div>
    );
  }

  return (
    <div className="referee-dashboard">
      <div className="dashboard-header">
        <h1>Referee Dashboard</h1>
        <p>Welcome, {user?.firstName} {user?.lastName}</p>
      </div>

      <div className="referee-content">
        <div className="assigned-matches">
          <h2>Your Assigned Matches</h2>
          {assignedMatches.length === 0 ? (
            <p>No matches assigned</p>
          ) : (
            assignedMatches.map(match => (
              <div key={match.id} className="match-card">
                <h3>Match {match.matchNumber} - {match.round}</h3>
                <p>
                  {match.athleteBlue.firstName} vs {match.athleteWhite.firstName}
                </p>
                <p>Mat: {match.mat?.name}</p>
                <p>Scheduled: {new Date(match.scheduledTime).toLocaleString()}</p>
                <button 
                  onClick={() => setActiveMatch(match)}
                  className="start-match-btn"
                >
                  Start Scoring
                </button>
              </div>
            ))
          )}
        </div>

        {activeMatch && (
          <div className="active-match">
            <h2>Live Scoring: Match {activeMatch.matchNumber}</h2>
            {/* Live scoring interface would go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default RefereeDashboard;