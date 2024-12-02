import styles from './Button.module.scss';
import { FC } from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  isDisabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ label, onClick, isDisabled = false }) => {
  return (
    <button
      className={ styles.button }
      onClick={ onClick }
      disabled={ isDisabled }
    >
      { label }
    </button>
  );
};
