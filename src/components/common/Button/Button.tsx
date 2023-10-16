import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium';
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
  const mode = primary ? styles.appButton__primary : styles.appButton__secondary;
  const sizeClass = styles.appButton + ' ' + styles[size];
  return (
    <button
      type={type}
      className={[styles.appButton, sizeClass, mode, className].join(' ')}
      {...props}
      style={{ backgroundColor }}
    >
      {children}
    </button>
  );
};
