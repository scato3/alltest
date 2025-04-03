type Listener = (...args: any[]) => void;

class EventEmitter {
  private listeners: { [key: string]: Listener[] } = {};

  // 이벤트 구독
  subscribe(event: string, callback: Listener): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);

    // 구독 취소 함수 반환
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        listener => listener !== callback
      );
    };
  }

  // 이벤트 발생
  emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach(listener => listener(...args));
  }
}

// 싱글톤 인스턴스 생성
export const eventEmitter = new EventEmitter(); 