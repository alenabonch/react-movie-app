import { ErrorMessage } from '@hookform/error-message';
import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';
import { FormContext } from '../Form/Form';

function Datepicker({name, label, rules, placeholder, ...rest}: any) {
  const {control, formState} = useContext(FormContext);
  return (
      <>
        <label htmlFor={name}>{label}</label>
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({field: {onChange, value}}) => (
                <DatePicker id={name}
                            selected={value}
                            placeholderText={placeholder}
                            onChange={onChange}
                            dateFormat='yyyy-MM-dd'
                            {...rest}
                />
            )}
        />
        <ErrorMessage errors={formState.errors} name={name} render={({message}) => <p className="error-message">{message}</p>}/>
      </>
  );
}

export default Datepicker;
