'use client';
import { useHasMounted } from '@hooks/useHasMounted';
import FocusTrap from 'focus-trap-react';
import React from 'react';
import { Portal } from 'react-portal';
import style from './Dialog.module.scss';

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
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
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
