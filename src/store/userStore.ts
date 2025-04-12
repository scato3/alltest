import { createStore } from 'hsc-store';

// 사용자 상태 타입 정의
interface UserState {
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
    role: 'admin' | 'user' | null;
  };
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// 사용자 스토어 생성
export const useUserStore = createStore<UserState>((setState) => ({
  // 초기 상태
  user: {
    id: null,
    name: null,
    email: null,
    role: null,
  },
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // 액션들
  login: async (email: string, password: string) => {
    setState({ isLoading: true, error: null });

    try {
      // API 호출 (실제로는 fetch 등으로 구현)
      // const response = await fetch('/api/login', ...);
      // const data = await response.json();

      // 예시 데이터
      const data = {
        id: '1',
        name: '홍길동',
        email,
        role: 'user' as const,
      };

      // 로그인 성공
      setState({
        user: data,
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } catch (error) {
      // 로그인 실패
      setState({
        isLoading: false,
        error:
          error instanceof Error ? error.message : '로그인에 실패했습니다.',
      });

      return false;
    }
  },

  logout: () => {
    setState({
      user: {
        id: null,
        name: null,
        email: null,
        role: null,
      },
      isAuthenticated: false,
    });
  },

  updateProfile: (userData: Partial<UserState['user']>) => {
    setState((state) => ({
      user: {
        ...state.user,
        ...userData,
      },
    }));
  },
}));
