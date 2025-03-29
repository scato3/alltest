import { useCallback } from 'react';
import { useEventEmitter } from '@/hooks/useEventEmitter';

export const MessagePublisher = () => {
  const { emit } = useEventEmitter('newMessage', () => {});

  const handleSendMessage = useCallback(() => {
    emit(`새 메시지 - ${new Date().toLocaleTimeString()}`);
  }, [emit]);

  return (
    <div>
      <h2>메시지 발신자</h2>
      <button onClick={handleSendMessage}>메시지 보내기</button>
    </div>
  );
}; 