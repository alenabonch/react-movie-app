'use client';
import OptionIcon from '@components/icons/OptionIcon/OptionIcon';
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
          <OptionIcon/>
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
