import { useEffect, useState } from 'react';
import styles from './Loading.module.css';

export default function Loading() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingText}>CodeLingo</div>
      <div className={styles.subtext}>Your Study Companion</div>
    </div>
  );
}