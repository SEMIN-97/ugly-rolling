import { useRef, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Ornament } from '../../types/database';
import { UpdateUserRequest } from '../../types/api';
import { useToastStore } from '../../stores/toastStore.ts';
import { useFetchUserById, useUpdateUser } from '../../hooks/useUsers.ts';
import { CommonLayout } from '../../layouts/CommonLayout.tsx';
import { Button } from '../../components/Button/Button.tsx';
import { Typography } from '../../components/Typography/Typography.tsx';
import { useMessageStore } from '../sweaters/-stores/-messageStore.ts';
import { AddMessageModal } from '../sweaters/-components/AddMessageModal.tsx';
import { ViewMessageModal } from '../sweaters/-components/ViewMessageModal.tsx';
import styles from './ugly-sweater-party.module.scss';
import { DraggableOrnament } from '../sweaters/-components/DraggableOrnament.tsx';

export const Route = createLazyFileRoute('/events/ugly-sweater-party')({
  component: UglySweaterParty,
});

function UglySweaterParty() {
  const SWEATER_ID = 41;
  const draggableContainerRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToastStore();
  const { message, setMessage, ornament, setOrnament, setReceiver, author } = useMessageStore();
  const { data, isLoading, error, refetch } = useFetchUserById(SWEATER_ID);
  const { mutateAsync } = useUpdateUser();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowViewModal, setIsShowViewModal] = useState(false);
  const [isAddMessageStep, setIsAddMessageStep] = useState(false);
  const [selectedOrnament, setSelectedOrnament] = useState<Ornament | null>(null);
  const [draggableBoundary, setDraggableBoundary] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (isLoading) {
    return <div>isLoading</div>;
  }

  if (error || !data) {
    return <div>404 Error</div>;
  }

  const nickname = data.nickname || '알 수 없음';

  const addMessage = async () => {
    try {
      const newOrnament: Ornament = {
        ornamentType: ornament!,
        content: message,
        positionX: `${((position.x / draggableBoundary.width) * 100).toFixed(2)}%`,
        positionY: `${((position.y / draggableBoundary.height) * 100).toFixed(2)}%`,
        author: {
          id: 0,
          nickname: author
        }
      };

      console.log(position.x, draggableBoundary.width, newOrnament.positionX)
      const updateData: UpdateUserRequest = {
        ornaments: data.ornaments ? [...data.ornaments, newOrnament] : [newOrnament]
      };

      await mutateAsync({ id: SWEATER_ID, user: updateData });
      setIsAddMessageStep(false);
      resetModalState();
      await refetch();
    } catch (e) {
      addToast({ message: '메시지 추가에 실패했습니다.' });
      console.error(e);
    }
  };

  const handleAddModalOpen = () => {
    setIsShowAddModal(true);
    setReceiver(nickname);
  };

  const handleAddModalClose = async (isAddMessage: boolean) => {
    if (isAddMessage) {
      setIsShowAddModal(false);
      setIsAddMessageStep(isAddMessage);
      return;
    }

    closeAddMessage();
  };

  const resetModalState = () => {
    setMessage('');
    setOrnament(null);
  };

  const closeAddMessage = () => {
    setIsShowAddModal(false);
    resetModalState();
  };
  
  const handleViewModalOpen = (ornament: Ornament) => {
    setSelectedOrnament(ornament);
    setIsShowViewModal(true);
  };

  const handleViewModalClose = () => {
    setIsShowViewModal(false);
  };

  const handleImageLoad = () => {
    if (!draggableContainerRef.current) {
      return;
    }

    const { offsetWidth, offsetHeight } = draggableContainerRef.current;
    setDraggableBoundary({ width: offsetWidth, height: offsetHeight });
  };

  return (
    <>
      <CommonLayout>
        <div className={styles.pageContainer}>
          <div className={styles.titleContainer}>
            <Typography as="h1" bold>{nickname}님의 스웨터</Typography>
            <p className={styles.description}>
              <span className={styles.badge}>WISH</span>
              <span>{data.description}</span>
            </p>
          </div>
          <div
            className={styles.sweaterContainer}
            ref={draggableContainerRef}
          >
            <img
              src={`/assets/images/sweaters/${data.sweater_type}.png`}
              alt=""
              onLoad={handleImageLoad}
            />
            {
              data.ornaments?.length && (
                data.ornaments.map((ornament, index) => (
                  <button
                    className={styles.ornament}
                    key={`${ornament.ornamentType}${index}`}
                    style={{
                      top: ornament.positionY,
                      left: ornament.positionX
                    }}
                    onClick={() => handleViewModalOpen(ornament)}
                  >
                    <img
                      src={`/assets/images/ornaments/${ornament.ornamentType}.png`}
                      alt=""
                    />
                  </button>
                ))
              )
            }
            {
              isAddMessageStep && (
                <DraggableOrnament
                  position={position}
                  onPositionChange={setPosition}
                  boundaryWidth={draggableBoundary.width}
                  boundaryHeight={draggableBoundary.height}
                >
                  <img src={`/assets/images/ornaments/${ornament}.png`} alt=""/>
                </DraggableOrnament>
              )
            }
          </div>
          <div className={styles.buttonContainer}>
            {
              isAddMessageStep ? (
                <>
                  <Button label="취소" onClick={closeAddMessage}/>
                  <Button label="확인" onClick={addMessage}/>
                </>
              ) : (
                <Button label="메시지 남기기" onClick={handleAddModalOpen}/>
              )
            }
          </div>
        </div>
      </CommonLayout>
      {
        isShowAddModal &&
        <AddMessageModal onClose={handleAddModalClose} messagePlaceholder="파티에 참석한 소감이나 신년 소망 등 자유롭게 작성해주세요."/>
      }
      {
        isShowViewModal && <ViewMessageModal onClose={handleViewModalClose} ornament={selectedOrnament}/>
      }
    </>
  );
}
