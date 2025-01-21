import React from 'react';

type EqualityFn<P> = (
  prevProps: Readonly<P>,
  nextProps: Readonly<P>,
) => boolean;

function CMemoComponent<P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: EqualityFn<P>,
) {
  return class MemoizedComponent extends React.Component<P> {
    static displayName = `CMemo(${
      Component.displayName || Component.name || 'Component'
    })`;

    shouldComponentUpdate(nextProps: Readonly<P>): boolean {
      const compare = areEqual ?? defaultEqual;
      return !compare(this.props, nextProps);
    }

    render() {
      return <Component {...this.props} />;
    }
  };
}

function defaultEqual<P extends object>(prevProps: P, nextProps: P): boolean {
  if (Object.keys(prevProps).length !== Object.keys(nextProps).length) {
    return false; // 키 개수 다르면 바로 false
  }

  return Object.keys(prevProps).every((key) =>
    Object.is(prevProps[key as keyof P], nextProps[key as keyof P]),
  );
}

export default CMemoComponent;
