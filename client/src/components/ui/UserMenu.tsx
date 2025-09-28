import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types';
import '@/styles/components/UserMenu.css';

interface UserMenuProps {
  user: User | null;
}

const getAvatarUrl = (user: User) => {
  if (user.avatarUrl) return user.avatarUrl;
  
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  return `https://ui-avatars.com/api/?name=${initials}&background=dc3545&color=fff&size=64`;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  if (!user) return null;

  return (
    <>
      {isOpen && <div className="user-menu-backdrop" onClick={() => setIsOpen(false)} />}
      
      <div className="user-menu" ref={menuRef}>
        <button 
          className="user-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="User menu"
        >
          <img 
  src={getAvatarUrl(user)} 
  alt={`${user.firstName} ${user.lastName}`}
  className="user-avatar"
/>
          <span className="user-name">{user.firstName}</span>
          <span className={`dropdown-arrow ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {isOpen && (
          <div className="user-menu-dropdown" role="menu">
            <div className="user-info">
              <strong>{user.firstName} {user.lastName}</strong>
              <span className={`user-role role-${user.role.toLowerCase()}`}>
                {user.role}
              </span>
            </div>

            <nav className="menu-items" aria-label="User menu options">
              <Link to="/profile" onClick={() => setIsOpen(false)} role="menuitem">
                <span className="menu-icon">👤</span>
                Profile
              </Link>
              
              <Link to="/settings" onClick={() => setIsOpen(false)} role="menuitem">
                <span className="menu-icon">⚙️</span>
                Settings
              </Link>
              
              <Link to="/my-dojos" onClick={() => setIsOpen(false)} role="menuitem">
                <span className="menu-icon">🥋</span>
                My Dojos
              </Link>
              
              <Link to="/my-events" onClick={() => setIsOpen(false)} role="menuitem">
                <span className="menu-icon">🏆</span>
                My Events
              </Link>
              
              <div className="menu-divider"></div>
              
              <Link to="/help" onClick={() => setIsOpen(false)} role="menuitem">
                <span className="menu-icon">❓</span>
                Help & Support
              </Link>
              
              <button 
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                role="menuitem"
                className="logout-button"
              >
                <span className="menu-icon">🚪</span>
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;