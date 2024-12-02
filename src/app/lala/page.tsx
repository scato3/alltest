import { test } from "../api/test";

export default async function Page() {
  // 서버에서 데이터를 비동기적으로 가져옴
  const posts = await test();

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
