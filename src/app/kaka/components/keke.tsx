"use client";

import React from "react";

let isResolved = false;

const fetchData = () =>
  new Promise<void>((resolve) => {
    console.log("Fetching data...");
    setTimeout(() => {
      console.log("Data fetched!");
      isResolved = true;
      resolve();
    }, 2000); // 2초 후 완료
  });

const resource = {
  read: () => {
    if (!isResolved) {
      console.log("Data not ready yet. Throwing Promise...");
      throw fetchData(); // 데이터를 가져오는 Promise를 던짐
    }
    console.log("Data ready, rendering component.");
  },
};

export default function AsyncComponent() {
  resource.read();
  return <p>Data loaded successfully!</p>;
}
