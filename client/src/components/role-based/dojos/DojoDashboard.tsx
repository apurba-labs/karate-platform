// src/components/role-based/coach/CoachDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDojo } from '@/contexts/DojoContext';
import CreateDojoForm from '@/components/dojos/CreateDojoForm';
import { useApi } from '@/hooks/useApi';
import '@/styles/components/CoachDashboard.css';

interface DojoDashboardProps {
  dojos?: any[];
}

interface CoachStats {
  totalStudents: number;
  attendanceRate: number;
  upcomingTests: number;
  pendingPromotions: number;
  activeClasses: number;
  totalClasses: number;
  dojoStatus: 'ACTIVE' | 'SETUP_REQUIRED' | 'PENDING_APPROVAL';
}

interface RecentActivity {
  id: number;
  type: 'attendance' | 'promotion' | 'test' | 'registration';
  message: string;
  timestamp: string;
  icon: string;
}

const DojoDashboard: React.FC<DojoDashboardProps> = ({ dojos = [] }) => {
  const api = useApi<any>();
  const { user } = useAuth();
  const { currentDojo, isLoading: dojoLoading, error: dojoError, refetchDojo } = useDojo();

  const [stats, setStats] = useState<CoachStats>({
    totalStudents: 0,
    attendanceRate: 0,
    upcomingTests: 0,
    pendingPromotions: 0,
    activeClasses: 0,
    totalClasses: 0,
    dojoStatus: 'SETUP_REQUIRED'
  });
  
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateDojo, setShowCreateDojo] = useState(false);

  useEffect(() => {
    if (!dojoLoading) {
      fetchDashboardData();
    }
  }, [dojoLoading, currentDojo]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (currentDojo) {
        await fetchDojoStatus();
        await fetchDojoActivity();
        setShowCreateDojo(false);

      } else {
        setShowCreateDojo(true);
        setIsLoading(false);
      }
      
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data');
        setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDojoStatus = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockStats: CoachStats = {
        totalStudents: 24,
        attendanceRate: 85,
        upcomingTests: 3,
        pendingPromotions: 2,
        activeClasses: 12,
        totalClasses: 45,
        dojoStatus: 'ACTIVE'
      };
      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching dojo status:', error);
    }
  };

  const fetchDojoActivity = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockActivity: RecentActivity[] = [
        {
          id: 1,
          type: 'attendance',
          message: '15 students attended evening class',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          icon: '📊'
        },
        {
          id: 2,
          type: 'promotion',
          message: 'Sarah Johnson promoted to Yellow Belt',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          icon: '⭐'
        },
        {
          id: 3,
          type: 'registration',
          message: 'New student registered: Mike Chen',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          icon: '👤'
        }
      ];
      setRecentActivity(mockActivity);
    } catch (error) {
      console.error('Error fetching dojo activity:', error);
    }
  };

  const handleDojoCreated = async (newDojo: any) => {
    // Refresh the dojo context
    await refetchDojo();
    setShowCreateDojo(false);
  };

  // Mock data for new dojos
  const getSetupActivity = (): RecentActivity[] => [
    {
      id: 1,
      type: 'registration',
      message: 'Welcome! Set up your dojo to get started',
      timestamp: new Date().toISOString(),
      icon: '👋'
    },
    {
      id: 2,
      type: 'test',
      message: 'Add your first class schedule',
      timestamp: new Date().toISOString(),
      icon: '📅'
    },
    {
      id: 3,
      type: 'promotion',
      message: 'Create your belt ranking system',
      timestamp: new Date().toISOString(),
      icon: '🥋'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'attendance': return '📊';
      case 'promotion': return '⭐';
      case 'test': return '🎓';
      case 'registration': return '👤';
      default: return '🔔';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'status-active';
      case 'SETUP_REQUIRED': return 'status-setup-required';
      case 'PENDING_APPROVAL': return 'status-pending-approval';
      default: return 'status-inactive';
    }
  };

  // Safe array access
  const safeRecentActivity = Array.isArray(recentActivity) && recentActivity.length > 0 
    ? recentActivity 
    : getSetupActivity();

  // Show onboarding if no dojo exists
  if (showCreateDojo && !currentDojo) {
    return (
      <div className="coach-dashboard">
        <div className="dashboard-header">
          <div className="welcome-message">Welcome to Your Coach Dashboard! 🥋</div>
          
          <h2>Set up your dojo to start managing your martial arts school</h2>
          
          <p>Your dojo management hub will include:</p>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-text">
                <h4>Student Attendance Tracking</h4>
                <p>Monitor class participation and engagement</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <div className="feature-text">
                <h4>Belt Promotion Management</h4>
                <p>Track progress and schedule promotions</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">📅</div>
              <div className="feature-text">
                <h4>Class Scheduling</h4>
                <p>Create and manage class timetables</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">👥</div>
              <div className="feature-text">
                <h4>Student Progress Monitoring</h4>
                <p>Track individual student development</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">📈</div>
              <div className="feature-text">
                <h4>Performance Analytics</h4>
                <p>Gain insights with detailed reports</p>
              </div>
            </div>
          </div>
          
          <div className="header-cta">
            <CreateDojoForm 
              onSuccess={handleDojoCreated}
              onCancel={() => window.history.back()}
            />
          </div>
        </div>
      </div>
    );
  }

   if (dojoLoading || isLoading) {
    return (
      <div className="coach-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if ((dojoError || error) && !currentDojo) {
    return (
      <div className="coach-dashboard">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Dashboard</h3>
          <p>{dojoError || error}</p>
          <button onClick={fetchDashboardData} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }
  if (!currentDojo) {
    return (
      <div className="coach-dashboard">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Dojo Not Found</h3>
          <p>Unable to load your dojo information. Please try again or create a new dojo.</p>
          <button onClick={fetchDashboardData} className="btn btn-primary" style={{ marginRight: '10px' }}>
            Try Again
          </button>
          <button onClick={() => setShowCreateDojo(true)} className="btn btn-secondary">
            Create New Dojo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="coach-dashboard">
      {/* Dojo Header */}
      <div className="dojo-header-section">
        <div className="dojo-info">
          <h1>{currentDojo?.name || 'My Dojo'}</h1>
          <p>📍 {currentDojo?.city || 'Unknown City'}, {currentDojo?.country || 'Unknown Country'}</p>
          <span className={`status-badge ${getStatusClass(stats.dojoStatus)}`}>
            {stats.dojoStatus.replace(/_/g, ' ')}
          </span>
          
          {/* Progress Bar for Setup */}
          {stats.dojoStatus === 'SETUP_REQUIRED' && (
            <div className="dojo-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '30%' }}></div>
              </div>
              <small>Complete your dojo setup to unlock all features</small>
            </div>
          )}
        </div>
        
        <div className="dojo-actions">
          <Link to='/dojos/manage/settings' className="btn btn-outline">
            ⚙️ Dojo Settings
          </Link>
          <Link to="/dojos/manage" className="btn btn-primary">
            🥋 Manage Dojo
          </Link>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalStudents || 0}</h3>
            <p>Total Students</p>
            <small>Registered in dojo</small>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.attendanceRate || 0}%</h3>
            <p>Attendance Rate</p>
            <small>This month</small>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <h3>{stats.upcomingTests || 0}</h3>
            <p>Upcoming Tests</p>
            <small>Next 30 days</small>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{stats.pendingPromotions || 0}</h3>
            <p>Pending Promotions</p>
            <small>Awaiting approval</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🥋</div>
          <div className="stat-content">
            <h3>{stats.activeClasses || 0}/{stats.totalClasses || 0}</h3>
            <p>Active Classes</p>
            <small>This week / month</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>{stats.dojoStatus === 'ACTIVE' ? '100%' : '30%'}</h3>
            <p>Setup Complete</p>
            <small>Dojo configuration</small>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="section-header">
          <h3>Dojo Management</h3>
          <div className="coach-quick-info">
            <span className="badge">Coach: {user?.firstName} {user?.lastName}</span>
            <span className="badge">Dojo ID: {currentDojo?.id}</span>
          </div>
        </div>
        <div className="action-buttons">
          <Link to={`/dojos/students`} className="action-btn">
            <span className="icon">👥</span>
            <span>Manage Students</span>
          </Link>
          
          <Link to={`/dojos/attendance`} className="action-btn">
            <span className="icon">📊</span>
            <span>Attendance</span>
          </Link>
          
          <Link to={`/dojos/schedule`} className="action-btn">
            <span className="icon">📅</span>
            <span>Class Schedule</span>
          </Link>
          
          <Link to={`/dojos/curriculum`} className="action-btn">
            <span className="icon">📚</span>
            <span>Curriculum</span>
          </Link>
          
          <Link to={`/dojos/promotions`} className="action-btn">
            <span className="icon">⭐</span>
            <span>Belt Promotions</span>
          </Link>
          
          <Link to={`/dojos/reports`} className="action-btn">
            <span className="icon">📈</span>
            <span>Reports</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <div className="section-header">
          <h3>Recent Activity</h3>
          <Link to={`/dojos/activity`} className="btn btn-sm btn-outline">
            View All
          </Link>
        </div>
        
        {safeRecentActivity.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📝</div>
            <h4>No recent activity</h4>
            <p>Start by adding students or creating classes</p>
          </div>
        ) : (
          <div className="activity-list">
            {safeRecentActivity.slice(0, 5).map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon || getActivityIcon(activity.type)}</div>
                <div className="activity-content">
                  <p>{activity.message}</p>
                  <span className="activity-time">
                    {new Date(activity.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DojoDashboard;