import { ChangeEvent, FC } from "react";
import styles from "./Textarea.module.scss";

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxLength: number;
  height: number;
}

export const Textarea: FC<TextareaProps> = ({
                                              value,
                                              onChange,
                                              placeholder = '',
                                              maxLength = 100,
                                              height = 100
                                            }) => {
  const currentLength = value.length;
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={ styles.textareaContainer } style={ { height } }>
      <textarea
        className={ styles.textarea }
        value={ value }
        onChange={ handleChange }
        placeholder={ placeholder }
        maxLength={ maxLength }
      />
      { maxLength && (
        <div className={ styles.length }>{ currentLength }/{ maxLength }</div>
      ) }
    </div>
  );
};