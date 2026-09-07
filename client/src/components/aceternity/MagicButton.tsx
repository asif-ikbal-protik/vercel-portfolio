import React from 'react';
import { cn } from '@/lib/utils';

interface MagicButtonProps {
  title: React.ReactNode;
  icon?: React.ReactNode;
  position?: 'left' | 'right';
  handleClick?: () => void;
  otherClasses?: string;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

/** Conic-gradient border that spins around a dark pill. */
const MagicButton: React.FC<MagicButtonProps> = ({
  title,
  icon,
  position = 'right',
  handleClick,
  otherClasses,
  className,
  type = 'button',
  disabled,
}) => (
  <button
    type={type}
    onClick={handleClick}
    disabled={disabled}
    className={cn('magic-button w-full md:w-auto disabled:opacity-60', className)}
  >
    <span className="magic-button__spin" />
    <span className={cn('magic-button__face', otherClasses)}>
      {position === 'left' && icon}
      {title}
      {position === 'right' && icon}
    </span>
  </button>
);

export default MagicButton;
