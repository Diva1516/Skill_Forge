import React, { createContext, useState, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import './NotificationToast.css';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Mock initial notifications
  useEffect(() => {
    setNotifications([
      { id: 1, title: 'Welcome to SkillForge!', message: 'Explore our new React roadmap.', read: false, time: '2 hours ago' },
      { id: 2, title: 'Daily Challenge', message: 'You have a new coding challenge waiting.', read: false, time: '5 hours ago' }
    ]);
  }, []);

  const addNotification = useCallback((notification) => {
    const newNotif = {
      id: Date.now(),
      read: false,
      time: 'Just now',
      ...notification
    };
    
    setNotifications(prev => [newNotif, ...prev]);
    
    // Also show as a toast
    setToasts(prev => [...prev, newNotif]);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newNotif.id));
    }, 3000);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, markAllAsRead }}>
      {children}
      
      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast fade-in">
            <div className="toast-content">
              <h4>{toast.title}</h4>
              <p>{toast.message}</p>
            </div>
            <button className="toast-close" onClick={() => removeToast(toast.id)}>
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
