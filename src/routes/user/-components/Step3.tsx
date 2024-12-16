import { FC } from "react";
import { Textarea } from "../../../components/Textarea/Textarea.tsx";
import { Button } from "../../../components/Button/Button.tsx";
import { Description, SubTitle, Title } from "../../../components/Title/Title.tsx";
import styles from './Steps.module.scss';

interface Step3Props {
  description: string;
  setDescription: (description: string) => void;
  handleNextStep: () => void;
}

export const Step3: FC<Step3Props> = ({ description, setDescription, handleNextStep }) => {
  return (
    <div className={ styles.stepContainer }>
      <div className={ styles.stepBody }>
        <Title bold>나의 친구들에게 보여지는</Title>
        <Title>한마디를 남겨주세요.</Title>
        <div className={ styles.subTitleContainer }>
          <SubTitle bold>나의 한마디</SubTitle>
          <Description>자유로운 한마디를 적고 친구들의 응원을 받아봐요.</Description>
        </div>
        <Textarea
          placeholder='다짐이나 새해 소망 등 친구들에게 보여지는 메시를 입력해주세요'
          value={ description }
          onChange={ (value) => setDescription(value) }
          maxLength={ 100 }
          height={ 150 }
        ></Textarea>
      </div>
      <div className={ styles.buttonContainer }>
        <Button
          label='나만의 롤링페이퍼 만들기'
          onClick={ handleNextStep }
        />
      </div>
    </div>
  );
};
