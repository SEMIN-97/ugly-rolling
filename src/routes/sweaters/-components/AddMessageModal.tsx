import { FC, useState } from 'react';
import { Modal } from '../../../components/modal/modal.tsx';
import { Button } from '../../../components/Button/Button.tsx';
import { OrnamentType } from '../../../types/enum';
import { ornamentList } from '../../../models/ornamentList.ts';
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
  const [selectedOrnament, setSelectedOrnament] = useState<OrnamentType>(ornamentList[0]);

  const onClick = () => {
    console.log('');
  };

  const bodyContent = ornament ? (
    <InputMessage />
  ) : (
    <SelectOrnament
      selectedOrnament={selectedOrnament}
      setSelectedOrnament={setSelectedOrnament}
    />
  );

  return (
    <Modal
      body={bodyContent}
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