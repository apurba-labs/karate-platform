import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PersonalDashboard from '@/components/portal/PersonalDashboard';
import DojoDashboard from '@/components/role-based/dojos/DojoDashboard';
import OrganizerDashboard from '@/components/role-based/organizer/OrganizerDashboard';
//import RefereeDashboard from '@/components/role-based/referee/RefereeDashboard';
import AdminDashboard from '@/components/role-based/admin/AdminDashboard';
import '@/styles/components/Dashboard.css'

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, isAdmin, isCoach, isReferee, isOrganizer } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      //const response = await fetch('/api/dashboard');
      const data = {}//await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="dashboard-container">
        <div className="access-denied">
          <h2>Please Sign In</h2>
          <p>You need to be logged in to access your dashboard.</p>
          <Link to="/login" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <LoadingSpinner text="Loading your dashboard..." />
      </div>
    );
  }

  const renderRoleSpecificDashboard = () => {
    if (isAdmin) {
      return <AdminDashboard />;
    }
    
    if (isCoach) {
      return <DojoDashboard dojos={dashboardData?.dojos || []} />;
    }
    
    if (isOrganizer) {
      return <OrganizerDashboard events={dashboardData?.events || []} />;
    }
    
    // Default athlete/member dashboard
    return <PersonalDashboard />;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.firstName}! 👋</h1>
          <p className="welcome-subtitle">
            {isAdmin && 'System Administration Dashboard'}
            {isCoach && 'Coach Management Dashboard'}
            {isOrganizer && 'Event Organizer Dashboard'}
            {isReferee && 'Referee Scoring Dashboard'}
            {!isAdmin && !isCoach && !isOrganizer && !isReferee && 'Your Personal Dashboard'}
          </p>
        </div>

        <div className="dashboard-actions">
          <div className="quick-stats">
            <div className="stat">
              <span className="stat-number">{dashboardData?.upcomingEvents || 0}</span>
              <span className="stat-label">Upcoming Events</span>
            </div>
            <div className="stat">
              <span className="stat-number">{dashboardData?.unreadNotifications || 0}</span>
              <span className="stat-label">Notifications</span>
            </div>
            <div className="stat">
              <span className="stat-number">{dashboardData?.pendingTasks || 0}</span>
              <span className="stat-label">Pending Tasks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role-based dashboard content */}
      {renderRoleSpecificDashboard()}

      {/* Quick Access Grid */}
      <div className="quick-access-grid">
        <h2>Quick Access</h2>
        <div className="quick-access-cards">
          <Link to="/profile" className="quick-access-card">
            <div className="card-icon">👤</div>
            <h3>My Profile</h3>
            <p>Update your information and settings</p>
          </Link>

          <Link to="/events" className="quick-access-card">
            <div className="card-icon">🏆</div>
            <h3>Events</h3>
            <p>Browse and register for tournaments</p>
          </Link>

          <Link to="/dojos" className="quick-access-card">
            <div className="card-icon">🥋</div>
            <h3>Dojos</h3>
            <p>Find and join martial arts schools</p>
          </Link>

          <Link to="/training" className="quick-access-card">
            <div className="card-icon">📊</div>
            <h3>Progress</h3>
            <p>Track your training and development</p>
          </Link>

          {isCoach && (
            <Link to="/my-students" className="quick-access-card">
              <div className="card-icon">🎓</div>
              <h3>My Students</h3>
              <p>Manage your dojo members</p>
            </Link>
          )}

          {isOrganizer && (
            <Link to="/my-events" className="quick-access-card">
              <div className="card-icon">📅</div>
              <h3>My Events</h3>
              <p>Manage your tournaments</p>
            </Link>
          )}

          {isReferee && (
            <Link to="/referee/matches" className="quick-access-card">
              <div className="card-icon">⚖️</div>
              <h3>Matches</h3>
              <p>View assigned matches</p>
            </Link>
          )}

          {isAdmin && (
            <Link to="/admin" className="quick-access-card">
              <div className="card-icon">⚙️</div>
              <h3>Admin Panel</h3>
              <p>System management</p>
            </Link>
          )}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {dashboardData?.recentActivity?.map((activity: any, index: number) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'event' && '🏆'}
                {activity.type === 'training' && '🥋'}
                {activity.type === 'achievement' && '⭐'}
                {activity.type === 'notification' && '🔔'}
              </div>
              <div className="activity-content">
                <p>{activity.message}</p>
                <span className="activity-time">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          )) || (
            <div className="empty-state">
              <p>No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;