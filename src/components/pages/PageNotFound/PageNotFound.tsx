import React from 'react';
import styles from './PageNotFound.module.scss';


function PageNotFound() {
  console.log('hello world');
  return (
      <h1 className={styles.pageNotFound}>
        404: Page Not Found
      </h1>
  );
}

export default PageNotFound;
