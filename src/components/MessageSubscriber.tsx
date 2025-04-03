import { useState, useCallback } from 'react';
import { useEventEmitter } from '@/hooks/useEventEmitter';

export const MessageSubscriber = ({ id }: { id: number }) => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleNewMessage = useCallback((message: string) => {
    setMessages(prev => [...prev, message]);
  }, []);

  useEventEmitter('newMessage', handleNewMessage);

  return (
    <div>
      <h3>구독자 {id}</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}; 