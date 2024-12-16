import { FC } from 'react';
import { Textarea } from '../../../components/Textarea/Textarea.tsx';
import { SubTitle } from '../../../components/Title/Title.tsx';
import styles from './AddMessageModal.module.scss';

interface InputMessageStepProps {
  receiver: string;
  messageInput: string;
  setMessageInput: (message: string) => void;
}

export const InputMessageStep: FC<InputMessageStepProps> = ({
  receiver,
  messageInput,
  setMessageInput
}) => {
  const handleMessageChange = (value: string) => {
    setMessageInput(value);
  };

  return (
    <div className={styles.modalContents}>
      <SubTitle bold>메시지를 작성해 주세요.</SubTitle>
      <Textarea
        value={messageInput}
        onChange={handleMessageChange}
        placeholder={`${receiver}님에게 하고싶은 말이나 응원의 메시지를 남겨주세요.`}
        maxLength={100}
        height={250}
      />
    </div>
  );
};