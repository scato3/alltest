import React, { createContext, useContext, useState } from 'react';

// Context 타입 정의
type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

// Context 생성
const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

// Context Hook
const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

// 메인 컴포넌트
const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div className="dropdown">{children}</div>
    </DropdownContext.Provider>
  );
};

// 하위 컴포넌트들
const Trigger = ({ children }: { children: React.ReactNode }) => {
  const { toggle } = useDropdown();
  return (
    <button onClick={toggle} className="dropdown-trigger">
      {children}
    </button>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, close } = useDropdown();
  if (!isOpen) return null;

  return (
    <div className="dropdown-content">
      {children}
      <button onClick={close} className="dropdown-close">
        닫기
      </button>
    </div>
  );
};

const Item = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  const { close } = useDropdown();
  
  const handleClick = () => {
    if (onClick) onClick();
    close();
  };

  return (
    <div onClick={handleClick} className="dropdown-item">
      {children}
    </div>
  );
};

// 컴포넌트 조합
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Item = Item;

export default Dropdown; 