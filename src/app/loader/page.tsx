import AsyncComponent from "./AsyncComponent";

export default function Page() {
  return (
    <div>
      <h1>Suspense 로딩 테스트</h1>
      <AsyncComponent />
    </div>
  );
}
