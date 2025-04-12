export default function RestPage() {
  const a = {
    comment: '댓글 내용',
    createdAt: '2023-06-15',
    kkk: '값1',
    gfff: '값2',
  };

  return (
    <div>
      <h1>RestPage</h1>
      <ChildComponent {...a} />
    </div>
  );
}

interface ChildProps {
  comment: string;
  createdAt: string;
  kkk: string;
  gfff: string;
}

function ChildComponent({ comment, createdAt, kkk, gfff }: ChildProps) {
  return (
    <div>
      <p>댓글: {comment}</p>
      <p>작성일: {createdAt}</p>
      <p>KKK: {kkk}</p>
      <p>GFFF: {gfff}</p>
    </div>
  );
}

// 기본값 설정 예시 (참고용)
// function ChildComponentWithDefaults({
//   comment = "기본 댓글",
//   createdAt,
//   kkk,
//   gfff
// }: Partial<ChildProps>) {
//   return (/* ... */);
// }
