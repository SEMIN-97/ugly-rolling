import { ChangeEvent, FC } from "react";
import styles from './Input.module.scss';

interface Validation {
  maxLength?: number;
}

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  validate: (value: string) => Validation;
}

export const Input: FC<InputProps> = ({ placeholder, value, onChange, validate = () => true }) => {
  const { maxLength } = validate(value) as Validation;

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
      { maxLength && (
        <p className={ styles.length }>
          { value.length }/{ maxLength }
        </p>
      ) }
    </div>
  );
};
