'use client';

import { createResource } from '../../utils/CSuspense';

const fetchData = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('데이터 로딩이 완료되었습니다!');
    }, 2000);
  });

// 컴포넌트 외부에서 resource 생성
const resource = createResource(fetchData());

export default function Lalala() {
  try {
    const data = resource.read(); // 데이터 읽기 시도
    return <div>{data}</div>; // 성공하면 데이터 표시
  } catch (error) {
    throw error; // 실패하면 error를 상위로 전파
  }
}
