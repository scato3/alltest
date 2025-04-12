import api from '../lib/api';
import { useMutation } from '@tanstack/react-query';

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CusteomError';
  }
}

export async function test() {
  // beforeRequest를 통해 요청 전에 헤더 확인
  try {
    return await api.post({
      url: '/pasdjsadjasd',
      useToken: true,
      beforeRequest: (url: string, options: any) => {
        console.log('Request URL:', url); // 요청 URL을 출력
        console.log('Request Headers:', options.headers); // 요청 헤더를 출력
      },
    });
  } catch (error) {
    throw new CustomError((error as Error).message);
  }
}

export const useTest = () => {
  return useMutation({
    mutationFn: test,
  });
};
