import ConditionalSearch from '@components/advanced/ConditionalSearch/ConditionalSearch';
import styles from '@styles/HomePage.module.scss';
import React, { ReactNode } from 'react';
import '../../styles/globals.scss';

interface HomeLayoutProps {
  children: ReactNode,
  movieList: ReactNode,
  search: ReactNode,
}

export default async function HomeLayout({children, movieList, search}: HomeLayoutProps) {
  return (
      <div className={styles.homePage}>
        <div className={styles.homePage__header}>
          {children}
          <ConditionalSearch>
            {search}
          </ConditionalSearch>
        </div>
        <div className={styles.homePage__body}>
          {movieList}
        </div>
      </div>
  );
}
