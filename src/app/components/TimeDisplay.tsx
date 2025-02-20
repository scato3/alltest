'use client';

export default function TimeDisplay() {
  const time = new Date().toLocaleTimeString();
  return <div>서버/클라이언트 시간: {time}</div>;
}
