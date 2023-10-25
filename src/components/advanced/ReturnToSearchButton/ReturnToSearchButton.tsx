'use client'
import styles from '@components/advanced/ReturnToSearchButton/ReturnToSearchButton.module.scss';
import { LinkWithQuery } from '@components/common/LinkWithQuery/LinkWithQuery';
import React from 'react';

export default function ReturnToSearchButton() {
  return (
      <button aria-label="Return to Search" className={styles.searchIcon} data-testid="return-to-search">
        <LinkWithQuery to="/"><i className="fa-solid fa-magnifying-glass">Search</i></LinkWithQuery>
      </button>
  );
}
