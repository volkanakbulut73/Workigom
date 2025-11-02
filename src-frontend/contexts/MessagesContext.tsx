
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { messagesAPI } from '../lib/apiClient';
import { Message, SendMessageRequest } from '../types/api';
import { toast } from 'sonner';

interface MessagesContextType {
  conversations: Message[];
  messages: Message[];
  isLoading: boolean;
  fetchConversations: () => Promise<void>;
  fetchMessages: (userId: string) => Promise<void>;
  sendMessage: (data: SendMessageRequest) => Promise<Message>;
  markAsRead: (messageId: string) => Promise<void>;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};

interface MessagesProviderProps {
  children: ReactNode;
}

export const MessagesProvider: React.FC<MessagesProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      const data = await messagesAPI.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      toast.error('Konuşmalar yüklenemedi');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (userId: string) => {
    try {
      setIsLoading(true);
      const data = await messagesAPI.getMessages(userId);
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      toast.error('Mesajlar yüklenemedi');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (data: SendMessageRequest): Promise<Message> => {
    try {
      const newMessage = await messagesAPI.sendMessage(data);
      setMessages((prev) => [...prev, newMessage]);
      return newMessage;
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Mesaj gönderilemedi');
      throw error;
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      await messagesAPI.markAsRead(messageId);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg))
      );
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const value = {
    conversations,
    messages,
    isLoading,
    fetchConversations,
    fetchMessages,
    sendMessage,
    markAsRead,
  };

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
};
