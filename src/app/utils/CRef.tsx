type MutableRefObject<T> = {
  current: T;
};

// 컴포넌트별 refs 저장소
const refs = new Map<number, MutableRefObject<any>[]>();
let componentId = 0;
let hookIndex = 0;

// 컴포넌트 렌더링 시작시 초기화
export function startRender() {
  hookIndex = 0;
  if (refs.size === 0) {
    componentId++;
  }
}

export default function useCustomRef<T>(initialValue: T): MutableRefObject<T> {
  // 첫 훅 호출시 초기화
  if (hookIndex === 0) {
    startRender();
  }

  // 현재 훅의 인덱스
  const currentHookIndex = hookIndex++;

  // 컴포넌트의 refs 배열 초기화
  if (!refs.has(componentId)) {
    refs.set(componentId, []);
  }

  const componentRefs = refs.get(componentId)!;

  // 해당 인덱스의 ref가 없으면 생성
  if (!componentRefs[currentHookIndex]) {
    componentRefs[currentHookIndex] = { current: initialValue };
  }

  return componentRefs[currentHookIndex];
}
