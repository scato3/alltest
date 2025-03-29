import { createContext, ReactNode, useState, useContext } from 'react';

interface SelectContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
}

const SelectContext = createContext<SelectContextType | null>(null);

export const Select = {
  Root: ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    return (
      <SelectContext.Provider
        value={{ isOpen, setIsOpen, selectedValue, setSelectedValue }}
      >
        {children}
      </SelectContext.Provider>
    );
  },

  Trigger: ({ placeholder = '선택하세요' }: { placeholder?: string }) => {
    const context = useContext(SelectContext);

    if (!context) {
      throw new Error('Trigger must be used within a Select.Root');
    }

    const { isOpen, setIsOpen, selectedValue } = context;

    return (
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedValue || placeholder}
      </button>
    );
  },

  List: ({ children }: { children: ReactNode }) => {
    const context = useContext(SelectContext);

    if (!context) throw new Error('에러');

    const { isOpen } = context;

    if (!isOpen) return null;

    return <div>{children}</div>;
  },

  Option: ({ value, children }: { value: string; children: ReactNode }) => {
    const context = useContext(SelectContext);
    if (!context) throw new Error('에러');

    const { setSelectedValue, setIsOpen } = context;

    return (
      <div
        onClick={() => {
          setSelectedValue(value);
          setIsOpen(false);
        }}
      >
        {children}
      </div>
    );
  },
};
