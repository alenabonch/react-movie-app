import { ErrorMessage } from '@hookform/error-message';
import { Multiselect } from 'multiselect-react-dropdown';
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import { FormContext } from '../Form/Form';

function MultiSelect({ name, label, rules, options, ...rest }: any) {
  const {control, formState} = useContext(FormContext);
  return (
      <>
        <label htmlFor={name}>{label}</label>
        <label htmlFor={`${name}_input`}>Genre</label>
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({field: {onChange, value}}) => (
                <Multiselect
                    id={name}
                    options={options}
                    isObject={false}
                    onSelect={onChange}
                    onRemove={onChange}
                    selectedValues={value}
                    closeOnSelect={false}
                    {...rest}
                />
            )}
        />
        <ErrorMessage errors={formState.errors} name={name} render={({ message }) => <p className="error-message">{message}</p>}/>
      </>
  );
}

export default MultiSelect;
