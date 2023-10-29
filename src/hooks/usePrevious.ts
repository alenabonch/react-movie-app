import { MutableRefObject, useEffect, useRef } from 'react';

export function usePrevious(value: unknown) {
  const ref: MutableRefObject<unknown> = useRef();

  // store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // only re-run if value changes

  // return previous value (happens before update in useEffect above)
  return ref.current;
}
