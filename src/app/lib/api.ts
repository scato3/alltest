import { cookies } from "next/headers";
import Api from "hs-fetch";

// 서버에서 쿠키를 읽고 바로 Api 객체 생성
const cookieStore = cookies(); // 서버에서 쿠키 읽기
const token = cookieStore.get("auth-token")?.value || null; // 쿠키에서 "auth-token" 값을 가져와서 문자열로 변환

if (!token) {
  console.error("Token not found in cookies");
}

const api = new Api({
  baseUrl: "https://jsonplaceholder.typicode.com",
  authorizationType: "Bearer",
  getToken: () => token, // 서버에서 받은 토큰을 사용
});

export default api;
