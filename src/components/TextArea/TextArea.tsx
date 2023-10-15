import { ErrorMessage } from '@hookform/error-message';
import { FormContext } from 'components/Form/Form';
import React, { useContext } from 'react';
import './TextArea.scss';

function TextArea({ name, label, rules, ...rest }: any) {
  const {register, formState} = useContext(FormContext);
  return (
      <div className="text-area">
        <label htmlFor={name}>{label}</label>
        <textarea {...register(name, rules)} id={name} {...rest} />
        <ErrorMessage errors={formState.errors} name={name} render={({ message }) => <p className="error-message">{message}</p>}/>
      </div>
  );
}

export default TextArea;
