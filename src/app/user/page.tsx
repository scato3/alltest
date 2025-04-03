'use client';

import React, { useState } from 'react';
import { CreateUserDTO } from '@/domain/models/User';
import { useUser } from '@/application/hooks/useUser';
import { userService } from '@/domain/services/userService';
import { useCounterStore } from '@/store/counterStore';

export default function UsersPage() {
  const { createUser, error } = useUser();
  const [formData, setFormData] = useState<CreateUserDTO>({
    name: '',
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { count, a } = useCounterStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 입력 필드 변경 시 해당 필드의 유효성 검사 오류 초기화
    setValidationErrors([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 제출 전 유효성 검사 수행
    const emailValidation = userService.validateEmailWithErrors(formData.email);
    const passwordValidation = userService.validatePasswordWithErrors(
      formData.password,
    );

    // 유효성 검사 오류 수집
    const errors = [
      ...(!emailValidation.isValid ? emailValidation.errors : []),
      ...(!passwordValidation.isValid ? passwordValidation.errors : []),
    ];

    if (errors.length > 0) {
      // 유효성 검사 오류가 있으면 표시하고 제출 중단
      setValidationErrors(errors);
      return;
    }

    // 유효성 검사 통과 시 사용자 생성 요청
    createUser(formData);
  };

  return (
    <div>
      <h1>Users Management</h1>
      <p>{count}</p>
      <p>{a}</p>

      {error && <div className="error">{error}</div>}

      {/* 유효성 검사 오류 표시 */}
      {validationErrors.length > 0 && (
        <div className="validation-errors">
          <ul>
            {validationErrors.map((err, index) => (
              <li key={index} className="error">
                {err}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="create-user-form">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
}
