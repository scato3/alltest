import { createContext, useContext, useState, ReactNode } from 'react';

type SelectContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedValue: string;
  setSelectedValue: (selectedValue: string) => void;
};

const SelectContext = createContext<SelectContextType | null>(null);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      'Select 컴포넌트는 Select.Root 내부에서만 사용할 수 있습니다',
    );
  }
  return context;
};

export const Select = {
  Root: ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    return (
      <SelectContext.Provider
        value={{ isOpen, setIsOpen, selectedValue, setSelectedValue }}
      >
        {children}
      </SelectContext.Provider>
    );
  },

  Trigger: ({ placeholder = '선택해주세요' }: { placeholder?: string }) => {
    const { isOpen, setIsOpen, selectedValue } = useSelectContext();

    return (
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedValue || placeholder}
      </button>
    );
  },

  List: ({ children }: { children: ReactNode }) => {
    const { isOpen } = useSelectContext();

    if (!isOpen) return null;

    return <div>{children}</div>;
  },

  Option: ({ value, children }: { value: string; children: ReactNode }) => {
    const { setSelectedValue, setIsOpen } = useSelectContext();

    const handleClick = () => {
      setSelectedValue(value);
      setIsOpen(false);
    };

    return <button onClick={handleClick}>{children}</button>;
  },
};
