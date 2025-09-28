import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
const SystemHealth: React.FC = () => {
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
    </div>
    );
}

export default SystemHealth;