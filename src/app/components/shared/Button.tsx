import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  href,
  className,
  disabled,
}) => {
  const baseStyles = `rounded-[4px] min-w-[96px] max-w-[96px] min-h-[28px] max-h-[28px] flex items-center justify-center px-[4px] py-[1px] text-[10px] text-white text-center text-nowrap text-clip font-semibold border border-gray-300 transition-colors duration-200`;
  const defaultStyles = disabled
    ? 'bg-gray-400 cursor-not-allowed'
    : 'bg-[#0059FF] hover:bg-[#0000FF] hover:border-[#0059FF]';
  const combinedStyles = `${baseStyles} ${defaultStyles} ${className || ''}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {label}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
