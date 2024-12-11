import { FC } from "react";
import { Button } from "../../components/Button/Button.tsx";
import { SweaterType } from "../../types/enum";
import { CardList } from "../../components/CardList/CardList.tsx";
import { Description, SubTitle, Title } from "../../components/Title/Title.tsx";

interface Step2Props {
  sweaterType: SweaterType;
  setSweaterType: (type: number) => void;
  handleNextStep: () => void;
}

export const Step2: FC<Step2Props> = ({ sweaterType, setSweaterType, handleNextStep }) => {
  const handleSweaterType = (index: number) => setSweaterType(index + 1);

  return (
    <>
      <Title bold>나만의 특별한 스웨터를 위해</Title>
      <Title>스웨터 모양을 선택해주세요.</Title>
      <SubTitle bold>스웨터 선택</SubTitle>
      <Description>선택한 스웨터에 친구들의 크리스마스 장식이 달려요.</Description>
      <CardList count={ 3 } activeIndex={ sweaterType + 1 } onClick={ handleSweaterType }></CardList>
      <Button
        label='다음'
        onClick={ handleNextStep }
        isDisabled={ !sweaterType }
      />
    </>
  );
};
