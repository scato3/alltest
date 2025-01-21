'use client';

import { Input } from './Input';
import { useState } from 'react';

type FormErrors = {
  email?: string;
  password?: string;
  requiredEmail?: string;
};

export function Form({ action }: { action: any }) {
  const [errors, setErrors] = useState<FormErrors>({});

  return (
    <form
      action={async (formData) => {
        const result = await action(formData);
        if (result?.errors) {
          setErrors(result.errors);
        } else {
          setErrors({});
        }
      }}
      className="space-y-4"
    >
      <Input
        label="이메일"
        name="email"
        placeholder="이메일을 입력하세요"
        error={errors.email}
      />

      <Input
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호를 입력하세요"
        error={errors.password}
      />

      <Input
        label="필수 이메일"
        name="requiredEmail"
        placeholder="이메일을 입력하세요"
        error={errors.requiredEmail}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        제출
      </button>
    </form>
  );
}
