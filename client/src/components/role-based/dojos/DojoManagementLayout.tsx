import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDojo } from '@/contexts/DojoContext';
import '@/styles/components/DojoManagementLayout.css';

const DojoManagementLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentDojo, isLoading, error, refetchDojo } = useDojo();

  // Redirect if no dojo found
  React.useEffect(() => {
    if (!isLoading && !currentDojo) {
      navigate('/dashboard');
    }
  }, [currentDojo, isLoading, navigate]);

  const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      path: '/dojos/manage',
      icon: '📊',
    },
    {
      id: 'students',
      label: 'Students',
      path: '/dojos/manage/students',
      icon: '👥',
    },
    {
      id: 'attendance',
      label: 'Attendance',
      path: '/dojos/manage/attendance',
      icon: '✅',
    },
    {
      id: 'schedule',
      label: 'Class Schedule',
      path: '/dojos/manage/schedule',
      icon: '📅',
    },
    {
      id: 'curriculum',
      label: 'Curriculum',
      path: '/dojos/manage/curriculum',
      icon: '📚',
    },
    {
      id: 'promotions',
      label: 'Belt Promotions',
      path: '/dojos/manage/promotions',
      icon: '⭐',
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/dojos/manage/settings',
      icon: '⚙️',
    },
    {
      id: 'reports',
      label: 'Reports',
      path: '/dojos/manage/reports',
      icon: '📈',
    }
  ];

  const isActiveLink = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  if (isLoading) {
    return (
      <div className="dojo-management-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dojo...</p>
      </div>
    );
  }

  if (error || !currentDojo) {
    return (
      <div className="dojo-management-error">
        <div className="error-icon">⚠️</div>
        <h3>Dojo Not Found</h3>
        <p>{error || 'You need to create a dojo first'}</p>
        <button onClick={refetchDojo} className="btn btn-primary">
          Try Again
        </button>
        <Link to="/dashboard" className="btn btn-outline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="dojo-management-layout">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="mobile-menu-button">
          ☰
        </button>
        <h1>{currentDojo.name}</h1>
        <div className="mobile-header-actions">
          <Link to="/coach/dashboard" className="btn btn-sm btn-outline">
            ← Back
          </Link>
        </div>
      </div>

      <div className="management-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>{currentDojo.name}</h2>
            <p className="dojo-location">📍 {currentDojo.city}, {currentDojo.country}</p>
            <p className="coach-name">Coach: {user?.firstName} {user?.lastName}</p>
          </div>

          <nav className="sidebar-nav">
            <ul>
              {navigationItems.map(item => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar-footer">
            <Link to="/coach/dashboard" className="btn btn-outline btn-sm">
              ← Back to Dashboard
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="management-content">
          <div className="content-header">
            <div className="breadcrumb">
              <Link to="/coach/dashboard">Dashboard</Link>
              <span> / </span>
              <span>Dojo Management</span>
            </div>
          </div>

          <div className="content-area">
            <Outlet context={{ currentDojo }} /> {/* Pass dojo via outlet context */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DojoManagementLayout;