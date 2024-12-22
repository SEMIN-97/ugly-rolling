import { FC, ReactNode, useEffect } from 'react';
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
  useEffect(() => {
    document.body.classList.add('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return createPortal(
    <div className={styles.dimmed} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}>
              <img src="/assets/images/close.png" alt="닫기 버튼" />
          </button>
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