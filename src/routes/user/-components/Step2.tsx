import { FC } from "react";
import { Button } from "../../../components/Button/Button.tsx";
import { SweaterType } from "../../../types/enum";
import { CardList } from "../../../components/CardList/CardList.tsx";
import styles from './Steps.module.scss';
import { Typography } from "../../../components/Typography/Typography.tsx";

interface Step2Props {
  sweaterType: SweaterType;
  setSweaterType: (type: SweaterType) => void;
  handleNextStep: () => void;
}

export const Step2: FC<Step2Props> = ({ sweaterType, setSweaterType, handleNextStep }) => {
  const handleSweaterType = (type: SweaterType) => setSweaterType(type);
  const cards = Object.values(SweaterType);

  return (
    <div className={ styles.stepContainer }>
      <div className={ styles.stepBody }>
        <Typography as='h1' className='h1' bold>나만의 특별한 스웨터를 위해</Typography>
        <Typography as='h1' className='h1'>스웨터 모양을 선택해주세요.</Typography>
        <div className={ styles.subTitleContainer }>
          <Typography as='h2' className='h2' bold>스웨터 선택</Typography>
          <p>선택한 스웨터에 친구들의 크리스마스 장식이 달려요.</p>
        </div>
        <CardList imagePath={ 'sweaters/' } cards={ cards } height={ 100 } onClick={ handleSweaterType }></CardList>
      </div>
      <div className={ styles.buttonContainer }>
        <Button
          label='다음'
          onClick={ handleNextStep }
          isDisabled={ !sweaterType }
        />
      </div>
    </div>
  );
};