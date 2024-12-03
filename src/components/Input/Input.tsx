import { ChangeEvent, FC } from "react";
import styles from './Input.module.scss';

interface InputProps {
  placeholder: string;
  maxLength: number;
  value: string;
  onChange: (value: string) => void;
  validate: (value: string) => boolean;
}

export const Input: FC<InputProps> = ({ placeholder, maxLength, value, onChange, validate = () => true }) => {
  const currentLength = value.length;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    if (validate(targetValue)) {
      onChange(targetValue);
    }
  };

  return (
    <div className={ styles.inputContainer }>
      <input
        className={ styles.input }
        type='text'
        placeholder={ placeholder }
        maxLength={ maxLength }
        value={ value }
        onChange={ handleChange }
      ></input>
      <p className={ styles.length }>{ currentLength }/{ maxLength }</p>
    </div>
  );
};
