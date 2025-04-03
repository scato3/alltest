'use client';

import { Select } from './compound';

export default function PatternPage() {
  return (
    <Select.Root>
      <Select.Trigger />
      <Select.List>
        <Select.Option value="1">Item 1</Select.Option>
        <Select.Option value="2">Item 2</Select.Option>
        <Select.Option value="3">Item 3</Select.Option>
      </Select.List>
    </Select.Root>
  );
}
