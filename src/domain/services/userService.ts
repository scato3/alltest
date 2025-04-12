import { User } from '../models/User';
import { z } from 'zod';

// Zod 스키마 정의
const emailSchema = z.string().email('유효하지 않은 이메일 형식입니다');

const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
  .regex(/[a-z]/, '소문자를 포함해야 합니다')
  .regex(/[A-Z]/, '대문자를 포함해야 합니다')
  .regex(/\d/, '숫자를 포함해야 합니다')
  .regex(/[@$!%*?&]/, '특수문자를 포함해야 합니다');

// 도메인 서비스 - 비즈니스 규칙 구현
export const userService = {
  validateEmail(email: string): boolean {
    const result = emailSchema.safeParse(email);
    return result.success;
  },

  validatePassword(password: string): boolean {
    const result = passwordSchema.safeParse(password);
    return result.success;
  },

  // 유효성 검사 결과와 에러 메시지 함께 반환
  validateEmailWithErrors(email: string) {
    const result = emailSchema.safeParse(email);
    return {
      isValid: result.success,
      errors: result.success ? [] : [result.error.errors[0]?.message],
    };
  },

  validatePasswordWithErrors(password: string) {
    const result = passwordSchema.safeParse(password);
    return {
      isValid: result.success,
      errors: result.success ? [] : result.error.errors.map((e) => e.message),
    };
  },

  canUserPerformAction(user: User, action: string): boolean {
    if (user.role === 'admin') return true;

    // 특정 액션에 대한 권한 검사
    switch (action) {
      case 'edit_profile':
        return true;
      case 'delete_user':
        return false;
      default:
        return false;
    }
  },
};
