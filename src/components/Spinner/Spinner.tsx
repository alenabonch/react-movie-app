import React from 'react';
import './Spinner.scss';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large'
}

function Spinner({size = 'medium'} : SpinnerProps) {
  return (
      <div className={`spinner__${size}`} data-testid="spinner">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
  );
}

export default Spinner;
