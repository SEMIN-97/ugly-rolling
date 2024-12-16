import { FC } from 'react';
import { OrnamentType } from '../../../types/enum';
import { ornamentList } from '../../../models/ornamentList.ts';
import { CardList } from '../../../components/CardList/CardList.tsx';
import { SubTitle } from '../../../components/Title/Title.tsx';
import styles from './AddMessageModal.module.scss';

interface SelectOrnamentStepProps {
  selectedOrnament: OrnamentType;
  setSelectedOrnament: (ornament: OrnamentType) => void;
}

export const SelectOrnamentStep: FC<SelectOrnamentStepProps> = ({
  setSelectedOrnament
}) => {
  const handleOrnamentClick = (ornament: OrnamentType) => {
    setSelectedOrnament(ornament);
  };

  return (
    <div className={styles.modalContents}>
      <SubTitle bold>장식을 골라주세요.</SubTitle>
      <ul>
        {
          <CardList imagePath="ornaments/" cards={ornamentList as string[]} onClick={handleOrnamentClick} />
        }
      </ul>
    </div>
  );
};