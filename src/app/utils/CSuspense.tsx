'use client';

import { Component, ReactNode } from 'react';

interface SuspenseProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface SuspenseState {
  pending: boolean;
  error?: any;
}

export const createResource = (promise: Promise<any>) => {
  let status = 'pending';
  let result: any;

  const suspender = promise.then(
    (response) => {
      status = 'success';
      result = response;
    },
    (error) => {
      status = 'error';
      result = error;
    },
  );

  return {
    read() {
      switch (status) {
        case 'pending':
          throw { suspender, status };
        case 'error':
          throw result;
        default:
          return result;
      }
    },
  };
};

class CSuspense extends Component<SuspenseProps, SuspenseState> {
  private mounted = false;
  state: SuspenseState = {
    pending: false,
  };

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidCatch(thrownValue: any) {
    if (!this.mounted) return;

    // suspender와 status를 포함한 객체가 throw되었는지 확인
    if (thrownValue?.suspender && thrownValue?.status === 'pending') {
      this.setState({ pending: true });

      thrownValue.suspender.then(
        () => {
          if (this.mounted) {
            this.setState({ pending: false });
          }
        },
        (error: Error) => {
          if (this.mounted) {
            this.setState({ error, pending: false });
          }
        },
      );
    } else {
      throw thrownValue;
    }
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    return this.state.pending ? this.props.fallback : this.props.children;
  }
}

export default CSuspense;
