import { FC } from 'react';
import { OrnamentType } from '../../../types/enum';
import { CardList } from '../../../components/CardList/CardList.tsx';
import { Typography } from '../../../components/Typography/Typography.tsx';
import styles from './AddMessageModal.module.scss';

interface SelectOrnamentStepProps {
  ornamentList: OrnamentType[];
  selectedOrnament: OrnamentType;
  setSelectedOrnament: (ornament: OrnamentType) => void;
}

export const SelectOrnamentStep: FC<SelectOrnamentStepProps> = ({
  setSelectedOrnament
}) => {
  const ornamentList = Object.values(OrnamentType);
  const handleOrnamentClick = (ornament: OrnamentType) => {
    setSelectedOrnament(ornament);
  };

  return (
    <div className={styles.modalContents}>
      <Typography as="p" bold>장식을 골라주세요.</Typography>
      <ul>
        {
          <CardList imagePath="ornaments/" cards={ornamentList} onClick={handleOrnamentClick} />
        }
      </ul>
    </div>
  );
};