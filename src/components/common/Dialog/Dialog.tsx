'use client';
import FocusTrap from 'focus-trap-react';
import React, { useEffect, useState } from 'react';
import { Portal } from 'react-portal';
import style from './Dialog.module.scss';

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

export interface DialogProps {
  children: any;
  title: string;
  open: boolean;
  onClose: () => void;
}

function Dialog({children, title, open, onClose}: DialogProps) {
  const hasMounted = useHasMounted();
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  }

  if (!open) return null;

  return (
      hasMounted &&
      <Portal node={document.body}>
        <FocusTrap>
          <div className={style.dialog} tabIndex={-1} role="dialog" onClick={handleBackdropClick} data-testid="dialog-overlay">
            <div className={style.dialog__content} onClick={e => e.stopPropagation()} data-testid="dialog-content">
              <div className={style.dialog__header}>
                <h3 className={style.dialog__title}>{title}</h3>
                <button className={style.dialog__close} onClick={onClose} aria-label="Close Dialog">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="dialog__body">
                {children}
              </div>
            </div>
          </div>
        </FocusTrap>
      </Portal>
  )
}

export default Dialog;
