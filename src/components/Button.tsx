interface ButtonProps {
  label: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  label,
  type = 'button',
  disabled = false,
  onClick
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      { label }
    </button>
  );
}