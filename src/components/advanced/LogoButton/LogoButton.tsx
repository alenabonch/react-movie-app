import React from 'react';
import { LinkWithQuery } from '../../common/LinkWithQuery/LinkWithQuery';
import styles from './LogoButton.module.scss'

export default function LogoButton() {
  return (
      <button className={styles.logo}>
        <LinkWithQuery to="/"><strong>netflix</strong>roulette</LinkWithQuery>
      </button>
  );
}
