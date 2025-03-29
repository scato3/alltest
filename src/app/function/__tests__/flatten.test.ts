describe('Flatten Function', () => {
  function flatten(arr: any[], depth: number = Infinity): any[] {
    if (depth === 0) return arr;

    return arr.reduce((flat, current) => {
      if (Array.isArray(current)) {
        return flat.concat(flatten(current, depth - 1));
      }
      return flat.concat(current);
    }, []);
  }

  test('기본 중첩 배열 평탄화', () => {
    expect(flatten([1, [2, 3], [4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('지정된 깊이까지만 평탄화', () => {
    expect(flatten([1, [2, 3, [4]]], 2)).toEqual([1, 2, 3, 4]);
    expect(flatten([1, [2, 3, [4]]], 1)).toEqual([1, 2, 3, [4]]);
  });

  test('빈 배열 처리', () => {
    expect(flatten([1, [], [2, []], []])).toEqual([1, 2]);
  });

  test('깊은 중첩 배열', () => {
    expect(flatten([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
  });

  test('depth가 0일 때는 원본 배열 반환', () => {
    expect(flatten([1, [2, 3]], 0)).toEqual([1, [2, 3]]);
  });
});
