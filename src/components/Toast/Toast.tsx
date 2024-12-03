import { FC } from 'react';
import styles from './Toast.module.scss';

interface ToastProps {
  message: string;
}

export const Toast: FC<ToastProps> = ({ message }) => {
  return (
    <div className={styles.toastContainer}>
      <p className={styles.message}>{ message }</p>
    </div>
  );
};