import styles from './CardList.module.scss';
import { FC } from "react";

interface CardListProp {
  count: number;
  activeIndex: number;
  onClick: (index: number) => void
}

export const CardList: FC<CardListProp> = ({ count, activeIndex, onClick }) => {
  const cards = Array.from({ length: count });

  return (
    <div className={styles.cardList}>
      {cards.map((_, index) => (
        <div
          key={index}
          className={`${styles.card} ${activeIndex === index ? styles.active : ''}`}
          onClick={() => onClick(index)}
        >
          Card {index + 1}
        </div>
      ))}
    </div>
  );
};