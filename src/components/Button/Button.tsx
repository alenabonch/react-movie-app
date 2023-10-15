import React from 'react';
import './Button.scss';

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  children: any;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  size = 'medium',
  className = '',
  backgroundColor,
  type = 'button',
  children,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type={type}
      className={['storybook-button', `storybook-button--${size}`, mode, className].join(' ')}
      {...props}
      style={{ backgroundColor }}
    >
      {children}
    </button>
  );
};
