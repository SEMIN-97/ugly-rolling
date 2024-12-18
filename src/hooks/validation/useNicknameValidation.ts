import { useState } from "react";

export const useNicknameValidation = () => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (input: string): boolean => {
    switch (true) {
      case input.length < 2:
        return handleState({ isValid: false, message: '최소 2자 이상 입력해주세요.' });
      case input.length > 20:
        return handleState({ isValid: false, message: '최대 20자 이하로 입력해주세요.' });
      default:
        return true;
    }
  };

  const resetValidation = () => {
    handleState({ isValid: true, message: '' });
  };

  const handleState = (
    { isValid, message }: {
      isValid: boolean;
      message: string
    }) => {
    setIsValid(isValid);
    setErrorMessage(message);

    return isValid;
  };

  return {
    isValid,
    errorMessage,
    validate,
    resetValidation,
  };
};