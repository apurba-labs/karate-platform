import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import UserMenu from './UserMenu';

const Header: React.FC = () => {
  const { user, isAuthenticated, isAdmin, isCoach, isReferee, isOrganizer } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getRoleBasedLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Link to="/" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>Home</Link>
          <Link to="/events" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/events' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>Events</Link>
          <Link to="/dojos" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/dojos' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>Dojos</Link>
          <Link to="/rankings" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/rankings' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>Rankings</Link>
          <Link to="/about" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/about' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>About</Link>
        </>
      );
    }

    const links = [
      <Link key="home" to="/" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>Home</Link>,
      <Link key="dashboard" to="/dashboard" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/dashboard' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>Dashboard</Link>,
      <Link key="events" to="/events" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/events' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>Events</Link>,
      <Link key="dojos" to="/dojos" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/dojos' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>Dojos</Link>
    ];

    if (isCoach) {
      links.push(
        <Link key="my-dojos" to="/my-dojos" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/my-dojos' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>My Dojos</Link>
      );
    }

    if (isOrganizer) {
      links.push(
        <Link key="organizer" to="/organizer" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/organizer' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>Organizer</Link>
      );
    }

    if (isReferee) {
      links.push(
        <Link key="referee" to="/referee" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/referee' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>Referee</Link>
      );
    }

    if (isAdmin) {
      links.push(
        <Link key="admin" to="/admin" className={`text-gray-700 hover:text-red-500 font-medium py-2 relative transition-all duration-300 ${location.pathname === '/admin' ? 'text-red-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500' : ''}`}>Admin</Link>
      );
    }

    return links;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="logo">
          <Link to="/" className="flex items-center no-underline text-gray-800 font-bold text-2xl">
            <img src="/images/logo.webp" alt="Karate Platform" className="h-10 mr-2" />
            <span>Karate <span className="text-red-500">Platform</span></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6">
          {getRoleBasedLinks()}
        </nav>

        <div className="header-actions flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <UserMenu user={user} />
            </>
          ) : (
            <div className="auth-buttons flex gap-2">
              <Link to="/login" className="text-red-500 bg-transparent border border-red-500 hover:bg-red-500 hover:text-white font-medium text-center px-3 py-1.5 rounded transition-all duration-300 cursor-pointer text-sm">
                Login
              </Link>
              <Link to="/register" className="text-white bg-red-500 border border-red-500 hover:bg-red-600 font-medium text-center px-3 py-1.5 rounded transition-all duration-300 cursor-pointer text-sm">
                Register
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden bg-none border-none text-2xl cursor-pointer text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden fixed top-[70px] left-[-100%] w-full h-[calc(100vh-70px)] bg-white flex flex-col p-8 transition-all duration-300 z-40 ${mobileMenuOpen ? 'left-0' : ''}`}>
        <div className="flex flex-col gap-4">
          {getRoleBasedLinks()}
        </div>
      </div>
    </header>
  );
};

export default Header;