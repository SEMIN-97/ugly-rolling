import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { CommonLayout } from '../../layouts/CommonLayout.tsx';
import { Button } from '../../components/Button/Button.tsx';
import { AddMessageModal } from './-components/AddMessageModal.tsx';
import { useMessageStore } from './-stores/-messageStore.ts';
import styles from './index.module.scss';

export const Route = createLazyFileRoute('/sweaters/$id')({
  component: RouteComponent
});

function RouteComponent() {
  const { setMessage, setOrnament, setReceiver } = useMessageStore();
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  const handleModalOpen = () => {
    setIsShowAddModal(true);
    // TODO: 전역 store에 있는 닉네임을 전달해야함
    setReceiver('닉네임');
  };

  const handleModalClose = () => {
    setIsShowAddModal(false);
    resetModalState();
  };
  
  const resetModalState = () => {
    setMessage('');
    setOrnament(null);
  };

  return (
    <>
      <CommonLayout>
        <div className={styles.pageContainer}>
          <div className={styles.titleContainer}>
            <h1>닉네임님의 스웨터</h1>
            <p className={styles.description}>
              <span className={styles.badge}>WISH</span>
              <span>닉네임님의 한마디</span>
            </p>
          </div>
          <div className={styles.sweaterContainer}>

          </div>
          <Button label="롤링페이퍼 남기기" onClick={handleModalOpen}/>
        </div>
      </CommonLayout>
      {
        isShowAddModal && <AddMessageModal onClose={handleModalClose}/>
      }
    </>
  );
}
