import { FC, useState } from 'react';
import { Modal } from '../../../components/modal/modal.tsx';
import { Button } from '../../../components/Button/Button.tsx';
import { OrnamentType } from '../../../types/enum';
import { ornamentList } from '../../../models/ornamentList.ts';
import { useMessageStore } from '../-stores/-messageStore.ts';
import { SelectOrnament } from './SelectOrnament.tsx';
import { InputMessage } from './InputMessage.tsx';

interface AddOrnamentModalProps {
  onClose: () => void;
}

export const AddMessageModal: FC<AddOrnamentModalProps> = ({
  onClose
}: AddOrnamentModalProps) => {
  const { ornament, setOrnament, setMessage } = useMessageStore();
  const [selectedOrnament, setSelectedOrnament] = useState<OrnamentType>(ornamentList[0]);
  const [messageInput, setMessageInput] = useState<string>('');

  const handleClickNextButton = () => {
    setOrnament(selectedOrnament);
  };

  const handleSubmit = () => {
    setMessage(messageInput);
    onClose();
  };

  const bodyContent = ornament ? (
    <InputMessage
      messageInput={messageInput}
      setMessageInput={setMessageInput}
    />
  ) : (
    <SelectOrnament
      selectedOrnament={selectedOrnament}
      setSelectedOrnament={setSelectedOrnament}
    />
  );

  const footerContent = ornament ? (
    <Button label="작성 완료" onClick={handleSubmit} />
  ) : (
    <Button label="다음" onClick={handleClickNextButton} />
  );

  return (
    <Modal
      body={bodyContent}
      footer={footerContent}
      onClose={onClose}
    />
  );
};