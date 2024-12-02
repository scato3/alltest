import api from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export async function test() {
  // beforeRequest를 통해 요청 전에 헤더 확인
  return await api.get({
    url: "/posts",
    useToken: true,
    beforeRequest: (url, options) => {
      console.log("Request URL:", url); // 요청 URL을 출력
      console.log("Request Headers:", options.headers); // 요청 헤더를 출력
    },
  });
}

export const useTest = () => {
  return useQuery({
    queryKey: ["test"],
    queryFn: () => test(),
    staleTime: 100000,
  });
};
