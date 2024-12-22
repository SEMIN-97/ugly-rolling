import { FC, useEffect, useState } from 'react';
import { OrnamentType } from '../../../types/enum';
import { useToastStore } from '../../../stores/toastStore.ts';
import { Modal } from '../../../components/modal/modal.tsx';
import { Button } from '../../../components/Button/Button.tsx';
import { useMessageStore } from '../-stores/-messageStore.ts';
import { SelectOrnamentStep } from './SelectOrnamentStep.tsx';
import { InputMessageStep } from './InputMessageStep.tsx';

interface AddOrnamentModalProps {
  onClose: (isAddMessage: boolean) => void;
  messagePlaceholder?: string;
}

export const AddMessageModal: FC<AddOrnamentModalProps> = ({
  onClose,
  messagePlaceholder
}: AddOrnamentModalProps) => {
  const ornamentList = Object.values(OrnamentType);
  const { ornament, setOrnament, setMessage, receiver, setAuthor } = useMessageStore();
  const addToast = useToastStore(state => state.addToast);
  const [selectedOrnament, setSelectedOrnament] = useState<OrnamentType>(ornamentList[0]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    setMessage(messageInput);
    setAuthor(nickname);
  }, [messageInput, nickname, setAuthor, setMessage]);

  const handleClickNextButton = () => {
    setOrnament(selectedOrnament);
  };

  const handleSubmit = () => {
    if (messageInput?.length < 5) {
      addToast({ message: '메시지는 최소 5자 이상 작성해 주세요.' });
      return;
    }

    if (!nickname.length) {
      addToast({ message: `닉네임을 입력해 주세요.` });
      return;
    }

    setMessage(messageInput);
    setAuthor(nickname);

    onClose(true);
  };

  const bodyContent = ornament ? (
    <InputMessageStep
      messageInput={messageInput}
      setMessageInput={setMessageInput}
      receiver={receiver}
      nickname={nickname}
      setNickname={setNickname}
      messagePlaceholder={messagePlaceholder}
    />
  ) : (
    <SelectOrnamentStep
      ornamentList={ornamentList}
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
      onClose={() => onClose(false)}
    />
  );
};