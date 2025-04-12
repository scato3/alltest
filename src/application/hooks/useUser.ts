import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User, CreateUserDTO, UpdateUserDTO } from '../../domain/models/User';
import { userApi } from '../../infrastructure/api/userApi';
import { userService } from '../../domain/services/userService';

export function useUser() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  // 사용자 목록 조회
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
  });

  // 사용자 생성
  const createUserMutation = useMutation({
    mutationFn: (data: CreateUserDTO) => {
      // 도메인 서비스를 통한 유효성 검사
      if (!userService.validateEmail(data.email)) {
        throw new Error('Invalid email format');
      }

      if (!userService.validatePassword(data.password)) {
        throw new Error('Password does not meet security requirements');
      }

      return userApi.createUser(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  // 사용자 업데이트
  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDTO }) => {
      if (data.email && !userService.validateEmail(data.email)) {
        throw new Error('Invalid email format');
      }

      return userApi.updateUser(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  // 사용자 삭제
  const deleteUserMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  // 권한 확인 함수
  const checkPermission = useCallback((user: User, action: string) => {
    return userService.canUserPerformAction(user, action);
  }, []);

  return {
    users,
    isLoadingUsers,
    error,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    checkPermission,
  };
}
