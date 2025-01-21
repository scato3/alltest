'use client';

import React, { useState, useReducer } from 'react';
import useCustomMemo from '@/app/utils/CMemo';

type Todo = { id: number; text: string };

type Action =
  | { type: 'ADD'; payload: string }
  | { type: 'REMOVE'; payload: number };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.payload }];
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('');

  // 메모이제이션 없이 필터링
  const nonMemoizedTodos = todos.filter((todo) => {
    console.log('Non-memoized filtering executed'); // 매번 실행 확인
    return todo.text.toLowerCase().includes(filter.toLowerCase());
  });

  // 메모이제이션을 통해 필터링
  const memoizedTodos = useCustomMemo(() => {
    console.log('Memoized filtering executed'); // 메모이제이션 실행 확인
    return todos.filter((todo) =>
      todo.text.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [todos, filter]);

  const addTodo = () => {
    if (inputText.trim() === '') return;
    dispatch({ type: 'ADD', payload: inputText });
    setInputText('');
  };

  const removeTodo = (id: number) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>할 일 목록</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="해야 할 일을 입력하세요"
          style={{ marginRight: '10px', padding: '5px', width: '300px' }}
        />
        <button onClick={addTodo} style={{ padding: '5px 10px' }}>
          등록
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="필터링할 텍스트 입력"
          style={{ marginRight: '10px', padding: '5px', width: '300px' }}
        />
        <span>필터링된 항목: {memoizedTodos.length}</span>
      </div>

      <h3>비교 결과:</h3>
      <p>Non-Memoized Todos:</p>
      <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
        {nonMemoizedTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '10px', flexGrow: 1 }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ol>

      <p>Memoized Todos:</p>
      <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
        {memoizedTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '10px', flexGrow: 1 }}>
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              style={{
                padding: '5px 10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
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
