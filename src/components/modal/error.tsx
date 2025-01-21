import React from 'react';
import styles from './error.module.scss';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ message, onClose }: ErrorModalProps) {
  return (
    <div className={styles.error_modal_backdrop}>
      <div className={styles.error_modal}>
        <h2>에러 발생</h2>
        <p>{message}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
