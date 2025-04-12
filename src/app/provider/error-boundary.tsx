'use client';

import { useModal } from './modal-provider';
import { Component, ReactNode } from 'react';
import { ErrorModalHandler } from '../utils/ErrorModalHandler';

interface Props {
  children: ReactNode;
}

class ErrorBoundaryClass extends Component<
  Props & ReturnType<typeof useModal>
> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  private renderErrorModal(error: Error) {
    return ErrorModalHandler(error, this.props.closeModal);
  }

  componentDidCatch(error: Error) {
    this.props.openModal(this.renderErrorModal(error));
  }

  render() {
    return this.props.children;
  }
}

export function ErrorBoundary({ children }: Props) {
  const { openModal, closeModal } = useModal();
  return (
    <ErrorBoundaryClass openModal={openModal} closeModal={closeModal}>
      {children}
    </ErrorBoundaryClass>
  );
}
