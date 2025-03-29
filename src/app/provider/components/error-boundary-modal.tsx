'use client';

import { ErrorModal } from './error-modal';
import { useQueryClient } from '@tanstack/react-query';

interface ErrorBoundaryModalProps {
  error: Error;
  onClose: () => void;
}

export function ErrorBoundaryModal({ error, onClose }: ErrorBoundaryModalProps) {
  const queryClient = useQueryClient();

  return (
    <ErrorModal 
      message={error.message}
      onClose={() => {
        queryClient.clear();
        onClose();
      }}
    />
  );
} 