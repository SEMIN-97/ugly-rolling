import { FC } from "react";
import { Input } from "../../../components/Input/Input.tsx";
import { Button } from "../../../components/Button/Button.tsx";
import { Title } from "../../../components/Title/Title.tsx";
import styles from './Steps.module.scss';
import useUserStore from "../../../stores/userStore.ts";
import { useNicknameValidation } from "../../../hooks/validation/useNicknameValidation.ts";

interface Step1Props {
  nickname: string;
  setNickname: (nickname: string) => void;
  handleNextStep: () => void;
}

export const Step1: FC<Step1Props> = ({ nickname, setNickname, handleNextStep }) => {
  const setUser = useUserStore(state => state.setUser);
  const { isValid, errorMessage, validate, resetValidation } = useNicknameValidation();

  const handleClick = () => {
    if (!validate(nickname)) return;
    setUser({ nickname });
    handleNextStep();
  };

  const handleInputChange = (nickname: string) => {
    setNickname(nickname);
    resetValidation();
  };

  return (
    <div className={ styles.stepContainer }>
      <div className={ styles.stepBody }>
        <Title bold>반가워요! 🎅</Title>
        <Title bold>친구들에게 어떻게 불리나요?</Title>
        <div className={ styles.inputContainer }>
          <Input
            placeholder='닉네임을 입력해주세요'
            value={ nickname }
            isValid={ isValid }
            errorMessage={ errorMessage }
            maxLength={ 20 }
            onChange={ handleInputChange }
          ></Input>
        </div>
      </div>
      <div className={ styles.buttonContainer }>
        <Button
          label='다음'
          onClick={ handleClick }
          isDisabled={ !nickname }
        />
      </div>
    </div>
  );
};
