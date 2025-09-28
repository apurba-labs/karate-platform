// src/components/role-based/coach/dojos/DojoOverview.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const DojoOverview: React.FC = () => {
  const { dojoId } = useParams();

  return (
    <div className="dojo-overview">
      <div className="page-header">
        <h1>Dojo Overview</h1>
        <p>Welcome to your dojo management dashboard</p>
      </div>

      <div className="overview-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>24</h3>
            <p>Total Students</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>85%</h3>
            <p>Attendance Rate</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>3</h3>
            <p>Upcoming Promotions</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>5</h3>
            <p>Classes This Week</p>
          </div>
        </div>
      </div>

      <div className="overview-content">
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          {/* Activity list component */}
        </div>
        
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          {/* Quick action buttons */}
        </div>
      </div>
    </div>
  );
};

export default DojoOverview;