import React, { useState, useEffect, createContext, useContext } from 'react';
import Icon from '../AppIcon';
import { useAuth } from './AuthenticationGuard';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      initializeNotifications();
      setupWebSocketConnection();
    }
  }, [isAuthenticated]);

  const initializeNotifications = () => {
    // Simulate initial notifications
    const initialNotifications = [
      {
        id: '1',
        type: 'transaction',
        title: 'Payment Received',
        message: 'You received $125.00 for iPhone 12 Pro',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        read: false,
        priority: 'normal',
        actionUrl: '/transaction-management'
      },
      {
        id: '2',
        type: 'escrow',
        title: 'Escrow Released',
        message: 'Funds have been released for order #SW-2024-001',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        read: false,
        priority: 'high',
        actionUrl: '/transaction-management'
      },
      {
        id: '3',
        type: 'security',
        title: 'Security Alert',
        message: 'New login detected from Chrome on Windows',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        read: true,
        priority: 'high',
        actionUrl: '/settings'
      }
    ];

    setNotifications(initialNotifications);
    setUnreadCount(initialNotifications?.filter(n => !n?.read)?.length);
  };

  const setupWebSocketConnection = () => {
    // Simulate WebSocket connection for real-time updates
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        addNotification({
          type: Math.random() < 0.5 ? 'transaction' : 'escrow',
          title: 'New Activity',
          message: 'You have new marketplace activity',
          priority: 'normal'
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now()?.toString(),
      timestamp: new Date(),
      read: false,
      actionUrl: '/user-dashboard',
      ...notification
    };

    setNotifications(prev => [newNotification, ...prev?.slice(0, 49)]); // Keep max 50 notifications
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(notification =>
        notification?.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev?.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const removeNotification = (notificationId) => {
    const notification = notifications?.find(n => n?.id === notificationId);
    setNotifications(prev => prev?.filter(n => n?.id !== notificationId));
    if (notification && !notification?.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const getNotificationsByType = (type) => {
    return notifications?.filter(n => n?.type === type);
  };

  const getUnreadNotifications = () => {
    return notifications?.filter(n => !n?.read);
  };

  const contextValue = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    getNotificationsByType,
    getUnreadNotifications
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

const NotificationBadge = ({ 
  count, 
  type = 'default', 
  size = 'default',
  position = 'top-right',
  showZero = false,
  maxCount = 99,
  className = '',
  children 
}) => {
  const displayCount = count > maxCount ? `${maxCount}+` : count;
  const shouldShow = showZero || count > 0;

  const sizeClasses = {
    sm: 'min-w-[16px] h-4 text-[10px] px-1',
    default: 'min-w-[20px] h-5 text-xs px-1.5',
    lg: 'min-w-[24px] h-6 text-sm px-2'
  };

  const typeClasses = {
    default: 'bg-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground',
    secondary: 'bg-secondary text-secondary-foreground'
  };

  const positionClasses = {
    'top-right': '-top-2 -right-2',
    'top-left': '-top-2 -left-2',
    'bottom-right': '-bottom-2 -right-2',
    'bottom-left': '-bottom-2 -left-2'
  };

  if (!shouldShow && !children) return null;

  return (
    <div className={`relative inline-flex ${className}`}>
      {children}
      {shouldShow && (
        <span
          className={`
            absolute flex items-center justify-center
            rounded-full font-medium font-caption
            transition-smooth transform scale-100
            ${sizeClasses?.[size]}
            ${typeClasses?.[type]}
            ${positionClasses?.[position]}
          `}
        >
          {displayCount}
        </span>
      )}
    </div>
  );
};

export const NotificationDropdown = ({ 
  isOpen, 
  onClose, 
  className = '' 
}) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications();

  const handleNotificationClick = (notification) => {
    if (!notification?.read) {
      markAsRead(notification?.id);
    }
    if (notification?.actionUrl) {
      window.location.href = notification?.actionUrl;
    }
    onClose();
  };

  const getNotificationIcon = (type) => {
    const icons = {
      transaction: 'DollarSign',
      escrow: 'Shield',
      security: 'AlertTriangle',
      message: 'MessageCircle',
      system: 'Settings'
    };
    return icons?.[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    
    const colors = {
      transaction: 'text-success',
      escrow: 'text-primary',
      security: 'text-warning',
      message: 'text-secondary',
      system: 'text-text-secondary'
    };
    return colors?.[type] || 'text-text-secondary';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (!isOpen) return null;

  return (
    <div className={`absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevated z-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-popover-foreground">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 text-sm text-text-secondary">
              ({unreadCount} new)
            </span>
          )}
        </h3>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Mark all read
          </button>
        )}
      </div>
      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={32} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary font-caption">No notifications yet</p>
          </div>
        ) : (
          <div className="py-2">
            {notifications?.slice(0, 10)?.map((notification) => (
              <div
                key={notification?.id}
                onClick={() => handleNotificationClick(notification)}
                className={`
                  flex items-start p-4 hover:bg-muted cursor-pointer transition-smooth
                  ${!notification?.read ? 'bg-primary/5 border-l-2 border-l-primary' : ''}
                `}
              >
                <div className={`p-2 rounded-lg bg-muted mr-3 ${getNotificationColor(notification?.type, notification?.priority)}`}>
                  <Icon 
                    name={getNotificationIcon(notification?.type)} 
                    size={16} 
                    className="current"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className={`text-sm font-medium ${!notification?.read ? 'text-popover-foreground' : 'text-text-secondary'}`}>
                      {notification?.title}
                    </h4>
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        removeNotification(notification?.id);
                      }}
                      className="text-text-secondary hover:text-error transition-smooth ml-2"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                    {notification?.message}
                  </p>
                  <p className="text-xs text-text-secondary mt-2 font-caption">
                    {formatTimestamp(notification?.timestamp)}
                  </p>
                </div>
                
                {!notification?.read && (
                  <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-2"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      {notifications?.length > 10 && (
        <div className="p-3 border-t border-border text-center">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationBadge;