import { ElementType, FC, ReactNode } from "react";
import styles from './Typography.module.scss';

interface TypographyProps {
  children: ReactNode;
  as: ElementType;
  className: string;
  bold?: boolean;
}

export const Typography: FC<TypographyProps> = ({ as: Tag = 'p', bold = false, children, className = '' }) => {
  return (
    <Tag className={ `${ styles[className] } ${ bold ? styles.bold : '' }` }>
      { children }
    </Tag>
  );
};