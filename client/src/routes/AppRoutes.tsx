import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
//import RegisterWithDojo from '../components/auth/RegisterWithDojo';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProtectedRoute from '@/components/ui/ProtectedRoute';
import DojoRoutes from './DojoRoutes';
import TournamentDashboard from '@/pages/TournamentDashboard';

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tournament-dashboard" element={<TournamentDashboard />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route 
        path="/dojos/*" 
        element={
          <ProtectedRoute>
            <DojoRoutes />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;