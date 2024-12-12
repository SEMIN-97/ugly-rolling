import styles from './CardList.module.scss';
import { FC } from "react";

interface CardListProp {
  count: number;
  activeIndex: number;
  height: number;
  onClick: (index: number) => void
}

export const CardList: FC<CardListProp> = ({ count, activeIndex, height, onClick }) => {
  const cards = Array.from({ length: count });

  return (
    <div className={ styles.cardList }>
      { cards.map((_, index) => (
        <div
          style={ { height } }
          key={ index + 1 }
          className={ `${ styles.card } ${ activeIndex === (index + 1) ? styles.active : '' }` }
          onClick={ () => onClick(index + 1) }
        >
          Card { index + 1 }
        </div>
      )) }
    </div>
  );
};