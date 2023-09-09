import React from 'react';
import './Button.scss';

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  classes?: string[];
  backgroundColor?: string;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  size = 'medium',
  classes = [],
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode, ...classes].join(' ')}
      {...props}
      style={{ backgroundColor }}
    >
      {label}
    </button>
  );
};
