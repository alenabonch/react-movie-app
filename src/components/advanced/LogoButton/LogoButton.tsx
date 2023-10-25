'use client'
import { LinkWithQuery } from '@components/common/LinkWithQuery/LinkWithQuery';
import styles from './LogoButton.module.scss'

export default function LogoButton() {
  return (
      <button className={styles.logo}>
        <LinkWithQuery to="/"><strong>netflix</strong>roulette</LinkWithQuery>
      </button>
  );
}
