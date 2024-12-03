import styles from './Button.module.scss';
import { FC } from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: FC<ButtonProps> = ({ label, onClick, type = 'button', isDisabled = false }) => {
  return (
    <button
      className={ styles.button }
      onClick={ onClick }
      disabled={ isDisabled }
      type={ type }
    >
      { label }
    </button>
  );
};
