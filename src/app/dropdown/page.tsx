"use client";

import Dropdown from "@/components/Dropdown";

export default function DropdownPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dropdown 예제</h1>
      
      <Dropdown>
        <Dropdown.Trigger>
          메뉴 열기
        </Dropdown.Trigger>
        
        <Dropdown.Content>
          <Dropdown.Item onClick={() => console.log("메뉴 1 클릭")}>
            메뉴 1
          </Dropdown.Item>
          <Dropdown.Item onClick={() => console.log("메뉴 2 클릭")}>
            메뉴 2
          </Dropdown.Item>
          <Dropdown.Item onClick={() => console.log("메뉴 3 클릭")}>
            메뉴 3
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
} 