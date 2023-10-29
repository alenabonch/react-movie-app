import React, { createContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Button } from '../../common/Button/Button';
import Spinner from '../../common/Spinner/Spinner';

export interface FormProps {
  defaultValues: any
  children: any;
  serverError: any;
  onSubmit: (data: any) => void;
  loading: boolean;
  serverErrors?: string[];
}

export const FormContext = createContext<UseFormReturn>({} as UseFormReturn);

function Form({defaultValues, children, serverErrors, loading, onSubmit}: FormProps) {
  const methods = useForm({defaultValues})
  const {handleSubmit, reset} = methods

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContext.Provider value={{...methods}}>{children}</FormContext.Provider>

        {
            serverErrors && serverErrors.map((message) => (
                <div className="text-danger" key={message}>{message}</div>
            ))
        }

        <div className="d-flex justify-content-end">
          {loading && <div className="mt-1 mx-1"><Spinner size="small"/></div>}
          <Button className="mx-2" onClick={() => reset(defaultValues)}>Reset</Button>
          <Button primary type="submit" data-testid="submit-form-button">Submit</Button>
        </div>
      </form>
  )
}

export default Form;
