import { FC } from "react";
import { Input } from "../../components/Input/Input.tsx";
import { Button } from "../../components/Button/Button.tsx";
import { Title } from "../../components/Title/Title.tsx";
import styles from './Step1.module.scss';

interface Step1Props {
  nickname: string;
  setNickname: (nickname: string) => void;
  handleNextStep: () => void;
}

export const Step1: FC<Step1Props> = ({ nickname, setNickname, handleNextStep }) => {
  return (
    <div className={ styles.step1Container }>
      <div className={ styles.step1Body }>
        <Title bold>반가워요! 🎅</Title>
        <Title bold>친구들에게 어떻게 불리나요?</Title>
        <div className={ styles.inputContainer }>
          <Input
            placeholder='닉네임을 입력해주세요'
            value={ nickname }
            onChange={ setNickname }
            validate={ () => ({ maxLength: 20 }) }
          ></Input>
        </div>
      </div>
      <div className={ styles.buttonContainer }>
        <Button
          label='다음'
          onClick={ handleNextStep }
          isDisabled={ !nickname }
        />
      </div>
    </div>
  );
};
