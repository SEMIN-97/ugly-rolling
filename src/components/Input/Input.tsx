import { ChangeEvent, FC } from "react";
import styles from './Input.module.scss';

interface InputProps {
  placeholder: string;
  value: string;
  maxLength: number;
  isValid: boolean;
  errorMessage: string;
  onChange: (value: string) => void;
}

export const Input: FC<InputProps> = ({ placeholder, value, maxLength, isValid, errorMessage, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={ styles.inputContainer }>
      <input
        className={ `${ styles.input } ${ !isValid ? styles.error : '' }` }
        type='text'
        placeholder={ placeholder }
        maxLength={ maxLength }
        value={ value }
        onChange={ handleChange }
      ></input>
      { maxLength && (
        <p className={ styles.length }>
          { value.length }/{ maxLength }
        </p>
      ) }
      { !isValid && <p className={ styles.errorMessage }>{ errorMessage }</p> }
    </div>
  );
};
