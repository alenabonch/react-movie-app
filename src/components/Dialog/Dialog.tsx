import FocusTrap from 'focus-trap-react';
import React from 'react';
import { Portal } from 'react-portal';
import './Dialog.scss';

export interface DialogProps {
  children: any;
  title: string;
  open: boolean;
  onClose: () => void;
}

function Dialog({children, title, open, onClose}: DialogProps) {
  if (!open) return null;
  return (
      <Portal>
        <FocusTrap>
          <div className="dialog" tabIndex={-1} role="dialog" onClick={onClose} data-testid="dialog-overlay">
            <div className="dialog__content" onClick={e => e.stopPropagation()} data-testid="dialog-content">
              <div className="dialog__header">
                <h3 className="dialog__title">{title}</h3>
                <button className="dialog__close" onClick={onClose} aria-label="Close Dialog">
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
  );
}

export default Dialog;
