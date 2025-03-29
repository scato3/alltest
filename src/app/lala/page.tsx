'use client';

import { useTest } from '../api/test';

export default function Page() {
  const { mutate, data: posts } = useTest();

  const handleClick = () => {
    mutate();
  };

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={handleClick}>Run Mutation</button>
      {posts && (
        <ul>
          {posts.map((post: { id: number; title: string }) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
