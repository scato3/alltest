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
    }, 2000);
  });

const resource = {
  read: () => {
    if (!isResolved) {
      console.log("Data not ready yet. Throwing Promise...");
      throw fetchData();
    }
    console.log("Data ready, rendering component.");
  },
};

export default function AsyncComponent() {
  resource.read();
  return <p>Data loaded successfully!</p>;
}
