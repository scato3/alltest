import { getCookie } from 'cookies-next';
import Api from 'hs-fetch';

const api = new Api({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  authorizationType: 'Bearer',
  getToken: async () => {
    // cookies-next의 getCookie를 사용하여 쿠키 가져오기
    const token = getCookie('auth-token') as string | null;

    if (!token) {
      console.error('Token not found in cookies');
    }

    return token;
  },
});

export default api;
