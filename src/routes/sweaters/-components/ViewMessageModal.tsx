import { FC } from 'react';
import { Ornament } from '../../../types/database';
import { Modal } from '../../../components/modal/modal.tsx';
import { Button } from '../../../components/Button/Button.tsx';
import { Typography } from '../../../components/Typography/Typography.tsx';
import styles from './AddMessageModal.module.scss';

interface ViewMessageModalProps {
  ornament: Ornament | null;
  onClose: () => void;
}

export const ViewMessageModal: FC<ViewMessageModalProps> = ({
  ornament,
  onClose
}: ViewMessageModalProps) => {
  const bodyContent = ornament ? (
    <div className={styles.inputContainer}>
      <div className={styles.messageInfo}>
        <div className={styles.imageContainer}>
          <img src={`/src/assets/images/ornaments/${ornament.ornamentType}.png`} alt="" />
        </div>
        <Typography as="p" bold>From. <br/>{ornament.author.nickname}</Typography>
      </div>
      <pre className={styles.message}>
        { ornament.content }
      </pre>
    </div>
  ) : (
    <p>데이터를 찾을 수 없습니다.</p>
  );

  return (
    <Modal
      body={bodyContent}
      footer={
        <Button label="확인" onClick={onClose} />
      }
      onClose={onClose}
    />
  );
};