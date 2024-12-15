import { FC } from 'react';
import { Textarea } from '../../../components/Textarea/Textarea.tsx';

interface InputMessageProps {
  messageInput: string;
  setMessageInput: (message: string) => void;
}

export const InputMessage: FC<InputMessageProps> = ({
  messageInput,
  setMessageInput
}) => {
  const handleMessageChange = (value: string) => {
    setMessageInput(value);
  };

  return (
    <>
      <p>메시지를 작성해 주세요.</p>
      <Textarea
        value={messageInput}
        onChange={handleMessageChange}
        placeholder="닉네임님에게 하고싶은 말이나 응원의 메시지를 남겨주세요."
        maxLength={100}
        height={250}
      />
    </>
  );
};