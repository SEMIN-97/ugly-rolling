import { useRef, useState } from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Ornament } from '../../types/database';
import { UpdateUserRequest } from '../../types/api';
import useUserStore from '../../stores/userStore.ts';
import { useToastStore } from '../../stores/toastStore.ts';
import { useFetchUserById, useUpdateUser } from '../../hooks/useUsers.ts';
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
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetchUserById(Number(id));
  const { user } = useUserStore();
  const { addToast } = useToastStore();
  const { message, setMessage, ornament, setOrnament, setReceiver } = useMessageStore();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isAddMessageStep, setIsAddMessageStep] = useState(false);
  const [draggableBoundary, setDraggableBoundary] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { mutateAsync } = useUpdateUser();
  
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

  const confirmAddMessage = async () => {
    try {
      if (!user.id || !user.nickname) {
        addToast({ message: '로그인이 필요한 서비스입니다.' });
        return await navigate({ to: '/login' });
      }

      const newOrnament: Ornament = {
        ornamentType: ornament!,
        content: message,
        positionX: `${((position.x / draggableBoundary.width) * 100).toFixed(2)}%`,
        positionY: `${((position.y / draggableBoundary.height) * 100).toFixed(2)}%`,
        author: {
          id: user.id,
          nickname: user.nickname
        }
      };

      const updateData: UpdateUserRequest = {
        ornaments: data.ornaments ? [...data.ornaments, newOrnament] : [newOrnament]
      };

      await mutateAsync({ id, user: updateData });
      setIsAddMessageStep(false);
      resetModalState();
    } catch (e) {
      addToast({ message: '메시지 추가에 실패했습니다.' });
      console.error(e);
    }
  };

  const cancelAddMessage = () => {
    setIsAddMessageStep(false);
    resetModalState();
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
              data.ornaments?.length && (
                data.ornaments.map(({ ornamentType, positionX, positionY }) => (
                  <button
                    className={styles.ornament}
                    key={`${ornamentType}${positionX}${positionY}`}
                    style={{
                      top: positionX,
                      left: positionY
                    }}
                  >
                    <img
                      src={`/src/assets/images/ornaments/${ornamentType}.png`}
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
