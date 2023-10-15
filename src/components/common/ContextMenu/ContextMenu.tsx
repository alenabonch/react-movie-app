import React, { useState } from 'react';
import './ContextMenu.scss';

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
        <button aria-label="Options" data-testid="context-menu-button" className="context-menu__button" onClick={handleToggleMenuVisibility}>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
        {menuOpened &&
            <div role="menu" className="context-menu__menu position-absolute">
              {options.map((option) => (
                  <button key={option}
                      data-testid="context-menu-item"
                      className="context-menu__option"
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
