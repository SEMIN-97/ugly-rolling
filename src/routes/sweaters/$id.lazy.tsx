import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useFetchUserById } from '../../hooks/useUsers.ts';
import { CommonLayout } from '../../layouts/CommonLayout.tsx';
import { Button } from '../../components/Button/Button.tsx';
import { AddMessageModal } from './-components/AddMessageModal.tsx';
import { useMessageStore } from './-stores/-messageStore.ts';
import styles from './index.module.scss';

export const Route = createLazyFileRoute('/sweaters/$id')({
  component: RouteComponent
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isLoading, error } = useFetchUserById(Number(id));
  const { setMessage, setOrnament, setReceiver } = useMessageStore();
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  if (isLoading) {
    return <div>isLoading</div>; 
  }

  if (error || !data) {
    return <div>404 Error</div>;
  }

  const nickname = data.nickname || '알 수 없음';
  const handleModalOpen = () => {
    setIsShowAddModal(true);
    setReceiver(nickname);
  };

  const handleModalClose = (isAddMessage: boolean) => {
    setIsShowAddModal(false);
    resetModalState();
    console.log(isAddMessage);
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
            <h1>{ nickname }님의 스웨터</h1>
            <p className={styles.description}>
              <span className={styles.badge}>WISH</span>
              <span>{ nickname }님의 한마디</span>
            </p>
          </div>
          <div className={styles.sweaterContainer}>
            <img src={`/src/assets/images/sweaters/${data.sweater_type}.png`} alt=""/>
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
