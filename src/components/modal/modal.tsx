import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  body: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  body,
  footer,
  onClose
}) => {
  return createPortal(
    <div className={styles.dimmed} onClick={onClose}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button type="button" onClick={onClose}>X</button>
        </div>
        <div className={styles.body}>
          { body }
        </div>
        <div className={styles.footer}>
          { footer }
        </div>
      </div>
    </div>,
    document.body
  );
};