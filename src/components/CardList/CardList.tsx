import styles from './CardList.module.scss';
import { FC, useState } from "react";

interface CardListProp {
  imagePath: string;
  cards: string[];
  height?: number;
  onClick: (type: any) => void
}

export const CardList: FC<CardListProp> = ({ imagePath, cards, height, onClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imagePathPrefix = '/src/assets/images/';

  const handleClick = (index: number, type: string) => {
    setActiveIndex(index);
    if (onClick) onClick(type);
  };

  return (
    <div className={ styles.cardList }>
      { cards.map((type, index) => (
        <div
          key={ index }
          style={ { height } }
          className={ `${ styles.card } ${ activeIndex === index ? styles.active : '' }` }
          onClick={ () => handleClick(index, type) }
        >
          <img src={ `${ imagePathPrefix }${ imagePath }${ type }.png` } className={ styles.image }/>
        </div>
      )) }
    </div>
  );
};