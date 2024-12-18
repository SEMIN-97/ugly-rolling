import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useFetchUserById } from '../../hooks/useUsers.ts';
import { CommonLayout } from '../../layouts/CommonLayout.tsx';
import { Button } from '../../components/Button/Button.tsx';
import { Typography } from '../../components/Typography/Typography.tsx';
import { AddMessageModal } from './-components/AddMessageModal.tsx';
import { useMessageStore } from './-stores/-messageStore.ts';
import styles from './index.module.scss';

export const Route = createLazyFileRoute('/sweaters/$id')({
  component: RouteComponent
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isLoading, error } = useFetchUserById(Number(id));
  const { setMessage, ornament, setOrnament, setReceiver } = useMessageStore();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isAddMessageStep, setIsAddMessageStep] = useState(false);

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
    setIsAddMessageStep(isAddMessage);

    if (!isAddMessage) {
      resetModalState();
    }
  };

  const resetModalState = () => {
    setMessage('');
    setOrnament(null);
  };

  const confirmAddMessage = () => {
    setIsAddMessageStep(false);
    resetModalState();
  };

  const cancelAddMessage = () => {
    setIsAddMessageStep(false);
    resetModalState();
  };

  return (
    <>
      <CommonLayout>
        <div className={styles.pageContainer}>
          <div className={styles.titleContainer}>
            <Typography as="h1" bold>{ nickname }님의 스웨터</Typography>
            <p className={styles.description}>
              <span className={styles.badge}>WISH</span>
              <span>{ nickname }님의 한마디</span>
            </p>
          </div>
          <div className={styles.sweaterContainer}>
            <img src={`/src/assets/images/sweaters/${data.sweater_type}.png`} alt=""/>
            {
              isAddMessageStep && (
                <div>
                  <div className={styles.newOrnament}>
                    <img src={`/src/assets/images/ornaments/${ornament}.png`} alt=""/>
                  </div>
                </div>
              )
            }
          </div>
          <div className={styles.buttonContainer}>
            {
              isAddMessageStep ? (
                <>
                  <Button label="취소" onClick={cancelAddMessage}/>
                  <Button label="확인" onClick={confirmAddMessage}/>
                </>
              ) : (
                <Button label="롤링페이퍼 남기기" onClick={handleModalOpen}/>
              )
            }
          </div>
        </div>
      </CommonLayout>
      {
        isShowAddModal && <AddMessageModal onClose={handleModalClose}/>
      }
    </>
  );
}
