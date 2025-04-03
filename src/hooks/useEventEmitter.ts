import { useEffect } from 'react';
import { eventEmitter } from '@/utils/EventEmitter';

export const useEventEmitter = (
  event: string,
  callback: (...args: any[]) => void
) => {
  useEffect(() => {
    // 이벤트 구독
    const unsubscribe = eventEmitter.subscribe(event, callback);
    
    // 컴포넌트 언마운트 시 구독 취소
    return () => unsubscribe();
  }, [event, callback]);

  return {
    emit: (...args: any[]) => eventEmitter.emit(event, ...args)
  };
}; 