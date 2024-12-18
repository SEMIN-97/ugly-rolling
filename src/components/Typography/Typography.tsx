import { ElementType, FC, ReactNode } from "react";
import styles from './Typography.module.scss';

interface TypographyProps {
  children: ReactNode;
  as: ElementType;
  bold?: boolean;
}

export const Typography: FC<TypographyProps> = ({ as: Tag, bold = false, children}) => {
  return (
    <Tag className={ bold ? styles.bold : '' }>
      { children }
    </Tag>
  );
};