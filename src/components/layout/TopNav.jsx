import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sun, Moon, Bell, LogOut, User, CheckCircle } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/NotificationContext';
import './TopNav.css';

const TopNav = ({ onOpenCmd }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const { notifications, markAsRead, markAllAsRead } = useContext(NotificationContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="top-nav">
      <div className="search-container">
        <div className="search-bar" onClick={onOpenCmd}>
          <Search size={18} className="search-icon" />
          <span className="search-placeholder">Search topics, goals, commands...</span>
          <div className="search-shortcut">
            <kbd>Ctrl</kbd> + <kbd>K</kbd>
          </div>
        </div>
      </div>

      <div className="nav-actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="user-menu-container">
          <button className="icon-btn" aria-label="Notifications" onClick={() => { setShowNotifs(!showNotifs); setShowDropdown(false); }}>
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
          
          {showNotifs && (
            <div className="user-dropdown notifications-dropdown fade-in">
              <div className="dropdown-header flex-between">
                <h4>Notifications</h4>
                {unreadCount > 0 && (
                  <button className="text-link text-sm" onClick={markAllAsRead}>Mark all read</button>
                )}
              </div>
              <div className="dropdown-divider"></div>
              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted">No notifications</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`notification-item ${n.read ? 'read' : 'unread'}`} onClick={() => markAsRead(n.id)}>
                      <div className="notif-content">
                        <strong>{n.title}</strong>
                        <p>{n.message}</p>
                        <small>{n.time}</small>
                      </div>
                      {!n.read && <div className="unread-dot"></div>}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {user && (
          <div className="user-menu-container">
            <button 
              className="user-btn" 
              onClick={() => { setShowDropdown(!showDropdown); setShowNotifs(false); }}
            >
              <div className="avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </button>
            
            {showDropdown && (
              <div className="user-dropdown fade-in">
                <div className="dropdown-header">
                  <p className="user-name">{user.name || 'User'}</p>
                  <p className="user-email">{user.email || 'user@example.com'}</p>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/app/settings" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                  <User size={16} /> Profile & Settings
                </Link>
                <button className="dropdown-item danger" onClick={logout}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNav;
