import { FC } from 'react';
import { OrnamentType } from '../../../types/enum';
import { ornamentList } from '../../../models/ornamentList.ts';
import styles from './AddMessageModal.module.scss';

interface SelectOrnamentProps {
  selectedOrnament: OrnamentType;
  setSelectedOrnament: (ornament: OrnamentType) => void;
}

interface OrnamentItemProps {
  item: OrnamentType;
}

export const SelectOrnament: FC<SelectOrnamentProps> = ({
  selectedOrnament,
  setSelectedOrnament
}) => {
  const handleOrnamentClick = (ornament: OrnamentType) => {
    setSelectedOrnament(ornament);
  };

  const OrnamentItem: FC<OrnamentItemProps> = ({item}) => (
    <li className={selectedOrnament === item ? styles.selected : ''}>
      <button
        type="button"
        onClick={() => handleOrnamentClick(item)}
      >
        {item}
      </button>
    </li>
  );

  return (
    <>
      <p>장식을 골라주세요.</p>
      <ul className={styles.ornamentList}>
        {
          ornamentList.map(item => (
            <OrnamentItem key={item} item={item}/>
          ))
        }
      </ul>
    </>
  );
};