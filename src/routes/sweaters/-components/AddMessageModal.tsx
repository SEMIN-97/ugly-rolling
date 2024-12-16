import { FC, useState } from 'react';
import { OrnamentType } from '../../../types/enum';
import { useToastStore } from '../../../stores/toastStore.ts';
import { ornamentList } from '../../../models/ornamentList.ts';
import { Modal } from '../../../components/modal/modal.tsx';
import { Button } from '../../../components/Button/Button.tsx';
import { useMessageStore } from '../-stores/-messageStore.ts';
import { SelectOrnamentStep } from './SelectOrnamentStep.tsx';
import { InputMessageStep } from './InputMessageStep.tsx';

interface AddOrnamentModalProps {
  onClose: () => void;
}

export const AddMessageModal: FC<AddOrnamentModalProps> = ({
  onClose
}: AddOrnamentModalProps) => {
  const { ornament, setOrnament, setMessage, receiver } = useMessageStore();
  const addToast = useToastStore(state => state.addToast);
  const [selectedOrnament, setSelectedOrnament] = useState<OrnamentType>(ornamentList[0]);
  const [messageInput, setMessageInput] = useState<string>('');

  const handleClickNextButton = () => {
    setOrnament(selectedOrnament);
  };

  const handleSubmit = () => {
    if (messageInput?.length < 5) {
      addToast({ message: '최소 5자 이상 작성해 주세요.' });
      return;
    }

    setMessage(messageInput);
    onClose();
  };

  const bodyContent = ornament ? (
    <InputMessageStep
      messageInput={messageInput}
      setMessageInput={setMessageInput}
      receiver={receiver}
    />
  ) : (
    <SelectOrnamentStep
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