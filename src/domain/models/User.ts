// 사용자 도메인 모델
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// 사용자 생성을 위한 DTO
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

// 사용자 업데이트를 위한 DTO
export interface UpdateUserDTO {
  name?: string;
  email?: string;
}
