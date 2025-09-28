import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
//import NotificationCenter from '../notifications/NotificationCenter';
import UserMenu from './UserMenu';
import '@/styles/components/header.css';

const Header: React.FC = () => {
  const { user, isAuthenticated, isAdmin, isCoach, isReferee, isOrganizer } = useAuth();
  const location = useLocation();

  const getRoleBasedLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>Events</Link>
          <Link to="/dojos" className={location.pathname === '/dojos' ? 'active' : ''}>Dojos</Link>
          <Link to="/rankings" className={location.pathname === '/rankings' ? 'active' : ''}>Rankings</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        </>
      );
    }

    const links = [
      <Link key="home" to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>,
      <Link key="dashboard" to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>,
      <Link key="events" to="/events" className={location.pathname === '/events' ? 'active' : ''}>Events</Link>,
      <Link key="dojos" to="/dojos" className={location.pathname === '/dojos' ? 'active' : ''}>Dojos</Link>
    ];

    if (isCoach) {
      links.push(
        <Link key="my-dojos" to="/my-dojos" className={location.pathname === '/my-dojos' ? 'active' : ''}>My Dojos</Link>
      );
    }

    if (isOrganizer) {
      links.push(
        <Link key="organizer" to="/organizer" className={location.pathname === '/organizer' ? 'active' : ''}>Organizer</Link>
      );
    }

    if (isReferee) {
      links.push(
        <Link key="referee" to="/referee" className={location.pathname === '/referee' ? 'active' : ''}>Referee</Link>
      );
    }

    if (isAdmin) {
      links.push(
        <Link key="admin" to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin</Link>
      );
    }

    return links;
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.webp" alt="Karate Platform" />
            <span>Karate Platform</span>
          </Link>
        </div>

        <nav className="main-nav">
          {getRoleBasedLinks()}
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
               {/* <NotificationCenter /> */}
              <UserMenu user={user} />
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;