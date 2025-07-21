import React, { useState, useEffect } from 'react';

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationToastProps {
  notifications: ToastNotification[];
  onRemove: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notifications,
  onRemove
}) => {
  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.duration !== 0) {
        const timer = setTimeout(() => {
          onRemove(notification.id);
        }, notification.duration || 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onRemove]);

  const getToastStyle = (type: ToastNotification['type']) => {
    const baseStyle = {
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      border: '1px solid',
      position: 'relative' as const,
      animation: 'slideIn 0.3s ease-out'
    };

    switch (type) {
      case 'success':
        return {
          ...baseStyle,
          background: '#d4edda',
          color: '#155724',
          borderColor: '#c3e6cb'
        };
      case 'error':
        return {
          ...baseStyle,
          background: '#f8d7da',
          color: '#721c24',
          borderColor: '#f5c6cb'
        };
      case 'warning':
        return {
          ...baseStyle,
          background: '#fff3cd',
          color: '#856404',
          borderColor: '#ffeaa7'
        };
      case 'info':
      default:
        return {
          ...baseStyle,
          background: '#cce5ff',
          color: '#004085',
          borderColor: '#b8daff'
        };
    }
  };

  const getIcon = (type: ToastNotification['type']) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
      
      <div style={{
        position: 'fixed',
        top: '100px',
        left: '20px',
        zIndex: 9999,
        maxWidth: '400px',
        width: '100%'
      }}>
        {notifications.map(notification => (
          <div
            key={notification.id}
            style={getToastStyle(notification.type)}
          >
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>
                {getIcon(notification.type)}
              </div>
              
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                  {notification.title}
                </h4>
                <p style={{ margin: 0, lineHeight: 1.4 }}>
                  {notification.message}
                </p>
              </div>
              
              <button
                onClick={() => onRemove(notification.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  opacity: 0.7,
                  padding: '0',
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationToast;