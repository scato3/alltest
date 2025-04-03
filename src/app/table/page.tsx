"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import DataTable, { Column } from "../components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  [key: string]: unknown; // 인덱스 시그니처 추가
}

// 가짜 데이터 생성 (실제로는 API 호출 등으로 대체)
const mockUsers: User[] = [
  {
    id: 1,
    name: "홍길동",
    email: "hong@example.com",
    role: "관리자",
    status: "active",
  },
  {
    id: 2,
    name: "김철수",
    email: "kim@example.com",
    role: "사용자",
    status: "active",
  },
  {
    id: 3,
    name: "이영희",
    email: "lee@example.com",
    role: "편집자",
    status: "inactive",
  },
  {
    id: 4,
    name: "박지원",
    email: "park@example.com",
    role: "사용자",
    status: "active",
  },
  {
    id: 5,
    name: "최민수",
    email: "choi@example.com",
    role: "사용자",
    status: "inactive",
  },
];

// 비동기 데이터 로딩 시뮬레이션
function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 1500);
  });
}

// 마운트 시 한 번만 실행되는 커스텀 훅
function useMountOnce(effect: () => void | (() => void)) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    return effect();
  }, [effect]);
}

export default function TablePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 렌더링 횟수 추적을 위한 참조
  console.log("TablePage 컴포넌트 렌더링");

  // 데이터 로딩 함수 메모이제이션
  const loadUsers = useCallback(async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("데이터 로딩 중 오류:", error);
      setLoading(false);
    }
  }, []);

  // 마운트 시 한 번만 실행
  useMountOnce(() => {
    console.log("useMountOnce 실행");
    loadUsers();
  });

  // 렌더러 함수 메모이제이션
  const statusRenderer = useCallback((value: unknown) => {
    const status = value as "active" | "inactive";

    return (
      <span
        style={{
          display: "inline-block",
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "12px",
          backgroundColor: status === "active" ? "#e6f7e6" : "#ffeaea",
          color: status === "active" ? "#2e7d32" : "#d32f2f",
        }}
      >
        {status === "active" ? "활성" : "비활성"}
      </span>
    );
  }, []);

  // 테이블 컬럼 정의 - 메모이제이션
  const columns = useMemo<Column<User>[]>(
    () => [
      { key: "id", label: "ID", width: "60px" },
      { key: "name", label: "이름" },
      { key: "email", label: "이메일" },
      { key: "role", label: "역할" },
      { key: "status", label: "상태", render: statusRenderer },
    ],
    [statusRenderer]
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>사용자 목록</h1>
      <DataTable<User>
        columns={columns}
        data={users}
        rowKey="id"
        loading={loading}
        emptyText="사용자 정보가 없습니다"
      />
    </div>
  );
}
