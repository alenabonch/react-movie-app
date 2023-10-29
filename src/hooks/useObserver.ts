import { RefObject, useEffect } from 'react';

export const useObserver = (observerTarget: RefObject<Element>, canLoad: boolean, loading: boolean, callback: () => void) => {
  useEffect(() => {
    if (loading) return;

    const cb = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    }

    const observer = new IntersectionObserver(cb);
    observer.observe(observerTarget.current as Element);

    return () => {
      observer.disconnect();
    };
  }, [loading, observerTarget, canLoad, callback]);
}
