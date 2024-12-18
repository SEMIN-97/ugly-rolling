import { useRef, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useFetchUserById } from '../../hooks/useUsers.ts';
import { CommonLayout } from '../../layouts/CommonLayout.tsx';
import { Button } from '../../components/Button/Button.tsx';
import { Typography } from '../../components/Typography/Typography.tsx';
import { useMessageStore } from './-stores/-messageStore.ts';
import { AddMessageModal } from './-components/AddMessageModal.tsx';
import { DraggableOrnament } from './-components/DraggableOrnament.tsx';
import styles from './index.module.scss';

export const Route = createLazyFileRoute('/sweaters/$id')({
  component: RouteComponent
});

function RouteComponent() {
  const { id } = Route.useParams();
  const draggableContainerRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useFetchUserById(Number(id));
  const { setMessage, ornament, setOrnament, setReceiver } = useMessageStore();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isAddMessageStep, setIsAddMessageStep] = useState(false);
  const [draggableBoundary, setDraggableBoundary] = useState({ width: 0, height: 0 });

  const handleImageLoad = () => {
    if (!draggableContainerRef.current) {
      return;
    }

    const { offsetWidth, offsetHeight } = draggableContainerRef.current;
    setDraggableBoundary({ width: offsetWidth, height: offsetHeight });
  };

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
          <div
            className={styles.sweaterContainer}
            ref={draggableContainerRef}
          >
            <img
              src={`/src/assets/images/sweaters/${data.sweater_type}.png`}
              alt=""
              onLoad={handleImageLoad}
            />
            {
              isAddMessageStep && (
                <DraggableOrnament
                  boundaryWidth={draggableBoundary.width}
                  boundaryHeight={draggableBoundary.height}
                >
                  <img src={`/src/assets/images/ornaments/${ornament}.png`} alt=""/>
                </DraggableOrnament>
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
