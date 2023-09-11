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

  const handleOptionSelect = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, option: string) => {
    event.stopPropagation();
    setMenuOpened(!menuOpened);
    onSelect(option);
  }

  return (
      <div className="position-relative">
        <button aria-label="Options" className="context-menu__button" onClick={(event) => handleToggleMenuVisibility(event)}>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
        {menuOpened &&
            <div role="menu" className="context-menu__menu position-absolute">
              {options.map((option) => (
                  <button key={option}
                      className="context-menu__option"
                      onClick={(event) => handleOptionSelect(event, option)}>
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
