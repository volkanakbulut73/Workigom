
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { notificationsAPI } from '../lib/apiClient';
import { Notification } from '../types/api';
import { toast } from 'sonner';

interface NotificationsContextType {
  notifications: Notification[];
  isLoading: boolean;
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await notificationsAPI.getAllNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      toast.error('Bildirimler yüklenemedi');
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await notificationsAPI.markAsRead(id);
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsAPI.markAllAsRead();
      setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
      toast.success('Tüm bildirimler okundu olarak işaretlendi');
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      toast.error('Bildirimler güncellenemedi');
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await notificationsAPI.deleteNotification(id);
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
      toast.success('Bildirim silindi');
    } catch (error) {
      console.error('Failed to delete notification:', error);
      toast.error('Bildirim silinemedi');
    }
  };

  const value = {
    notifications,
    isLoading,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};
