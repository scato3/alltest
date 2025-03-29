'use client';

import styles from './style.module.scss';

export default function StyledNotPage() {
  const isServer = typeof window === 'undefined';
  console.log('Environment:', isServer ? 'Server' : 'Client');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>StyledNotPage</h1>
    </div>
  );
}
