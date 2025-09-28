import React, { useState, useEffect } from 'react';
//import { useAdmin } from '../../hooks/useAdmin';
import { useAuth } from '@/contexts/AuthContext';
import SystemHealth from './SystemHealth';
import Analytics from './Analytics';
import UserManagement from './UserManagement';
import ContentModeration from './ContentModeration';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="admin-dashboard">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>Administrator privileges required to access this area.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Administration Dashboard</h1>
        <p>System management and monitoring</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'analytics' ? 'active' : ''}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Analytics
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          👥 User Management
        </button>
        <button 
          className={activeTab === 'moderation' ? 'active' : ''}
          onClick={() => setActiveTab('moderation')}
        >
          🛡️ Content Moderation
        </button>
        <button 
          className={activeTab === 'system' ? 'active' : ''}
          onClick={() => setActiveTab('system')}
        >
          ⚙️ System Health
        </button>
        <button 
          className={activeTab === 'exports' ? 'active' : ''}
          onClick={() => setActiveTab('exports')}
        >
          📤 Data Exports
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'moderation' && <ContentModeration />}
        {activeTab === 'system' && <SystemHealth />}
        {activeTab === 'exports' && (
          <div className="exports-tab">
            <h2>Data Exports</h2>
            <div className="export-options">
              <button className="export-btn" onClick={() => {/* Export users */}}>
                Export Users (CSV)
              </button>
              <button className="export-btn" onClick={() => {/* Export events */}}>
                Export Events (CSV)
              </button>
              <button className="export-btn" onClick={() => {/* Export dojos */}}>
                Export Dojos (JSON)
              </button>
              <button className="export-btn" onClick={() => {/* Export financials */}}>
                Export Financial Reports
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;