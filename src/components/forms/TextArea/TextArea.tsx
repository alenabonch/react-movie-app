import { ErrorMessage } from '@hookform/error-message';
import { FormContext } from 'components/forms/Form/Form';
import React, { useContext } from 'react';
import styles from './TextArea.module.scss';

function TextArea({ name, label, rules, ...rest }: any) {
  const {register, formState} = useContext(FormContext);
  return (
      <div className={styles.textArea}>
        <label htmlFor={name}>{label}</label>
        <textarea {...register(name, rules)} id={name} {...rest} />
        <ErrorMessage errors={formState.errors} name={name} render={({ message }) => <p className="error-message">{message}</p>}/>
      </div>
  );
}

export default TextArea;
