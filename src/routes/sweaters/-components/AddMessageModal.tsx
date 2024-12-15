import { FC } from 'react';
import { Modal } from '../../../components/modal/modal.tsx';
import { Button } from '../../../components/Button/Button.tsx';
import { useMessageStore } from '../-stores/-messageStore.ts';
import { SelectOrnament } from './SelectOrnament.tsx';
import { InputMessage } from './InputMessage.tsx';

interface AddOrnamentModalProps {
  onClose?: () => void;
}

export const AddMessageModal: FC = ({
  onClose
}: AddOrnamentModalProps) => {
  const { ornament } = useMessageStore();
  const onClick = () => {
    console.log('');
  };

  return (
    <Modal
      body={
        ornament ? <InputMessage /> : <SelectOrnament />
      }
      footer={
        <Button
          label={ornament ? '작성 완료' : '다음'}
          onClick={onClick}
        />
      }
      onClose={onClose}
    />
  );
};