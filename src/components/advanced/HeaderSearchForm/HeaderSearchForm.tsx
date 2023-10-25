import AddMovieButton from '@components/advanced/AddMovieButton/AddMovieButton';
import SearchForm from '@components/advanced/SearchForm/SearchForm';
import styles from '@styles/HomePage.module.scss';
import React from 'react';
import LogoButton from '../LogoButton/LogoButton';

function HeaderSearchForm() {
  return (
      <div className={styles.homePage__header}>
        <div className="d-flex justify-content-between">
          <LogoButton/>
          <AddMovieButton/>
        </div>
        <div className="p-5">
          <SearchForm/>
        </div>
      </div>
  );
}

export default HeaderSearchForm;
