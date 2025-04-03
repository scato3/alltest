"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface PostData {
  title: string;
  content: string;
}

export default function PostPage() {
  const mutation = useMutation({
    mutationFn: async (newPost: PostData) => {
      const response = await axios.post("/api/posts", newPost);
      return response.data;
    },
  });

  const handleClick = () => {
    mutation.mutate({
      title: "테스트 제목",
      content: "테스트 내용",
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">게시물 생성 테스트</h1>
      <button
        onClick={handleClick}
        disabled={mutation.isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {mutation.isPending ? "처리 중..." : "게시물 생성"}
      </button>

      {mutation.isSuccess && (
        <div className="mt-4 text-green-500">
          게시물이 성공적으로 생성되었습니다!
        </div>
      )}
    </div>
  );
}
