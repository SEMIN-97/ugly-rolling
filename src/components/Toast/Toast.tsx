import { FC } from 'react';
import styles from './Toast.module.scss';

export interface ToastProps {
  message: string;
  duration?: number;
}

export const Toast: FC<ToastProps> = ({ message }) => {
  return (
    <div className={styles.toastContainer}>
      <p className={styles.message}>{ message }</p>
    </div>
  );
};