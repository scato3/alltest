"use client";

import { useEffect } from "react";

export function PropsList({ serverProps }: { serverProps: string[] }) {
  useEffect(() => {
    console.log(serverProps); // 서버에서 전달된 props
  }, [serverProps]);

  return (
    <ul>
      {serverProps.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
