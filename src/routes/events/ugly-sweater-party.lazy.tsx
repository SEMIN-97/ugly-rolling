import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useFetchUserById } from '../../hooks/useUsers.ts';
import { CommonLayout } from '../../layouts/CommonLayout.tsx';
import { Button } from '../../components/Button/Button.tsx';
import { Typography } from '../../components/Typography/Typography.tsx';
import { useMessageStore } from '../sweaters/-stores/-messageStore.ts';
import { AddMessageModal } from '../sweaters/-components/AddMessageModal.tsx';
import styles from './ugly-sweater-party.module.scss';

export const Route = createLazyFileRoute('/events/ugly-sweater-party')({
  component: UglySweaterParty,
});

function UglySweaterParty() {
  const SWEATER_ID = 41;
  const { setMessage, setOrnament, setReceiver } = useMessageStore();
  const { data, isLoading, error } = useFetchUserById(SWEATER_ID);
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

  const handleModalClose = () => {
    setIsShowAddModal(false);
    closeAddMessage();
  };

  const resetModalState = () => {
    setMessage('');
    setOrnament(null);
  };

  const closeAddMessage = () => {
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
              <span>{ data.description }</span>
            </p>
          </div>
          <div className={styles.sweaterContainer}>
            <img src={`/src/assets/images/sweaters/${data.sweater_type}.png`} alt="" />
            {
              data.ornaments?.length && (
                data.ornaments.map(({ ornamentType }, index) => (
                  <button
                    className={styles.ornament}
                    key={`${ornamentType}${index}`}
                  >
                    <img
                      src={`/src/assets/images/ornaments/${ornamentType}_shadow.png`}
                      alt=""
                    />
                  </button>
                ))
              )
            }
          </div>
          <div className={styles.buttonContainer}>
            <Button label="메시지 남기기" onClick={handleModalOpen}/>
          </div>
        </div>
      </CommonLayout>
      {
        isShowAddModal && <AddMessageModal onClose={handleModalClose}/>
      }
    </>
  );
}
