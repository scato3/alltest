import { z } from 'zod';

export const validations = {
  required: z.string().min(1, '이 필드는 필수입니다.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(8, '최소 8자 이상 입력해주세요.')
    .max(20, '최대 20자까지 입력 가능합니다.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      '영문, 숫자, 특수문자를 모두 포함해야 합니다.',
    ),
  requiredEmail: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
};
