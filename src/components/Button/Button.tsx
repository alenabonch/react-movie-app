import React from 'react';
import './Button.scss';

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  className?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  size = 'medium',
  className = '',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode, className].join(' ')}
      {...props}
      style={{ backgroundColor }}
    >
      {label}
    </button>
  );
};
