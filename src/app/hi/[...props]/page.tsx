"use client";

import React, { useState } from "react";
import useCustomMemo from "@/app/utils/CMemo";

export default function TodoApp() {
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([]);
  const [inputText, setInputText] = useState("");

  // const nonMemoizedTodos = () => {
  //   console.log("Recalculating todos (no memoization)...");
  //   return todos;
  // };

  const MemoizedTodos = useCustomMemo(() => {
    console.log("Recalculating todos (no memoization)...");
    return todos;
  }, [todos]);

  // 할 일 추가
  const addTodo = () => {
    if (inputText.trim() === "") return;
    const newTodo = { id: Date.now(), text: inputText };
    setTodos((prev) => [...prev, newTodo]);
    setInputText(""); // 입력 필드 초기화
  };

  // 할 일 삭제
  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>할 일 목록</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="해야 할 일을 입력하세요"
          style={{ marginRight: "10px", padding: "5px", width: "300px" }}
        />
        <button onClick={addTodo} style={{ padding: "5px 10px" }}>
          등록
        </button>
      </div>
      <ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
        {MemoizedTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "10px", flexGrow: 1 }}>
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
