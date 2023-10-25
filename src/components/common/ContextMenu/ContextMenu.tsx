'use client';
import React, { useState } from 'react';
import styles from './ContextMenu.module.scss';

interface ContextMenuProps {
  options: string[];
  onSelect: (option: string) => void;
}

function ContextMenu({options, onSelect}: ContextMenuProps) {
  const [menuOpened, setMenuOpened] = useState(false);

  const handleToggleMenuVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuOpened(!menuOpened);
  }

  const handleOptionSelect = (option: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setMenuOpened(!menuOpened);
    onSelect(option);
  }

  return (
      <div className="position-relative">
        <button aria-label="Options" data-testid="context-menu-button" className={styles.contextMenu__button} onClick={handleToggleMenuVisibility}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
        </button>
        {menuOpened &&
            <div role="menu" className={styles.contextMenu__menu}>
              {options.map((option) => (
                  <button key={option}
                      data-testid="context-menu-item"
                      className={styles.contextMenu__option}
                      onClick={handleOptionSelect.bind(null, option)}>
                    {option}
                  </button>
              ))}
            <div/>
          </div>
        }
      </div>
  );
}

export default ContextMenu;
