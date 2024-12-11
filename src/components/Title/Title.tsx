import { FC } from "react";
import styles from './Title.module.scss';

interface TitleProps {
  children: string;
  bold?: boolean;
}

export const Title: FC<TitleProps> = ({ bold = false, children }) => {
  return (
    <p className={ `${ styles.title } ${ bold ? styles.bold : '' }` }>
      { children }
    </p>
  );
};

export const SubTitle: FC<TitleProps> = ({ bold = false, children }) => {
  return (
    <p className={ `${ styles.subTitle } ${ bold ? styles.bold : '' }` }>
      { children }
    </p>
  );
};

export const Description: FC<TitleProps> = ({ bold = false, children }) => {
  return (
    <p className={ `${ styles.description } ${ bold ? styles.bold : '' }` }>
      { children }
    </p>
  );
};