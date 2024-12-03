import { ChangeEvent, FC } from "react";

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxLength: number;
}

export const Textarea: FC<TextareaProps> = ({
                                              value,
                                              onChange,
                                              placeholder = '',
                                              maxLength = 100
                                            }) => {
  const currentLength = value.length;
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <textarea
        value={ value }
        onChange={ handleChange }
        placeholder={ placeholder }
        maxLength={ maxLength }
      />
      { maxLength && (
        <div>{ currentLength }/{ maxLength }</div>
      ) }
    </div>
  );
};