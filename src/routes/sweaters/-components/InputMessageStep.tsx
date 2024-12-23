import { FC } from 'react';
import { Textarea } from '../../../components/Textarea/Textarea.tsx';
import { Typography } from '../../../components/Typography/Typography.tsx';
import styles from './AddMessageModal.module.scss';

interface InputMessageStepProps {
  receiver: string;
  messageInput: string;
  setMessageInput: (message: string) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  messagePlaceholder?: string;
}

export const InputMessageStep: FC<InputMessageStepProps> = ({
  receiver,
  messageInput,
  setMessageInput,
  nickname,
  setNickname,
  messagePlaceholder
}) => {
  const handleMessageChange = (value: string) => {
    setMessageInput(value);
  };

  const handleInputChange = (nickname: string) => {
    setNickname(nickname);
  };

  return (
    <div className={styles.modalContents}>
      <div className={styles.inputContainer}>
        <Typography as="p" bold>메시지를 작성해 주세요.</Typography>
        <Textarea
          value={messageInput}
          onChange={handleMessageChange}
          placeholder={messagePlaceholder || `${receiver}님에게 하고싶은 말이나 응원의 메시지를 남겨주세요.`}
          maxLength={100}
          height={250}
        />
      </div>
      <div className={styles.inputContainer}>
        <Typography as="p" bold>From.</Typography>
        <input
          value={nickname}
          onChange={e => handleInputChange(e.target.value)}
          placeholder='보내는 분의 이름을 자유롭게 입력해 주세요.'
          maxLength={20}
        />
      </div>
    </div>
  );
};