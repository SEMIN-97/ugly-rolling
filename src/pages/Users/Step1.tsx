import { FC } from "react";
import { Input } from "../../components/Input/Input.tsx";
import { Button } from "../../components/Button/Button.tsx";
import { Title } from "../../components/Title/Title.tsx";

interface Step1Props {
  nickname: string;
  setNickname: (nickname: string) => void;
  handleNextStep: () => void;
}

export const Step1: FC<Step1Props> = ({ nickname, setNickname, handleNextStep }) => {
  return (
    <>
      <Title bold>반가워요! 🎅</Title>
      <Title bold>친구들에게 어떻게 불리나요?</Title>
      <Input
        placeholder='닉네임을 입력해주세요'
        value={ nickname }
        onChange={ setNickname }
        validate={ () => ({ maxLength: 20 }) }
      ></Input>
      <Button
        label='다음'
        onClick={ handleNextStep }
        isDisabled={ !nickname }
      />
    </>
  )
}