import { FC } from 'react';
import { useToastStore } from '../../stores/toastStore.ts';
import { Toast } from './Toast.tsx';
import styles from './ToastList.module.scss';

export const ToastList: FC = () => {
  const { toasts } = useToastStore();

  return (
    <div className={styles.ToastList}>
      {
        toasts.map(({ id, message }) => (
          <Toast
            key={id}
            message={message}
          />
        ))
      }
    </div>
  );
};