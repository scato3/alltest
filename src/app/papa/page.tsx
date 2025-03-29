"use client";

import React, { useState, useCallback, useMemo } from "react";

export default function OptimizationExample() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(100);
  const [test, setTest] = useState(0);
  const [localCount, setLocalCount] = useState(1);

  // 최적화된 expensiveComputation
  const computedValue = useMemo(() => {
    console.log("Performing expensive computation...");
    return count * count;
  }, [count]);

  // 최적화된 transformValue
  const transformedValue = useMemo(() => {
    console.log("Transforming value...");
    return value + 50;
  }, [value]);

  // 최적화된 handleButtonClick
  const handleButtonClick = useCallback(() => {
    console.log(`Computed Value: ${computedValue}`);
    console.log(`Transformed Value: ${transformedValue}`);
    setLocalCount((prev) => prev + 1);
  }, [computedValue, transformedValue]);

  const increment = useCallback(() => {
    console.log(test);
    setTest(test + 1);
  }, []);

  return (
    <div>
      <h1>useCallback & useMemo Optimization Example</h1>
      <p>Count: {count}</p>
      <p>Value: {value}</p>
      <p>Local Count: {localCount}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increase Count
      </button>
      <button onClick={() => setValue((prev) => prev + 10)}>
        Increase Value
      </button>
      <button onClick={handleButtonClick}>Compute & Transform</button>
      <button onClick={() => setLocalCount((prev) => prev + 1)}>
        Increase Local Count
      </button>
      <button onClick={increment}>{test}</button>
    </div>
  );
}
