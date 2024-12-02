"use client";

import { useTest } from "./api/test";

export default function ClientPage() {
  const { data } = useTest();

  return (
    <div>
      <p>hi</p>
      {data &&
        data.map((item) => (
          <p key={item.id}>{item.id}</p> // key 값으로 id를 사용
        ))}
    </div>
  );
}
