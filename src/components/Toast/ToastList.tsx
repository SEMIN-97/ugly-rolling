import { FC } from 'react';
import { createPortal } from 'react-dom';
import { useToastStore } from '../../stores/toastStore.ts';
import { Toast } from './Toast.tsx';
import styles from './ToastList.module.scss';

export const ToastList: FC = () => {
  const { toasts } = useToastStore();

  if (!toasts?.length) {
    return null;
  }

  return createPortal(
    <div className={styles.ToastList}>
      {
        toasts.map(({ id, message }) => (
          <Toast
            key={id}
            message={message}
          />
        ))
      }
    </div>,
    document.body
  );
};