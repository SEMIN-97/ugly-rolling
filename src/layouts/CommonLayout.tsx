import { ReactNode } from 'react';
import styles from './CommonLayout.module.scss';

interface CommonLayoutProps {
  children: ReactNode
}

export const CommonLayout = ({
  children
}: CommonLayoutProps) => {
  return (
    <div className={styles.app}>
      { children }
    </div>
  );
};