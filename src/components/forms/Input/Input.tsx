import { ErrorMessage } from '@hookform/error-message';
import React, { useContext } from 'react';
import { FormContext } from '../Form/Form';

function Input({ name, label, rules, ...rest }: any) {
  const {register, formState} = useContext(FormContext);
  return (
      <div className="input-element">
        <label htmlFor={name}>{label}</label>
        <input {...register(name, rules)} id={name} {...rest} />
        <ErrorMessage errors={formState.errors} name={name} render={({ message }) => <p className="error-message">{message}</p>}/>
      </div>
  );
}

export default Input;
