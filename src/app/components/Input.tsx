'use client';

import React, { forwardRef } from 'react';
import styles from './Input.module.scss';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          {...props}
          ref={ref}
          className={`${styles.input} ${error ? styles.error : ''} ${
            className || ''
          }`}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
