interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
  fullWidth = false
}: ButtonProps) {
  const baseStyles = 'px-8 py-4 rounded-full transition-all duration-200';
  const variantStyles = variant === 'primary'
    ? 'bg-[#111111] text-white hover:bg-[#2A2A2A]'
    : 'bg-[#F7F7F7] text-[#111111] hover:bg-[#E5E5E5]';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${widthStyles} ${className}`}
      style={{ fontSize: '0.9375rem', letterSpacing: '0.01em' }}
    >
      {children}
    </button>
  );
}
