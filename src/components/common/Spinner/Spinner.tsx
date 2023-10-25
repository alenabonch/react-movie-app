'use client';
import React from 'react';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large'
}

function Spinner({size = 'medium'} : SpinnerProps) {
  return (
      <div className={styles.spinner + ' ' + styles[size]} data-testid="spinner">
        <div className={styles.ldsRipple}>
          <div></div>
          <div></div>
        </div>
      </div>
  );
}

export default Spinner;
