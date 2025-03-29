describe('Deep Clone Function', () => {
  function deepClone(value: any): any {
    if (typeof value !== 'object' || value === null) {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map((item) => deepClone(item));
    }

    const result: any = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = deepClone(value[key]);
      }
    }
    return result;
  }

  test('기본 객체 복사', () => {
    const original = { a: 1, b: 2, c: 3 };
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  test('중첩된 객체 복사', () => {
    const original = {
      a: 1,
      b: {
        c: 2,
        d: { e: 3 },
      },
    };
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned.b).not.toBe(original.b);
    expect(cloned.b.d).not.toBe(original.b.d);
  });

  test('배열 복사', () => {
    const original = [1, [2, 3], [4, [5, 6]]] as const;
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned[1]).not.toBe(original[1]);
    expect(cloned[2][1]).not.toBe(original[2][1]);
  });

  test('복합 객체 복사', () => {
    const original = {
      a: [1, 2, { b: 3 }],
      c: { d: [4, 5] },
    };
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned.a).not.toBe(original.a);
    expect(cloned.a[2]).not.toBe(original.a[2]);
    expect(cloned.c).not.toBe(original.c);
    expect(cloned.c.d).not.toBe(original.c.d);
  });

  test('순환 참조가 없는 경우', () => {
    const obj1: { a: number; ref?: any } = { a: 1 };
    const obj2: { b: number; ref?: any } = { b: 2 };
    obj1.ref = obj2;
    obj2.ref = { c: 3 };

    const cloned = deepClone(obj1);
    expect(cloned).toEqual(obj1);
    expect(cloned.ref).not.toBe(obj1.ref);
  });
});
