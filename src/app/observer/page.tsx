"use client";

import { MessagePublisher } from '@/components/MessagePublisher';
import { MessageSubscriber } from '@/components/MessageSubscriber';

export default function ObserverPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>옵저버 패턴 예제</h1>
      <MessagePublisher />
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <MessageSubscriber id={1} />
        <MessageSubscriber id={2} />
        <MessageSubscriber id={3} />
      </div>
    </div>
  );
} 